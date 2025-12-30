
'use client';

import { House, ClipboardList, Dumbbell, Brain, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav = () => {
    const pathname = usePathname();

    // Using icons as requested/observed: 
    // Terapias -> Dumbbell
    // Workout -> Brain (unusual but per screenshot interpretation)
    // Actually, let's stick to standard logic if the user description wasn't explicit on Mapping, 
    // BUT the user said "Esos son los siguientes formularios... Rutina Cognitiva... Entrenamiento fisico".
    // And screenshot has labels "Rutina Cognitiva" (Brain image) and "Entrenamiento Fisico" (Torso image).
    // The Bottom Nav labels are INICIO, DIETA, TERAPIAS, WORKOUT, SETTING.
    // I will map:
    // INICIO -> /dashboard
    // DIETA -> /dashboard/diet
    // TERAPIAS -> /dashboard/therapies
    // WORKOUT -> /dashboard/workout
    // SETTING -> /dashboard/settings

    const navItems = [
        { label: 'INICIO', icon: House, href: '/dashboard' },
        { label: 'NUTRICIÓN', icon: ClipboardList, href: '/dashboard/nutrition' },
        { label: 'TERAPIAS', icon: Dumbbell, href: '/dashboard/therapies' },
        { label: 'WORKOUT', icon: Brain, href: '/dashboard/workout' },
        { label: 'SETTING', icon: Settings, href: '/dashboard/settings' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#8b5cf6] h-16 flex items-center justify-around rounded-t-2xl shadow-[0_-5px_15px_rgba(0,0,0,0.2)] z-50 px-2">
            {navItems.map((item) => {
                // Check if active (simple startsWith for sub-routes or exact match)
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

                return (
                    <Link key={item.label} href={item.href} className="flex flex-col items-center justify-center w-full relative">
                        <div className={`transition-all duration-300 flex items-center justify-center ${isActive ? 'transform -translate-y-5' : ''}`}>
                            <div className={`${isActive ? 'bg-white text-[#8b5cf6] p-3 rounded-full shadow-lg scale-125' : 'text-white'}`}>
                                <item.icon size={isActive ? 24 : 22} strokeWidth={2.5} />
                            </div>
                        </div>
                        <span className={`text-[9px] font-bold text-white uppercase mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100 absolute -bottom-2' : 'opacity-80'}`}>
                            {item.label}
                        </span>
                    </Link>
                )
            })}
        </div>
    );
}
