1) Formulario autoaplicable y clasificación automática
1.1 Dimensiones a medir (inputs del formulario)
Estructura en 6 dominios (cada uno puntúa):
1.	Patrón dietario neuroprotector

●	Adherencia MIND/Mediterránea (frecuencia de: hojas verdes, frutos rojos, frutos secos, legumbres, aceite de oliva, pescado).

●	Red flags: ultraprocesados, azúcares/refinados, grasas trans, fritos frecuentes.

2.	Omega-3 (EPA/DHA) – exposición real

●	Frecuencia de pescado graso semanal.

●	Uso actual de omega-3 (aceite de pescado/krill/alga).

3.	Vitaminas B (B6–B9–B12) – riesgo de déficit

●	Vegan/vegetariano sin B12.

●	Uso de metformina/IBP.

●	Síntomas compatibles (hormigueo, fatiga, niebla mental).

4.	Vitamina D – riesgo por estilo de vida

●	Exposición solar semanal.

●	Antecedente de déficit o suplementación.

5.	Carga antioxidante / polifenoles

●	Consumo de té verde, cúrcuma, frutos rojos.

●	Frutas/verduras totales diarias.

6.	Factores que aumentan requerimientos

●	Estrés alto + sueño pobre.

●	Alcohol frecuente / tabaquismo.

●	Actividad física baja.

________________________________________
2) Sistema de puntuación (simple, robusto, automatizable)
2.1 Escala final: 0 a 100
●	Cada dominio aporta 0 a 16–17 puntos (6 dominios ≈ 100).

●	Se implementa como suma ponderada.

Recomendación de ponderaciones
●	Patrón dietario: 20

●	Omega-3: 20

●	Complejo B: 15

●	Vitamina D: 15

●	Polifenoles/antioxidantes: 15

●	Factores de requerimiento (estrés/sueño/alcohol): 15
 Total = 100

2.2 Regla de nivel (output automático)
●	Óptimo: 80–100

●	Moderado: 60–79

●	Deficiente: 40–59

●	Crítico: 0–39

2.3 “Banderas rojas” (override clínico)
Independiente del score, si el usuario marca cualquiera de estas condiciones, el sistema:
●	mantiene el nivel, pero agrega una alerta “Revisión profesional recomendada”.

Banderas rojas:
●	Embarazo/lactancia

●	Anticoagulantes / nitratos / hipoglucemiantes / antihipertensivos

●	Enfermedad renal/hepática severa

●	Alergia a hongos / autoinmunidad activa

●	Parestesias severas, confusión marcada o pérdida de peso involuntaria importante

________________________________________
3) Motor de recomendación: “stack” de 3 meses (cápsulas + polvos)
3.1 Estructura del stack (por nivel)
El stack se compone de:
●	Base (siempre): Omega-3 + Vitamina D (ajustada)

●	Corrección (según carencias): B-Complex / B12 / polifenoles (curcumina, resveratrol, EGCG, arándano)

●	Keto opcional (solo si el usuario elige cetogénica o baja en carbos): MCT powder

Óptimo (80–100)
Objetivo: mantenimiento + prevención
●	Omega-3 (softgel): Fish oil o krill (baja/moderada)

●	Vitamina D3 + K2 (softgel) si exposición solar baja

●	Polifenoles (opcional): Blueberry extract powder o té verde extract (dosis baja)

Productos sugeridos
●	BulkSupplements Fish Oil Softgels 1000 mg

●	MicroIngredients Vitamin D3 + K2 Softgels

●	MicroIngredients Organic Wild Blueberry Extract Powder (o BulkSupplements Blueberry Powder/Extract)

Moderado (60–79)
Objetivo: corregir subóptimos frecuentes (omega-3, B, D, antioxidantes)
●	Omega-3 (softgel): subir dosis

●	B-Complex metilado (cápsula)

●	D3 (softgel)

●	1 polifenol “principal” (elegir 1): Curcumina + piperina o EGCG

Productos sugeridos
●	MicroIngredients Triple Strength Omega-3 Fish Oil

●	MicroIngredients Methylated B-Complex

●	BulkSupplements Vitamin D3 Softgels 5000 IU

●	MicroIngredients Turmeric Curcumin + Black Pepper (caps) o BulkSupplements Green Tea Extract Powder (50% EGCG)

Deficiente (40–59)
Objetivo: repleción + soporte antioxidante más fuerte
●	Omega-3: krill oil (biodisponibilidad) +/o fish oil

●	B12 (alto riesgo) + B-Complex

●	D3 + K2

●	Vitamina E (softgel) si dieta baja en grasas saludables/nueces

●	1–2 polifenoles: Resveratrol + Curcumina o EGCG

Productos sugeridos
●	BulkSupplements Krill Oil Softgels 1000 mg

●	BulkSupplements Vitamin B12 (Methylcobalamin) Powder (microdosis)

●	MicroIngredients D3 + K2

●	MicroIngredients Vitamin E Softgels 1000 IU

●	BulkSupplements Resveratrol Powder (98%) o MicroIngredients Trans-Resveratrol Powder

●	Curcumin 95% Powder (BulkSupplements) + Black Pepper Extract Powder (piperine)

Crítico (0–39)
Objetivo: intervención intensiva + alertas + derivación
●	Igual a Deficiente pero con:

