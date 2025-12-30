import { calculateNutritionScore, NutritionAnswers } from '../src/lib/nutrition-logic';

const mockAnswers: NutritionAnswers = {
    greens_freq: 'Diario',
    berries_freq: 'Diario',
    nuts_freq: 'Diario',
    legumes_freq: 'Diario',
    olive_oil: true,
    fried_food_freq: 'Raramente',
    sugary_food_freq: 'Raramente',

    fish_freq: '2+/sem',
    omega3_supp: true,
    vegan: false,

    metformin_ibp: false,
    b_symptoms: false,

    sun_exposure: 'Moderada',
    d_deficiency_history: false,

    tea_turmeric_intake: true,
    fruit_veg_daily: 5,

    stress_sleep_issues: false,
    alcohol_smoking: false,
    activity_level: 'Activo',

    pregnancy_lactation: false,
    medications_interaction: false,
    severe_condition: false,
    mushroom_allergy: false,
    severe_symptoms: false,

    diet_type: 'standard'
};

const result = calculateNutritionScore(mockAnswers);

console.log('--- OPTIMAL CASE ---');
console.log('Score:', result.totalScore);
console.log('Level:', result.level);
console.log('Domains:', result.domainScores);
console.log('Stack:', result.recommendations.stack.length);

if (result.level !== 'Óptimo') {
    console.error('FAILED: Expected Optimal level');
    process.exit(1);
}

// Test Deficient Case
const badAnswers: NutritionAnswers = {
    ...mockAnswers,
    greens_freq: 'Raramente',
    berries_freq: 'Raramente',
    fish_freq: 'Nunca',
    omega3_supp: false,
    sun_exposure: 'Baja',
    stress_sleep_issues: true,
    activity_level: 'Sedentario'
};

const badResult = calculateNutritionScore(badAnswers);

console.log('\n--- DEFICIENT CASE ---');
console.log('Score:', badResult.totalScore);
console.log('Level:', badResult.level);
console.log('Domains:', badResult.domainScores);

if (badResult.level === 'Óptimo') {
    console.error('FAILED: Expected lower level than Optimal');
    process.exit(1);
}

console.log('\nVERIFICATION PASSED');
