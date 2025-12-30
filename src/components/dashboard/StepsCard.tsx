
import { FC } from 'react';

export const StepsCard: FC = () => {
    return (
        <div className="bg-[#0b1745] p-5 rounded-2xl mb-24 text-white shadow-lg border border-[#1e3a8a]/50">
            <h3 className="font-bold text-lg mb-1">Caminar</h3>
            <p className="text-sm text-gray-300 mb-3">1000 Pasos</p>
            <div className="w-full bg-[#1e3a8a] rounded-full h-3 overflow-hidden">
                <div className="bg-[#a3e635] h-full rounded-full" style={{ width: '25%' }}></div>
            </div>
        </div>
    );
};
