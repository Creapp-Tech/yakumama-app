# ESPECIFICACIÓN TÉCNICA - FORMULARIO DE EVALUACIÓN YAKUMAMA LIFESTYLE

## CONTEXTO PARA EL AGENTE

Debes desarrollar un formulario de evaluación inicial para el programa "Yakumama Lifestyle" que evalúa el bienestar cognitivo de los usuarios. Este formulario tiene una duración aproximada de 7-10 minutos y recopila información demográfica, clínica, de hábitos y objetivos del usuario.

**IMPORTANTE**: Este formulario es la base para calcular el **Índice de Bienestar Cognitivo Yakumama (IBCY)** y generar un gráfico radar personalizado que muestra el estado del usuario en tres dimensiones: Estado Cognitivo Funcional (ECF), Estado Físico para el Cerebro (EFC), y Nutrición para la Salud Cerebral (NSC).

---

## 1. ESTRUCTURA DEL FORMULARIO

El formulario está dividido en **10 secciones (A-J)** con **35 preguntas totales**.

---

## SECCIÓN A: INFORMACIÓN GENERAL

### Pregunta 1: Nombre completo
- **Tipo**: Texto corto (input text)
- **Obligatorio**: Sí
- **Validación**: Mínimo 2 caracteres

### Pregunta 2: Fecha de nacimiento
- **Tipo**: Fecha
- **Obligatorio**: Sí
- **Validación**: Entre 18 y 100

### Pregunta 3: Sexo
- **Tipo**: Radio
- **Obligatorio**: Sí
- **Opciones**: Masculino, Femenino, Otro

### Pregunta 4: Ciudad / País
- **Tipo**: Texto corto
- **Obligatorio**: Sí

### Pregunta 5: Ocupación actual
- **Tipo**: Texto corto
- **Obligatorio**: Sí

### Pregunta 6: Correo electrónico
- **Tipo**: Email
- **Obligatorio**: Sí
- **Validación**: Formato email 

### Pregunta 7: Teléfono
- **Tipo**: Texto corto
- **Obligatorio**: No

### Pregunta 8: Horas de trabajo semanales
- **Tipo**: número
- **Obligatorio**: No

### Pregunta 9: Doy mi consentimiento informado
- **Tipo**: Checkbox
- **Obligatorio**: Sí

### Pregunta 10: Acepto política de privacidad
- **Tipo**: Checkbox
- **Obligatorio**: Sí

---

## SECCIÓN B: TUS OBJETIVOS CON YAKUMAMA LIFESTYLE

### Pregunta 6: ¿Cuáles son tus objetivos principales con este programa?
- **Tipo**: Checkbox múltiple (permite seleccionar varios)
- **Obligatorio**: Sí (al menos 1 opción)
- **Opciones**:
  - Recuperar energía
  - Ser más productivo
  - Mejorar enfoque y claridad mental
  - Manejar mejor el estrés
  - Elevar bienestar emocional
  - Mejorar equilibrio hormonal / vitalidad sexual
  - Fortalecer la inmunidad
  - Otro (especificar) - **si selecciona "Otro", mostrar campo de texto corto**

---

## SECCIÓN C: AUTOEVALUACIÓN DE BIENESTAR COGNITIVO

**Introducción de sección**: "Estas preguntas evalúan cómo te sientes en tu día a día respecto a enfoque, memoria y claridad mental."

### Pregunta 7: ¿Con qué frecuencia te cuesta mantener la concentración en tareas importantes?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Nunca
  - 2 = Rara vez
  - 3 = A veces
  - 4 = Con frecuencia
  - 5 = Siempre
- **Nota**: Pregunta NEGATIVA (mayor valor = peor bienestar)

### Pregunta 8: ¿Con qué frecuencia sientes "mente nublada" o falta de claridad mental?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: Igual que Q7
- **Nota**: Pregunta NEGATIVA

### Pregunta 9: ¿Qué tan fácil te resulta recordar información reciente (nombres, tareas, instrucciones)?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Muy difícil
  - 2 = Difícil
  - 3 = Neutral
  - 4 = Fácil
  - 5 = Muy fácil
- **Nota**: Pregunta POSITIVA

### Pregunta 10: ¿Con qué frecuencia te distraes mientras trabajas o estudias?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: Igual que Q7
- **Nota**: Pregunta NEGATIVA

### Pregunta 11: ¿Qué tan productivo(a) te sientes durante el día?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Nada productivo
  - 2 = Poco productivo
  - 3 = Moderadamente productivo
  - 4 = Productivo
  - 5 = Muy productivo
- **Nota**: Pregunta POSITIVA

### Pregunta 12: ¿Qué tan satisfecho(a) estás con tu nivel actual de atención y enfoque?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Muy insatisfecho
  - 2 = Insatisfecho
  - 3 = Neutral
  - 4 = Satisfecho
  - 5 = Muy satisfecho
- **Nota**: Pregunta POSITIVA

---

## SECCIÓN D: ESTRÉS, EMOCIONES Y SUEÑO

### Pregunta 13: En las últimas dos semanas, ¿con qué frecuencia te sentiste estresado(a)?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: Igual que Q7
- **Nota**: Pregunta NEGATIVA

### Pregunta 14: ¿Qué tan bien manejas actualmente el estrés?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Muy mal
  - 2 = Mal
  - 3 = Regular
  - 4 = Bien
  - 5 = Muy bien
- **Nota**: Pregunta POSITIVA (NO se usa en cálculos, solo informativa)

### Pregunta 15: ¿Cómo describirías tu calidad de sueño?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Muy mala
  - 2 = Mala
  - 3 = Regular
  - 4 = Buena
  - 5 = Excelente
- **Nota**: Pregunta POSITIVA (NO se usa en cálculos, solo informativa)

### Pregunta 16: ¿Cuántas horas duermes normalmente por noche?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - Menos de 5 horas
  - 5-6 horas
  - 6-7 horas
  - 7-8 horas
  - Más de 8 horas
- **Nota**: Solo informativa

### Pregunta 17: ¿Despiertas sintiéndote descansado(a)?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Nunca
  - 2 = Rara vez
  - 3 = A veces
  - 4 = Con frecuencia
  - 5 = Siempre
