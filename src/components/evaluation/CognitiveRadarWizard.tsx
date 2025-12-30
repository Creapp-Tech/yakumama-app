'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

// Games
import StroopGame from './games/StroopGame';
import TrailMakingA from './games/TrailMakingA';
import TrailMakingB from './games/TrailMakingB';
import DigitSpanGame from './games/DigitSpanGame';
import NBackGame from './games/NBackGame';
import ReactionGame from './games/ReactionGame';
import SymbolSubstitution from './games/SymbolSubstitution';
import GoNoGoGame from './games/GoNoGoGame';

// Forms
import PSS10Form from './forms/PSS10Form';
import WHO5Form from './forms/WHO5Form';

const STEPS = [
    { id: 'stroop', component: StroopGame, domain: 'attention' },
    { id: 'tmtA', component: TrailMakingA, domain: 'attention' },
    { id: 'digitSpan', component: DigitSpanGame, domain: 'memory' },
    { id: 'nback', component: NBackGame, domain: 'memory' },
    { id: 'reaction', component: ReactionGame, domain: 'speed' },
    { id: 'symbol', component: SymbolSubstitution, domain: 'speed' },
    { id: 'tmtB', component: TrailMakingB, domain: 'executive' },
    { id: 'gonogo', component: GoNoGoGame, domain: 'executive' },
    { id: 'pss10', component: PSS10Form, domain: 'emotional' },
    { id: 'who5', component: WHO5Form, domain: 'wellbeing' },
];

export default function CognitiveRadarWizard() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState<Record<string, number[]>>({
        attention: [],
        memory: [],
        speed: [],
        executive: [],
        emotional: [],
        wellbeing: [],
    });
    const [rawData, setRawData] = useState<Record<string, any>>({});
    const [isSaving, setIsSaving] = useState(false);

    const handleStepComplete = (score: number, data: any) => {
        const step = STEPS[currentStep];

        setScores(prev => ({
            ...prev,
            [step.domain]: [...prev[step.domain], score]
        }));

        setRawData(prev => ({
            ...prev,
            [step.id]: data
        }));

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            submitResults({
                ...scores,
                [step.domain]: [...scores[step.domain], score]
            }, {
                ...rawData,
                [step.id]: data
            });
        }
    };

    const submitResults = async (finalScores: any, finalRaw: any) => {
        if (!user) return;
        setIsSaving(true);

        const averagedScores = {
            attention: Math.round(finalScores.attention.reduce((a: any, b: any) => a + b, 0) / finalScores.attention.length),
            memory: Math.round(finalScores.memory.reduce((a: any, b: any) => a + b, 0) / finalScores.memory.length),
            speed: Math.round(finalScores.speed.reduce((a: any, b: any) => a + b, 0) / finalScores.speed.length),
            executive: Math.round(finalScores.executive.reduce((a: any, b: any) => a + b, 0) / finalScores.executive.length),
            emotional: finalScores.emotional[0],
            wellbeing: finalScores.wellbeing[0],
        };

        try {
            const { error } = await supabase.from('cognitive_results').insert([
                {
                    user_id: user.id,
                    week: 0, // Should be dynamic based on user progress in real app
                    attention_score: averagedScores.attention,
                    memory_score: averagedScores.memory,
                    speed_score: averagedScores.speed,
                    executive_score: averagedScores.executive,
                    emotional_score: averagedScores.emotional,
                    wellbeing_score: averagedScores.wellbeing,
                    raw_data: finalRaw,
                }
            ]);

            if (error) throw error;
            toast.success('¡Evaluación completada con éxito!');
            router.push('/dashboard/cognitive');
        } catch (error: any) {
            console.error('Error saving results:', error);
            toast.error('Error al guardar los resultados.');
            setIsSaving(false);
        }
    };

    if (isSaving) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 border-4 border-[#3B7A57] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#2E4A62] font-black text-xl">Analizando tu mente...</p>
            </div>
        );
    }

    const StepComponent = STEPS[currentStep].component;

    return (
        <div className="w-full">
            <div className="mb-8 flex justify-between items-center max-w-xl mx-auto px-4">
                {STEPS.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-grow mx-0.5 rounded-full transition-all duration-300 ${i <= currentStep ? 'bg-[#3B7A57]' : 'bg-gray-200'}`}
                    />
                ))}
            </div>

            {/* @ts-ignore */}
            <StepComponent onComplete={handleStepComplete} />
        </div>
    );
}
