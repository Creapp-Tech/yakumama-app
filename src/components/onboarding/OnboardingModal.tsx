'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Brain, TrendingUp, AlertCircle } from 'lucide-react';

interface OnboardingModalProps {
    onClose: () => void;
}

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLater = () => {
        // Logout user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
    };

    const handleNow = () => {
        setIsLoading(true);
        // Close modal and navigate to evaluation
        onClose();
        router.push('/evaluation/initial');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#8dbf44] to-[#7ca93a] p-6 text-white relative">
                    <div className="flex items-center gap-3 mb-2">
                        <Brain className="w-10 h-10" />
                        <h2 className="text-2xl font-bold">¡Bienvenido a Yakumama Lifestyle!</h2>
                    </div>
                    <p className="text-white/90">Tu viaje hacia el bienestar cognitivo comienza aquí</p>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="mb-6">
                        <div className="flex items-start gap-3 mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-1">Test Inicial Requerido</h3>
                                <p className="text-sm text-blue-800">
                                    Para personalizar tu experiencia y crear tu plan de bienestar, necesitamos que completes
                                    una evaluación inicial. Este test nos ayudará a entender tu estado actual y diseñar
                                    el mejor programa para ti.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-[#f0f9f0] rounded-lg border border-[#8dbf44]/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-5 h-5 text-[#8dbf44]" />
                                    <h4 className="font-semibold text-gray-800">Qué evaluaremos:</h4>
                                </div>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Estado Cognitivo Funcional</li>
                                    <li>• Estado Físico para el Cerebro</li>
                                    <li>• Nutrición para Salud Cerebral</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-[#f0f9f0] rounded-lg border border-[#8dbf44]/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Brain className="w-5 h-5 text-[#8dbf44]" />
                                    <h4 className="font-semibold text-gray-800">Duración:</h4>
                                </div>
                                <p className="text-sm text-gray-700">
                                    Aproximadamente <strong>15-20 minutos</strong>
                                </p>
                                <p className="text-xs text-gray-600 mt-2">
                                    Asegúrate de tener tiempo suficiente para completarlo sin interrupciones.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleNow}
                            disabled={isLoading}
                            className="flex-1 bg-[#8dbf44] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#7ca93a] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Cargando...' : 'Realizar Ahora'}
                        </button>
                        <button
                            onClick={handleLater}
                            className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors border border-gray-300"
                        >
                            Más Tarde
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        Si eliges "Más Tarde", deberás completar el test antes de acceder a la plataforma.
                    </p>
                </div>
            </div>
        </div>
    );
}
