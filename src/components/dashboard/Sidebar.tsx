
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, ClipboardList, Dumbbell, Brain, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useAuth();

    const navItems = [
        { label: 'Inicio', icon: House, href: '/dashboard' },
        { label: 'Nutrición', icon: ClipboardList, href: '/dashboard/nutrition' },
        { label: 'Terapias', icon: Dumbbell, href: '/dashboard/therapies' },
        { label: 'Workout', icon: Brain, href: '/dashboard/workout' },
        { label: 'Configuración', icon: Settings, href: '/dashboard/settings' },
    ];

    const handleLogout = async () => {
        const toastId = toast.loading('Cerrando sesión...');

        try {
            // signOut handles redirection internally
            await signOut();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 shadow-sm">
            <div className="p-6 border-b border-gray-100">
                <Link href="/dashboard">
                    <h1 className="text-2xl font-bold text-[#8dbf44] tracking-tight hover:opacity-80 transition-opacity">YAKUMAMA</h1>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-[#f0f9f0] text-[#8dbf44] shadow-sm font-semibold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-[#8dbf44]' : 'text-gray-400 group-hover:text-gray-600'} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};
