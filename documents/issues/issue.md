Análisis del Proyecto Yakumama App
1. Estado Actual del Proyecto
✅ Lo que YA está implementado:
Autenticación Básica:

✅ Supabase ya configurado (lib/supabase/)
✅ Cliente de Supabase (client.ts, server.ts)
✅ Páginas de auth (app/(auth)/login, register, forgot-password)
✅ Hook useAuth básico
✅ Tipos de usuario definidos (types/user.ts)

Estructura del Proyecto:

✅ Arquitectura modular bien organizada
✅ Sistema de módulos (modules/)
✅ Configuración de Tailwind
✅ TypeScript configurado

❌ Lo que FALTA implementar:
Seguridad Crítica:

❌ Middleware de protección de rutas (middleware.ts en raíz)
❌ Hook de inactividad (useIdleTimeout)
❌ Modal de advertencia de inactividad
❌ AuthListener para renovación automática de tokens
❌ Protección de API Routes (no hay verificación de sesión)
❌ Row Level Security (RLS) en Supabase

Sistema de Evaluación:

❌ Formulario de evaluación completo
❌ Cálculo de índices (ECF, EFC, NSC, IBCY)
❌ Gráfico radar de progreso
❌ Sistema de personalización de planes


2. Archivos Críticos que Faltan
2.1. Para Sistema de Autenticación Seguro
src/
├── middleware.ts                          ❌ FALTA - CRÍTICO
├── lib/
│   └── supabase/
│       └── config.ts                      ❌ FALTA
├── hooks/
│   ├── useIdleTimeout.ts                  ❌ FALTA - CRÍTICO
│   └── useSession.ts                      ❌ FALTA
├── components/
│   ├── providers/
│   │   └── AuthProvider.tsx               ❌ FALTA
│   └── auth/
│       ├── AuthListener.tsx               ❌ FALTA - CRÍTICO
│       ├── IdleWarningModal.tsx           ❌ FALTA
│       └── ProtectedRoute.tsx             ❌ FALTA
└── app/
    └── (authenticated)/
        └── layout.tsx                     ⚠️ EXISTE pero sin protección
2.2. Para Sistema de Evaluación
src/
├── modules/
│   └── evaluation/
│       ├── components/
│       │   ├── EvaluationForm.tsx         ❌ FALTA
│       │   ├── RadarChart.tsx             ❌ FALTA
│       │   ├── ScoreCard.tsx              ❌ FALTA
│       │   └── ProgressComparison.tsx     ❌ FALTA
│       ├── services/
│       │   ├── calculationService.ts      ❌ FALTA
│       │   ├── scoringFormulas.ts         ❌ FALTA
│       │   └── personalizationService.ts  ❌ FALTA
│       ├── types/
│       │   ├── evaluation.types.ts        ❌ FALTA
│       │   └── scoring.types.ts           ❌ FALTA
│       └── utils/
│           └── normalization.ts           ❌ FALTA
├── app/
│   └── api/
│       └── evaluation/
│           ├── calculate/
│           │   └── route.ts               ❌ FALTA
│           └── store/
│               └── route.ts               ❌ FALTA

3. Issues Encontrados
🔴 Problemas Críticos:

No hay middleware de protección

Las rutas en (authenticated) NO están protegidas
Cualquiera puede acceder sin login
Riesgo de seguridad ALTO


No hay manejo de inactividad

Sesiones permanecen abiertas indefinidamente
No hay auto-logout


API Routes sin protección

No hay verificación de sesión en APIs (si existen)


No hay RLS en Supabase

Base de datos sin políticas de seguridad
Usuarios podrían acceder a datos de otros



⚠️ Problemas Importantes:

Hook useAuth incompleto

No maneja renovación de tokens
No detecta cambios de sesión


Layout de authenticated sin verificación

app/(authenticated)/layout.tsx no verifica sesión server-side


No hay manejo de errores de auth

Faltan páginas de error/unauthorized