- **Nota**: Pregunta POSITIVA

---

## SECCIÓN E: ESTADO FÍSICO Y ACTIVIDAD

### Pregunta 18: ¿Cuántos días a la semana haces actividad física?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - 0 días
  - 1-2 días
  - 3-4 días
  - 5 o más días

### Pregunta 19: ¿Qué tipo de actividad realizas con más frecuencia?
- **Tipo**: Opción múltiple (radio) - seleccionar la principal
- **Obligatorio**: Sí
- **Opciones**:
  - Caminar
  - Gimnasio (pesas/máquinas)
  - Correr
  - Ciclismo
  - Yoga/Pilates
  - Deportes (fútbol, tenis, etc.)
  - Ninguna
  - Otro (especificar)

### Pregunta 20: ¿Cómo evaluarías tu nivel físico actual?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Muy bajo
  - 2 = Bajo
  - 3 = Moderado
  - 4 = Alto
  - 5 = Muy alto
- **Nota**: Pregunta POSITIVA

### Pregunta 21: ¿Tienes alguna limitación física relevante?
- **Tipo**: Texto largo (textarea)
- **Obligatorio**: No
- **Placeholder**: "Describe cualquier lesión, condición o limitación física que debamos considerar"

---

## SECCIÓN F: HÁBITOS DE NUTRICIÓN CEREBRAL

### Pregunta 22: ¿Con qué frecuencia consumes pescado (sierra, atún, macarela, sardinas)?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - Nunca
  - 1 vez al mes
  - 1 vez a la semana
  - 2-3 veces por semana
  - Más de 3 veces por semana

### Pregunta 23: ¿Con qué frecuencia consumes aguacate?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Nunca
  - 2 = Rara vez
  - 3 = A veces
  - 4 = Con frecuencia
  - 5 = Muy frecuentemente
- **Nota**: Pregunta POSITIVA

### Pregunta 24: ¿Consumes frutas y verduras diariamente?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - Sí
  - No
  - A veces

### Pregunta 25: ¿Cuántas veces a la semana consumes alimentos ultraprocesados (snacks, fritos, comidas rápidas)?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - 0 veces
  - 1-2 veces
  - 3-4 veces
  - 5 o más veces
- **Nota**: Pregunta NEGATIVA (más consumo = peor score)

### Pregunta 26: ¿Qué tan saludable consideras tu alimentación actual?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Muy poco saludable
  - 2 = Poco saludable
  - 3 = Moderadamente saludable
  - 4 = Saludable
  - 5 = Muy saludable
- **Nota**: Pregunta POSITIVA

---

## SECCIÓN G: PRUEBAS COGNITIVAS BÁSICAS (AUTOEVALUADAS)

**Introducción de sección**: "Estas pruebas NO son diagnósticas. Solo buscan conocer tu punto de partida."

### Pregunta 27: Prueba rápida de memoria inmediata
- **Tipo**: Texto largo (textarea)
- **Obligatorio**: Sí
- **Instrucciones a mostrar**:
  ```
  Te mostraremos una lista de palabras. Léelas UNA VEZ. 
  Luego (sin volver a mirar), escribe todas las que recuerdes en el campo de abajo.
  
  Lista de palabras:
  Sol – Agua – Libro – Verde – Camino – Nube – Tiempo – Mano
  
  (Debes implementar que el usuario no pueda copiar/pegar estas palabras)
  ```
- **Placeholder**: "Escribe aquí las palabras que recuerdas, separadas por comas o espacios"
- **Validación backend**: Contar cuántas de las 8 palabras originales están presentes (ignorar mayúsculas/minúsculas, acentos, espacios extra)

### Pregunta 28: Prueba de velocidad mental
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Texto**: "Cuando trabajas en tareas fáciles, ¿qué tan rápido sientes que procesas la información?"
- **Opciones**: 
  - 1 = Muy lento
  - 2 = Lento
  - 3 = Normal
  - 4 = Rápido
  - 5 = Muy rápido
- **Nota**: Pregunta POSITIVA

### Pregunta 29: Prueba de claridad mental
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Texto**: "Ahora evalúa tu claridad mental actual:"
- **Opciones**: 
  - 1 = Totalmente nublada
  - 2 = Algo nublada
  - 3 = Neutral
  - 4 = Clara
  - 5 = Muy clara
- **Nota**: Pregunta POSITIVA

---

## SECCIÓN H: TECNOLOGÍA Y USO DE REDES

### Pregunta 30: ¿Tienes Instagram activo?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - Sí
  - No

### Pregunta 31: ¿Te sientes cómodo(a) grabando videos cortos de tus rutinas?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - Sí
  - No
  - Prefiero fotos

### Pregunta 32: ¿Estás dispuesto(a) a enviar tus evidencias (videos/fotos) por Instagram DM o publicaciones etiquetadas?
- **Tipo**: Opción múltiple (radio)
- **Obligatorio**: Sí
- **Opciones**:
  - Sí
  - No

---

## SECCIÓN I: COMPROMISO Y ADHERENCIA

### Pregunta 33: ¿Qué tan comprometido(a) estás a realizar el programa Yakumama LyfeStyle durante 3 meses?
- **Tipo**: Escala Likert 1-5
- **Obligatorio**: Sí
- **Opciones**: 
  - 1 = Poco comprometido
  - 2 = Algo comprometido
  - 3 = Moderadamente comprometido
  - 4 = Comprometido
  - 5 = Muy comprometido
- **Nota**: Solo informativa

### Pregunta 34: ¿Qué te motiva a iniciar este proceso?
- **Tipo**: Texto largo (textarea)
- **Obligatorio**: Sí
- **Placeholder**: "Cuéntanos qué te llevó a querer mejorar tu bienestar cognitivo..."
- **Validación**: Mínimo 50 caracteres

---

## SECCIÓN J: CONSENTIMIENTO

