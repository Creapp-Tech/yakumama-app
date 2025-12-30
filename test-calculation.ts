import { calculateAllScores } from './src/modules/evaluation/services/calculationService.ts';
import { EvaluationResponse } from './src/modules/evaluation/types/evaluation.types.ts';

const mockResponse: EvaluationResponse = {
    nombre: 'Test User',
    edad: 30,
    ciudad: 'Lima',
    ocupacion: 'Engineer',
    email: 'test@example.com',
    objetivos: [],

    // ECF Inputs (Negative Likert: 1=Good, 5=Bad => Normalized: 1->100, 5->0)
    q7_dificultad_concentracion: 1, // 100
    q8_mente_nublada: 1,           // 100
    q9_facilidad_recordar: 5,      // 100 (Positive: 5->100)
    q10_distraccion: 1,            // 100
    q11_productividad: 5,          // 100
    q12_satisfaccion_enfoque: 5,   // 100
    q13_frecuencia_estres: 1,      // 100
    q14_manejo_estres: 5,
    q15_calidad_sueno: 5,
    q16_horas_sueno: '7-8',
    q17_despertar_descansado: 5,   // 100

    // EFC Inputs
    q18_dias_actividad: '5+',      // 100
    q19_tipo_actividad: ['Gimnasio'], // 100
    q20_nivel_fisico: 5,           // 100
    q21_limitaciones: '',

    // NSC Inputs
    q22_frecuencia_pescado: 'Más de 3 veces por semana', // 100
    q23_frecuencia_aguacate: 5,    // 100
    q24_frutas_verduras: 'Sí',     // 100
    q25_ultraprocesados: '0',      // 100
    q26_alimentacion_saludable: 5, // 100

    // Memory
    q27_palabras_recordadas: ['sol', 'agua', 'libro', 'verde', 'camino', 'nube', 'tiempo', 'mano'], // 8 words -> 100
    q28_velocidad_mental: 5,       // 100
    q29_claridad_mental: 5,        // 100

    fecha_evaluacion: new Date().toISOString(),
    tipo_evaluacion: 'inicial'
};

const scores = calculateAllScores(mockResponse);

console.log('--- Evaluation Calculation Test ---');
console.log('Expected ECF: ~100. Actual:', scores.ECF);
console.log('Expected EFC: ~100. Actual:', scores.EFC);
console.log('Expected NSC: ~100. Actual:', scores.NSC);
console.log('Expected IBCY: ~100. Actual:', scores.IBCY);
console.log('Levels:', scores.Nivel_ECF, scores.Nivel_EFC, scores.Nivel_NSC);

if (scores.ECF > 90 && scores.EFC > 90 && scores.NSC > 90) {
    console.log('✅ Test PASSED: Perfect scores calculated correctly.');
} else {
    console.error('❌ Test FAILED: Scores are lower than expected.');
}