4. Instrucciones Actualizadas para Antigravity
🎯 INSTRUCCIONES ESPECÍFICAS PARA YAKUMAMA APP
Contexto
Proyecto existente con estructura base implementada. Requiere completar:

Sistema de seguridad y autenticación
Sistema de evaluación cognitiva


PARTE A: Sistema de Seguridad (PRIORIDAD 1 - CRÍTICA)
A.1. Crear Middleware de Protección
Archivo: src/middleware.ts (EN LA RAÍZ, junto a app/)
Código base:
typescriptimport { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rutas protegidas - ACTUALIZAR según tu proyecto
  const protectedRoutes = [
    '/dashboard',
    '/evaluation',
    '/profile',
    '/plans',
    '/progress',
    '/settings'
  ]

  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  // Redirigir si no hay sesión en ruta protegida
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirigir si está logueado e intenta acceder a login
  if (req.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
A.2. Crear Hook de Inactividad
Archivo: src/hooks/useIdleTimeout.ts
Funcionalidad:

Detectar inactividad de 15 minutos
Mostrar advertencia a los 13 minutos
Logout automático a los 15 minutos
Eventos: mousedown, mousemove, keypress, scroll, touchstart, click

Integrar en: app/(authenticated)/layout.tsx
A.3. Crear AuthListener
Archivo: src/components/auth/AuthListener.tsx
Funcionalidad:

Escuchar eventos: TOKEN_REFRESHED, SIGNED_OUT, USER_DELETED
Renovar tokens automáticamente
Redirigir en logout

Integrar en: app/layout.tsx (root layout)
A.4. Crear Modal de Advertencia
Archivo: src/components/auth/IdleWarningModal.tsx
UI:

Modal centrado con overlay
Countdown de 120 segundos
Botón "Continuar activo"
Usar Tailwind para estilos

A.5. Actualizar Layout Autenticado
Archivo: app/(authenticated)/layout.tsx (YA EXISTE)
Agregar:
typescriptimport { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { useIdleTimeout } from '@/hooks/useIdleTimeout'
import { IdleWarningModal } from '@/components/auth/IdleWarningModal'

export default async function AuthenticatedLayout({ children }) {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <AuthenticatedLayoutClient>
        {children}
      </AuthenticatedLayoutClient>
    </>
  )
}

// Cliente component para hooks
'use client'
function AuthenticatedLayoutClient({ children }) {
  useIdleTimeout({ timeoutMinutes: 15 })
  
  return (
    <>
      <IdleWarningModal />
      {children}
    </>
  )
}
A.6. Configurar RLS en Supabase
Ejecutar en SQL Editor de Supabase:
sql-- Habilitar RLS en todas las tablas
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id);

-- Políticas para evaluations
CREATE POLICY "Users can view own evaluations"
ON evaluations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own evaluations"
ON evaluations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own evaluations"
ON evaluations FOR UPDATE
USING (auth.uid() = user_id);

-- Políticas para user_plans
CREATE POLICY "Users can view own plans"
ON user_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans"
ON user_plans FOR INSERT
WITH CHECK (auth.uid() = user_id);

PARTE B: Sistema de Evaluación (PRIORIDAD 2)
B.1. Crear Tipos de Evaluación
Archivo: src/modules/evaluation/types/evaluation.types.ts
typescriptexport interface EvaluationResponse {
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
B.2. Crear Servicio de Cálculo
Archivo: src/modules/evaluation/services/calculationService.ts
Funciones requeridas:
typescript// Normalización
export function normalizePositiveLikert(value: number): number
export function normalizeNegativeLikert(value: number): number

// Cálculo de subfactores
export function calculateMemoryScore(palabras: number): number
export function calculateECF(responses: EvaluationResponse): number
export function calculateEFC(responses: EvaluationResponse): number
export function calculateNSC(responses: EvaluationResponse): number
export function calculateIBCY(ECF: number, EFC: number, NSC: number): number

// Clasificación
export function clasificarNivel(score: number): string

// Función principal
export function calculateAllScores(responses: EvaluationResponse): EvaluationScores
Usar las fórmulas del documento proporcionado anteriormente.
B.3. Crear API Route de Cálculo
Archivo: src/app/api/evaluation/calculate/route.ts
typescriptimport { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { calculateAllScores } from '@/modules/evaluation/services/calculationService'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // VERIFICAR SESIÓN
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  try {
    const responses = await request.json()
    
    // Calcular scores
    const scores = calculateAllScores(responses)
    
    // Guardar en BD
    const { data, error } = await supabase
      .from('evaluations')
      .insert({
        user_id: session.user.id,
        responses,
        scores,
        fecha: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al calcular evaluación' },
      { status: 500 }
    )
  }
}
B.4. Crear Componente de Gráfico Radar
Archivo: src/modules/evaluation/components/RadarChart.tsx
Usar librería: recharts (ya debería estar instalada)
bashnpm install recharts
Props requeridas:
typescriptinterface RadarChartProps {
  scores: {
    ECF: number
    EFC: number
    NSC: number
  }
  previousScores?: {
    ECF: number
    EFC: number
    NSC: number
  }
}
Visualización:

3 ejes: ECF, EFC, NSC
Escala 0-100
Polígono actual (verde)
Polígono anterior (gris claro) si existe
Tooltip con valores exactos

B.5. Crear Formulario de Evaluación
Archivo: src/modules/evaluation/components/EvaluationForm.tsx
Estructura:

Form con React Hook Form
Validación con Zod
Secciones colapsables (A-J)
Progress bar
Guardar borrador en localStorage
Submit → llamar API /api/evaluation/calculate


PARTE C: Schema de Base de Datos
C.1. Crear Tablas en Supabase
sql-- Tabla de evaluaciones
CREATE TABLE evaluations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo_evaluacion TEXT CHECK (tipo_evaluacion IN ('inicial', 'intermedia', 'final')),
  responses JSONB NOT NULL,
  scores JSONB NOT NULL,
  fecha TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_evaluations_user_id ON evaluations(user_id);
CREATE INDEX idx_evaluations_fecha ON evaluations(fecha);

-- Tabla de planes personalizados
CREATE TABLE user_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
  plan JSONB NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_user_plans_user_id ON user_plans(user_id);
CREATE INDEX idx_user_plans_activo ON user_plans(activo);

CHECKLIST DE IMPLEMENTACIÓN
Fase 1: Seguridad (CRÍTICA - 2-3 días)

 Crear middleware.ts
 Crear useIdleTimeout.ts
 Crear AuthListener.tsx
 Crear IdleWarningModal.tsx
 Actualizar (authenticated)/layout.tsx
 Configurar RLS en Supabase
 Testing de protección de rutas
 Testing de auto-logout

Fase 2: Evaluación Base (3-4 días)

 Crear tipos de evaluación
 Crear calculationService.ts
 Crear API route /api/evaluation/calculate
 Crear tablas en Supabase
 Testing de cálculos

Fase 3: UI de Evaluación (3-4 días)

 Crear EvaluationForm.tsx
 Crear RadarChart.tsx
 Crear ScoreCard.tsx
 Integrar con API
 Testing end-to-end

Fase 4: Personalización (2-3 días)

 Crear personalizationService.ts
 Generar planes automáticos
 Crear UI de planes
 Testing de personalización


NOTAS IMPORTANTES
⚠️ Antes de empezar:

Hacer backup del repositorio actual
Crear branch: feature/security-and-evaluation
Instalar dependencias faltantes:

bash   npm install recharts react-hook-form zod @hookform/resolvers
🔴 Prioridades:

Middleware (bloqueante para seguridad)
RLS (bloqueante para producción)
Inactividad (crítico para UX)
Evaluación (funcionalidad core)

📝 Durante desarrollo:

Hacer commits frecuentes
Testing en cada fase
Documentar cambios en README