'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface DigitSpanProps {
    onComplete: (score: number, rawData: any) => void;
}

export default function DigitSpan({ onComplete }: DigitSpanProps) {
    const [gameState, setGameState] = useState<'IDLE' | 'SHOWING' | 'WAITING_INPUT' | 'FINISHED'>('IDLE');
    const [sequence, setSequence] = useState<number[]>([]);
    const [userInput, setUserInput] = useState('');
    const [level, setLevel] = useState(3); // Start with 3 digits
    const [strikes, setStrikes] = useState(0);
    const [currentDigitIndex, setCurrentDigitIndex] = useState(-1);
    const [results, setResults] = useState<any[]>([]);

    const startGame = () => {
        setGameState('IDLE');
        setLevel(3);
        setStrikes(0);
        setResults([]);
        startLevel(3);
    };

    const startLevel = (len: number) => {
        const newSeq = Array.from({ length: len }, () => Math.floor(Math.random() * 10));
        setSequence(newSeq);
        setUserInput('');
        setGameState('SHOWING');
        showSequence(newSeq);
    };

    const showSequence = async (seq: number[]) => {
        for (let i = 0; i < seq.length; i++) {
            setCurrentDigitIndex(i);
            await new Promise(r => setTimeout(r, 1000));
            setCurrentDigitIndex(-1);
            await new Promise(r => setTimeout(r, 300));
        }
        setGameState('WAITING_INPUT');
    };

    const handleSubmit = () => {
        const isCorrect = userInput === sequence.join('');
        const newResult = { level, sequence, userInput, isCorrect };
        const updatedResults = [...results, newResult];
        setResults(updatedResults);

        if (isCorrect) {
            setLevel(prev => prev + 1);
            setTimeout(() => startLevel(level + 1), 1000);
        } else {
            const newStrikes = strikes + 1;
            setStrikes(newStrikes);
            if (newStrikes >= 2) {
                finishGame(updatedResults);
            } else {
                setTimeout(() => startLevel(level), 1000);
            }
        }
    };

    const finishGame = (finalResults: any[]) => {
        setGameState('FINISHED');
        const maxLevel = Math.max(...finalResults.filter(r => r.isCorrect).map(r => r.level), 0);

        // Final score: based on max level achieved. Baseline 7 digits = 100
        const score = Math.max(0, Math.min(100, Math.round((maxLevel / 7) * 100)));
        onComplete(score, finalResults);
    };

    if (gameState === 'IDLE') {
        return (
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100">
                <div className="text-6xl mb-6">🔢</div>
                <h3 className="text-3xl font-black text-[#2E4A62] mb-4">Retención Numérica</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Memoriza la secuencia de números y escríbelos en el mismo orden.
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

    if (gameState === 'SHOWING') {
        return (
            <div className="p-12 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-[#2E4A62] text-white min-h-[400px] flex flex-col items-center justify-center">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">
                    Nivel: {level} dígitos
                </div>
                <div className="text-9xl font-black animate-pulse">
                    {currentDigitIndex !== -1 ? sequence[currentDigitIndex] : ''}
                </div>
            </div>
        );
    }

    if (gameState === 'WAITING_INPUT') {
        return (
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 min-h-[400px] flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-black text-[#2E4A62] mb-8">¿Qué números viste?</h3>
                    <input
                        type="number"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        autoFocus
                        className="w-full text-5xl text-center py-6 border-b-4 border-[#3B7A57] focus:outline-none text-[#2E4A62] font-black tracking-widest"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-12 bg-[#3B7A57] text-white py-6 text-2xl font-black rounded-2xl shadow-lg active:scale-95"
                >
                    Confirmar
                </button>
            </div>
        );
    }

    return null;
}
