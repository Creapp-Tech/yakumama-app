export interface EvaluationResponse {
    // Sección A - Info general
    nombre: string
    edad: number
    ciudad: string
    ocupacion: string
    email: string

    // Sección B - Objetivos
    objetivos: string[]

    // Sección C - Bienestar cognitivo (Q7-Q12)
    q7_dificultad_concentracion: number    // 1-5
    q8_mente_nublada: number               // 1-5
    q9_facilidad_recordar: number          // 1-5
    q10_distraccion: number                // 1-5
    q11_productividad: number              // 1-5
    q12_satisfaccion_enfoque: number       // 1-5

    // Sección D - Estrés y sueño (Q13-Q17)
    q13_frecuencia_estres: number          // 1-5
    q14_manejo_estres: number              // 1-5
    q15_calidad_sueno: number              // 1-5
    q16_horas_sueno: string                // "<5" | "5-6" | "6-7" | "7-8" | ">8"
    q17_despertar_descansado: number       // 1-5

    // Sección E - Actividad física (Q18-Q21)
    q18_dias_actividad: string             // "0" | "1-2" | "3-4" | "5+"
    q19_tipo_actividad: string[]           // array de tipos
    q20_nivel_fisico: number               // 1-5
    q21_limitaciones: string               // texto libre

    // Sección F - Nutrición (Q22-Q26)
    q22_frecuencia_pescado: string         // "nunca" | "1_mes" | etc
    q23_frecuencia_aguacate: number        // 1-5
    q24_frutas_verduras: string            // "si" | "no" | "a_veces"
    q25_ultraprocesados: string            // "0" | "1-2" | "3-4" | "5+"
    q26_alimentacion_saludable: number     // 1-5

    // Sección G - Pruebas cognitivas (Q27-Q29)
    q27_palabras_recordadas: string[]      // array de palabras
    q28_velocidad_mental: number           // 1-5
    q29_claridad_mental: number            // 1-5

    // Metadata
    fecha_evaluacion: string
    tipo_evaluacion: 'inicial' | 'intermedia' | 'final'
}

export interface EvaluationScores {
    ECF: number           // 0-100
    EFC: number           // 0-100
    NSC: number           // 0-100
    IBCY: number          // 0-100
    Nivel_ECF: 'Principiante' | 'Regular' | 'Avanzado'
    Nivel_EFC: 'Principiante' | 'Regular' | 'Avanzado'
    Nivel_NSC: 'Principiante' | 'Regular' | 'Avanzado'
}

export interface PersonalizedPlan {
    Plan_Fisico: {
        nivel: string
        frecuencia: string
        tipo: string
    }
    Plan_Cognitivo: {
        nivel: string
        tareas_dia: number
        componentes: string[]
    }
    Plan_Nutricional: {
        nivel: string
        snacks_por_semana: number
        enfoque: string[]
    }
    Mensajes_Clave: string[]
}
