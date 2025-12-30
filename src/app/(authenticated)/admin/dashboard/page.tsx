'use client';

import { useEffect, useState } from 'react';
import { getAdminStats } from '@/lib/supabase-queries';
import { Users, CheckCircle, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        completedPlan: 0,
        activeToday: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await getAdminStats();
            setStats(data);
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8dbf44] border-r-transparent"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Resumen general del sistema</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Users */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Usuarios Registrados</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Completed Plan */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Plan Completado</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedPlan}</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Active Today */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Activos Hoy</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeToday}</p>
                        </div>
                        <div className="p-3 bg-[#e8f5d8] rounded-lg">
                            <Activity className="w-8 h-8 text-[#8dbf44]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Accesos Rápidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href="/admin/users"
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#8dbf44] hover:bg-[#f0f9f0] transition-all"
                    >
                        <h3 className="font-semibold text-gray-900">Ver Usuarios</h3>
                        <p className="text-sm text-gray-600 mt-1">Gestiona y revisa todos los usuarios registrados</p>
                    </a>
                    <a
                        href="/admin/results"
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#8dbf44] hover:bg-[#f0f9f0] transition-all"
                    >
                        <h3 className="font-semibold text-gray-900">Ver Resultados</h3>
                        <p className="text-sm text-gray-600 mt-1">Analiza resultados y exporta datos</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