### Pregunta 35: Consentimiento informado
- **Tipo**: Checkbox único
- **Obligatorio**: Sí (debe estar marcado para enviar)
- **Texto**: "Confirmo que participo voluntariamente en esta evaluación y autorizo el uso de mis respuestas para la personalización del programa y análisis interno."
- **Opciones**: 
  - Sí, acepto

---

## 2. SISTEMA DE PUNTUACIÓN Y CÁLCULO DEL IBCY

### 2.1 NORMALIZACIÓN A ESCALA 0-100

**Regla general para preguntas Likert 1-5:**

#### Para preguntas POSITIVAS (mayor valor = mejor bienestar):
```
score = (respuesta - 1) * 25
```
Ejemplos:
- Respuesta 1 → 0 puntos
- Respuesta 2 → 25 puntos
- Respuesta 3 → 50 puntos
- Respuesta 4 → 75 puntos
- Respuesta 5 → 100 puntos

#### Para preguntas NEGATIVAS (mayor valor = peor bienestar):
```
score = (5 - respuesta) * 25
```
Ejemplos:
- Respuesta 1 → 100 puntos
- Respuesta 2 → 75 puntos
- Respuesta 3 → 50 puntos
- Respuesta 4 → 25 puntos
- Respuesta 5 → 0 puntos

---

### 2.2 CÁLCULO DEL ECF (Estado Cognitivo Funcional)

**Preguntas implicadas**: 7, 8, 9, 10, 11, 12, 13, 17, 27, 28, 29

#### Tabla de Transformación por Pregunta:

| Pregunta | Tipo | Transformación | Peso en ECF | Categoría |
|----------|------|----------------|-------------|-----------|
| Q7 | Likert 1-5 (negativa) | `score7 = (5 - r7) * 25` | 10% | Atención |
| Q8 | Likert 1-5 (negativa) | `score8 = (5 - r8) * 25` | 10% | Atención |
| Q10 | Likert 1-5 (negativa) | `score10 = (5 - r10) * 25` | 10% | Atención |
| Q9 | Likert 1-5 (positiva) | `score9 = (r9 - 1) * 25` | 10% | Memoria |
| Q27 | Palabras (0-8) | Ver tabla abajo | 10% | Memoria |
| Q12 | Likert 1-5 (positiva) | `score12 = (r12 - 1) * 25` | 10% | Claridad |
| Q29 | Likert 1-5 (positiva) | `score29 = (r29 - 1) * 25` | 10% | Claridad |
| Q11 | Likert 1-5 (positiva) | `score11 = (r11 - 1) * 25` | 10% | Productividad |
| Q13 | Likert 1-5 (negativa) | `score13 = (5 - r13) * 25` | 10% | Estrés/Sueño |
| Q17 | Likert 1-5 (positiva) | `score17 = (r17 - 1) * 25` | 10% | Estrés/Sueño |
| Q28 | Likert 1-5 (positiva) | `score28 = (r28 - 1) * 25` | Opcional | (puede sumarse a Memoria o Claridad) |

#### Puntuación Q27 (Memoria inmediata):

| Palabras recordadas | Score |
|---------------------|-------|
| 0-2 palabras | 20 |
| 3-4 palabras | 50 |
| 5-6 palabras | 75 |
| 7-8 palabras | 100 |

**Código de referencia:**
```python
if n_palabras <= 2: 
    score27 = 20
elif n_palabras <= 4: 
    score27 = 50
elif n_palabras <= 6: 
    score27 = 75
else: 
    score27 = 100
```

#### Cálculo de Subfactores:

```python
Atencion = (score7 + score8 + score10) / 3  # 0-100
Memoria = (score9 + score27) / 2  # 0-100
Claridad = (score12 + score29) / 2  # 0-100
Productividad = score11  # 0-100
EstresSueno = (score13 + score17) / 2  # 0-100
```

#### Cálculo de ECF Global:

```python
ECF = (0.30 * Atencion) + \
      (0.20 * Memoria) + \
      (0.20 * Claridad) + \
      (0.10 * Productividad) + \
      (0.20 * EstresSueno)
# Resultado: 0-100
```

---

### 2.3 CÁLCULO DEL EFC (Estado Físico para el Cerebro)

**Preguntas implicadas**: 18, 19, 20, 21

#### Tabla de Transformación:

**Q18 - Frecuencia de ejercicio:**
| Respuesta | Score |
|-----------|-------|
| 0 días | 0 |
| 1-2 días | 40 |
| 3-4 días | 70 |
| 5 o más días | 100 |

**Q19 - Tipo de actividad:**
| Opción | Score |
|--------|-------|
| Gimnasio (aeróbico + fuerza) | 100 |
| Correr/Ciclismo (solo aeróbico) | 70 |
| Pesas (solo fuerza) | 70 |
| Deportes recreativos | 70 |
| Yoga/Pilates | 60 |
| Caminar | 50 |
| Ninguna | 0 |
| Otro | 50 (por defecto) |

**Q20 - Autoevaluación física:**
```python
score20 = (r20 - 1) * 25  # Likert positiva
```

**Q21 - Limitaciones físicas:**
```python
score21 = -20 if tiene_limitaciones else 0  # Penalización
```

#### Cálculo de EFC:

```python
BaseEFC = (0.35 * score18) + \
          (0.25 * score19) + \
          (0.30 * score20)  # 0-100

EFC = BaseEFC + score21  # score21 es 0 o -20

# Limitar entre 0 y 100
if EFC < 0: 
    EFC = 0
if EFC > 100: 
    EFC = 100
```

---

### 2.4 CÁLCULO DEL NSC (Nutrición para la Salud Cerebral)

**Preguntas implicadas**: 22, 23, 24, 25, 26

#### Tabla de Transformación:

**Q22 - Frecuencia de pescado:**
| Respuesta | Score |
|-----------|-------|
| Nunca | 0 |
| 1 vez al mes | 25 |
| 1 vez a la semana | 50 |
| 2-3 veces por semana | 80 |
| Más de 3 veces por semana | 100 |

**Q23 - Frecuencia aguacate:**
```python
score23 = (r23 - 1) * 25  # Likert positiva
```

**Q24 - Frutas/verduras diarias:**
| Respuesta | Score |
|-----------|-------|
| Sí | 100 |
| A veces | 60 |
| No | 0 |

