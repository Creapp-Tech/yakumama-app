
export interface NutritionAnswers {
    // Patrón dietario
    greens_freq: string; // "Diario", "3-4/sem", "1-2/sem", "Raramente"
    berries_freq: string;
    nuts_freq: string;
    legumes_freq: string;
    olive_oil: boolean;
    fried_food_freq: string;
    sugary_food_freq: string;

    // Omega-3
    fish_freq: string; // "2+/sem", "1/sem", "Raramente", "Nunca"
    omega3_supp: boolean;
    vegan: boolean;

    // Vitamin B
    metformin_ibp: boolean;
    b_symptoms: boolean; // hormigueo, fatiga, niebla mental

    // Vitamin D
    sun_exposure: string; // "Alta", "Moderada", "Baja"
    d_deficiency_history: boolean;

    // Antioxidants
    tea_turmeric_intake: boolean;
    fruit_veg_daily: number; // 0-5+

    // Demand Factors
    stress_sleep_issues: boolean;
    alcohol_smoking: boolean;
    activity_level: string; // "Sedentario", "Moderado", "Activo"

    // Red Flags
    pregnancy_lactation: boolean;
    medications_interaction: boolean; // Anticoagulantes / nitratos / etc
    severe_condition: boolean; // Renal/hepatic
    mushroom_allergy: boolean; // Alergia a hongos / autoinmunidad
    severe_symptoms: boolean; // Parestesias severas, etc.

    // Preferences
    diet_type: string; // "standard", "keto", "low_carb", "vegan"
}

export interface NutritionResult {
    totalScore: number;
    level: 'Óptimo' | 'Moderado' | 'Deficiente' | 'Crítico';
    domainScores: {
        dietPattern: number;
        omega3: number;
        bVitamins: number;
        vitaminD: number;
        antioxidants: number;
        demandFactors: number;
    };
    redFlags: string[];
    recommendations: {
        stack: SupplementItem[];
        dietaryActions: string[];
    };
}

export interface SupplementItem {
    type: 'Cápsula blanda' | 'Polvo' | 'Cápsula';
    name: string;
    brand?: string;
    timing?: string;
    reason?: string;
}

const FREQ_SCORES: Record<string, number> = {
    // Diet Patterns
    'Diario': 100,
    '3-4/sem': 70,
    '1-2/sem': 40,
    'Raramente': 10,
    'Nunca': 0,

    // Fish
    '2+/sem': 100,
    '1/sem': 60,

    // Sun Exposure
    'Alta': 100,
    'Moderada': 60,
    'Baja': 20,

    // Activity
    'Sedentario': 0,
    'Moderado': 50,
    'Activo': 100,
};

