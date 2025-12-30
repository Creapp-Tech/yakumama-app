'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface NBackGameProps {
    onComplete: (score: number, rawData: any) => void;
}

const SYMBOLS = ['🔺', '🟦', '🟡', '⭐', '💎', '🍀'];
const TARGET_TRIALS = 30;
const STIMULUS_DURATION = 2000; // 2 seconds

export default function NBackGame({ onComplete }: NBackGameProps) {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FINISHED'>('IDLE');
    const [sequence, setSequence] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startGame = () => {
        const newSequence = Array.from({ length: TARGET_TRIALS }, () =>
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        );
        // Ensure some matches (approx 30%)
        for (let i = 2; i < TARGET_TRIALS; i++) {
            if (Math.random() < 0.3) {
                newSequence[i] = newSequence[i - 2];
            }
        }

        setSequence(newSequence);
        setGameState('PLAYING');
        setCurrentIndex(0);
        setResponses([]);
        nextStimulus(0);
    };

    const nextStimulus = (index: number) => {
        if (index >= TARGET_TRIALS) {
            finishGame();
            return;
        }

        setCurrentIndex(index);
        setMessage('');

        timerRef.current = setTimeout(() => {
            // Auto-advance if no response
            handleResponse(false, true);
        }, STIMULUS_DURATION);
    };

    const handleResponse = (userClaimedMatch: boolean, isAuto = false) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        const isMatch = currentIndex >= 2 && sequence[currentIndex] === sequence[currentIndex - 2];
        const isCorrect = userClaimedMatch === isMatch;

        const newResponse = {
            index: currentIndex,
            symbol: sequence[currentIndex],
            isMatch,
            userClaimedMatch,
            isCorrect,
            isAuto
        };

        setResponses(prev => {
            const updated = [...prev, newResponse];
            if (updated.length === TARGET_TRIALS) {
                // Trigger finish from here for state consistency
                setTimeout(() => finishGame(updated), 100);
            } else if (!isAuto || userClaimedMatch) {
                // If it was a manual click or auto, advance
                setTimeout(() => nextStimulus(currentIndex + 1), 500);
            }
            return updated;
        });

        if (!isAuto) {
            setMessage(isCorrect ? '¡Correcto!' : 'Incorrecto');
        }
    };

    const finishGame = (finalResponses = responses) => {
        if (gameState === 'FINISHED') return;
        setGameState('FINISHED');
        if (timerRef.current) clearTimeout(timerRef.current);

        const evaluableResponses = finalResponses.filter(r => r.index >= 2);
        const correctOnes = evaluableResponses.filter(r => r.isCorrect).length;
        const score = Math.round((correctOnes / evaluableResponses.length) * 100);

        onComplete(score, finalResponses);
    };

    if (gameState === 'IDLE') {
        return (
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100">
                <div className="text-6xl mb-6">🧠</div>
                <h3 className="text-3xl font-black text-[#2E4A62] mb-4">Test N-Back (2-back)</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    ¿El símbolo actual es igual al que viste <span className="font-bold text-[#3B7A57]">hace 2 pasos</span>?
                </p>
                <div className="flex justify-center gap-4 mb-8">
                    <div className="border p-2 rounded">⭐</div>
                    <div className="border p-2 rounded">🟦</div>
                    <div className="border p-2 rounded bg-green-50">⭐</div>
                    <span className="flex items-center text-sm text-gray-400">¡Igual!</span>
                </div>
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
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 min-h-[500px] flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Paso: {currentIndex + 1} / {TARGET_TRIALS}
                    </div>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="text-8xl mb-4 transition-all duration-300 transform scale-110">
                        {sequence[currentIndex]}
                    </div>
                    <div className={`h-8 font-bold ${message.includes('Correcto') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => handleResponse(true)}
                        disabled={currentIndex < 2 || message !== ''}
                        className={`w-full py-6 text-2xl font-black rounded-2xl transition-all shadow-lg active:scale-95
                            ${currentIndex < 2 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#C4A35A] hover:bg-[#b09250] text-white'}`}
                    >
                        {currentIndex < 2 ? 'Memoriza...' : '¡COINCIDE!'}
                    </button>
                    <p className="text-sm text-gray-400 mt-4 uppercase font-bold">
                        Haz clic solo si coincide con el de hace 2 posiciones
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