**Q25 - Ultraprocesados (INVERSO):**
| Respuesta | Score |
|-----------|-------|
| 0 veces | 100 |
| 1-2 veces | 70 |
| 3-4 veces | 40 |
| 5+ veces | 0 |

**Q26 - Autoevaluación alimentación:**
```python
score26 = (r26 - 1) * 25  # Likert positiva
```

#### Cálculo de NSC:

```python
NSC = (0.25 * score22) + \
      (0.25 * score24) + \
      (0.25 * score25) + \
      (0.15 * score23) + \
      (0.10 * score26)
# Resultado: 0-100
```

---

### 2.5 CÁLCULO DEL IBCY (Índice de Bienestar Cognitivo Yakumama)

```python
IBCY = (0.50 * ECF) + \
       (0.25 * EFC) + \
       (0.25 * NSC)
# Resultado: 0-100
```

**Justificación de los pesos:**
- ECF = 50% → El componente cognitivo es central en el programa
- EFC = 25% → La actividad física influye significativamente
- NSC = 25% → La nutrición influye significativamente

---

### 2.6 CLASIFICACIÓN POR NIVELES

Para cada índice (ECF, EFC, NSC, IBCY):

```python
if score < 50: 
    nivel = "Principiante"
elif score < 75: 
    nivel = "Regular"
else: 
    nivel = "Avanzado"
```

---

## 3. VISUALIZACIÓN: GRÁFICO RADAR (POLÍGONO)

### 3.1 Especificaciones del Gráfico

**Nombre del componente**: "Perfil Cognitivo Yakumama"

**Tipo**: Radar Chart / Spider Chart

**Ejes (3 ejes radiales)**:
1. ECF – Estado Cognitivo Funcional (0-100)
2. EFC – Estado Físico para el Cerebro (0-100)
3. NSC – Nutrición para la Salud Cerebral (0-100)

**Capas de datos** (para mostrar evolución en el tiempo):
- **Capa 1** (gris claro, relleno 20%): Medición inicial (baseline)
- **Capa 2** (azul, relleno 30%): Medición intermedia (mes 1-2) - opcional
- **Capa 3** (verde, relleno 40%): Medición final (mes 3)

### 3.2 Interacciones del Usuario

- **Hover/Tap en vértice**: Muestra tooltip con:
  - Nombre del eje (ej: "Nutrición para salud cerebral")
  - Puntaje exacto (ej: "NSC: 68/100")
  - Nivel (Principiante/Regular/Avanzado)

- **Leyenda dinámica** con toggle:
  - ☐ Inicial
  - ☐ Intermedia (si existe)
  - ☐ Final
  - El usuario puede activar/desactivar capas

### 3.3 Texto Interpretativo Automático

Debajo del gráfico, mostrar 2-3 mensajes automáticos:

**Ejemplos**:
- "Has mejorado tu bienestar cognitivo global de 47 a 77 puntos."
- "Tu mayor avance fue en Nutrición para el cerebro (+34 puntos)."
- "Tu pilar dominante es: Estado Físico para el Cerebro (75 puntos)."
- "Tu pilar a reforzar es: Estado Cognitivo Funcional (42 puntos)."

### 3.4 Librerías Recomendadas

- **Chart.js** (con plugin radar)
- **Recharts** (React)
- **D3.js**
- **Highcharts** (radar plot)

### 3.5 Datos a Almacenar en Base de Datos

Crear tabla `evaluations` con campos:
```sql
- user_id
- evaluation_date (timestamp)
- evaluation_type (enum: 'initial', 'intermediate', 'final')
- ECF_score (float 0-100)
- EFC_score (float 0-100)
- NSC_score (float 0-100)
- IBCY_score (float 0-100)
- ECF_level (enum: 'Principiante', 'Regular', 'Avanzado')
- EFC_level
- NSC_level
- IBCY_level
- raw_responses (JSON con todas las respuestas del formulario)
```

---

## 4. ALGORITMO DE PERSONALIZACIÓN AUTOMÁTICA

### 4.1 Entradas del Algoritmo

- ECF, EFC, NSC, IBCY (0-100)
- Nivel_ECF, Nivel_EFC, Nivel_NSC
- edad (para calcular grupo_edad: 25-40, 41-55, 56-60)
- objetivos[] (array de objetivos seleccionados en Q6)

### 4.2 Salidas del Algoritmo

- **Plan_Fisico**: nivel, frecuencia (días/semana), tipo de rutina
- **Plan_Cognitivo**: nivel, tareas por día, componentes específicos
- **Plan_Nutricional**: nivel, snacks por semana, enfoque nutricional
- **Mensajes_Clave**: 2-3 mensajes personalizados de feedback

### 4.3 Lógica en Pseudocódigo

