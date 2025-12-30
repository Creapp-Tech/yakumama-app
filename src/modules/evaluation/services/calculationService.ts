import { EvaluationResponse, EvaluationScores } from '../types/evaluation.types';

// Normalization functions
export function normalizePositiveLikert(value: number): number {
    const val = Number(value) || 3;
    return (val - 1) * 25;
}

export function normalizeNegativeLikert(value: number): number {
    const val = Number(value) || 3;
    return (5 - val) * 25;
}

// Sub-factor calculations
export function calculateMemoryScore(palabras: string[]): number {
    const memoryWords = ['sol', 'agua', 'libro', 'verde', 'camino', 'nube', 'tiempo', 'mano'];
    const userWords = palabras.map(w => w.toLowerCase().trim());
    const matchedWords = memoryWords.filter(w => userWords.includes(w)).length;

    if (matchedWords >= 7) return 100;
    if (matchedWords >= 5) return 75;
    if (matchedWords >= 3) return 50;
    return 20;
}

export function calculateECF(responses: EvaluationResponse): number {
    // Q7, Q8, Q10 (Negative)
    const score7 = normalizeNegativeLikert(responses.q7_dificultad_concentracion);
    const score8 = normalizeNegativeLikert(responses.q8_mente_nublada);
    const score10 = normalizeNegativeLikert(responses.q10_distraccion);

    // Q13 (Negative - stress frequency)
    const score13 = normalizeNegativeLikert(responses.q13_frecuencia_estres);

    // Q9, Q11, Q12, Q17, Q28, Q29 (Positive)
    const score9 = normalizePositiveLikert(responses.q9_facilidad_recordar);
    const score11 = normalizePositiveLikert(responses.q11_productividad);
    const score12 = normalizePositiveLikert(responses.q12_satisfaccion_enfoque);
    const score17 = normalizePositiveLikert(responses.q17_despertar_descansado);
    const score28 = normalizePositiveLikert(responses.q28_velocidad_mental);
    const score29 = normalizePositiveLikert(responses.q29_claridad_mental);

    // Q27 Memory
    const score27 = calculateMemoryScore(responses.q27_palabras_recordadas);

    const atencion = (score7 + score8 + score10) / 3;
    const memoria = (score9 + score27) / 2;
    const claridad = (score12 + score29) / 2;
    const productividad = score11;
    const estresSueno = (score13 + score17) / 2;

    return (0.30 * atencion) + (0.20 * memoria) + (0.20 * claridad) + (0.10 * productividad) + (0.20 * estresSueno);
}

export function calculateEFC(responses: EvaluationResponse): number {
    // Q18 (Frequency)
    const q18Map: Record<string, number> = {
        '0': 0,
        '1-2': 40,
        '3-4': 70,
        '5+': 100,
        // Fallbacks just in case
        '0 días': 0,
        '1-2 días': 40,
        '3-4 días': 70,
        '5 o más días': 100
    };
    // Handle inconsistent string inputs gracefully
    const q18Key = Object.keys(q18Map).find(k => responses.q18_dias_actividad?.includes(k)) || '0';
    const score18 = q18Map[q18Key] || 0;

    // Q19 (Type) - Max score among selected types
    const q19Map: Record<string, number> = {
        'Gimnasio': 100,
        'Correr': 70,
        'Ciclismo': 70,
        'Deportes': 70,
        'Yoga': 60,
        'Pilates': 60,
        'Caminar': 50,
        'Ninguna': 0
    };

    let score19 = 0;
    if (responses.q19_tipo_actividad && Array.isArray(responses.q19_tipo_actividad)) {
        const scores = responses.q19_tipo_actividad.map(type => {
            const key = Object.keys(q19Map).find(k => type.includes(k));
            return key ? q19Map[key] : 50;
        });
        score19 = Math.max(...scores, 0);
    } else {
        score19 = 0;
    }

    const score20 = normalizePositiveLikert(responses.q20_nivel_fisico);
    const score21 = (responses.q21_limitaciones && responses.q21_limitaciones.trim().length > 0) ? -20 : 0;

    let efcScore = (0.35 * score18) + (0.25 * score19) + (0.30 * score20) + score21;
    return Math.max(0, Math.min(100, efcScore));
}

export function calculateNSC(responses: EvaluationResponse): number {
    // Q22 (Fish)
    const q22Map: Record<string, number> = {
        'nunca': 0,
        '1_mes': 25,
        '1_semana': 50,
        '2-3_semana': 80,
        '>3_semana': 100,
        // Robust matching
        'Nunca': 0,
        '1 vez al mes': 25,
        '1 vez a la semana': 50,
        '2-3 veces por semana': 80,
        'Más de 3 veces por semana': 100
    };
    // Simplified matching
    const score22 = Object.values(q22Map).find((_, i) => Object.keys(q22Map)[i] === responses.q22_frecuencia_pescado) ??
        (responses.q22_frecuencia_pescado.includes('Más') ? 100 :
            responses.q22_frecuencia_pescado.includes('Nunca') ? 0 : 50); // Fallback

    const score23 = normalizePositiveLikert(responses.q23_frecuencia_aguacate);

    // Q24 (Fruit/Veg)
    const q24Map: Record<string, number> = {
        'si': 100,
        'a_veces': 60,
        'no': 0,
        'Sí': 100,
        'A veces': 60,
        'No': 0
    };
    const score24 = q24Map[responses.q24_frutas_verduras] || 0;

    // Q25 (Ultra-processed)
    const q25Map: Record<string, number> = {
        '0': 100,
        '1-2': 70,
        '3-4': 40,
        '5+': 0
    };
    const q25Key = Object.keys(q25Map).find(k => responses.q25_ultraprocesados?.includes(k)) || '5+';
    const score25 = q25Map[q25Key] || 0;

    const score26 = normalizePositiveLikert(responses.q26_alimentacion_saludable);

    return (0.25 * score22) + (0.25 * score24) + (0.25 * score25) + (0.15 * score23) + (0.10 * score26);
}

export function calculateIBCY(ECF: number, EFC: number, NSC: number): number {
    return (0.50 * ECF) + (0.25 * EFC) + (0.25 * NSC);
}

export function clasificarNivel(score: number): 'Principiante' | 'Regular' | 'Avanzado' {
    if (score < 50) return 'Principiante';
    if (score < 75) return 'Regular';
    return 'Avanzado';
}

export function calculateAllScores(responses: EvaluationResponse): EvaluationScores {
    const ECF = calculateECF(responses);
    const EFC = calculateEFC(responses);
    const NSC = calculateNSC(responses);
    const IBCY = calculateIBCY(ECF, EFC, NSC);

    return {
        ECF: Math.round(ECF),
        EFC: Math.round(EFC),
        NSC: Math.round(NSC),
        IBCY: Math.round(IBCY),
        Nivel_ECF: clasificarNivel(ECF),
        Nivel_EFC: clasificarNivel(EFC),
        Nivel_NSC: clasificarNivel(NSC)
    };
}
