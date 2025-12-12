'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import CognitiveRadar from '@/components/dashboard/CognitiveRadar';
import ResultsCharts from '@/components/results/ResultsCharts';
import Link from 'next/link';
import { Download, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultsPage() {
    const params = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);

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

    const exportToPDF = async () => {
        setExporting(true);
        try {
            const element = document.getElementById('results-content');
            if (!element) return;

            // Capture with proper configuration to avoid color parsing errors
            const canvas = await html2canvas(element, {
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                ignoreElements: (element) => {
                    // Ignore elements that might cause color issues
                    return element.classList?.contains('no-export');
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

            const signatureY = imgY + (imgHeight * ratio) + 20;
            pdf.setFontSize(10);
            pdf.setTextColor(100);

            // TODO: Implementar firma digital real cuando se requiera
            pdf.text('_'.repeat(40), 20, signatureY);
            pdf.text('Firma del Participante', 20, signatureY + 5);
            pdf.text('Nombre: _____________________________', 20, signatureY + 15);
            pdf.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, signatureY + 25);

            pdf.save(`Yakumama_Resultados_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Error al exportar PDF');
        } finally {
            setExporting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Cargando resultados...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">No se encontraron resultados.</div>;

    const radarData = [
        { subject: 'Cognitivo (ECF)', A: data.ecfScore || 0, fullMark: 100 },
        { subject: 'Físico (EFC)', A: data.efcScore || 0, fullMark: 100 },
        { subject: 'Nutrición (NSC)', A: data.nscScore || 0, fullMark: 100 },
    ];

    const plan = data.plan;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9f0] to-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Export Button */}
                <div className="flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-[#8dbf44]">
                        <ArrowLeft className="w-5 h-5" />
                        Volver al Dashboard
                    </Link>
                    <button
                        onClick={exportToPDF}
                        disabled={exporting}
                        className="flex items-center gap-2 bg-[#8dbf44] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#7ca93a] transition-all shadow-lg disabled:opacity-50"
                    >
                        <Download className="w-5 h-5" />
                        {exporting ? 'Exportando...' : 'Exportar a PDF'}
                    </button>
                </div>

                <div id="results-content">

                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center border-t-4 border-[#8dbf44]">
                        <h1 className="text-4xl font-bold text-[#8dbf44] mb-2">YAKUMAMA</h1>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Tu Evaluación está Completa!</h2>
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

                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <ResultsCharts
                            ecfScore={data.ecfScore || 0}
                            efcScore={data.efcScore || 0}
                            nscScore={data.nscScore || 0}
                            ibcyScore={data.ibcyScore || 0}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Chart */}
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Tu Perfil Cognitivo (Detalle)</h2>
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