```python
# 1. CLASIFICACIÓN GLOBAL
nivel_global = clasificar(IBCY)

# 2. PLAN FÍSICO
if EFC < 50:
    Plan_Fisico.nivel = "Principiante"
    Plan_Fisico.frecuencia = 3  # días/semana
    Plan_Fisico.tipo = "Caminatas + calistenia suave"
elif EFC < 75:
    Plan_Fisico.nivel = "Intermedio"
    Plan_Fisico.frecuencia = 4
    Plan_Fisico.tipo = "Cardio moderado + fuerza ligera"
else:
    Plan_Fisico.nivel = "Avanzado"
    Plan_Fisico.frecuencia = 5
    Plan_Fisico.tipo = "Cardio + fuerza/HIIT adaptado"

# 3. PLAN COGNITIVO
if ECF < 50:
    Plan_Cognitivo.nivel = "Intensivo"
    Plan_Cognitivo.tareas_dia = 2
    Plan_Cognitivo.componentes = [
        "Lectura guiada", 
        "Ejercicios de memoria", 
        "Meditación corta diaria"
    ]
elif ECF < 75:
    Plan_Cognitivo.nivel = "Moderado"
    Plan_Cognitivo.tareas_dia = 1
    Plan_Cognitivo.componentes = [
        "Ejercicios de enfoque", 
        "Meditación 3x semana"
    ]
else:
    Plan_Cognitivo.nivel = "Mantenimiento"
    Plan_Cognitivo.tareas_dia = 1
    Plan_Cognitivo.componentes = [
        "Retos cognitivos 3x semana"
    ]

# 4. PLAN NUTRICIONAL
if NSC < 50:
    Plan_Nutricional.nivel = "Reestructuración"
    Plan_Nutricional.snacks_por_semana = 7
    Plan_Nutricional.enfoque = [
        "Pescado", 
        "Aguacate", 
        "Frutas", 
        "Eliminar ultraprocesados"
    ]
elif NSC < 75:
    Plan_Nutricional.nivel = "Optimización"
    Plan_Nutricional.snacks_por_semana = 4
    Plan_Nutricional.enfoque = [
        "Añadir omega-3", 
        "Reducir fritos"
    ]
else:
    Plan_Nutricional.nivel = "Mantenimiento"
    Plan_Nutricional.snacks_por_semana = 2
    Plan_Nutricional.enfoque = [
        "Mantener patrones actuales"
    ]

# 5. AJUSTES POR OBJETIVOS ESPECÍFICOS
if "Mejorar enfoque y claridad mental" in objetivos:
    Plan_Cognitivo.tareas_dia += 1
    Plan_Cognitivo.componentes.append("Ejercicios extra de atención")

if "Manejar mejor el estrés" in objetivos:
    Plan_Cognitivo.componentes.append("Meditación/respiración guiada diaria")

if "Recuperar energía" in objetivos or "Ser más productivo" in objetivos:
    Plan_Fisico.frecuencia += 1  # si no excede 5
    Plan_Cognitivo.componentes.append("Bloques de trabajo profundo (deep work) 3x semana")

if "Fortalecer la inmunidad" in objetivos:
    Plan_Nutricional.enfoque.append("Frutas ricas en vitamina C")

# 6. AJUSTES POR EDAD
grupo_edad = calcular_grupo_edad(edad)

if grupo_edad == "25-40":
    # Foco en rendimiento y prevención
    # Permitir más intensidad física si no hay limitaciones
    if not tiene_limitaciones_fisicas:
        aumentar_intensidad_fisica()
        
elif grupo_edad == "41-55":
    # Foco en balance y control de estrés
    Plan_Cognitivo.componentes.append("Hábitos de sueño")
    
elif grupo_edad == "56-60":
    # Foco en protección y seguridad
    reducir_intensidad_fisica_maxima()
    enfatizar_movilizacion_suave_y_equilibrio()

# 7. ALERTAS AUTOMÁTICAS POR DESBALANCE
if NSC < 40 and (EFC > 60 or ECF > 60):
    agregar_alerta(
        "Tu nutrición para el cerebro está por debajo de tu nivel físico y cognitivo. " +
        "Te sugerimos iniciar con el Plan Nutricional Reestructuración."
    )

if EFC > 75 and ECF < 50:
    agregar_alerta(
        "Tienes excelente condición física, pero tu nivel cognitivo necesita atención. " +
        "Prioriza las tareas cognitivas antes de aumentar más la exigencia física."
    )

# 8. GENERAR MENSAJES CLAVE
Mensajes_Clave = []

# Mensaje 1: Resumen global
if IBCY < 50:
    Mensajes_Clave.append(f"Tu bienestar cognitivo está en nivel Principiante ({IBCY:.0f}/100). ¡Es el momento perfecto para comenzar tu transformación!")
elif IBCY < 75:
    Mensajes_Clave.append(f"Tu bienestar cognitivo está en nivel Regular ({IBCY:.0f}/100). Con dedicación, alcanzarás el nivel Avanzado.")
else:
    Mensajes_Clave.append(f"¡Excelente! Tu bienestar cognitivo está en nivel Avanzado ({IBCY:.0f}/100). Mantén tus hábitos y continúa mejorando.")

# Mensaje 2: Pilar dominante
pilar_max = max([(ECF, "Estado Cognitivo"), (EFC, "Estado Físico"), (NSC, "Nutrición")])
Mensajes_Clave.append(f"Tu pilar más fuerte es {pilar_max[1]} con {pilar_max[0]:.0f} puntos.")

# Mensaje 3: Pilar a reforzar
pilar_min = min([(ECF, "Estado Cognitivo"), (EFC, "Estado Físico"), (NSC, "Nutrición")])
Mensajes_Clave.append(f"Tu área de oportunidad es {pilar_min[1]} con {pilar_min[0]:.0f} puntos. Enfócate aquí para lograr un crecimiento balanceado.")
```

### 4.4 Visualización del Panel de Recomendaciones

Después de mostrar el gráfico radar, mostrar un panel con:

**Estructura sugerida:**

```
┌─────────────────────────────────────────────────────┐
│  TU PLAN PERSONALIZADO YAKUMAMA LIFESTYLE          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🏃 PLAN FÍSICO - [Nivel]                          │
│  • Frecuencia: X días por semana                   │
│  • Tipo: [descripción]                             │
│  [Ver rutinas →]                                   │
│                                                     │
│  🧠 PLAN COGNITIVO - [Nivel]                       │
│  • Tareas diarias: X                               │
│  • Componentes: [lista]                            │
│  [Ver ejercicios →]                                │
│                                                     │
│  🥑 PLAN NUTRICIONAL - [Nivel]                     │
│  • Snacks semanales: X                             │
│  • Enfoque: [lista]                                │
│  [Ver recetas →]                                   │
│                                                     │
│  💬 MENSAJES CLAVE:                                │
│  • [Mensaje 1]                                     │
│  • [Mensaje 2]                                     │
│  • [Mensaje 3]                                     │
│                                                     │
│  [Comenzar mi programa →]                          │
└─────────────────────────────────────────────────────┘
```

---

## 5. FLUJO DE USUARIO COMPLETO

### 5.1 Paso 1: Landing del Formulario

**URL**: `/evaluacion-inicial`

