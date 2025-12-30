'use client';

import { useState } from 'react';

interface PSS10Props {
    onComplete: (score: number, rawData: any) => void;
}

const QUESTIONS = [
    "¿Con qué frecuencia te has sentido afectado por algo que ocurrió inesperadamente?",
    "¿Con qué frecuencia te has sentido incapaz de controlar las cosas importantes en tu vida?",
    "¿Con qué frecuencia te has sentido nervioso o estresado?",
    "¿Con qué frecuencia te has sentido seguro sobre tu capacidad para manejar tus problemas personales?",
    "¿Con qué frecuencia has sentido que las cosas te van bien?",
    "¿Con qué frecuencia has sentido que no podías afrontar todas las cosas que tenías que hacer?",
    "¿Con qué frecuencia has podido controlar las dificultades de tu vida?",
    "¿Con qué frecuencia has sentido que tenías todo bajo control?",
    "¿Con qué frecuencia te has enfadado por cosas que estaban fuera de tu control?",
    "¿Con qué frecuencia has sentido que las dificultades se acumulaban tanto que no podías superarlas?"
];

// Items 4, 5, 7, 8 are reverse scored
const REVERSE_ITEMS = [3, 4, 6, 7];

export default function PSS10Form({ onComplete }: PSS10Props) {
    const [answers, setAnswers] = useState<number[]>(new Array(10).fill(-1));
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
        let total = 0;
        finalAnswers.forEach((val, i) => {
            if (REVERSE_ITEMS.includes(i)) {
                total += (4 - val);
            } else {
                total += val;
            }
        });

        // 0 to 40 scale. Lower is better (less stress). 
        // We invert for the radar so higher is "better" (less stress).
        const score = Math.round(((40 - total) / 40) * 100);
        onComplete(score, finalAnswers);
    };

    return (
        <div className="p-8 max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 min-h-[500px] flex flex-col justify-between">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estrés Percibido PSS-10</span>
                    <span className="text-[#3B7A57] font-bold">{currentIndex + 1} / 10</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
                    <div
                        className="bg-[#3B7A57] h-full rounded-full transition-all duration-300"
                        style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
                    />
                </div>
                <h3 className="text-2xl font-black text-[#2E4A62] mb-12 leading-tight">
                    {QUESTIONS[currentIndex]}
                </h3>
            </div>

            <div className="space-y-3">
                {['Nunca', 'Casi nunca', 'De vez en cuando', 'A menudo', 'Muy a menudo'].map((label, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="w-full py-5 px-6 text-left font-bold rounded-2xl border-2 border-gray-100 hover:border-[#3B7A57] hover:bg-[#f0f9f0] transition-all text-[#2E4A62] bg-white shadow-sm flex justify-between items-center group"
                    >
                        <span>{label}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#3B7A57] transition-all" />
                    </button>
                ))}
            </div>
        </div>
    );
}
