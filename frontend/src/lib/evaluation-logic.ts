
/**
 * YAKUMAMA EVALUATION LOGIC
 * Based on yakumama_form_spec.md
 */

export interface RawAnswers {
    [key: string]: any;
}

export interface EvaluationResults {
    ecfScore: number;
    efcScore: number;
    nscScore: number;
    ibcyScore: number;
    levels: {
        ecf: string;
        efc: string;
        nsc: string;
        ibcy: string;
    };
    plan: {
        physicalLevel: string;
        physicalFrequency: number;
        physicalType: string;
        cognitiveLevel: string;
        cognitiveTasksPerDay: number;
        cognitiveComponents: string[];
        nutritionalLevel: string;
        snacksPerWeek: number;
        nutritionalEnfocus: string[];
    };
}

const getLevel = (score: number): string => {
    if (score < 50) return 'Principiante';
    if (score < 75) return 'Regular';
    return 'Avanzado';
};

const normalizeLikert = (response: number, positive: boolean): number => {
    const val = Number(response) || 3; // Default to neutral
    if (positive) {
        return (val - 1) * 25;
    } else {
        return (5 - val) * 25;
    }
};

export function calculateEvaluation(answers: RawAnswers, age: number = 30): EvaluationResults {
    // --- 1. ECF (Estado Cognitivo Funcional) ---
    // Q7, Q8, Q10 (Negative Likert)
    const score7 = normalizeLikert(answers.q7, false);
    const score8 = normalizeLikert(answers.q8, false);
    const score10 = normalizeLikert(answers.q10, false);
    const score13 = normalizeLikert(answers.q13, false);

    // Q9, Q11, Q12, Q17, Q28, Q29 (Positive Likert)
    const score9 = normalizeLikert(answers.q9, true);
    const score11 = normalizeLikert(answers.q11, true);
    const score12 = normalizeLikert(answers.q12, true);
    const score17 = normalizeLikert(answers.q17, true);
    const score28 = normalizeLikert(answers.q28, true);
    const score29 = normalizeLikert(answers.q29, true);

    // Q27 (Memory Test)
    const memoryWords = ['sol', 'agua', 'libro', 'verde', 'camino', 'nube', 'tiempo', 'mano'];
    const userWords = String(answers.q27 || '').toLowerCase().split(/[\s,]+/).filter(w => w.length > 0);
    const matchedWords = memoryWords.filter(w => userWords.includes(w)).length;

    let score27 = 20;
    if (matchedWords >= 7) score27 = 100;
    else if (matchedWords >= 5) score27 = 75;
    else if (matchedWords >= 3) score27 = 50;

    const atencion = (score7 + score8 + score10) / 3;
    const memoria = (score9 + score27) / 2;
    const claridad = (score12 + score29) / 2;
    const productividad = score11;
    const estresSueno = (score13 + score17) / 2;

    const ecfScore = (0.30 * atencion) + (0.20 * memoria) + (0.20 * claridad) + (0.10 * productividad) + (0.20 * estresSueno);

    // --- 2. EFC (Estado Físico para el Cerebro) ---
    // Q18 (Frequency)
    const q18Map: Record<string, number> = {
        '0 días': 0,
        '1-2 días': 40,
        '3-4 días': 70,
        '5 o más días': 100
    };
    const score18 = q18Map[answers.q18] || 0;

    // Q19 (Type)
    const q19Map: Record<string, number> = {
        'Gimnasio (pesas/máquinas)': 100,
        'Correr': 70,
        'Ciclismo': 70,
        'Deportes (fútbol, tenis, etc.)': 70,
        'Yoga/Pilates': 60,
        'Caminar': 50,
        'Ninguna': 0
    };
    const score19 = q19Map[answers.q19] || 50;

    const score20 = normalizeLikert(answers.q20, true);
    const score21 = (answers.q21 && String(answers.q21).trim().length > 0) ? -20 : 0;

    let efcScore = (0.35 * score18) + (0.25 * score19) + (0.30 * score20) + score21;
    efcScore = Math.max(0, Math.min(100, efcScore));

    // --- 3. NSC (Nutrición para la Salud Cerebral) ---
    // Q22 (Fish)
    const q22Map: Record<string, number> = {
        'Nunca': 0,
        '1 vez al mes': 25,
        '1 vez a la semana': 50,
        '2-3 veces por semana': 80,
        'Más de 3 veces por semana': 100
    };
    const score22 = q22Map[answers.q22] || 0;

    const score23 = normalizeLikert(answers.q23, true);

    // Q24 (Fruit/Veg)
    const q24Map: Record<string, number> = {
        'Sí': 100,
        'A veces': 60,
        'No': 0
    };
    const score24 = q24Map[answers.q24] || 0;

    // Q25 (Ultra-processed)
    const q25Map: Record<string, number> = {
        '0 veces': 100,
        '1-2 veces': 70,
        '3-4 veces': 40,
        '5 o más veces': 0
    };
    const score25 = q25Map[answers.q25] || 0;

    const score26 = normalizeLikert(answers.q26, true);

    const nscScore = (0.25 * score22) + (0.25 * score24) + (0.25 * score25) + (0.15 * score23) + (0.10 * score26);

    // --- 4. IBCY (Global) ---
    const ibcyScore = (0.50 * ecfScore) + (0.25 * efcScore) + (0.25 * nscScore);

    // --- 5. Levels and Plans ---
    const result: EvaluationResults = {
        ecfScore,
        efcScore,
        nscScore,
        ibcyScore,
        levels: {
            ecf: getLevel(ecfScore),
            efc: getLevel(efcScore),
            nsc: getLevel(nscScore),
            ibcy: getLevel(ibcyScore)
        },
        plan: {
            physicalLevel: '',
            physicalFrequency: 0,
            physicalType: '',
            cognitiveLevel: '',
            cognitiveTasksPerDay: 0,
            cognitiveComponents: [],
            nutritionalLevel: '',
            snacksPerWeek: 0,
            nutritionalEnfocus: []
        }
    };

    // Plan Físico
    if (efcScore < 50) {
        result.plan.physicalLevel = "Principiante";
        result.plan.physicalFrequency = 3;
        result.plan.physicalType = "Caminatas + calistenia suave";
    } else if (efcScore < 75) {
        result.plan.physicalLevel = "Intermedio";
        result.plan.physicalFrequency = 4;
        result.plan.physicalType = "Cardio moderado + fuerza ligera";
    } else {
        result.plan.physicalLevel = "Avanzado";
        result.plan.physicalFrequency = 5;
        result.plan.physicalType = "Cardio + fuerza/HIIT adaptado";
    }

    // Plan Cognitivo
    if (ecfScore < 50) {
        result.plan.cognitiveLevel = "Intensivo";
        result.plan.cognitiveTasksPerDay = 2;
        result.plan.cognitiveComponents = ["Lectura guiada", "Ejercicios de memoria", "Meditación corta diaria"];
    } else if (ecfScore < 75) {
        result.plan.cognitiveLevel = "Moderado";
        result.plan.cognitiveTasksPerDay = 1;
        result.plan.cognitiveComponents = ["Ejercicios de enfoque", "Meditación 3x semana"];
    } else {
        result.plan.cognitiveLevel = "Mantenimiento";
        result.plan.cognitiveTasksPerDay = 1;
        result.plan.cognitiveComponents = ["Retos cognitivos 3x semana"];
    }

    // Plan Nutricional
    if (nscScore < 50) {
        result.plan.nutritionalLevel = "Reestructuración";
        result.plan.snacksPerWeek = 7;
        result.plan.nutritionalEnfocus = ["Pescado", "Aguacate", "Frutas", "Eliminar ultraprocesados"];
    } else if (nscScore < 75) {
        result.plan.nutritionalLevel = "Optimización";
        result.plan.snacksPerWeek = 4;
        result.plan.nutritionalEnfocus = ["Añadir omega-3", "Reducir fritos"];
    } else {
        result.plan.nutritionalLevel = "Mantenimiento";
        result.plan.snacksPerWeek = 2;
        result.plan.nutritionalEnfocus = ["Mantener patrones actuales"];
    }

    // AJUSTES POR OBJETIVOS
    const objectives = (answers.q6 as string[]) || [];
    if (objectives.includes("Mejorar enfoque y claridad mental")) {
        result.plan.cognitiveTasksPerDay += 1;
        result.plan.cognitiveComponents.push("Ejercicios extra de atención");
    }
    if (objectives.includes("Manejar mejor el estrés")) {
        result.plan.cognitiveComponents.push("Meditación/respiración guiada diaria");
    }
    if (objectives.includes("Recuperar energía") || objectives.includes("Ser más productivo")) {
        result.plan.physicalFrequency = Math.min(5, result.plan.physicalFrequency + 1);
        result.plan.cognitiveComponents.push("Bloques de trabajo profundo (deep work) 3x semana");
    }
    if (objectives.includes("Fortalecer la inmunidad")) {
        result.plan.nutritionalEnfocus.push("Frutas ricas en vitamina C");
    }

    return result;
}