**Contenido a mostrar**:
- Título: "Evaluación de Bienestar Cognitivo Yakumama Lifestyle"
- Subtítulo: "Duración aproximada: 7-10 minutos"
- Descripción: "Conoce tu estado actual de bienestar cognitivo, hábitos físicos y nutricionales para diseñar tu plan personalizado."
- Nota de confidencialidad: "Tus respuestas son completamente confidenciales"
- Botón CTA: "Comenzar evaluación"

### 5.2 Paso 2: Formulario Multi-Step

**Implementación sugerida**: Formulario de múltiples páginas (wizard)

**Navegación**:
- Progress bar en la parte superior mostrando % de completado
- Indicadores visuales de secciones: A → B → C → D → E → F → G → H → I → J
- Botones "Anterior" y "Siguiente" en cada paso
- En el último paso (J), botón "Enviar evaluación"

**Validación**:
- Validación en tiempo real por campo
- Mensajes de error claros y específicos
- No permitir avanzar si hay campos obligatorios sin completar
- Mostrar resumen de errores si intenta enviar con campos faltantes

**Auto-guardado** (opcional pero recomendado):
- Guardar progreso en localStorage cada 30 segundos
- Si el usuario abandona y regresa, ofrecer continuar desde donde dejó
- Al completar exitosamente, limpiar localStorage

### 5.3 Paso 3: Procesamiento y Cálculo

Al enviar el formulario:

1. **Validación final en backend**
2. **Cálculo de scores**:
   - Calcular score27 (contar palabras recordadas)
   - Normalizar todas las respuestas a 0-100
   - Calcular subfactores (Atención, Memoria, Claridad, etc.)
   - Calcular ECF, EFC, NSC
   - Calcular IBCY
   - Determinar niveles
3. **Ejecutar algoritmo de personalización**
4. **Guardar en base de datos**:
   - Tabla `users`: información general
   - Tabla `evaluations`: scores y niveles
   - Tabla `evaluation_responses`: respuestas raw
   - Tabla `personalized_plans`: plan generado
5. **Generar mensaje de éxito**

### 5.4 Paso 4: Página de Resultados

**URL**: `/resultados/[evaluation_id]`

**Secciones a mostrar**:

1. **Hero Section**:
   - Título: "¡Tu Evaluación está Completa!"
   - IBCY Score grande: "75/100"
   - Badge de nivel: "Regular" con color
   - Mensaje motivacional personalizado

2. **Gráfico Radar**:
   - Visualización del polígono con 3 ejes
   - Tooltips interactivos
   - Leyenda

3. **Desglose por Dominio**:
   - Tarjetas individuales para ECF, EFC, NSC
   - Cada tarjeta muestra:
     - Icono
     - Nombre del dominio
     - Score numérico
     - Nivel (badge)
     - Interpretación breve (1-2 líneas)

4. **Plan Personalizado**:
   - Panel con Plan Físico, Cognitivo y Nutricional
   - Mensajes clave
   - CTAs a secciones del programa

5. **Próximos Pasos**:
   - Botón: "Ver mi plan completo"
   - Botón: "Descargar resultados PDF"
   - Botón: "Compartir resultados"
   - Información sobre seguimiento: "Próxima evaluación en 1 mes"

### 5.5 Paso 5: Seguimiento (Evaluaciones Futuras)

**Evaluaciones posteriores**:
- Intermedia (mes 1-2)
- Final (mes 3)

**Diferencias con la evaluación inicial**:
- Formulario idéntico
- Al generar gráfico radar, superponer:
  - Baseline (gris)
  - Evaluación actual (color)
- Mostrar tabla comparativa con deltas:
  
  ```
  ┌──────────┬─────────┬────────┬────────┐
  │ Dominio  │ Inicial │ Actual │ Cambio │
  ├──────────┼─────────┼────────┼────────┤
  │ ECF      │   42    │   68   │  +26   │
  │ EFC      │   55    │   70   │  +15   │
  │ NSC      │   48    │   82   │  +34   │
  │ IBCY     │   47    │   72   │  +25   │
  └──────────┴─────────┴────────┴────────┘
  ```

- Mensajes de celebración de progreso:
  - "¡Increíble! Has mejorado tu IBCY en 25 puntos"
  - "Tu mayor avance fue en Nutrición (+34 puntos)"
  - Si hay retroceso: mensajes de apoyo y ajuste de plan

---

## 6. ESPECIFICACIONES TÉCNICAS DE IMPLEMENTACIÓN

### 6.1 Stack Tecnológico Recomendado

**Frontend**:
- React.js o Next.js
- TypeScript (fuertemente recomendado)
- Librería de formularios: React Hook Form o Formik
- Validación: Zod o Yup
- Gráficos: Recharts o Chart.js
- Estilos: Tailwind CSS o styled-components

**Backend**:
- Node.js + Express o Next.js API Routes
- Base de datos: PostgreSQL o MongoDB
- ORM: Prisma (si PostgreSQL) o Mongoose (si MongoDB)

### 6.2 Estructura de Base de Datos

