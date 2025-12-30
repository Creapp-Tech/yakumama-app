
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nutritionQuestions } from '@/lib/nutrition-questions';
import { Question } from '@/lib/questions';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
// import { createNutritionEvaluation } from '@/lib/supabase-queries'; // TODO: Implement this
import { calculateNutritionScore, NutritionAnswers } from '@/lib/nutrition-logic';

export default function NutritionWizard() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const sections = Array.from(new Set(nutritionQuestions.map(q => q.section)));
    const currentSection = sections[currentSectionIndex];
    const sectionQuestions = nutritionQuestions.filter(q => q.section === currentSection);

    const handleAnswer = (questionId: string, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const isSectionComplete = () => {
        return sectionQuestions.every(q => {
            if (!q.required) return true;
            const val = answers[q.id];
            return val !== undefined && val !== '';
        });
    };

    const handleNext = () => {
        if (currentSectionIndex < sections.length - 1) {
            window.scrollTo(0, 0);
            setCurrentSectionIndex(prev => prev + 1);
        } else {
            submitEvaluation();
        }
    };

    const handlePrev = () => {
        if (currentSectionIndex > 0) {
            window.scrollTo(0, 0);
            setCurrentSectionIndex(prev => prev - 1);
        }
    };

    const submitEvaluation = async () => {
        if (!user) {
            alert('Debes iniciar sesión para guardar tus resultados.');
            return;
        }

        setIsSubmitting(true);
        try {
            // Transform answers to match NutritionAnswers interface types if needed
            // The questions use "Sí"/"No" which we need to map to booleans for the logic
            const logicAnswers: any = { ...answers };

            // Helper to clean boolean fields
            const boolFields = [
                'olive_oil', 'omega3_supp', 'vegan', 'metformin_ibp', 'b_symptoms',
                'd_deficiency_history', 'tea_turmeric_intake', 'stress_sleep_issues',
                'alcohol_smoking', 'pregnancy_lactation', 'medications_interaction',
                'severe_condition', 'mushroom_allergy', 'severe_symptoms'
            ];

            boolFields.forEach(field => {
                if (logicAnswers[field] === 'Sí') logicAnswers[field] = true;
                if (logicAnswers[field] === 'No') logicAnswers[field] = false;
            });

            // Clean number fields
            if (logicAnswers.fruit_veg_daily) logicAnswers.fruit_veg_daily = Number(logicAnswers.fruit_veg_daily);

            const results = calculateNutritionScore(logicAnswers as NutritionAnswers);

            // TODO: Save to Supabase using a server action or API route
            console.log('Results:', results);

            // For now, let's stick to localStorage for the demo/result page
            localStorage.setItem('lastNutritionResult', JSON.stringify(results));

            router.push('/dashboard/nutrition/results');

        } catch (err: any) {
            console.error(err);
            alert('Error al procesar la evaluación.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = ((currentSectionIndex + 1) / sections.length) * 100;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8">
            {/* Header */}
            <div className="bg-[#f0f9f0] p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#8dbf44]">Perfil Nutricional</h2>
                    <span className="text-sm font-medium text-gray-500">
                        {currentSectionIndex + 1}/{sections.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full">
                    <div
                        className="bg-[#8dbf44] h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Questions */}
            <div className="p-8 space-y-10">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">{currentSection}</h3>
                {sectionQuestions.map((q) => (
                    <div key={q.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <label className="block text-lg font-medium text-gray-800 mb-3">
                            {q.text} {q.required && <span className="text-red-500">*</span>}
                        </label>
                        {renderInput(q, answers[q.id], handleAnswer)}
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 p-6 flex justify-between items-center border-t border-gray-100">
                <button
                    onClick={handlePrev}
                    disabled={currentSectionIndex === 0}
                    className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${currentSectionIndex === 0
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Anterior
                </button>

                <button
                    onClick={handleNext}
                    disabled={!isSectionComplete() || isSubmitting}
                    className={`flex items-center px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${!isSectionComplete() || isSubmitting
                        ? 'bg-gray-300 cursor-not-allowed shadow-none'
                        : 'bg-[#8dbf44] hover:bg-[#7ca93a] hover:shadow-xl transform hover:-translate-y-0.5'
                        }`}
                >
                    {isSubmitting ? (
                        'Analizando...'
                    ) : currentSectionIndex === sections.length - 1 ? (
                        <>Ver Resultados <CheckCircle className="w-5 h-5 ml-2" /></>
                    ) : (
                        <>Siguiente <ChevronRight className="w-5 h-5 ml-2" /></>
                    )}
                </button>
            </div>
        </div>
    );
}

function renderInput(q: Question, value: any, onChange: (id: string, val: any) => void) {
    if (q.type === 'radio') {
        return (
            <div className="space-y-3">
                {q.options?.map((opt) => {
                    const isString = typeof opt === 'string';
                    const valueStr = isString ? opt : opt.value;
                    const labelStr = isString ? opt : opt.label;
                    const helperStr = !isString ? opt.helper : undefined;

                    return (
                        <label key={valueStr} className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${value === valueStr
                            ? 'border-[#8dbf44] bg-[#f0f9f0] shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${value === valueStr ? 'border-[#8dbf44]' : 'border-gray-400'
                                }`}>
                                {value === valueStr && <div className="w-3 h-3 rounded-full bg-[#8dbf44]" />}
                            </div>
                            <input
                                type="radio"
                                name={q.id}
                                value={valueStr}
                                checked={value === valueStr}
                                onChange={() => onChange(q.id, valueStr)}
                                className="hidden"
                            />
                            <div className="flex flex-col">
                                <span className="text-gray-700 font-medium">{labelStr}</span>
                                {helperStr && <span className="text-sm text-gray-500 mt-1">{helperStr}</span>}
                            </div>
                        </label>
                    );
                })}
            </div>
        );
    }

    if (q.type === 'number') {
        return (
            <input
                type="number"
                value={value || ''}
                onChange={(e) => onChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:border-transparent outline-none transition-all"
            />
        );
    }

    return null;
}
