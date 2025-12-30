'use client';

import { useRouter } from 'next/navigation';
import { Brain, Clock, CheckCircle, Coffee, Volume2, Smartphone } from 'lucide-react';

export default function TestPreparation() {
    const router = useRouter();

    const handleStartTest = () => {
        router.push('/evaluation/initial');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9f0] to-white flex items-center justify-center p-4">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#8dbf44] to-[#7ca93a] p-8 text-white text-center">
                    <Brain className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Preparación para el Test Inicial</h1>
                    <p className="text-white/90">Sigue estas recomendaciones para obtener los mejores resultados</p>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Instructions */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-[#8dbf44]" />
                            Antes de comenzar
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-[#f0f9f0] rounded-xl border border-[#8dbf44]/20">
                                <Coffee className="w-6 h-6 text-[#8dbf44] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Busca un lugar tranquilo</h3>
                                    <p className="text-sm text-gray-600">
                                        Encuentra un espacio silencioso donde puedas concentrarte sin interrupciones durante los próximos 15-20 minutos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-[#f0f9f0] rounded-xl border border-[#8dbf44]/20">
                                <Clock className="w-6 h-6 text-[#8dbf44] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Dispón de tiempo suficiente</h3>
                                    <p className="text-sm text-gray-600">
                                        Asegúrate de tener al menos 20 minutos libres. No podrás pausar el test una vez iniciado.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-[#f0f9f0] rounded-xl border border-[#8dbf44]/20">
                                <Smartphone className="w-6 h-6 text-[#8dbf44] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Silencia notificaciones</h3>
                                    <p className="text-sm text-gray-600">
                                        Pon tu teléfono en modo silencioso y cierra otras pestañas del navegador para evitar distracciones.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-[#f0f9f0] rounded-xl border border-[#8dbf44]/20">
                                <Volume2 className="w-6 h-6 text-[#8dbf44] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Responde con honestidad</h3>
                                    <p className="text-sm text-gray-600">
                                        No hay respuestas correctas o incorrectas. Responde según tu situación actual para obtener un plan personalizado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What to Expect */}
                    <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-3">¿Qué evaluaremos?</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span><strong>Estado Cognitivo Funcional (ECF):</strong> Atención, memoria, claridad mental y productividad</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span><strong>Estado Físico para el Cerebro (EFC):</strong> Actividad física y hábitos de ejercicio</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span><strong>Nutrición para Salud Cerebral (NSC):</strong> Alimentación y hábitos nutricionales</span>
                            </li>
                        </ul>
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={handleStartTest}
                        className="w-full bg-[#8dbf44] text-white py-5 px-8 rounded-xl font-bold text-xl hover:bg-[#7ca93a] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                    >
                        <Brain className="w-6 h-6" />
                        Iniciar Test Ahora
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        Al iniciar, aceptas que tus respuestas serán utilizadas para personalizar tu programa de bienestar.
                    </p>
                </div>
            </div>
        </div>
    );
}
