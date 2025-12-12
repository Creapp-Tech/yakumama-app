'use client';

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ResultsChartsProps {
    ecfScore: number;
    efcScore: number;
    nscScore: number;
    ibcyScore: number;
}

export default function ResultsCharts({ ecfScore, efcScore, nscScore, ibcyScore }: ResultsChartsProps) {
    const radarData = [
        {
            dimension: 'ECF\n(Cognitivo)',
            score: ecfScore,
            fullMark: 100
        },
        {
            dimension: 'EFC\n(Físico)',
            score: efcScore,
            fullMark: 100
        },
        {
            dimension: 'NSC\n(Nutrición)',
            score: nscScore,
            fullMark: 100
        }
    ];

    const getLevel = (score: number) => {
        if (score < 50) return 'Principiante';
        if (score < 75) return 'Regular';
        return 'Avanzado';
    };

    const getLevelColor = (score: number) => {
        if (score < 50) return 'text-red-600';
        if (score < 75) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <div className="space-y-6">
            {/* Radar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Perfil Cognitivo Yakumama
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis
                            dataKey="dimension"
                            tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                        />
                        <Radar
                            name="Tu Puntuación"
                            dataKey="score"
                            stroke="#8dbf44"
                            fill="#8dbf44"
                            fillOpacity={0.6}
                            strokeWidth={2}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '12px'
                            }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Score Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* IBCY */}
                <div className="bg-gradient-to-br from-[#8dbf44] to-[#7ca93a] p-6 rounded-xl shadow-lg text-white">
                    <div className="text-sm font-medium opacity-90 mb-1">IBCY Global</div>
                    <div className="text-4xl font-bold mb-2">{ibcyScore.toFixed(1)}</div>
                    <div className="text-sm opacity-90">{getLevel(ibcyScore)}</div>
                </div>

                {/* ECF */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-sm font-medium text-gray-600 mb-1">Estado Cognitivo</div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{ecfScore.toFixed(1)}</div>
                    <div className={`text-sm font-semibold ${getLevelColor(ecfScore)}`}>
                        {getLevel(ecfScore)}
                    </div>
                </div>

                {/* EFC */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-sm font-medium text-gray-600 mb-1">Estado Físico</div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{efcScore.toFixed(1)}</div>
                    <div className={`text-sm font-semibold ${getLevelColor(efcScore)}`}>
                        {getLevel(efcScore)}
                    </div>
                </div>

                {/* NSC */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-sm font-medium text-gray-600 mb-1">Nutrición Cerebral</div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{nscScore.toFixed(1)}</div>
                    <div className={`text-sm font-semibold ${getLevelColor(nscScore)}`}>
                        {getLevel(nscScore)}
                    </div>
                </div>
            </div>
        </div>
    );
}
