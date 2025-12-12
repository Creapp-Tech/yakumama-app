// Question ID to text mapping for evaluation responses
export const questionTextMap: Record<string, string> = {
    // ECF - Estado Cognitivo Funcional
    q7: '¿Con qué frecuencia te sientes distraído/a durante el día?',
    q8: '¿Cuánto te cuesta concentrarte en una tarea?',
    q9: '¿Qué tan fácil es recordar información nueva?',
    q10: '¿Con qué frecuencia olvidas cosas importantes?',
    q11: '¿Qué tan productivo/a te sientes en tu trabajo/estudios?',
    q12: '¿Qué tan clara sientes tu mente durante el día?',
    q13: '¿Con qué frecuencia te sientes estresado/a?',
    q17: '¿Cómo calificarías la calidad de tu sueño?',
    q27: 'Prueba de memoria: Escribe las palabras que recuerdes',
    q29: '¿Qué tan rápido procesas información?',

    // EFC - Estado Físico para el Cerebro
    q18: '¿Cuántos días a la semana haces ejercicio?',
    q19: '¿Qué tipo de ejercicio realizas principalmente?',
    q20: '¿Qué tan intenso es tu ejercicio?',
    q21: '¿Qué condiciones de salud tienes?',

    // NSC - Nutrición para la Salud Cerebral
    q22: '¿Con qué frecuencia consumes pescado/omega-3?',
    q23: '¿Cuánta agua bebes al día?',
    q24: '¿Incluyes frutas y verduras en tu dieta diaria?',
    q25: '¿Con qué frecuencia consumes comida procesada?',
    q26: '¿Qué tan balanceada consideras tu alimentación?',
};

export function getQuestionText(questionId: string): string {
    return questionTextMap[questionId] || `Pregunta ${questionId}`;
}
