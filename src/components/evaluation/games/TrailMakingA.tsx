'use client';

import { useState, useEffect, useMemo } from 'react';
// No UI imports needed

interface TrailMakingAProps {
    onComplete: (score: number, rawData: any) => void;
}

const NUM_POINTS = 15; // Scaled down for mobile friendliness, usually 25

export default function TrailMakingA({ onComplete }: TrailMakingAProps) {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FINISHED'>('IDLE');
    const [startTime, setStartTime] = useState(0);
    const [nextTarget, setNextTarget] = useState(1);
    const [points, setPoints] = useState<any[]>([]);
    const [clicks, setClicks] = useState<any[]>([]);

    const generatedPoints = useMemo(() => {
        const pts = [];
        const padding = 10;
        const gridSize = 80;

        for (let i = 1; i <= NUM_POINTS; i++) {
            pts.push({
                val: i,
                x: padding + Math.random() * gridSize,
                y: padding + Math.random() * gridSize,
            });
        }
        return pts;
    }, []);

    const startGame = () => {
        setPoints(generatedPoints);
        setGameState('PLAYING');
        setStartTime(Date.now());
        setNextTarget(1);
        setClicks([]);
    };

    const handlePointClick = (val: number) => {
        if (val === nextTarget) {
            const clickData = { val, timestamp: Date.now(), isCorrect: true };
            setClicks(prev => [...prev, clickData]);

            if (val === NUM_POINTS) {
                finishGame([...clicks, clickData]);
            } else {
                setNextTarget(prev => prev + 1);
            }
        } else {
            setClicks(prev => [...prev, { val, timestamp: Date.now(), isCorrect: false }]);
        }
    };

    const finishGame = (finalClicks: any[]) => {
        setGameState('FINISHED');
        const endTime = Date.now();
        const durationSeconds = (endTime - startTime) / 1000;

        // Scoring: Lower time is better. 
        // Baseline: 30 seconds for 15 points could be "100"
        const baseline = 30;
        const score = Math.max(0, Math.min(100, Math.round((baseline / durationSeconds) * 100)));

        onComplete(score, { durationSeconds, clicks: finalClicks });
    };

    if (gameState === 'IDLE') {
        return (
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100">
                <div className="text-6xl mb-6">🔢</div>
                <h3 className="text-3xl font-black text-[#2E4A62] mb-4">Trail Making Test - A</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Conecta los números en orden ascendente <span className="font-bold text-[#3B7A57]">(1, 2, 3...)</span> lo más rápido posible.
                </p>
                <button
                    onClick={startGame}
                    className="bg-[#3B7A57] hover:bg-[#2d5d42] text-white px-10 py-5 text-xl font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
                >
                    Comenzar Prueba
                </button>
            </div>
        );
    }

    if (gameState === 'PLAYING') {
        return (
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 min-h-[550px] relative overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Objetivo: <span className="text-[#3B7A57]">{nextTarget}</span> / {NUM_POINTS}
                    </div>
                </div>

                <div className="relative w-full h-[450px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 shadow-inner overflow-hidden flex-grow">
                    {points.map((p) => {
                        const isFound = p.val < nextTarget;
                        const isCurrent = p.val === nextTarget;

                        return (
                            <button
                                key={p.val}
                                onClick={() => handlePointClick(p.val)}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 font-black transition-all flex items-center justify-center text-lg
                                    ${isFound ? 'bg-[#3B7A57] text-white border-[#3B7A57] scale-75 opacity-50 cursor-default' :
                                        isCurrent ? 'bg-[#C4A35A] text-white border-[#C4A35A] scale-125 shadow-xl animate-pulse z-20' :
                                            'bg-white text-[#2E4A62] border-gray-200 hover:border-[#3B7A57] hover:text-[#3B7A57] hover:z-10 bg-white shadow-sm'}`}
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                disabled={isFound}
                            >
                                {p.val}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return null;
}
