'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import CognitiveRadar from '@/components/dashboard/CognitiveRadar';
import CognitiveRadarWizard from '@/components/evaluation/CognitiveRadarWizard';
import { Brain, Trophy, ArrowRight, History, Star } from 'lucide-react';

export default function CognitiveDashboard() {
    const { user } = useAuth();
    const [results, setResults] = useState<any[]>([]);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchResults();
        }
    }, [user]);

    const fetchResults = async () => {
        try {
            const { data, error } = await supabase
                .from('cognitive_results')
                .select('*')
                .eq('user_id', user?.id)
                .order('week', { ascending: true });

            if (error) throw error;
            setResults(data || []);
        } catch (error) {
            console.error('Error fetching cognitive results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const radarData = [
        { subject: 'Atención', fullMark: 100 },
        { subject: 'Memoria', fullMark: 100 },
        { subject: 'Velocidad', fullMark: 100 },
        { subject: 'Ejecutiva', fullMark: 100 },
        { subject: 'Emocional', fullMark: 100 },
        { subject: 'Bienestar', fullMark: 100 },
    ].map(domain => {
        const item = {
            subject: domain.subject,
            week0: 0,
            fullMark: domain.fullMark,
        } as any;

        results.forEach(res => {
            const score = domain.subject === 'Atención' ? res.attention_score :
                domain.subject === 'Memoria' ? res.memory_score :
                    domain.subject === 'Velocidad' ? res.speed_score :
                        domain.subject === 'Ejecutiva' ? res.executive_score :
                            domain.subject === 'Emocional' ? res.emotional_score :
                                res.wellbeing_score;

            if (res.week === 0) item.week0 = score;
            else if (res.week === 6) item.week6 = score;
            else if (res.week === 12) item.week12 = score;
        });
        return item;
    });

    if (isEvaluating) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <button
                    onClick={() => setIsEvaluating(false)}
                    className="mb-8 text-gray-500 hover:text-[#2E4A62] flex items-center gap-2 font-bold"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Volver al Dashboard
                </button>
                <CognitiveRadarWizard />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#2E4A62] mb-2 flex items-center gap-3">
                        <Brain className="w-10 h-10 text-[#3B7A57]" />
                        Radar de Bienestar Cognitivo
                    </h1>
                    <p className="text-gray-500 text-lg">Visualiza y entrena la evolución de tu mente.</p>
                </div>
                <button
                    onClick={() => setIsEvaluating(true)}
                    className="bg-[#3B7A57] hover:bg-[#2d5d42] text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                >
                    Iniciar Escaneo Mental <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Radar Chart */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-[#2E4A62]">Tu Perfil Cognitivo</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <div className="w-3 h-3 rounded-full bg-[#2E4A62]" /> Semana 0
                                </div>
                                {results.some(r => r.week === 6) && (
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                        <div className="w-3 h-3 rounded-full bg-[#3B7A57]" /> Semana 6
                                    </div>
                                )}
                            </div>
                        </div>
                        {results.length > 0 ? (
                            <CognitiveRadar data={radarData} />
                        ) : (
                            <div className="h-[350px] flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                <History className="w-16 h-16 text-gray-300 mb-4" />
                                <p className="text-gray-500 font-bold mb-6">Aún no has realizado tu primera evaluación cognitiva.</p>
                                <button
                                    onClick={() => setIsEvaluating(true)}
                                    className="text-[#3B7A57] font-black underline"
                                >
                                    ¡Comienza ahora!
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#f0f9f0] p-6 rounded-3xl border border-[#3B7A57]/10">
                            <h4 className="font-black text-[#3B7A57] mb-2 flex items-center gap-2">
                                <Star className="w-5 h-5" /> Dato del Día
                            </h4>
                            <p className="text-[#3B7A57]/80 text-sm leading-relaxed">
                                El cerebro tiene una plasticidad asombrosa. Entrenar tu atención hoy mejora tu claridad mental mañana.
                            </p>
                        </div>
                        <div className="bg-[#fff9e6] p-6 rounded-3xl border border-[#C4A35A]/10">
                            <h4 className="font-black text-[#C4A35A] mb-2 flex items-center gap-2">
                                <Trophy className="w-5 h-5" /> Próximo Hito
                            </h4>
                            <p className="text-[#C4A35A]/80 text-sm leading-relaxed">
                                Tu próximo escaneo estará disponible en la <span className="font-bold">Semana 6</span> para medir tu avance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-[#2E4A62] text-white p-8 rounded-[2.5rem] shadow-xl">
                        <h3 className="text-xl font-black mb-6">Dominios Medidos</h3>
                        <div className="space-y-6">
                            {[
                                { name: 'Atención', desc: 'Enfoque y resistencia a distracciones.' },
                                { name: 'Memoria', desc: 'Retención y manipulación de información.' },
                                { name: 'Velocidad', desc: 'Agilidad en procesar nuevos datos.' },
                                { name: 'Ejecutiva', desc: 'Planificación y toma de decisiones.' },
                                { name: 'Emocional', desc: 'Gestión del estrés y resiliencia.' },
                                { name: 'Bienestar', desc: 'Tu percepción general de salud.' },
                            ].map(d => (
                                <div key={d.name} className="group cursor-default">
                                    <h5 className="font-black text-[#C4A35A] group-hover:text-white transition-colors">{d.name}</h5>
                                    <p className="text-white/60 text-xs leading-relaxed">{d.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
