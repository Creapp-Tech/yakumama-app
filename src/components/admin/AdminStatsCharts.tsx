import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface EvaluationWithProfile {
    id: string;
    type: 'initial' | 'progress' | 'final';
    ecf_score: number;
    efc_score: number;
    nsc_score: number;
    ibcy_score: number;
    total_score: number;
    completed_at: string;
    profiles: {
        email: string;
        full_name: string;
    } | null;
}

interface AdminStatsChartsProps {
    evaluations: EvaluationWithProfile[];
}

export default function AdminStatsCharts({ evaluations }: AdminStatsChartsProps) {
    // Calculate average scores for visualization
    const getAverageScores = () => {
        if (evaluations.length === 0) return [];

        const totals = evaluations.reduce((acc, curr) => ({
            ecf: acc.ecf + curr.ecf_score,
            efc: acc.efc + curr.efc_score,
            nsc: acc.nsc + curr.nsc_score,
            ibcy: acc.ibcy + curr.ibcy_score,
        }), { ecf: 0, efc: 0, nsc: 0, ibcy: 0 });

        const count = evaluations.length;

        return [
            { category: 'ECF', puntaje: Number((totals.ecf / count).toFixed(1)) },
            { category: 'EFC', puntaje: Number((totals.efc / count).toFixed(1)) },
            { category: 'NSC', puntaje: Number((totals.nsc / count).toFixed(1)) },
            { category: 'IBCY', puntaje: Number((totals.ibcy / count).toFixed(1)) },
        ];
    };

    const getRadarData = () => {
        if (evaluations.length === 0) return [];

        const totals = evaluations.reduce((acc, curr) => ({
            ecf: acc.ecf + curr.ecf_score,
            efc: acc.efc + curr.efc_score,
            nsc: acc.nsc + curr.nsc_score,
            ibcy: acc.ibcy + curr.ibcy_score,
        }), { ecf: 0, efc: 0, nsc: 0, ibcy: 0 });

        const count = evaluations.length;

        return [
            { subject: 'ECF', A: Number((totals.ecf / count).toFixed(1)), fullMark: 100 },
            { subject: 'EFC', A: Number((totals.efc / count).toFixed(1)), fullMark: 100 },
            { subject: 'NSC', A: Number((totals.nsc / count).toFixed(1)), fullMark: 100 },
            { subject: 'IBCY', A: Number((totals.ibcy / count).toFixed(1)), fullMark: 100 },
        ];
    };

    if (evaluations.length === 0) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Puntajes Promedio por Categoría</h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getAverageScores()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="puntaje" fill="#8dbf44" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Perfil Cognitivo Promedio</h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={getRadarData()}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis domain={[0, 100]} />
                            <Radar name="Puntaje" dataKey="A" stroke="#8dbf44" fill="#8dbf44" fillOpacity={0.6} />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