export function calculateNutritionScore(answers: NutritionAnswers): NutritionResult {
    // 1. Domain Scoring (Max ~16.6 per domain to sum 100)
    // We will score each domain 0-100 first, then weigh them.
    // Weights: Diet(20), Omega3(20), B(15), D(15), Anti(15), Demand(15) = 100

    // --- Diet Pattern (20%) ---
    // Positive: greens, berries, nuts, legumes, olive_oil
    // Negative: fried, sugary
    const greens = FREQ_SCORES[answers.greens_freq] || 0;
    const berries = FREQ_SCORES[answers.berries_freq] || 0;
    const nuts = FREQ_SCORES[answers.nuts_freq] || 0;
    const legumes = FREQ_SCORES[answers.legumes_freq] || 0;
    const olive = answers.olive_oil ? 100 : 0;

    const fried = FREQ_SCORES[answers.fried_food_freq] || 0; // High freq = Bad
    const sugar = FREQ_SCORES[answers.sugary_food_freq] || 0; // High freq = Bad

    // Inverse negative scores (100 - score)
    const friedScore = 100 - fried;
    const sugarScore = 100 - sugar;

    const dietRaw = (greens + berries + nuts + legumes + olive + friedScore + sugarScore) / 7;

    // --- Omega-3 (20%) ---
    const fish = FREQ_SCORES[answers.fish_freq] || 0;
    const supp = answers.omega3_supp ? 100 : 0;
    const omegaRaw = Math.max(fish, supp); // If taking supps, score is good regardless of fish? Or average? Let's take Max for now as supps compensate.

    // --- B Vitamins (15%) ---
    // Risks: Vegan (-), Metformin (-), Symptoms (-)
    // Base 100, subtract for risks
    let bRaw = 100;
    if (answers.vegan) bRaw -= 30;
    if (answers.metformin_ibp) bRaw -= 30;
    if (answers.b_symptoms) bRaw -= 40;
    bRaw = Math.max(0, bRaw);

    // --- Vitamin D (15%) ---
    let dRaw = FREQ_SCORES[answers.sun_exposure] || 0;
    if (answers.d_deficiency_history) dRaw -= 30;
    dRaw = Math.max(0, dRaw);

    // --- Antioxidants (15%) ---
    const anti1 = answers.tea_turmeric_intake ? 100 : 0;
    // fruit_veg_daily: 0-5. 5 is good.
    const anti2 = Math.min(answers.fruit_veg_daily * 20, 100);
    const antiRaw = (anti1 + anti2) / 2;

    // --- Demand Factors (15%) ---
    // Stress/Sleep (-), Alcohol/Smoking (-), Activity (Low is bad)
    let demandRaw = 100;
    if (answers.stress_sleep_issues) demandRaw -= 40;
    if (answers.alcohol_smoking) demandRaw -= 40;

    const activityMap: Record<string, number> = { 'sedentary': 0, 'moderate': 10, 'active': 20 }; // Bonus for activity? Or penalty for sedentary.
    // Document says: "Activity low" increases requirements (bad).
    if (answers.activity_level === 'Sedentario') demandRaw -= 20;

    demandRaw = Math.max(0, demandRaw);


    // WEIGHTED SUM
    const weightedScore =
        (dietRaw * 0.20) +
        (omegaRaw * 0.20) +
        (bRaw * 0.15) +
        (dRaw * 0.15) +
        (antiRaw * 0.15) +
        (demandRaw * 0.15);

    const totalScore = Math.round(weightedScore);

    // LEVEL
    let level: NutritionResult['level'] = 'Crítico';
    if (totalScore >= 80) level = 'Óptimo';
    else if (totalScore >= 60) level = 'Moderado';
    else if (totalScore >= 40) level = 'Deficiente';

    // RED FLAGS
    const redFlags: string[] = [];
    if (answers.pregnancy_lactation) redFlags.push('Embarazo/Lactancia');
    if (answers.medications_interaction) redFlags.push('Interacción medicamentos');
    if (answers.severe_condition) redFlags.push('Condición médica severa');
    if (answers.mushroom_allergy) redFlags.push('Alergia/Autoinmunidad');
    if (answers.severe_symptoms) redFlags.push('Síntomas severos');

    // RECOMMENDATION ENGINE
    const stack: SupplementItem[] = [];
    const dietActions: string[] = [];

    // Base Stack (Everyone)
    let omegaReason = 'Base estructural';
    if (omegaRaw < 50) omegaReason = 'Corrección de déficit';

    // Omega Selection
    if (answers.vegan) {
        stack.push({ type: 'Cápsula blanda', name: 'Aceite de Algas (DHA)', brand: 'BulkSupplements', reason: omegaReason });
    } else if (level === 'Crítico' || level === 'Deficiente' || omegaRaw < 40) {
        stack.push({ type: 'Cápsula blanda', name: 'Aceite de Krill + Aceite de Pescado', brand: 'MicroIngredients', reason: omegaReason + ' (Alta potencia)' });
    } else {
        stack.push({ type: 'Cápsula blanda', name: 'Aceite de Pescado 1000mg', brand: 'BulkSupplements', reason: omegaReason });
    }

    // Vit D Selection
    if (dRaw < 60) {
        stack.push({ type: 'Cápsula blanda', name: 'Vitamina D3 + K2', brand: 'MicroIngredients', reason: 'Baja exposición/Riesgo' });
    }

    // Level specific additions
    if (level !== 'Óptimo') {
        // B Complex
        if (bRaw < 70) {
            stack.push({ type: 'Cápsula', name: 'Complejo B Metilado', brand: 'MicroIngredients', reason: 'Soporte energético/metabólico' });
        }

        // Polyphenols
        if (answers.stress_sleep_issues) {
            stack.push({ type: 'Polvo', name: 'Extracto de Té Verde (EGCG) o Curcumina', reason: 'Estrés oxidativo' });
        } else if (answers.tea_turmeric_intake === false) {
            stack.push({ type: 'Polvo', name: 'Extracto de Arándano', reason: 'Antioxidante general' });
        }
    }

    // Specific Rules from Doc
    if (answers.b_symptoms || (answers.vegan && bRaw < 50)) {
        stack.push({ type: 'Polvo', name: 'Vitamina B12 (Metilcobalamina)', brand: 'BulkSupplements', reason: 'Riesgo crítico B12' });
    }

    if (answers.diet_type === 'keto' || answers.diet_type === 'low_carb') {
        stack.push({ type: 'Polvo', name: 'MCT Oil en Polvo', reason: 'Soporte energético Keto' });
    }


    // Dietary Actions
    if (greens < 50) dietActions.push('Aumentar hojas verdes (diario)');
    if (berries < 50) dietActions.push('Incluir frutos rojos');
    if (fish < 50 && !answers.vegan) dietActions.push('Pescado graso 2x/semana');
    if (dRaw < 50) dietActions.push('Exposición solar segura 15min/día');


    return {
        totalScore,
        level,
        domainScores: {
            dietPattern: Math.round(dietRaw),
            omega3: Math.round(omegaRaw),
            bVitamins: Math.round(bRaw),
            vitaminD: Math.round(dRaw),
            antioxidants: Math.round(antiRaw),
            demandFactors: Math.round(demandRaw),
        },
        redFlags,
        recommendations: {
            stack,
            dietaryActions: dietActions.slice(0, 3) // Top 3
        }
    };
}
