'use client';

import { useState } from 'react';

interface WHO5Props {
    onComplete: (score: number, rawData: any) => void;
}

const QUESTIONS = [
    "Me he sentido alegre y de buen ánimo",
    "Me he sentido tranquilo(a) y relajado(a)",
    "Me he sentido activo(a) y enérgico(a)",
    "Me he despertado sintiéndome fresco(a) y descansado(a)",
    "Mi vida diaria ha estado llena de cosas que me interesan"
];

export default function WHO5Form({ onComplete }: WHO5Props) {
    const [answers, setAnswers] = useState<number[]>(new Array(5).fill(-1));
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAnswer = (val: number) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = val;
        setAnswers(newAnswers);

        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            finish(newAnswers);
        }
    };

    const finish = (finalAnswers: number[]) => {
        const total = finalAnswers.reduce((a, b) => a + b, 0);
        // 0 to 25 scale. Higher is better.
        const score = Math.round((total / 25) * 100);
        onComplete(score, finalAnswers);
    };

    return (
        <div className="p-8 max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 min-h-[500px] flex flex-col justify-between">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bienestar Subjetivo WHO-5</span>
                    <span className="text-[#8dbf44] font-bold">{currentIndex + 1} / 5</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
                    <div
                        className="bg-[#8dbf44] h-full rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / 5) * 100}%` }}
                    />
                </div>
                <p className="text-sm text-gray-500 mb-2 font-medium italic">En las últimas dos semanas...</p>
                <h3 className="text-2xl font-black text-[#2E4A62] mb-12 leading-tight">
                    {QUESTIONS[currentIndex]}
                </h3>
            </div>

            <div className="space-y-3">
                {[
                    'En ningún momento',
                    'A veces',
                    'Menos de la mitad del tiempo',
                    'Más de la mitad del tiempo',
                    'Casi siempre',
                    'Todo el tiempo'
                ].map((label, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="w-full py-4 px-6 text-left font-bold rounded-2xl border-2 border-gray-100 hover:border-[#8dbf44] hover:bg-[#f0f9f0] transition-all text-[#2E4A62] bg-white shadow-sm flex justify-between items-center group"
                    >
                        <span>{label}</span>
                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-[#8dbf44] transition-all" />
                    </button>
                ))}
            </div>
        </div>
    );
}
