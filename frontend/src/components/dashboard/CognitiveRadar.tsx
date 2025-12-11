'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarProps {
    data: {
        subject: string;
        A: number;
        fullMark: number;
    }[];
}

export default function CognitiveRadar({ data }: RadarProps) {
    return (
        <div className="w-full h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Bienestar"
                        dataKey="A"
                        stroke="#8dbf44"
                        fill="#8dbf44"
                        fillOpacity={0.6}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#8dbf44', fontWeight: 'bold' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
