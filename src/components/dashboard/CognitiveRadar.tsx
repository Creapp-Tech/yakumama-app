'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface RadarProps {
    data: {
        subject: string;
        week0: number;
        week6?: number;
        week12?: number;
        fullMark: number;
    }[];
}

export default function CognitiveRadar({ data }: RadarProps) {
    return (
        <div className="w-full h-[350px] md:h-[450px] bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#2E4A62', fontSize: 11, fontWeight: 'bold' }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Semana 0"
                        dataKey="week0"
                        stroke="#2E4A62"
                        fill="#2E4A62"
                        fillOpacity={0.4}
                    />
                    {data[0]?.week6 !== undefined && (
                        <Radar
                            name="Semana 6"
                            dataKey="week6"
                            stroke="#3B7A57"
                            fill="#3B7A57"
                            fillOpacity={0.4}
                        />
                    )}
                    {data[0]?.week12 !== undefined && (
                        <Radar
                            name="Semana 12"
                            dataKey="week12"
                            stroke="#C4A35A"
                            fill="#C4A35A"
                            fillOpacity={0.4}
                        />
                    )}
                    <Tooltip
                        contentStyle={{
                            borderRadius: '16px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            padding: '12px'
                        }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
