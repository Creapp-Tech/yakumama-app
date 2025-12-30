
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CognitiveRadar from '@/components/dashboard/CognitiveRadar';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { NutritionResult, SupplementItem } from '@/lib/nutrition-logic';

export default function NutritionResultsPage() {
    const [result, setResult] = useState<NutritionResult | null>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('lastNutritionResult');
        if (stored) {
            try {
                setResult(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse result', e);
            }
        } else {
            // Redirect back if no result found
            // router.push('/nutrition');
        }
    }, [router]);

    if (!result) {
        return <div className="p-12 text-center text-gray-500">Cargando resultados...</div>;
    }

    const radarData = [
        { subject: 'Dieta', week0: result.domainScores.dietPattern, fullMark: 100 },
        { subject: 'Omega-3', week0: result.domainScores.omega3, fullMark: 100 },
        { subject: 'Vit. B', week0: result.domainScores.bVitamins, fullMark: 100 },
        { subject: 'Vit. D', week0: result.domainScores.vitaminD, fullMark: 100 },
        { subject: 'Antioxidantes', week0: result.domainScores.antioxidants, fullMark: 100 },
        { subject: 'Estilo de Vida', week0: result.domainScores.demandFactors, fullMark: 100 },
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Óptimo': return 'text-green-600 bg-green-100';
            case 'Moderado': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-red-600 bg-red-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link href="/dashboard/nutrition" className="flex items-center text-gray-600 hover:text-[#8dbf44]">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Nueva Evaluación
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Resultados Nutricionales</h1>
                </div>

                {/* Score Summary */}
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center border-t-4 border-[#8dbf44]">
                    <h2 className="text-gray-500 uppercase tracking-wide font-semibold text-sm mb-2">Tu Nivel de Nutrición Cerebral</h2>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-6xl font-black text-[#8dbf44] mb-2">{result.totalScore}</div>
                        <div className={`px-6 py-2 rounded-full font-bold text-lg ${getLevelColor(result.level)}`}>
                            {result.level}
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Radar Chart */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Balance por Dominios</h3>
                        <CognitiveRadar data={radarData} />
                    </div>

                    {/* Deficiencies / Key Insights */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">Análisis Clave</h3>

                        {result.redFlags.length > 0 && (
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                <div className="flex items-center text-red-700 font-bold mb-2">
                                    <AlertTriangle className="w-5 h-5 mr-2" /> Atención Requerida
                                </div>
                                <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                                    {result.redFlags.map(flag => <li key={flag}>{flag} - Consultar especialista</li>)}
                                </ul>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-700">Tus pilares más fuertes:</h4>
                            <div className="flex gap-2 flex-wrap">
                                {Object.entries(result.domainScores)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 2)
                                    .map(([domain, score]) => (
                                        <div key={domain} className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium border border-green-200">
                                            {formatDomain(domain)} ({score})
                                        </div>
                                    ))}
                            </div>

                            <h4 className="font-semibold text-gray-700 mt-4">Áreas de oportunidad:</h4>
                            <div className="flex gap-2 flex-wrap">
                                {Object.entries(result.domainScores)
                                    .sort(([, a], [, b]) => a - b)
                                    .slice(0, 3)
                                    .filter(([, score]) => score < 80)
                                    .map(([domain, score]) => (
                                        <div key={domain} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium border border-orange-200">
                                            {formatDomain(domain)} ({score})
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Supplement Plan */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold text-[#8dbf44] mb-6">Tu Stack de Suplementación (3 Meses)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {result.recommendations.stack.map((item, idx) => (
                            <SupplementCard key={idx} item={item} />
                        ))}
                    </div>
                </div>

                {/* Dietary Actions */}
                <div className="bg-[#f0f9f0] rounded-2xl p-8 border border-[#d6eod6]">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Acciones Dietarias Inmediatas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {result.recommendations.dietaryActions.map((action, idx) => (
                            <div key={idx} className="flex items-start bg-white p-4 rounded-xl shadow-sm">
                                <CheckCircle className="w-6 h-6 text-[#8dbf44] mr-3 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{action}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function SupplementCard({ item }: { item: SupplementItem }) {
    return (
        <div className="border border-gray-200 rounded-xl p-5 hover:border-[#8dbf44] transition-all bg-white shadow-sm hover:shadow-md">
            <div className="text-xs font-bold text-[#8dbf44] uppercase tracking-wider mb-2">{item.type}</div>
            <h4 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h4>
            {item.brand && <div className="text-sm text-gray-500 mb-3">Sugerido: {item.brand}</div>}
            <div className="text-sm bg-gray-50 p-2 rounded text-gray-600">
                <strong>Por qué:</strong> {item.reason}
            </div>
            {item.timing && (
                <div className="mt-3 text-xs text-gray-400 font-medium flex items-center">
                    ⏱ {item.timing}
                </div>
            )}
        </div>
    );
}

function formatDomain(key: string) {
    const map: Record<string, string> = {
        dietPattern: 'Dieta',
        omega3: 'Omega-3',
        bVitamins: 'Vitaminas B',
        vitaminD: 'Vitamina D',
        antioxidants: 'Antioxidantes',
        demandFactors: 'Estilo de Vida'
    };
    return map[key] || key;
}