○	multivitamínico/mineral completo (si el usuario lo tolera)

○	prioridad a evaluación clínica si hay banderas rojas

●	Keto/MCT solo si el usuario elige ese patrón dietario y no hay contraindicaciones.

Productos sugeridos
●	Combinación krill + fish oil

●	B-Complex (alta potencia) + B12

●	D3 + K2

●	Vitamina E

●	Resveratrol + EGCG + Blueberry extract (combinación de polifenoles, no todos obligatorios)

________________________________________
4) Reglas “si/entonces” para personalización (más allá del nivel)
Además del nivel, el motor debe ajustar por carencias puntuales:
4.1 Reglas de Omega-3 (dominante)
●	Si pescado graso < 1 vez/semana → Omega-3 “alto”

●	Si el usuario es vegano → priorizar Algal Oil Softgels (DHA) (BulkSupplements)

4.2 Reglas de B12/B-Complex
●	Si vegano/vegetariano sin suplementar → B12 obligatoria

●	Si hay hormigueo/entumecimiento frecuente → B12 + alerta “revisar labs”

4.3 Reglas de Vitamina D
●	Si sol < 2 veces/semana → D3 recomendada

●	Si “déficit confirmado previo” → D3 alta + recomendación de control

4.4 Reglas de polifenoles (selección inteligente)
Escoge solo 1–2 para adherencia:
●	Si estrés alto/sueño pobre → EGCG o curcumina

●	Si enfoque/memoria como objetivo principal → arándano + resveratrol

●	Si el usuario evita cafeína → EGCG descafeinado (extracto)

4.5 Keto/MCT (solo cuando aplica)
●	Si patrón “cetogénico/bajo carb” elegido → añadir MCT Oil Powder

●	Si el usuario NO está en keto → no se recomienda MCT como base

________________________________________
5) Entregable para el usuario: reporte del módulo (UX)
5.1 Salida mínima del sistema (lo que el usuario ve)
1.	Score 0–100 + nivel (Óptimo/Moderado/Deficiente/Crítico)

2.	Radar por dominios (6 dominios, 0–100 cada uno)

3.	Top 3 carencias (ej. “Omega-3 bajo”, “Riesgo B12”, “Baja carga polifenoles”)

4.	Plan 3 meses:

●	suplemento 1 (base)

●	suplemento 2 (corrección)

●	suplemento 3 (opcional)

●	hábitos alimentarios (3 acciones semanales)

5.2 Copys sugeridos (tono YakuMama)
●	“Tu nutrición cerebral está en nivel Moderado: hay buena base, pero tu cerebro está pidiendo refuerzos clave para energía, enfoque y resiliencia al estrés.”

●	“Plan de 3 meses: simple, constante y medible.”

________________________________________
6) Implementación técnica: data model + pseudocódigo
6.1 Modelo de datos (JSON)
{
  "user_id": "abc123",
  "answers": { "q1": 3, "q2": 1, "...": 0 },
  "domain_scores": {
    "diet_pattern": 14,
    "omega3": 6,
    "b_vitamins": 8,
    "vitamin_d": 5,
    "polyphenols": 7,
    "demand_factors": 6
  },
  "total_score": 46,
  "level": "DEFICIENTE",
  "red_flags": ["anticoagulants"],
  "recommendation": {
    "stack_3m": [
      { "type": "softgel", "name": "Krill Oil Softgels 1000 mg", "brand": "BulkSupplements", "timing": "con comida" },
      { "type": "powder", "name": "Vitamin B12 (Methylcobalamin) Powder", "brand": "BulkSupplements", "timing": "mañana" },
      { "type": "powder", "name": "Curcumin 95% Powder + Black Pepper Extract", "brand": "BulkSupplements", "timing": "con grasa" }
    ],
    "diet_actions": ["2 porciones extra de verduras/día", "2 porciones de frutos rojos/semana", "aceite de oliva como grasa principal"]
  }
}

6.2 Pseudocódigo
score_domains(answers):
  diet_pattern = map_diet_answers_to_points()
  omega3 = map_omega3_answers_to_points()
  b_vitamins = map_b_answers_to_points()
  vitamin_d = map_d_answers_to_points()
  polyphenols = map_polyphenol_answers_to_points()
  demand_factors = map_stress_sleep_alcohol_to_points()

  total = weighted_sum(domains)
  level = classify(total)

  red_flags = detect_red_flags(answers)

  stack = build_stack(level, answers, red_flags)
  return report(total, level, domains, red_flags, stack)

________________________________________
7) Qué sigue (siguiente entregable listo)
Si avanzamos en el flujo de YakuMama Lifestyle, el siguiente paso lógico es que yo te entregue:
1.	El cuestionario exacto (20–28 preguntas) con opciones tipo Likert y sus puntos.

2.	Las tablas de mapeo pregunta→dominio→puntos (listas para back-end).

3.	Catálogo de productos (MicroIngredients/BulkSupplements) normalizado con: formato (softgel/powder), objetivo (omega-3/B/D/polifenoles/MCT), y reglas de elegibilidad.

Si estás de acuerdo, en tu próxima instrucción dime: “Construye el cuestionario final del módulo (máx. 25 preguntas)”, y lo dejo completamente parametrizado para que tu programador lo implemente sin interpretación adicional.


