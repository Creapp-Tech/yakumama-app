'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import CognitiveRadar from '@/components/dashboard/CognitiveRadar';
import Link from 'next/link';

export default function ResultsPage() {
    const params = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/evaluation/${params.id}`);
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) fetchData();
    }, [params.id]);

    if (loading) return <div className="p-8 text-center">Cargando resultados...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">No se encontraron resultados.</div>;

    const radarData = [
        { subject: 'Cognitivo (ECF)', A: data.ecfScore || 0, fullMark: 100 },
        { subject: 'Físico (EFC)', A: data.efcScore || 0, fullMark: 100 },
        { subject: 'Nutrición (NSC)', A: data.nscScore || 0, fullMark: 100 },
    ];

    const plan = data.plan;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center border-t-4 border-[#8dbf44]">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Tu Evaluación está Completa!</h1>
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <div className="text-center">
                            <div className="text-5xl font-extrabold text-[#8dbf44]">{Math.round(data.ibcyScore || 0)}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold mt-1">Índice IBCY</div>
                        </div>
                        <div className={`px-4 py-1 rounded-full text-sm font-bold ${data.ibcyLevel === 'Avanzado' ? 'bg-green-100 text-green-700' :
                                data.ibcyLevel === 'Regular' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-orange-100 text-orange-700'
                            }`}>
                            Nivel {data.ibcyLevel}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chart */}
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Tu Perfil Cognitivo</h2>
                        <CognitiveRadar data={radarData} />
                    </div>

                    {/* Metrics */}
                    <div className="space-y-4">
                        <MetricCard title="Estado Cognitivo (ECF)" score={data.ecfScore} level={data.ecfLevel} color="blue" />
                        <MetricCard title="Estado Físico (EFC)" score={data.efcScore} level={data.efcLevel} color="green" />
                        <MetricCard title="Nutrición Cerebral (NSC)" score={data.nscScore} level={data.nscLevel} color="orange" />
                    </div>
                </div>

                {/* Personalized Plan */}
                {plan && (
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-[#8dbf44] mb-6">Tu Plan Personalizado</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <PlanCard
                                icon="🏃"
                                title="Plan Físico"
                                items={[
                                    `Nivel: ${plan.physicalLevel}`,
                                    `Frecuencia: ${plan.physicalFrequency} días/sem`,
                                    `Tipo: ${plan.physicalType}`
                                ]}
                            />
                            <PlanCard
                                icon="🧠"
                                title="Plan Cognitivo"
                                items={[
                                    `Nivel: ${plan.cognitiveLevel}`,
                                    `Tareas diarias: ${plan.cognitiveTasksPerDay}`,
                                    // JSON parse ideally
                                ]}
                            />
                            <PlanCard
                                icon="🥑"
                                title="Plan Nutricional"
                                items={[
                                    `Nivel: ${plan.nutritionalLevel}`,
                                    `Snacks: ${plan.snacksPerWeek} / sem`,
                                ]}
                            />
                        </div>
                    </div>
                )}

                <div className="text-center pt-8">
                    <Link href="/dashboard" className="text-[#8dbf44] font-semibold hover:underline">
                        Volver al Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, score, level, color }: any) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
                <h3 className="font-semibold text-gray-700">{title}</h3>
                <span className="text-sm text-gray-500">{level}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{Math.round(score || 0)}</div>
        </div>
    );
}

function PlanCard({ icon, title, items }: any) {
    return (
        <div className="bg-[#f0f9f0] p-6 rounded-xl border border-[#e1f0e1]">
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
                {items.map((it: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span> {it}
                    </li>
                ))}
            </ul>
        </div>
    );
}