```sql
-- Tabla: users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  city VARCHAR(255),
  country VARCHAR(255),
  occupation VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: evaluations
CREATE TABLE evaluations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  evaluation_type VARCHAR(50) NOT NULL, -- 'initial', 'intermediate', 'final'
  evaluation_date TIMESTAMP DEFAULT NOW(),
  
  -- Scores
  ecf_score DECIMAL(5,2),
  efc_score DECIMAL(5,2),
  nsc_score DECIMAL(5,2),
  ibcy_score DECIMAL(5,2),
  
  -- Niveles
  ecf_level VARCHAR(20), -- 'Principiante', 'Regular', 'Avanzado'
  efc_level VARCHAR(20),
  nsc_level VARCHAR(20),
  ibcy_level VARCHAR(20),
  
  -- Subfactores (opcional, para análisis detallado)
  atencion_score DECIMAL(5,2),
  memoria_score DECIMAL(5,2),
  claridad_score DECIMAL(5,2),
  productividad_score DECIMAL(5,2),
  estres_sueno_score DECIMAL(5,2),
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: evaluation_responses (almacena respuestas individuales)
CREATE TABLE evaluation_responses (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT,
  response_value TEXT, -- almacenar como JSON o texto
  normalized_score DECIMAL(5,2), -- score normalizado 0-100
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: personalized_plans
CREATE TABLE personalized_plans (
  id SERIAL PRIMARY KEY,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  
  -- Plan Físico
  plan_fisico_nivel VARCHAR(50),
  plan_fisico_frecuencia INTEGER,
  plan_fisico_tipo TEXT,
  
  -- Plan Cognitivo
  plan_cognitivo_nivel VARCHAR(50),
  plan_cognitivo_tareas_dia INTEGER,
  plan_cognitivo_componentes JSON, -- array de strings
  
  -- Plan Nutricional
  plan_nutricional_nivel VARCHAR(50),
  plan_nutricional_snacks_semana INTEGER,
  plan_nutricional_enfoque JSON, -- array de strings
  
  -- Mensajes clave
  mensajes_clave JSON, -- array de strings
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: objetivos (relación many-to-many)
CREATE TABLE user_objectives (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  evaluation_id INTEGER REFERENCES evaluations(id) ON DELETE CASCADE,
  objetivo VARCHAR(255) NOT NULL,
  otro_texto TEXT, -- si seleccionó "Otro"
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_evaluations_user_id ON evaluations(user_id);
CREATE INDEX idx_evaluations_type ON evaluations(evaluation_type);
CREATE INDEX idx_evaluation_responses_eval_id ON evaluation_responses(evaluation_id);
```

### 6.3 API Endpoints Necesarios

```
POST   /api/evaluations              - Crear nueva evaluación
GET    /api/evaluations/:id          - Obtener evaluación específica
GET    /api/users/:userId/evaluations - Listar evaluaciones de un usuario
POST   /api/evaluations/:id/calculate - Calcular scores (si se hace post-submit)
GET    /api/evaluations/:id/plan     - Obtener plan personalizado
GET    /api/evaluations/:id/pdf      - Generar PDF de resultados
```

### 6.4 Lógica de Cálculo (Código de Referencia)

**Archivo**: `utils/calculateScores.js` o `calculateScores.ts`

```javascript
// Función principal
export function calculateIBCY(responses) {
  // 1. Calcular ECF
  const ecf = calculateECF(responses);
  
  // 2. Calcular EFC
  const efc = calculateEFC(responses);
  
  // 3. Calcular NSC
  const nsc = calculateNSC(responses);
  
  // 4. Calcular IBCY
  const ibcy = (0.50 * ecf) + (0.25 * efc) + (0.25 * nsc);
  
  return {
    ecf: parseFloat(ecf.toFixed(2)),
    efc: parseFloat(efc.toFixed(2)),
    nsc: parseFloat(nsc.toFixed(2)),
    ibcy: parseFloat(ibcy.toFixed(2)),
    ecf_level: classifyLevel(ecf),
    efc_level: classifyLevel(efc),
    nsc_level: classifyLevel(nsc),
    ibcy_level: classifyLevel(ibcy)
  };
}

// Clasificación de niveles
function classifyLevel(score) {
  if (score < 50) return 'Principiante';
  if (score < 75) return 'Regular';
  return 'Avanzado';
}

// Normalización Likert positiva
function normalizeLikertPositive(value) {
  return (value - 1) * 25;
}

// Normalización Likert negativa
function normalizeLikertNegative(value) {
  return (5 - value) * 25;
}

// Cálculo ECF
function calculateECF(responses) {
  const { q7, q8, q9, q10, q11, q12, q13, q17, q27, q28, q29 } = responses;
  
  // Normalizar scores
  const score7 = normalizeLikertNegative(q7);
  const score8 = normalizeLikertNegative(q8);
  const score10 = normalizeLikertNegative(q10);
  const score9 = normalizeLikertPositive(q9);
  const score27 = calculateMemoryScore(q27); // función especial
  const score12 = normalizeLikertPositive(q12);
  const score29 = normalizeLikertPositive(q29);
  const score11 = normalizeLikertPositive(q11);
  const score13 = normalizeLikertNegative(q13);
  const score17 = normalizeLikertPositive(q17);
  
  // Calcular subfactores
  const atencion = (score7 + score8 + score10) / 3;
  const memoria = (score9 + score27) / 2;
  const claridad = (score12 + score29) / 2;
  const productividad = score11;
  const estresSueno = (score13 + score17) / 2;
  
  // ECF ponderado
  const ecf = (0.30 * atencion) + 
              (0.20 * memoria) + 
              (0.20 * claridad) + 
              (0.10 * productividad) + 
              (0.20 * estresSueno);
  
  return ecf;
}

// Cálculo score memoria (Q27)
function calculateMemoryScore(palabrasRecordadas) {
  // palabrasRecordadas es un string, hay que parsearlo
  const palabrasOriginales = ['sol', 'agua', 'libro', 'verde', 'camino', 'nube', 'tiempo', 'mano'];
  const palabrasUsuario = palabrasRecordadas.toLowerCase()
    .split(/[\s,]+/) // separar por espacios o comas
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // Contar coincidencias
  let count = 0;
  palabrasUsuario.forEach(palabra => {
    if (palabrasOriginales.includes(palabra)) {
      count++;
    }
  });
  
  // Asignar score según tabla
  if (count <= 2) return 20;
  if (count <= 4) return 50;
  if (count <= 6) return 75;
  return 100;
}

// Cálculo EFC
function calculateEFC(responses) {
  const { q18, q19, q20, q21 } = responses;
  
  // Score Q18
  const score18Map = { '0': 0, '1-2': 40, '3-4': 70, '5+': 100 };
  const score18 = score18Map[q18] || 0;
  
  // Score Q19
  const score19Map = {
    'gimnasio': 100,
    'correr': 70,
    'ciclismo': 70,
    'deportes': 70,
    'yoga': 60,
    'pilates': 60,
    'caminar': 50,
    'ninguna': 0,
    'otro': 50
  };
  const score19 = score19Map[q19.toLowerCase()] || 50;
  
  // Score Q20
  const score20 = normalizeLikertPositive(q20);
  
  // Score Q21 (penalización)
  const score21 = (q21 && q21.length > 0) ? -20 : 0;
  
  // EFC ponderado
  let efc = (0.35 * score18) + (0.25 * score19) + (0.30 * score20) + score21;
  
  // Limitar entre 0 y 100
  if (efc < 0) efc = 0;
  if (efc > 100) efc = 100;
  
  return efc;
}

// Cálculo NSC
function calculateNSC(responses) {
  const { q22, q23, q24, q25, q26 } = responses;
  
  // Score Q22
  const score22Map = {
    'nunca': 0,
    '1_mes': 25,
    '1_semana': 50,
    '2-3_semana': 80,
    '3+_semana': 100
  };
  const score22 = score22Map[q22] || 0;
  
  // Score Q23
  const score23 = normalizeLikertPositive(q23);
  
  // Score Q24
  const score24Map = { 'si': 100, 'a_veces': 60, 'no': 0 };
  const score24 = score24Map[q24] || 0;
  
  // Score Q25 (inverso)
  const score25Map = { '0': 100, '1-2': 70, '3-4': 40, '5+': 0 };
  const score25 = score25Map[q25] || 0;
  
  // Score Q26
  const score26 = normalizeLikertPositive(q26);
  
  // NSC ponderado
  const nsc = (0.25 * score22) + 
              (0.25 * score24) + 
              (0.25 * score25) + 
              (0.15 * score23) + 
              (0.10 * score26);
  
  return nsc;
}
```

