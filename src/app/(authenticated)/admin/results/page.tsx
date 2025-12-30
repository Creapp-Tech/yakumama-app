'use client';

import { useEffect, useState } from 'react';
import { getEvaluationsWithUserInfo } from '@/lib/supabase-queries';
import { exportEvaluationsToExcel } from '@/lib/excel-export';
import { Filter } from 'lucide-react';
import AdminResultsTable from '@/components/admin/AdminResultsTable';
import AdminStatsCharts from '@/components/admin/AdminStatsCharts';

export default function AdminResultsPage() {
    const [evaluations, setEvaluations] = useState<any[]>([]);
    const [filteredEvaluations, setFilteredEvaluations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<string>('all');

    useEffect(() => {
        loadEvaluations();
    }, []);

    useEffect(() => {
        if (filterType === 'all') {
            setFilteredEvaluations(evaluations);
        } else {
            setFilteredEvaluations(evaluations.filter(e => e.type === filterType));
        }
    }, [filterType, evaluations]);

    const loadEvaluations = async () => {
        try {
            const data = await getEvaluationsWithUserInfo();
            setEvaluations(data);
            setFilteredEvaluations(data);
        } catch (error) {
            console.error('Error loading evaluations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        exportEvaluationsToExcel(filteredEvaluations);
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
                <h1 className="text-3xl font-bold text-gray-900">Resultados</h1>
                <p className="text-gray-600 mt-2">Análisis estadístico y listado detallado de evaluaciones</p>
            </div>

            {/* Filter */}
            <div className="mb-6 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filtrar por tipo:</span>
                </div>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:outline-none text-sm"
                >
                    <option value="all">Todas las evaluaciones</option>
                    <option value="initial">Evaluación Inicial</option>
                    <option value="progress">Evaluación de Progreso</option>
                    <option value="final">Evaluación Final</option>
                </select>
            </div>

            {/* Charts Component */}
            <AdminStatsCharts evaluations={filteredEvaluations} />

            {/* Table Component */}
            <AdminResultsTable
                evaluations={filteredEvaluations}
                onExport={handleExport}
            />
        </div>
    );
}
