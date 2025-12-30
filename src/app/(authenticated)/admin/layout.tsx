'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, BarChart3, LogOut, Home } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { profile, signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/auth/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-[#8dbf44]">YAKUMAMA</h1>
                    <p className="text-sm text-gray-600">Panel de Administrador</p>
                </div>

                <nav className="mt-6">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-[#f0f9f0] hover:text-[#8dbf44] transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-[#f0f9f0] hover:text-[#8dbf44] transition-colors"
                    >
                        <Users className="w-5 h-5" />
                        <span>Usuarios</span>
                    </Link>
                    <Link
                        href="/admin/results"
                        className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-[#f0f9f0] hover:text-[#8dbf44] transition-colors"
                    >
                        <BarChart3 className="w-5 h-5" />
                        <span>Resultados</span>
                    </Link>
                </nav>

                <div className="absolute bottom-0 w-64 p-6 border-t">
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                        <p className="text-xs text-gray-500">{profile?.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
