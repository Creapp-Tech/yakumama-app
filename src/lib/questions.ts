export type QuestionType = 'text' | 'number' | 'date' | 'email' | 'radio' | 'checkbox' | 'likert' | 'textarea';

export interface Question {
    id: string;
    section: string;
    text: string;
    type: QuestionType;
    options?: (string | { value: string; label: string; helper?: string })[]; // For radio, checkbox
    likertLabels?: { min: string; max: string }; // Custom labels for scale
    required?: boolean;
    placeholder?: string;
    instructions?: string;
}

export const evaluationQuestions: Question[] = [
    // SECCIÓN B: TUS OBJETIVOS
    {
        id: 'q6',
        section: 'B',
        text: '¿Cuáles son tus objetivos principales con este programa?',
        type: 'checkbox',
        options: [
            'Recuperar energía',
            'Ser más productivo',
            'Mejorar enfoque y claridad mental',
            'Manejar mejor el estrés',
            'Elevar bienestar emocional',
            'Mejorar equilibrio hormonal / vitalidad sexual',
            'Fortalecer la inmunidad',
            'Otro'
        ],
        required: true
    },

    // SECCIÓN C: AUTOEVALUACIÓN DE BIENESTAR COGNITIVO
    {
        id: 'q7',
        section: 'C',
        text: '¿Con qué frecuencia te cuesta mantener la concentración en tareas importantes?',
        type: 'likert',
        required: true
    },
    {
        id: 'q8',
        section: 'C',
        text: '¿Con qué frecuencia sientes "mente nublada" o falta de claridad mental?',
        type: 'likert',
        required: true
    },
    {
        id: 'q9',
        section: 'C',
        text: '¿Qué tan fácil te resulta recordar información reciente (nombres, tareas, instrucciones)?',
        type: 'likert',
        likertLabels: { min: 'Muy difícil', max: 'Muy fácil' },
        required: true
    },
    {
        id: 'q10',
        section: 'C',
        text: '¿Con qué frecuencia te distraes mientras trabajas o estudias?',
        type: 'likert',
        required: true
    },
    {
        id: 'q11',
        section: 'C',
        text: '¿Qué tan productivo(a) te sientes durante el día?',
        type: 'likert',
        likertLabels: { min: 'Nada productivo', max: 'Muy productivo' },
        required: true
    },
    {
        id: 'q12',
        section: 'C',
        text: '¿Qué tan satisfecho(a) estás con tu nivel actual de atención y enfoque?',
        type: 'likert',
        likertLabels: { min: 'Muy insatisfecho', max: 'Muy satisfecho' },
        required: true
    },

    // SECCIÓN D: ESTRÉS, EMOCIONES Y SUEÑO
    {
        id: 'q13',
        section: 'D',
        text: 'En las últimas dos semanas, ¿con qué frecuencia te sentiste estresado(a)?',
        type: 'likert',
        required: true
    },
    {
        id: 'q14',
        section: 'D',
        text: '¿Qué tan bien manejas actualmente el estrés?',
        type: 'likert',
        likertLabels: { min: 'Muy mal', max: 'Muy bien' },
        required: true
    },
    {
        id: 'q15',
        section: 'D',
        text: '¿Cómo describirías tu calidad de sueño?',
        type: 'likert',
        likertLabels: { min: 'Muy mala', max: 'Excelente' },
        required: true
    },
    {
        id: 'q16',
        section: 'D',
        text: '¿Cuántas horas duermes normalmente por noche?',
        type: 'radio',
        options: ['Menos de 5 horas', '5-6 horas', '6-7 horas', '7-8 horas', 'Más de 8 horas'],
        required: true
    },
    {
        id: 'q17',
        section: 'D',
        text: '¿Despiertas sintiéndote descansado(a)?',
        type: 'likert',
        likertLabels: { min: 'Nunca', max: 'Siempre' },
        required: true
    },

    // SECCIÓN E: ESTADO FÍSICO Y ACTIVIDAD
    {
        id: 'q18',
        section: 'E',
        text: '¿Cuántos días a la semana haces actividad física?',
        type: 'radio',
        options: ['0 días', '1-2 días', '3-4 días', '5 o más días'],
        required: true
    },
    {
        id: 'q19',
        section: 'E',
        text: '¿Qué tipo de actividad realizas con más frecuencia?',
        type: 'radio',
        options: ['Caminar', 'Gimnasio (pesas/máquinas)', 'Correr', 'Ciclismo', 'Yoga/Pilates', 'Deportes (fútbol, tenis, etc.)', 'Ninguna', 'Otro'],
        required: true
    },
    {
        id: 'q20',
        section: 'E',
        text: '¿Cómo evaluarías tu nivel físico actual?',
        type: 'likert',
        likertLabels: { min: 'Muy bajo', max: 'Muy alto' },
        required: true
    },
    {
        id: 'q21',
        section: 'E',
        text: '¿Tienes alguna limitación física relevante?',
        type: 'textarea',
        placeholder: 'Describe cualquier lesión, condición o limitación física que debamos considerar',
        required: false
    },

    // SECCIÓN F: HÁBITOS DE NUTRICIÓN CEREBRAL
    {
        id: 'q22',
        section: 'F',
        text: '¿Con qué frecuencia consumes pescado (sierra, atún, macarela, sardinas)?',
        type: 'radio',
        options: ['Nunca', '1 vez al mes', '1 vez a la semana', '2-3 veces por semana', 'Más de 3 veces por semana'],
        required: true
    },
    {
        id: 'q23',
        section: 'F',
        text: '¿Con qué frecuencia consumes aguacate?',
        type: 'likert',
        likertLabels: { min: 'Nunca', max: 'Muy frecuentemente' },
        required: true
    },
    {
        id: 'q24',
        section: 'F',
        text: '¿Consumes frutas y verduras diariamente?',
        type: 'radio',
        options: ['Sí', 'No', 'A veces'],
        required: true
    },
    {
        id: 'q25',
        section: 'F',
        text: '¿Cuántas veces a la semana consumes alimentos ultraprocesados (snacks, fritos, comidas rápidas)?',
        type: 'radio',
        options: ['0 veces', '1-2 veces', '3-4 veces', '5 o más veces'],
        required: true
    },
    {
        id: 'q26',
        section: 'F',
        text: '¿Qué tan saludable consideras tu alimentación actual?',
        type: 'likert',
        likertLabels: { min: 'Muy poco saludable', max: 'Muy saludable' },
        required: true
    },

    // SECCIÓN G: PRUEBAS COGNITIVAS BÁSICAS
    {
        id: 'q27',
        section: 'G',
        text: 'Prueba rápida de memoria inmediata',
        instructions: 'Te mostraremos una lista de palabras. Léelas UNA VEZ. Luego (sin volver a mirar), escríbelas abajo.\n\nLista: Sol – Agua – Libro – Verde – Camino – Nube – Tiempo – Mano',
        type: 'textarea',
        placeholder: 'Escribe aquí las palabras que recuerdes, separadas por comas o espacios',
        required: true
    },
    {
        id: 'q28',
        section: 'G',
        text: 'Cuando trabajas en tareas fáciles, ¿qué tan rápido sientes que procesas la información?',
        type: 'likert',
        likertLabels: { min: 'Muy lento', max: 'Muy rápido' },
        required: true
    },
    {
        id: 'q29',
        section: 'G',
        text: 'Ahora evalúa tu claridad mental actual:',
        type: 'likert',
        likertLabels: { min: 'Totalmente nublada', max: 'Muy clara' },
        required: true
    },

    // SECCIÓN H: TECNOLOGÍA
    {
        id: 'q30',
        section: 'H',
        text: '¿Tienes Instagram activo?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },
    {
        id: 'q31',
        section: 'H',
        text: '¿Te sientes cómodo(a) grabando videos cortos de tus rutinas?',
        type: 'radio',
        options: ['Sí', 'No', 'Prefiero fotos'],
        required: true
    },
    {
        id: 'q32',
        section: 'H',
        text: '¿Estás dispuesto(a) a enviar tus evidencias (videos/fotos) por Instagram DM o publicaciones etiquetadas?',
        type: 'radio',
        options: ['Sí', 'No'],
        required: true
    },

    // SECCIÓN I: COMPROMISO
    {
        id: 'q33',
        section: 'I',
        text: '¿Qué tan comprometido(a) estás a realizar el programa Yakumama LyfeStyle durante 3 meses?',
        type: 'likert',
        likertLabels: { min: 'Poco comprometido', max: 'Muy comprometido' },
        required: true
    },
    {
        id: 'q34',
        section: 'I',
        text: '¿Qué te motiva a iniciar este proceso?',
        type: 'textarea',
        placeholder: 'Cuéntanos qué te llevó a querer mejorar tu bienestar cognitivo...',
        required: true
    },
];
