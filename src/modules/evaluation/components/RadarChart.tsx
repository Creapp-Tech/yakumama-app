'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

interface RadarChartProps {
    scores: {
        ECF: number;
        EFC: number;
        NSC: number;
        IBCY?: number;
    };
    previousScores?: {
        ECF: number;
        EFC: number;
        NSC: number;
        IBCY?: number;
    };
}

export default function AnalysisRadarChart({ scores, previousScores }: RadarChartProps) {
    const data = [
        {
            subject: 'Estado Cognitivo',
            key: 'ECF',
            A: scores.ECF,
            B: previousScores?.ECF || 0,
            fullMark: 100,
        },
        {
            subject: 'Estado Físico',
            key: 'EFC',
            A: scores.EFC,
            B: previousScores?.EFC || 0,
            fullMark: 100,
        },
        {
            subject: 'Nutrición',
            key: 'NSC',
            A: scores.NSC,
            B: previousScores?.NSC || 0,
            fullMark: 100,
        },
    ];

    return (
        <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#4b5563', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    <Radar
                        name="Actual"
                        dataKey="A"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                    />
                    {previousScores && (
                        <Radar
                            name="Anterior"
                            dataKey="B"
                            stroke="#9ca3af"
                            fill="#9ca3af"
                            fillOpacity={0.3}
                        />
                    )}
                    <Tooltip />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
