import * as XLSX from 'xlsx';
import { Evaluation, Profile } from './supabase';

export function exportEvaluationsToExcel(evaluations: any[]) {
    // Prepare data for Excel
    const excelData = evaluations.map(evaluation => ({
        'Usuario': evaluation.profiles?.full_name || 'N/A',
        'Email': evaluation.profiles?.email || 'N/A',
        'Tipo': evaluation.type === 'initial' ? 'Inicial' : evaluation.type === 'progress' ? 'Progreso' : 'Final',
        'Puntaje ECF': evaluation.ecf_score,
        'Puntaje EFC': evaluation.efc_score,
        'Puntaje NSC': evaluation.nsc_score,
        'Puntaje IBCY': evaluation.ibcy_score,
        'Puntaje Total': evaluation.total_score,
        'Fecha Completado': new Date(evaluation.completed_at).toLocaleDateString('es-ES'),
        'Fecha Creación': new Date(evaluation.created_at).toLocaleDateString('es-ES'),
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    ws['!cols'] = [
        { wch: 20 }, // Usuario
        { wch: 25 }, // Email
        { wch: 12 }, // Tipo
        { wch: 12 }, // ECF
        { wch: 12 }, // EFC
        { wch: 12 }, // NSC
        { wch: 12 }, // IBCY
        { wch: 12 }, // Total
        { wch: 15 }, // Fecha Completado
        { wch: 15 }, // Fecha Creación
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Evaluaciones');

    // Generate filename with current date
    const filename = `evaluaciones_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
}

export function exportUsersToExcel(users: any[]) {
    // Prepare data for Excel
    const excelData = users.map(user => ({
        'Nombre': user.full_name,
        'Email': user.email,
        'Rol': user.role === 'admin' ? 'Administrador' : 'Usuario',
        'Ejercicios Completados': user.user_progress?.[0]?.exercises_completed || 0,
        'Tests Completados': user.user_progress?.[0]?.tests_completed || 0,
        'Última Actividad': user.user_progress?.[0]?.last_activity
            ? new Date(user.user_progress[0].last_activity).toLocaleDateString('es-ES')
            : 'Nunca',
        'Racha (días)': user.user_progress?.[0]?.streak_days || 0,
        'Fecha Registro': new Date(user.created_at).toLocaleDateString('es-ES'),
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    ws['!cols'] = [
        { wch: 25 }, // Nombre
        { wch: 30 }, // Email
        { wch: 15 }, // Rol
        { wch: 20 }, // Ejercicios
        { wch: 18 }, // Tests
        { wch: 18 }, // Última Actividad
        { wch: 12 }, // Racha
        { wch: 15 }, // Fecha Registro
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    // Generate filename with current date
    const filename = `usuarios_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
}
