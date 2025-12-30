
import { Question } from './questions';

export const nutritionQuestions: Question[] = [
    // SECCIÓN 1: PATRÓN DIETARIO
    {
        id: 'greens_freq',
        section: '1. Patrón Dietario',
        text: '¿Con qué frecuencia consumes hojas verdes (espinaca, kale, acelga)?',
        type: 'radio',
        options: ['Diario', '3-4/sem', '1-2/sem', 'Raramente'],
        required: true
    },
    {
        id: 'berries_freq',
        section: '1. Patrón Dietario',
        text: '¿Con qué frecuencia consumes frutos rojos (arándanos, fresas, moras)?',
        type: 'radio',
        options: ['Diario', '3-4/sem', '1-2/sem', 'Raramente'],
        required: true
    },
    {
        id: 'nuts_freq',
        section: '1. Patrón Dietario',
        text: '¿Con qué frecuencia consumes nueces o semillas?',
        type: 'radio',
        options: ['Diario', '3-4/sem', '1-2/sem', 'Raramente'],
        required: true
    },
    {
        id: 'legumes_freq',
        section: '1. Patrón Dietario',
        text: '¿Con qué frecuencia consumes legumbres (lentejas, frijoles, garbanzos)?',
        type: 'radio',
        options: ['Diario', '3-4/sem', '1-2/sem', 'Raramente'],
        required: true
    },
    {
        id: 'olive_oil',
        section: '1. Patrón Dietario',
        text: '¿Utilizas aceite de oliva como tu grasa principal?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'fried_food_freq',
        section: '1. Patrón Dietario',
        text: '¿Con qué frecuencia consumes alimentos fritos?',
        type: 'radio',
        options: ['Diario', '3-4/sem', '1-2/sem', 'Raramente'],
        required: true
    },
    {
        id: 'sugary_food_freq',
        section: '1. Patrón Dietario',
        text: '¿Con qué frecuencia consumes alimentos azucarados o refinados?',
        type: 'radio',
        options: ['Diario', '3-4/sem', '1-2/sem', 'Raramente'],
        required: true
    },

    // SECCIÓN 2: OMEGA-3
    {
        id: 'fish_freq',
        section: '2. Omega-3',
        text: '¿Con qué frecuencia consumes pescado graso (salmón, sardinas, trucha)?',
        type: 'radio',
        options: ['2+/sem', '1/sem', 'Raramente', 'Nunca'],
        required: true
    },
    {
        id: 'omega3_supp',
        section: '2. Omega-3',
        text: '¿Tomas suplementos de Omega-3 actualmente?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'vegan',
        section: '2. Omega-3',
        text: '¿Sigues una dieta vegana o vegetariana estricta?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },

    // SECCIÓN 3: VITAMINAS B
    {
        id: 'metformin_ibp',
        section: '3. Vitaminas B',
        text: '¿Tomas Metformina o Inhibidores de la bomba de protones (Omeprazol, etc.)?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'b_symptoms',
        section: '3. Vitaminas B',
        text: '¿Experimentas hormigueo, fatiga inexplicable o niebla mental frecuente?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },

    // SECCIÓN 4: VITAMINA D
    {
        id: 'sun_exposure',
        section: '4. Vitamina D',
        text: '¿Cómo consideras tu exposición solar semanal (sin protector, brazos/piernas)?',
        type: 'radio',
        options: ['Alta', 'Moderada', 'Baja'],
        required: true
    },
    {
        id: 'd_deficiency_history',
        section: '4. Vitamina D',
        text: '¿Tienes antecedentes de déficit de Vitamina D diagnosticado?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },

    // SECCIÓN 5: ANTIOXIDANTES
    {
        id: 'tea_turmeric_intake',
        section: '5. Antioxidantes',
        text: '¿Consumes regularmente té verde o cúrcuma?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'fruit_veg_daily',
        section: '5. Antioxidantes',
        text: '¿Cuántas porciones de frutas y verduras consumes al día en total?',
        type: 'number',
        placeholder: 'Ej: 3',
        required: true
    },

    // SECCIÓN 6: FACTORES DE DEMANDA
    {
        id: 'stress_sleep_issues',
        section: '6. Estilo de Vida',
        text: '¿Sufres de estrés alto o mala calidad de sueño?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'alcohol_smoking',
        section: '6. Estilo de Vida',
        text: '¿Fumas o consumes alcohol frecuentemente?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'activity_level',
        section: '6. Estilo de Vida',
        text: '¿Cuál es tu nivel de actividad física?',
        type: 'radio',
        options: ['Sedentario', 'Moderado', 'Activo'],
        required: true
    },

    // RED FLAGS Y PREFERENCIAS
    {
        id: 'pregnancy_lactation',
        section: '7. Información Médica',
        text: '¿Estás embarazada o en periodo de lactancia?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'medications_interaction',
        section: '7. Información Médica',
        text: '¿Tomas anticoagulantes, nitratos o medicamentos para la presión?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'severe_condition',
        section: '7. Información Médica',
        text: '¿Tienes alguna enfermedad renal o hepática severa?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'mushroom_allergy',
        section: '7. Información Médica',
        text: '¿Tienes alergia a hongos o alguna enfermedad autoinmune activa?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'severe_symptoms',
        section: '7. Información Médica',
        text: '¿Has experimentado parestesias severas, confusión marcada o pérdida de peso involuntaria?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'diet_type',
        section: '7. Preferencias',
        text: '¿Sigues algún tipo de alimentación específica?',
        type: 'radio',
        options: [
            { value: 'standard', label: 'Alimentación equilibrada', helper: 'Incluye todos los grupos de alimentos' },
            { value: 'keto', label: 'Cetogénica (keto)', helper: 'Muy baja en carbohidratos, alta en grasas' },
            { value: 'low_carb', label: 'Baja en carbohidratos', helper: 'Reduce harinas y azúcares' },
            { value: 'vegan', label: 'Vegana', helper: '100% basada en plantas' }
        ],
        required: true
    }
];
