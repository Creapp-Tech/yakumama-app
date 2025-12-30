'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { evaluationQuestions, Question } from '@/lib/questions';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createEvaluation } from '@/lib/supabase-queries';
import { calculateEvaluation } from '@/lib/evaluation-logic';

export default function EvaluationWizard() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const sections = Array.from(new Set(evaluationQuestions.map(q => q.section))).sort();
    const currentSection = sections[currentSectionIndex];
    const sectionQuestions = evaluationQuestions.filter(q => q.section === currentSection);

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
            if (Array.isArray(val)) return val.length > 0;
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
            // Calculate scores locally
            const results = calculateEvaluation(answers);

            // Save to Supabase
            const evaluation = await createEvaluation({
                user_id: user.id,
                type: 'initial',
                ecf_score: results.ecfScore,
                efc_score: results.efcScore,
                nsc_score: results.nscScore,
                ibcy_score: results.ibcyScore,
                total_score: results.ibcyScore, // Using IBCY as total
                raw_responses: answers,
                plan: results.plan,
                levels: results.levels
            });

            if (!evaluation) throw new Error('Failed to create evaluation');

            router.push(`/dashboard/results/${evaluation.id}`);
        } catch (err: any) {
            console.error(err);
            alert('Error al enviar la evaluación. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = ((currentSectionIndex + 1) / sections.length) * 100;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden my-8">
            {/* Header / Progress */}
            <div className="bg-[#f0f9f0] p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#8dbf44]">Evaluación de Bienestar</h2>
                    <span className="text-sm font-medium text-gray-500">
                        Sección {currentSection} ({currentSectionIndex + 1}/{sections.length})
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
                {sectionQuestions.map((q) => (
                    <div key={q.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <label className="block text-lg font-medium text-gray-800 mb-3">
                            {q.text} {q.required && <span className="text-red-500">*</span>}
                        </label>

                        {q.id === 'q27' ? (
                            <MemoryTestQuestion
                                value={answers[q.id]}
                                onChange={(val) => handleAnswer(q.id, val)}
                            />
                        ) : (
                            <>
                                {q.instructions && (
                                    <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800 whitespace-pre-line border border-blue-100">
                                        {q.instructions}
                                    </div>
                                )}
                                {renderInput(q, answers[q.id], handleAnswer)}
                            </>
                        )}
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
                        'Enviando...'
                    ) : currentSectionIndex === sections.length - 1 ? (
                        <>Finalizar <CheckCircle className="w-5 h-5 ml-2" /></>
                    ) : (
                        <>Siguiente <ChevronRight className="w-5 h-5 ml-2" /></>
                    )}
                </button>
            </div>
        </div>
    );
}

function renderInput(q: Question, value: any, onChange: (id: string, val: any) => void) {
    switch (q.type) {
        case 'text':
        case 'email':
        case 'number':
            return (
                <input
                    type={q.type}
                    value={value || ''}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:border-transparent outline-none transition-all"
                />
            );

        case 'textarea':
            return (
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:border-transparent outline-none transition-all resize-none"
                />
            );

        case 'radio':
            return (
                <div className="space-y-3">
                    {q.options?.map((opt) => {
                        const optValue = typeof opt === 'string' ? opt : opt.value;
                        const optLabel = typeof opt === 'string' ? opt : opt.label;
                        const optHelper = typeof opt === 'string' ? undefined : opt.helper;
                        const isSelected = value === optValue;

                        return (
                            <label key={optValue} className={`flex flex-col p-4 rounded-lg border cursor-pointer transition-all ${isSelected
                                ? 'border-[#8dbf44] bg-[#f0f9f0] shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}>
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${isSelected ? 'border-[#8dbf44]' : 'border-gray-400'
                                        }`}>
                                        {isSelected && <div className="w-3 h-3 rounded-full bg-[#8dbf44]" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={optValue}
                                        checked={isSelected}
                                        onChange={() => onChange(q.id, optValue)}
                                        className="hidden"
                                    />
                                    <span className="text-gray-700 font-medium">{optLabel}</span>
                                </div>
                                {optHelper && (
                                    <p className="mt-1 ml-8 text-sm text-gray-500">{optHelper}</p>
                                )}
                            </label>
                        );
                    })}
                </div>
            );

        case 'checkbox':
            const selected = (value as string[]) || [];
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options?.map((opt) => {
                        const optValue = typeof opt === 'string' ? opt : opt.value;
                        const optLabel = typeof opt === 'string' ? opt : opt.label;
                        const isSelected = selected.includes(optValue);

                        return (
                            <label key={optValue} className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${isSelected
                                ? 'border-[#8dbf44] bg-[#f0f9f0] shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${isSelected ? 'border-[#8dbf44] bg-[#8dbf44]' : 'border-gray-400'
                                    }`}>
                                    {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {
                                        const newSelected = isSelected
                                            ? selected.filter(s => s !== optValue)
                                            : [...selected, optValue];
                                        onChange(q.id, newSelected);
                                    }}
                                    className="hidden"
                                />
                                <span className="text-gray-700">{optLabel}</span>
                            </label>
                        );
                    })}
                </div>
            );

        case 'likert':
            return (
                <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-500 font-medium px-1">
                        <span>{q.likertLabels?.min || 'Nunca'}</span>
                        <span>{q.likertLabels?.max || 'Siempre'}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                onClick={() => onChange(q.id, num)}
                                className={`flex-1 h-14 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 ${value === num
                                    ? 'bg-[#8dbf44] text-white shadow-md ring-2 ring-[#8dbf44] ring-offset-2'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#8dbf44] hover:text-[#8dbf44]'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            );

        default:
            return null;
    }
}

function MemoryTestQuestion({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    const [step, setStep] = useState<'ADDR' | 'MEMORIZE' | 'INPUT'>('ADDR');
    const [timeLeft, setTimeLeft] = useState(15);
    const words = ['Sol', 'Agua', 'Libro', 'Verde', 'Camino', 'Nube', 'Tiempo', 'Mano'];

    const startTest = () => {
        setStep('MEMORIZE');
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setStep('INPUT');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    if (step === 'ADDR') {
        return (
            <div className="bg-white border-2 border-[#8dbf44] border-dashed rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Prueba de Memoria</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Te mostraremos <strong>8 palabras</strong> durante <strong>15 segundos</strong>.
                    Tu objetivo es memorizarlas todas. Luego desaparecerán y tendrás que escribirlas.
                </p>
                <button
                    onClick={startTest}
                    className="bg-[#8dbf44] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#7ca93a] transition-colors shadow-lg"
                >
                    Comenzar Prueba
                </button>
            </div>
        );
    }

    if (step === 'MEMORIZE') {
        return (
            <div className="bg-[#f0f9f0] rounded-xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-[#8dbf44] font-bold border border-[#8dbf44]">
                    ⏱ {timeLeft}s
                </div>
                <h3 className="text-gray-500 font-medium mb-6 uppercase tracking-widest text-sm">Memoriza estas palabras</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 select-none" style={{ userSelect: 'none' }}>
                    {words.map(w => (
                        <div key={w} className="bg-white p-4 rounded-lg shadow-sm font-bold text-xl text-gray-800 border-b-4 border-[#8dbf44]">
                            {w}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-red-400 mt-4">* No tomes capturas ni anotes las palabras</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">¡Tiempo! Escribe las palabras que recuerdes:</h3>
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ej: Sol, agua..."
                rows={4}
                onPaste={(e) => {
                    e.preventDefault();
                    alert('Por favor escribe las palabras de memoria, no pegues texto.');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:border-transparent outline-none transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">Separa las palabras con comas o espacios.</p>
        </div>
    );
}
