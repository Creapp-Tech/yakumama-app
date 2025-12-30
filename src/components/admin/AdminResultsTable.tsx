import { Download } from 'lucide-react';

interface EvaluationWithProfile {
    id: string;
    type: 'initial' | 'progress' | 'final';
    ecf_score: number;
    efc_score: number;
    nsc_score: number;
    ibcy_score: number;
    total_score: number;
    completed_at: string;
    profiles: {
        email: string;
        full_name: string;
    } | null;
}

interface AdminResultsTableProps {
    evaluations: EvaluationWithProfile[];
    onExport: () => void;
}

export default function AdminResultsTable({ evaluations, onExport }: AdminResultsTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES');
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Listado de Evaluaciones</h2>
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8dbf44] text-white rounded-lg hover:bg-[#7ca93a] transition-colors"
                >
                    <Download className="w-5 h-5" />
                    Exportar a Excel
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ECF
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                EFC
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                NSC
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                IBCY
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {evaluations.map((evaluation) => (
                            <tr key={evaluation.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {evaluation.profiles?.full_name || 'N/A'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {evaluation.profiles?.email || 'N/A'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${evaluation.type === 'initial'
                                        ? 'bg-blue-100 text-blue-800'
                                        : evaluation.type === 'progress'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                        {evaluation.type === 'initial' ? 'Inicial' :
                                            evaluation.type === 'progress' ? 'Progreso' : 'Final'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {evaluation.ecf_score.toFixed(1)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {evaluation.efc_score.toFixed(1)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {evaluation.nsc_score.toFixed(1)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {evaluation.ibcy_score.toFixed(1)}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                    {evaluation.total_score.toFixed(1)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {formatDate(evaluation.completed_at)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {evaluations.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No se encontraron evaluaciones</p>
                </div>
            )}
        </div>
    );
}
