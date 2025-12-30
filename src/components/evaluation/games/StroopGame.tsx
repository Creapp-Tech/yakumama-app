'use client';

import { useState, useEffect, useCallback } from 'react';
// No UI imports needed, using Tailwind classes

interface StroopGameProps {
    onComplete: (score: number, rawData: any) => void;
}

const COLORS = [
    { name: 'Rojo', hex: '#ef4444' },
    { name: 'Azul', hex: '#3b82f6' },
    { name: 'Verde', hex: '#22c55e' },
    { name: 'Amarillo', hex: '#eab308' },
];

const GAME_DURATION = 60; // 1 minute
const TARGET_TRIALS = 40;

interface GamePair {
    text: string;
    color: string;
    colorName: string;
    isCongruent: boolean;
}

export default function StroopGame({ onComplete }: StroopGameProps) {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FINISHED'>('IDLE');
    const [currentTrial, setCurrentTrial] = useState(0);
    const [trials, setTrials] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [currentPair, setCurrentPair] = useState<GamePair>({ text: '', color: '', colorName: '', isCongruent: false });

    const generatePair = useCallback((): GamePair => {
        const textIndex = Math.floor(Math.random() * COLORS.length);
        const colorIndex = Math.floor(Math.random() * COLORS.length);

        // 50% chance of being congruent
        const isCongruent = Math.random() > 0.5;
        let finalColorIndex = colorIndex;

        if (isCongruent) {
            finalColorIndex = textIndex;
        } else if (textIndex === colorIndex) {
            // If they happen to be same but we wanted incongruent
            finalColorIndex = (colorIndex + 1) % COLORS.length;
        }

        return {
            text: COLORS[textIndex].name,
            color: COLORS[finalColorIndex].hex,
            colorName: COLORS[finalColorIndex].name,
            isCongruent: textIndex === finalColorIndex
        };
    }, []);

    const startGame = () => {
        setGameState('PLAYING');
        setTimeLeft(GAME_DURATION);
        setCurrentTrial(0);
        setTrials([]);
        setCurrentPair(generatePair());
    };

    const handleAnswer = (selectedColorName: string) => {
        const isCorrect = selectedColorName === currentPair.colorName;
        // Simple reaction time tracking
        const reactionTime = Date.now() - (trials.length > 0 ? trials[trials.length - 1].timestamp : Date.now());

        const newTrial = {
            ...currentPair,
            selected: selectedColorName,
            isCorrect,
            timestamp: Date.now()
        };

        const updatedTrials = [...trials, newTrial];
        setTrials(updatedTrials);

        if (updatedTrials.length >= TARGET_TRIALS) {
            finishGame(updatedTrials);
        } else {
            setCurrentTrial(prev => prev + 1);
            setCurrentPair(generatePair());
        }
    };

    const finishGame = (finalTrials: any[]) => {
        setGameState('FINISHED');
        const correctAnswers = finalTrials.filter(t => t.isCorrect).length;
        const accuracy = (correctAnswers / finalTrials.length) * 100;

        // Score calculation logic: accuracy combined with pace
        const score = Math.round(accuracy);
        onComplete(score, finalTrials);
    };

    useEffect(() => {
        if (gameState === 'PLAYING' && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'PLAYING') {
            finishGame(trials);
        }
    }, [gameState, timeLeft, trials]);

    if (gameState === 'IDLE') {
        return (
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100">
                <div className="text-6xl mb-6 animate-bounce">👁️</div>
                <h3 className="text-3xl font-black text-[#2E4A62] mb-4">Test de Stroop</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    Selecciona el <span className="font-bold text-[#3B7A57]">color de la tinta</span>, no la palabra escrita.
                    Sé lo más rápido y preciso posible.
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
            <div className="p-8 text-center max-w-xl mx-auto rounded-3xl shadow-2xl bg-white border border-gray-100 relative overflow-hidden min-h-[500px] flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                    <div
                        className="h-full bg-[#3B7A57] transition-all duration-1000"
                        style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
                    />
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Pregunta: {trials.length + 1} / {TARGET_TRIALS}
                    </div>
                    <div className="bg-[#f0f9f0] px-4 py-2 rounded-2xl text-[#3B7A57] font-black border border-[#3B7A57]/20 flex items-center gap-2">
                        <span className="text-lg">⏱</span> {timeLeft}s
                    </div>
                </div>

                <div className="my-12 flex items-center justify-center flex-grow">
                    <span
                        className="text-8xl font-black transition-all duration-75 select-none tracking-tighter"
                        style={{ color: currentPair.color }}
                    >
                        {currentPair.text}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                    {COLORS.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => handleAnswer(c.name)}
                            className="py-8 text-2xl font-black border-2 border-gray-100 rounded-2xl hover:border-[#3B7A57] hover:bg-[#f0f9f0] transition-all text-[#2E4A62] bg-white shadow-sm active:scale-95"
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
