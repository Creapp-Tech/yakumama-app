'use client';

import { useState, useEffect } from 'react';

interface SymbolSubstitutionProps {
    onComplete: (score: number, rawData: any) => void;
}

const SYMBOL_KEY = [
    { num: 1, sym: '△' },
    { num: 2, sym: '○' },
    { num: 3, sym: '□' },
    { num: 4, sym: '☆' },
    { num: 5, sym: '◇' },
    { num: 6, sym: '▽' },
];

const TARGET_TRIALS = 20;

export default function SymbolSubstitution({ onComplete }: SymbolSubstitutionProps) {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FINISHED'>('IDLE');
    const [trials, setTrials] = useState<any[]>([]);
    const [currentNum, setCurrentNum] = useState(0);

    const startGame = () => {
        setGameState('PLAYING');
        setTrials([]);
        setCurrentNum(Math.floor(Math.random() * 6) + 1);
    };

    const handleSymbolClick = (num: number) => {
        const isCorrect = num === currentNum;
        const newTrial = { num: currentNum, selected: num, isCorrect, timestamp: Date.now() };
        const updated = [...trials, newTrial];
        setTrials(updated);

        if (updated.length >= TARGET_TRIALS) {
            finishGame(updated);
        } else {
            setCurrentNum(Math.floor(Math.random() * 6) + 1);
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
                <div className="text-6xl mb-6">🔢</div>
                <h3 className="text-3xl font-black text-[#2E4A62] mb-4">Sustitución de Símbolos</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Asocia cada número con su símbolo correspondiente según la clave de arriba.
                </p>
                <div className="grid grid-cols-6 gap-2 mb-8 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                    {SYMBOL_KEY.map(k => (
                        <div key={k.num} className="flex flex-col items-center">
                            <span className="text-xs font-bold text-gray-400">{k.num}</span>
                            <span className="text-2xl">{k.sym}</span>
                        </div>
                    ))}
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
                <div className="grid grid-cols-6 gap-2 bg-gray-50 p-4 rounded-xl border-b mb-8">
                    {SYMBOL_KEY.map(k => (
                        <div key={k.num} className="flex flex-col items-center">
                            <span className="text-xs font-bold text-gray-400">{k.num}</span>
                            <span className="text-2xl">{k.sym}</span>
                        </div>
                    ))}
                </div>

                <div className="flex-grow flex flex-col items-center justify-center">
                    <p className="text-gray-400 uppercase font-bold tracking-widest mb-4">Símbolo para el número:</p>
                    <div className="text-9xl font-black text-[#8dbf44] mb-8">{currentNum}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    {SYMBOL_KEY.map(k => (
                        <button
                            key={k.num}
                            onClick={() => handleSymbolClick(k.num)}
                            className="py-6 text-4xl border-2 border-gray-100 rounded-2xl hover:border-[#3B7A57] hover:bg-[#f0f9f0] transition-all bg-white shadow-sm active:scale-95"
                        >
                            {k.sym}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
