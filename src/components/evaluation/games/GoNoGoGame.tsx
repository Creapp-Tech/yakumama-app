'use client';

import { useState, useEffect, useRef } from 'react';

interface GoNoGoProps {
    onComplete: (score: number, rawData: any) => void;
}

const TARGET_TRIALS = 20;

export default function GoNoGo({ onComplete }: GoNoGoProps) {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FINISHED'>('IDLE');
    const [stimulus, setStimulus] = useState<'GO' | 'NOGO' | null>(null);
    const [trials, setTrials] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startGame = () => {
        setGameState('PLAYING');
        setTrials([]);
        nextStimulus();
    };

    const nextStimulus = () => {
        setStimulus(null);
        setMessage('');

        const delay = 1000 + Math.random() * 2000;
        setTimeout(() => {
            const isGo = Math.random() > 0.3; // 70% GO, 30% NOGO
            setStimulus(isGo ? 'GO' : 'NOGO');

            timerRef.current = setTimeout(() => {
                // Time's up
                handleResponse(false);
            }, 1000);
        }, delay);
    };

    const handleResponse = (pressed: boolean) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (stimulus === null) return;

        const isCorrect = pressed ? (stimulus === 'GO') : (stimulus === 'NOGO');
        const newTrial = { stimulus, pressed, isCorrect, timestamp: Date.now() };

        const updated = [...trials, newTrial];
        setTrials(updated);
        setStimulus(null);

        if (updated.length >= TARGET_TRIALS) {
            finishGame(updated);
        } else {
            setMessage(isCorrect ? '¡Bien!' : '¡Error!');
            setTimeout(nextStimulus, 500);
        }
    };

    const finishGame = (finalResults: any[]) => {
        setGameState('FINISHED');
        const correctOnes = finalResults.filter(r => r.isCorrect).length;
        const score = Math.round((correctOnes / finalResults.length) * 100);
        onComplete(score, finalResults);
    };

    if (gameState === 'IDLE') {
        return (
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100">
                <div className="text-6xl mb-6">🚦</div>
                <h3 className="text-3xl font-black text-[#2E4A62] mb-4">Test Go / No-Go</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Haz clic solo cuando veas el círculo <span className="font-bold text-[#22c55e]">VERDE</span>.
                    Si aparece un círculo <span className="font-bold text-[#ef4444]">ROJO</span>, ¡no hagas nada!
                </p>
                <button
                    onClick={startGame}
                    className="bg-[#3B7A57] hover:bg-[#2d5d42] text-white px-10 py-5 text-xl font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl"
                >
                    Comenzar Prueba
                </button>
            </div>
        );
    }

    if (gameState === 'PLAYING') {
        return (
            <div
                onClick={() => handleResponse(true)}
                className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 min-h-[500px] flex flex-col items-center justify-center cursor-pointer select-none"
            >
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest absolute top-8">
                    Progreso: {trials.length} / {TARGET_TRIALS}
                </div>

                <div className="flex flex-col items-center justify-center flex-grow w-full">
                    {stimulus === 'GO' ? (
                        <div className="w-48 h-48 rounded-full bg-[#22c55e] shadow-2xl animate-pulse" />
                    ) : stimulus === 'NOGO' ? (
                        <div className="w-48 h-48 rounded-full bg-[#ef4444] shadow-2xl" />
                    ) : (
                        <div className="w-48 h-48 rounded-full bg-gray-100 border-2 border-dashed border-gray-200" />
                    )}
                    <div className={`mt-8 text-2xl font-black ${message === '¡Bien!' ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                </div>

                <p className="text-sm text-gray-400 uppercase font-bold mb-4">Haz clic en cualquier parte al ver VERDE</p>
            </div>
        );
    }

    return null;
}
