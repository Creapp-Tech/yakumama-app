
'use client';

import { FC, useEffect, useState } from 'react';

export const DesktopHeader: FC = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsed = JSON.parse(user);
                setUserName(parsed.name || 'Usuario');
            } catch (e) {
                setUserName('Usuario');
            }
        }
    }, []);

    return (
        <header className="bg-white border-b border-gray-200 h-16 hidden md:flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    Bienvenido, <span className="text-[#8dbf44]">{userName}</span>
                </h2>
                <p className="text-xs text-gray-500">Panel de Control</p>
            </div>

            <div className="flex items-center gap-4">
                {/* Place for extra desktop header items like notifications or profile avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[#8dbf44] font-bold">
                    {userName.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
};