---

## 7. CONSIDERACIONES DE UX/UI

### 7.1 Diseño Visual

- **Color primario**: Verde (#2ECC71) asociado a salud y bienestar
- **Color secundario**: Azul (#3498DB) para confianza
- **Color de acento**: Naranja (#E67E22) para CTAs
- **Tipografía**: Sans-serif moderna (Inter, Poppins, o similar)
- **Iconografía**: Usar íconos consistentes (Feather Icons, Heroicons, etc.)

### 7.2 Responsive Design

- **Mobile-first**: El formulario debe ser completamente funcional en móviles
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Gráfico radar**: Debe ajustarse bien en pantallas pequeñas (posiblemente versión simplificada)

### 7.3 Accesibilidad

- Labels claros para todos los inputs
- Contraste de colores WCAG AA
- Navegación por teclado funcional
- Screen reader friendly
- Mensajes de error descriptivos

### 7.4 Microinteracciones

- Transiciones suaves entre pasos del formulario
- Animación al completar cada sección
- Feedback visual al seleccionar opciones
- Loading states durante cálculos
- Celebración visual al completar (confetti opcional)

---

## 8. TESTING Y VALIDACIÓN

### 8.1 Test Cases Críticos

1. **Validación de campos obligatorios**
   - Intentar enviar sin completar campos requeridos
   - Verificar mensajes de error

2. **Validación de Q27 (memoria)**
   - Probar con 0, 3, 6, 8 palabras
   - Verificar cálculo correcto del score
   - Probar con mayúsculas/minúsculas
   - Probar con palabras incorrectas

3. **Cálculo de scores**
   - Crear casos de prueba con valores conocidos
   - Verificar que ECF, EFC, NSC, IBCY se calculan correctamente
   - Validar ponderaciones

4. **Algoritmo de personalización**
   - Probar con diferentes combinaciones de scores
   - Verificar que se generan planes correctos
   - Validar ajustes por edad y objetivos

5. **Gráfico radar**
   - Verificar que se renderiza correctamente
   - Probar con valores extremos (0, 50, 100)
   - Validar tooltips e interactividad

### 8.2 Test Data

Crear usuarios de prueba con perfiles variados:

**Usuario A - Principiante Total**:
- Todas las respuestas negativas en su máximo
- IBCY esperado: ~20-30

**Usuario B - Regular Balanceado**:
- Respuestas mixtas
- IBCY esperado: ~55-65

**Usuario C - Avanzado**:
- Todas las respuestas positivas en su máximo
- IBCY esperado: ~90-100

---

## 9. ENTREGABLES FINALES

### 9.1 Para el Cliente

1. **Formulario web funcional** en producción
2. **Panel de resultados** con gráfico radar
3. **Sistema de personalización** automática
4. **Base de datos** configurada y poblada
5. **Documentación de usuario**
6. **Manual de administración**

### 9.2 Para el Equipo de Desarrollo

1. **Código fuente** completo y documentado
2. **README** con instrucciones de instalación
3. **Documentación técnica** de API
4. **Tests** unitarios e integración
5. **Scripts de deployment**
6. **Variables de entorno** de ejemplo

---

## 10. PRÓXIMOS PASOS (POST-LANZAMIENTO)

1. **Monitoreo de uso**:
   - Google Analytics o Mixpanel
   - Tracking de abandono por sección
   - Tiempo promedio de completado

2. **Iteración basada en feedback**:
   - Encuesta post-evaluación
   - Análisis de preguntas problemáticas
   - Ajuste de algoritmo de personalización

3. **Features adicionales**:
   - Dashboard de usuario con histórico
   - Comparativas con población
   - Exportación de resultados en PDF
   - Integración con Instagram (si aplicable)
   - Sistema de recordatorios

---

## RESUMEN EJECUTIVO PARA EL AGENTE

**Tu misión es desarrollar:**

1. ✅ Un formulario de 35 preguntas dividido en 10 secciones (A-J)
2. ✅ Sistema de cálculo que procese las respuestas y genere 4 scores (ECF, EFC, NSC, IBCY) en escala 0-100
3. ✅ Gráfico radar interactivo que visualice los 3 dominios principales (ECF, EFC, NSC)
4. ✅ Algoritmo de personalización que genere planes automáticos basados en los scores
5. ✅ Página de resultados que muestre scores, gráfico, clasificación y plan personalizado
6. ✅ Base de datos que almacene usuarios, evaluaciones, respuestas y planes

**Prioridades técnicas:**
- Validación robusta de datos
- Cálculos matemáticos precisos según las tablas especificadas
- UX fluida y responsive
- Código limpio y mantenible
- Testing de casos críticos

**Este documento contiene TODA la información necesaria. No omitas ningún detalle en tu implementación.**

¿Alguna duda antes de comenzar el desarrollo?