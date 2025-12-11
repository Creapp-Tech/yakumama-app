
import { FC } from 'react';

export const DashboardHeader: FC = () => {
    const days = [
        { day: 'Vie.', date: 12, active: true },
        { day: 'Sab.', date: 13, active: false },
        { day: 'Dom.', date: 14, active: false },
        { day: 'Lun.', date: 15, active: false },
        { day: 'Mar.', date: 16, active: false },
        { day: 'Mie.', date: 17, active: false },
        { day: 'Jue.', date: 18, active: false },
        { day: 'Vie.', date: 19, active: false },
    ];

    return (
        <div className="bg-[#051c70] p-6 text-white rounded-2xl mb-6 shadow-md">
            <h2 className="text-lg font-bold mb-2">Objetivo del Plan: + Productivo</h2>
            <div className="mb-2 text-sm text-blue-200">Progreso general 10/30</div>
            <div className="w-full bg-[#1e3a8a] rounded-full h-3 mb-6 overflow-hidden">
                <div className="bg-[#a3e635] h-full rounded-full" style={{ width: '33%' }}></div>
            </div>

            <div className="flex justify-between items-center text-center">
                {days.map((d, i) => (
                    <div key={i} className={`flex flex-col items-center ${d.active ? 'text-white scale-110' : 'text-blue-300'}`}>
                        <span className="text-xs font-semibold mb-1">{d.day}</span>
                        <span className={`text-sm font-bold ${d.active ? 'text-xl' : ''}`}>{d.date}</span>
                        {d.active && <div className="mt-1 w-1.5 h-1.5 bg-[#a3e635] rounded-full"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
