'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

// Simplified Initial Evaluation based on common cognitive tests
// In a real scenario, this would load questions from the backend or the PDF content
const questions = [
    { id: 'mem_1', type: 'memory', text: 'Recuerda estas 3 palabras: MANZANA, MESA, MONEDA. ¿Listo?', options: ['Sí, continuar'] },
    { id: 'att_1', type: 'attention', text: 'Resta de 7 en 7 empezando desde 100. (Ej: 93, 86...) Escribe los primeros 5 números.', inputDetails: 'textarea' },
    { id: 'exe_1', type: 'executive', text: 'En un minuto, nombra todos los animales que puedas.', inputDetails: 'textarea' },
];

export default function EvaluationForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const router = useRouter();

    const handleAnswer = (val: string) => {
        setAnswers(prev => ({ ...prev, [questions[currentStep].id]: val }));
    };

    const nextStep = async () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            // Submit
            try {
                await api.post('/evaluation', { responses: answers, type: 'INITIAL' });
                router.push('/dashboard');
            } catch (err) {
                alert('Error enviando evaluación');
            }
        }
    };

    const q = questions[currentStep];

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
            <div className="mb-6">
                <span className="text-sm font-semibold text-[#8dbf44]">Pregunta {currentStep + 1} de {questions.length}</span>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                    <div className="bg-[#8dbf44] h-2 rounded" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}></div>
                </div>
            </div>

            <h3 className="text-xl font-medium mb-6">{q.text}</h3>

            <div className="space-y-4">
                {q.options ? (
                    q.options.map((opt, idx) => (
                        <button key={idx} onClick={() => { handleAnswer(opt); nextStep(); }} className="w-full p-4 text-left border rounded hover:bg-[#f0f9f0] hover:border-[#8dbf44]">
                            {opt}
                        </button>
                    ))
                ) : (
                    <div className="space-y-4">
                        <textarea
                            onChange={(e) => handleAnswer(e.target.value)}
                            className="w-full border rounded p-3 h-32 focus:ring-2 focus:ring-[#8dbf44] focus:outline-none"
                            placeholder="Escribe tu respuesta aquí..."
                        />
                        <button onClick={nextStep} className="w-full bg-[#8dbf44] text-white py-2 rounded hover:bg-[#7ca93a]">
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
