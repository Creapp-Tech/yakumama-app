'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface ReactionGameProps {
    onComplete: (score: number, rawData: any) => void;
}

const TARGET_TRIALS = 5;

export default function ReactionGame({ onComplete }: ReactionGameProps) {
    const [gameState, setGameState] = useState<'IDLE' | 'WAITING' | 'READY' | 'FINISHED'>('IDLE');
    const [trials, setTrials] = useState<number[]>([]);
    const [message, setMessage] = useState('Haz clic para comenzar');
    const [bgColor, setBgColor] = useState('bg-white');
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    const startTrial = () => {
        setGameState('WAITING');
        setMessage('Espera al color verde...');
        setBgColor('bg-[#ef4444]'); // Red

        const delay = 2000 + Math.random() * 3000; // 2-5 seconds
        timerRef.current = setTimeout(() => {
            setGameState('READY');
            setMessage('¡AHORA!');
            setBgColor('bg-[#22c55e]'); // Green
            startTimeRef.current = Date.now();
        }, delay);
    };

    const handleClick = () => {
        if (gameState === 'IDLE') {
            startTrial();
        } else if (gameState === 'WAITING') {
            // Early click
            if (timerRef.current) clearTimeout(timerRef.current);
            setMessage('¡Demasiado pronto! Inténtalo de nuevo.');
            setBgColor('bg-orange-400');
            setTimeout(startTrial, 1500);
        } else if (gameState === 'READY') {
            const reactionTime = Date.now() - startTimeRef.current;
            const updatedTrials = [...trials, reactionTime];
            setTrials(updatedTrials);

            if (updatedTrials.length >= TARGET_TRIALS) {
                finishGame(updatedTrials);
            } else {
                setMessage(`¡Bien! ${reactionTime}ms. Prepárate...`);
                setBgColor('bg-blue-400');
                setGameState('WAITING');
                setTimeout(startTrial, 1000);
            }
        }
    };

    const finishGame = (finalTrials: number[]) => {
        setGameState('FINISHED');
        const avgRT = finalTrials.reduce((a, b) => a + b, 0) / finalTrials.length;

        // Scoring: 200ms or less = 100, 500ms or more = 0
        const score = Math.max(0, Math.min(100, Math.round(((500 - avgRT) / 300) * 100)));
        onComplete(score, { avgRT, trials: finalTrials });
    };

    return (
        <div
            onClick={handleClick}
            className={`p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 min-h-[500px] flex flex-col items-center justify-center ${bgColor}`}
        >
            <div className="text-6xl mb-8">⚡</div>
            <h3 className={`text-3xl font-black mb-4 ${bgColor === 'bg-white' ? 'text-[#2E4A62]' : 'text-white'}`}>
                {gameState === 'IDLE' ? 'Test de Reacción' : message}
            </h3>
            {gameState === 'IDLE' && (
                <p className="text-gray-600 mb-8 text-lg">
                    Haz clic en cuanto el color cambie a <span className="font-bold text-[#22c55e]">VERDE</span>.
                </p>
            )}
            {trials.length > 0 && gameState !== 'FINISHED' && (
                <div className="mt-8 flex gap-2">
                    {Array.from({ length: TARGET_TRIALS }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full border border-white/30 ${i < trials.length ? 'bg-white' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            )}

            {gameState === 'IDLE' && (
                <div className="bg-[#3B7A57] text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-lg">
                    Comenzar Prueba
                </div>
            )}
        </div>
    );
}
