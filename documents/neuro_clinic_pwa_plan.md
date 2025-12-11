# Plan de Desarrollo - PWA Clínica Neurológica

## 1. VISIÓN GENERAL DEL PROYECTO

### 1.1 Propósito
Desarrollar una Aplicación Web Progresiva (PWA) para una clínica neurológica que permita:
- Comercializar productos cognitivos
- Realizar estudios de efectividad clínica
- Gestionar el progreso de pacientes/participantes mediante evaluaciones estructuradas

### 1.2 Alcance del MVP
- Sistema completo de autenticación (email/contraseña + Google OAuth)
- Registro de usuarios con datos demográficos y clínicos
- Evaluación cognitiva inicial con visualización de resultados
- Panel de control del usuario
- Gestión de contraseñas olvidadas
- Cumplimiento básico de normativas de privacidad

---

## 2. OBJETIVOS DEL PROYECTO

### 2.1 Objetivos Funcionales
1. **Autenticación Segura**: Implementar sistema robusto con múltiples métodos de autenticación
2. **Recolección de Datos**: Capturar información demográfica, clínica y de evaluaciones cognitivas
3. **Visualización de Resultados**: Presentar resultados de evaluaciones de forma clara y comprensible
4. **Seguimiento Longitudinal**: Permitir registro y visualización del progreso en el tiempo
5. **Experiencia de Usuario**: Interfaz intuitiva y accesible desde cualquier dispositivo

### 2.2 Objetivos Técnicos
1. **Seguridad de Datos**: Protección de información sensible de salud (HIPAA-compliant considerations)
2. **Escalabilidad**: Arquitectura que soporte crecimiento de usuarios y datos
3. **Performance**: Tiempos de carga <3s, operaciones <1s
4. **Disponibilidad**: Funcionalidad offline básica (PWA)
5. **Mantenibilidad**: Código limpio, documentado y testeado

### 2.3 Objetivos de Negocio
1. **Validación Clínica**: Recopilar datos para estudios de efectividad
2. **Engagement**: Retención de usuarios >60% a 30 días
3. **Conversión**: Facilitar proceso de compra de productos cognitivos
4. **Cumplimiento**: Adherencia a normativas de privacidad (GDPR, CCPA)

---

## 3. ARQUITECTURA TÉCNICA

### 3.1 Stack Tecnológico

#### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript 5+
- **Estilos**: TailwindCSS 3+
- **UI Components**: shadcn/ui (opcional)
- **Gestión de Estado**: React Context + Hooks
- **Gráficos**: Recharts
- **Validación de Formularios**: React Hook Form + Zod

#### Backend (API Routes de Next.js)
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes (Route Handlers)
- **Autenticación**: NextAuth.js v5
- **Validación**: Zod
- **Seguridad**: Helmet.js, rate-limiter-flexible

#### Base de Datos
- **DBMS**: PostgreSQL 15+
- **ORM**: Prisma 5+
- **Migraciones**: Prisma Migrate
- **Encriptación**: crypto-js para campos sensibles

#### Servicios Externos
- **Email**: SendGrid / Resend
- **OAuth**: Google Cloud Platform
- **Storage**: (Futuro) AWS S3 / Cloudinary para archivos
- **Monitoreo**: (Futuro) Sentry

#### Deployment
- **Hosting**: Vercel (recomendado) / Railway / Render
- **CI/CD**: GitHub Actions / Vercel Git Integration
- **Base de Datos**: Vercel Postgres / Supabase / Neon

### 3.2 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTE                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │    Mobile    │  │   Desktop    │      │
│  │   (PWA)      │  │   (PWA)      │  │    (PWA)     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────┼─────────────────────────────────┐
│                    NEXT.JS APPLICATION                        │
│                            │                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              PRESENTATION LAYER (Pages)                 │ │
│  │  /auth/login  /auth/register  /dashboard  /evaluation  │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                            │                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           MIDDLEWARE & AUTHENTICATION                   │ │
│  │         NextAuth.js + JWT + Session Management          │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                            │                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              API LAYER (Route Handlers)                 │ │
│  │  /api/auth/*  /api/user/*  /api/evaluation/*           │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                            │                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              BUSINESS LOGIC LAYER                       │ │
│  │    Services + Validators + Data Processing              │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │ Prisma ORM
┌────────────────────────────┼─────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  PostgreSQL Database                    │ │
│  │  Users | Sessions | Evaluations | Results | Logs       │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ SendGrid │  │  Google  │  │  Sentry  │  │  Others  │    │
│  │  (Email) │  │  (OAuth) │  │  (Logs)  │  │          │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 Estructura de Carpetas

```
neuro-clinic-pwa/
├── .env.local                    # Variables de entorno
├── .env.example                  # Ejemplo de variables
├── next.config.js                # Configuración Next.js
├── tailwind.config.ts            # Configuración Tailwind
├── tsconfig.json                 # Configuración TypeScript
├── package.json
├── prisma/
│   ├── schema.prisma            # Esquema de base de datos
│   ├── migrations/              # Migraciones
│   └── seed.ts                  # Datos iniciales
├── public/
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service Worker
│   ├── icons/                   # Iconos PWA
│   └── images/
├── src/
│   ├── app/                     # App Router (Next.js 14+)
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Estilos globales
│   │   ├── api/                 # API Routes
│   │   │   ├── auth/            # Endpoints de autenticación
│   │   │   │   └── [...nextauth]/route.ts
│   │   │   ├── user/            # Endpoints de usuario
│   │   │   │   ├── profile/route.ts
│   │   │   │   └── register/route.ts
│   │   │   └── evaluation/      # Endpoints de evaluaciones
│   │   │       ├── create/route.ts
│   │   │       ├── list/route.ts
│   │   │       └── [id]/route.ts
│   │   ├── auth/                # Páginas de autenticación
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   └── verify-email/page.tsx
│   │   ├── dashboard/           # Panel de usuario
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── history/page.tsx
│   │   └── evaluation/          # Evaluaciones
│   │       ├── initial/page.tsx
│   │       ├── results/[id]/page.tsx
│   │       └── history/page.tsx
│   ├── components/              # Componentes React
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── GoogleAuthButton.tsx
│   │   │   └── ForgotPasswordForm.tsx
│   │   ├── evaluation/
│   │   │   ├── EvaluationForm.tsx
│   │   │   ├── ResultsRadarChart.tsx
│   │   │   └── ProgressTimeline.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsCards.tsx
│   │   │   ├── RecentEvaluations.tsx
│   │   │   └── ProgressChart.tsx
│   │   └── ui/                  # Componentes reutilizables
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── Modal.tsx
│   ├── lib/                     # Librerías y utilidades
│   │   ├── prisma.ts           # Cliente Prisma
│   │   ├── auth.ts             # Configuración NextAuth
│   │   ├── email.ts            # Servicio de email
│   │   ├── encryption.ts       # Utilidades de encriptación
│   │   ├── validation.ts       # Esquemas Zod
│   │   └── utils.ts            # Utilidades generales
│   ├── services/               # Lógica de negocio
│   │   ├── user.service.ts
│   │   ├── evaluation.service.ts
│   │   ├── auth.service.ts
│   │   └── analytics.service.ts
│   ├── types/                  # Tipos TypeScript
│   │   ├── user.ts
│   │   ├── evaluation.ts
│   │   └── api.ts
│   ├── middleware.ts           # Middleware Next.js
│   └── constants/              # Constantes de la aplicación
│       ├── routes.ts
│       ├── evaluations.ts
│       └── messages.ts
└── tests/                      # Tests
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 4. DISEÑO DE BASE DE DATOS

### 4.1 Esquema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============= AUTENTICACIÓN =============

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  emailVerified     DateTime?
  password          String?   // Null para usuarios OAuth
  name              String?
  image             String?
  role              UserRole  @default(PATIENT)
  isActive          Boolean   @default(false)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  lastLoginAt       DateTime?
  
  // Relaciones
  accounts          Account[]
  sessions          Session[]
  profile           UserProfile?
  evaluations       Evaluation[]
  passwordResetTokens PasswordResetToken[]
  emailVerificationTokens EmailVerificationToken[]
  auditLogs         AuditLog[]
  
  @@index([email])
  @@map("users")
}

enum UserRole {
  PATIENT
  RESEARCHER
  ADMIN
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@map("sessions")
}

model PasswordResetToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  expires   DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([token])
  @@index([userId])
  @@map("password_reset_tokens")
}

model EmailVerificationToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  expires   DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([token])
  @@index([userId])
  @@map("email_verification_tokens")
}

// ============= PERFIL DE USUARIO =============

model UserProfile {
  id        String   @id @default(cuid())
  userId    String   @unique
  
  // Datos demográficos
  dateOfBirth     DateTime?
  gender          Gender?
  country         String?
  city            String?
  phoneNumber     String?     // Encriptado
  
  // Datos clínicos
  educationLevel  EducationLevel?
  occupation      String?
  medicalHistory  String?     @db.Text // Encriptado
  currentMedications String?  @db.Text // Encriptado
  familyHistory   String?     @db.Text // Encriptado
  previousProducts String?    @db.Text
  
  // Estilo de vida
  sleepQuality    SleepQuality?
  sleepHoursAvg   Float?
  physicalActivity ActivityLevel?
  
  // Consentimiento
  consentGiven    Boolean  @default(false)
  consentDate     DateTime?
  consentVersion  String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@map("user_profiles")
}

enum Gender {
  MALE
  FEMALE
  NON_BINARY
  PREFER_NOT_TO_SAY
  OTHER
}

enum EducationLevel {
  PRIMARY
  SECONDARY
  TECHNICAL
  UNDERGRADUATE
  POSTGRADUATE
  DOCTORATE
}

enum SleepQuality {
  VERY_POOR
  POOR
  FAIR
  GOOD
  EXCELLENT
}

enum ActivityLevel {
  SEDENTARY
  LIGHT
  MODERATE
  ACTIVE
  VERY_ACTIVE
}

// ============= EVALUACIONES =============

model Evaluation {
  id          String   @id @default(cuid())
  userId      String
  type        EvaluationType
  status      EvaluationStatus @default(IN_PROGRESS)
  startedAt   DateTime @default(now())
  completedAt DateTime?
  duration    Int?     // Segundos
  
  // Resultados agregados
  overallScore Float?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  domains EvaluationDomain[]
  responses EvaluationResponse[]
  
  @@index([userId])
  @@index([type])
  @@index([createdAt])
  @@map("evaluations")
}

enum EvaluationType {
  INITIAL
  FOLLOW_UP_1WEEK
  FOLLOW_UP_1MONTH
  FOLLOW_UP_3MONTHS
  FOLLOW_UP_6MONTHS
}

enum EvaluationStatus {
  IN_PROGRESS
  COMPLETED
  ABANDONED
  INVALIDATED
}

model EvaluationDomain {
  id           String @id @default(cuid())
  evaluationId String
  domain       CognitiveDomain
  score        Float
  rawScore     Int?
  percentile   Float?
  
  evaluation Evaluation @relation(fields: [evaluationId], references: [id], onDelete: Cascade)
  
  @@index([evaluationId])
  @@index([domain])
  @@map("evaluation_domains")
}

enum CognitiveDomain {
  MEMORY
  ATTENTION
  PROCESSING_SPEED
  EXECUTIVE_FUNCTION
  VERBAL_FLUENCY
  VISUOSPATIAL
}

model EvaluationResponse {
  id           String   @id @default(cuid())
  evaluationId String
  questionId   String
  questionText String
  response     String   @db.Text
  score        Float?
  isCorrect    Boolean?
  responseTime Int?     // Milisegundos
  createdAt    DateTime @default(now())
  
  evaluation Evaluation @relation(fields: [evaluationId], references: [id], onDelete: Cascade)
  
  @@index([evaluationId])
  @@map("evaluation_responses")
}

// ============= AUDITORÍA Y SEGURIDAD =============

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String
  resource  String
  details   Json?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  
  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("audit_logs")
}

model RateLimitLog {
  id        String   @id @default(cuid())
  identifier String  // IP o userId
  endpoint  String
  attempts  Int      @default(1)
  lastAttempt DateTime @default(now())
  expiresAt DateTime
  
  @@unique([identifier, endpoint])
  @@index([identifier])
  @@index([expiresAt])
  @@map("rate_limit_logs")
}
```

### 4.2 Índices y Optimización

**Índices principales:**
- `users.email` (único, búsqueda frecuente)
- `users.id` (clave primaria)
- `evaluations.userId` (filtrado por usuario)
- `evaluations.createdAt` (ordenamiento temporal)
- `audit_logs.createdAt` (limpieza periódica)

**Consideraciones de performance:**
- Usar conexión pool de Prisma
- Implementar paginación en listas >100 registros
- Cache de consultas frecuentes (Redis en futuro)

---

## 5. FLUJO DE AUTENTICACIÓN

### 5.1 Diagrama de Flujo - Registro de Usuario

```
INICIO
  │
  ├─→ Usuario accede a /auth/register
  │
  ├─→ [Opción 1: Email/Contraseña]
  │   │
  │   ├─→ Usuario completa formulario:
  │   │   • Email
  │   │   • Contraseña (validación: 8+ chars, 1 mayúscula, 1 número)
  │   │   • Confirmar contraseña
  │   │   • Nombre completo
  │   │   • Checkbox: Acepto términos y condiciones
  │   │
  │   ├─→ Validación frontend (Zod + React Hook Form)
  │   │   ├─→ ❌ Error → Mostrar mensajes de error
  │   │   └─→ ✅ OK → Continuar
  │   │
  │   ├─→ POST /api/user/register
  │   │   │
  │   │   ├─→ Validación backend:
  │   │   │   • Email no existe
  │   │   │   • Formato válido
  │   │   │   • Contraseña cumple requisitos
  │   │   │
  │   │   ├─→ Hash de contraseña (bcrypt, 12 rounds)
  │   │   │
  │   │   ├─→ Crear usuario en DB (isActive: false)
  │   │   │
  │   │   ├─→ Generar token de verificación (UUID + expires 24h)
  │   │   │
  │   │   └─→ Enviar email de verificación
  │   │       (SendGrid con template)
  │   │
  │   └─→ Mostrar modal:
  │       "¡Registro exitoso! 
  │        Hemos enviado un email a [email] con un link de verificación.
  │        Por favor verifica tu email antes de iniciar sesión."
  │       [Botón: Ir a inicio de sesión]
  │
  ├─→ [Opción 2: Google OAuth]
  │   │
  │   ├─→ Click en "Continuar con Google"
  │   │
  │   ├─→ Redirección a Google OAuth
  │   │   (scopes: email, profile)
  │   │
  │   ├─→ Usuario autoriza en Google
  │   │
  │   ├─→ Callback a /api/auth/callback/google
  │   │   │
  │   │   ├─→ NextAuth.js valida token
  │   │   │
  │   │   ├─→ Verificar si email existe:
  │   │   │   ├─→ NO → Crear usuario + account
  │   │   │   │         (isActive: true, emailVerified: now())
  │   │   │   └─→ SÍ → Vincular account a usuario existente
  │   │   │
  │   │   └─→ Crear sesión
  │   │
  │   └─→ Redirección a /dashboard
  │       (si es nuevo usuario → mostrar modal de bienvenida)
  │
  └─→ Usuario verifica email
      │
      ├─→ Click en link: /auth/verify-email?token=XXX
      │
      ├─→ GET /api/auth/verify-email?token=XXX
      │   │
      │   ├─→ Validar token:
      │   │   ├─→ ❌ Inválido/expirado → Mostrar error + opción reenviar
      │   │   └─→ ✅ Válido → Continuar
      │   │
      │   ├─→ Actualizar usuario:
      │   │   • isActive: true
      │   │   • emailVerified: now()
      │   │   • Marcar token como usado
      │   │
      │   └─→ Log en audit_logs
      │
      └─→ Redirección a /auth/login
          Mensaje: "Email verificado correctamente. Ya puedes iniciar sesión."
          
FIN
```

### 5.2 Diagrama de Flujo - Inicio de Sesión

```
INICIO
  │
  ├─→ Usuario accede a /auth/login
  │
  ├─→ [Opción 1: Email/Contraseña]
  │   │
  │   ├─→ Usuario ingresa credenciales
  │   │
  │   ├─→ POST /api/auth/signin
  │   │   │
  │   │   ├─→ Verificar rate limit (5 intentos/15min por IP)
  │   │   │   ├─→ ❌ Excedido → Error 429
  │   │   │   └─→ ✅ OK → Continuar
  │   │   │
  │   │   ├─→ Buscar usuario por email
  │   │   │   ├─→ ❌ No existe → "Credenciales inválidas"
  │   │   │   └─→ ✅ Existe → Continuar
  │   │   │
  │   │   ├─→ Verificar usuario activo
  │   │   │   ├─→ ❌ isActive: false → 
  │   │   │   │   "Debes verificar tu email. [Reenviar email]"
  │   │   │   └─→ ✅ Activo → Continuar
  │   │   │
  │   │   ├─→ Comparar contraseña (bcrypt.compare)
  │   │   │   ├─→ ❌ Incorrecta → "Credenciales inválidas"
  │   │   │   └─→ ✅ Correcta → Continuar
  │   │   │
  │   │   ├─→ Crear sesión (NextAuth.js)
  │   │   │   • Generar JWT
  │   │   │   • Guardar session en DB
  │   │   │   • Set cookie segura (httpOnly, secure, sameSite)
  │   │   │
  │   │   ├─→ Actualizar lastLoginAt
  │   │   │
  │   │   └─→ Log en audit_logs
  │   │
  │   └─→ Redirección a /dashboard
  │
  ├─→ [Opción 2: Google OAuth]
  │   │
  │   └─→ (Mismo flujo que registro, pero verifica usuario existente)
  │
  └─→ Link "¿Olvidaste tu contraseña?"
      │
      └─→ Redirección a /auth/forgot-password

FIN
```

### 5.3 Diagrama de Flujo - Recuperación de Contraseña

```
INICIO
  │
  ├─→ Usuario accede a /auth/forgot-password
  │
  ├─→ Usuario ingresa email
  │
  ├─→ POST /api/auth/forgot-password
  │   │
  │   ├─→ Verificar rate limit (3 intentos/hora por email)
  │   │
  │   ├─→ Buscar usuario por email
  │   │   ├─→ ❌ No existe → Mostrar mensaje genérico
  │   │   │   (Seguridad: no revelar si email existe)
  │   │   │   "Si el email existe, recibirás instrucciones"
  │   │   └─→ ✅ Existe → Continuar
  │   │
  │   ├─→ Generar token de reset (crypto.randomBytes)
  │   │   • Expires: 30 minutos
  │   │   • Guardar hash en DB
  │   │
  │   ├─→ Enviar email con link:
  │   │   /auth/reset-password?token=XXX
  │   │
  │   └─→ Log en audit_logs
  │
  ├─→ Mostrar mensaje:
  │   "Si el email existe en nuestro sistema, recibirás 
  │    instrucciones para restablecer tu contraseña."
  │
  └─→ Usuario recibe email y click en link
      │
      ├─→ GET /auth/reset-password?token=XXX
      │   │
      │   ├─→ Validar token:
      │   │   ├─→ ❌ Inválido/expirado → Mostrar error
      │   │   └─→ ✅ Válido → Mostrar formulario
      │   │
      │   └─→ Usuario ingresa nueva contraseña
      │
      ├─→ POST /api/auth/reset-password
      │   │
      │   ├─→ Validar token nuevamente
      │   │
      │   ├─→ Validar nueva contraseña (requisitos)
      │   │
      │   ├─→ Hash nueva contraseña (bcrypt)
      │   │
      │   ├─→ Actualizar usuario
      │   │
      │   ├─→ Marcar token como usado
      │   │
      │   ├─→ Invalidar todas las sesiones activas
      │   │
      │   └─→ Log en audit_logs
      │
      └─→ Redirección a /auth/login
          Mensaje: "Contraseña actualizada. Inicia sesión con tu nueva contraseña."

FIN
```

---

## 6. FLUJO DE USUARIO POST-REGISTRO

### 6.1 Primera Experiencia del Usuario

```
Usuario verifica email y hace login por primera vez
  │
  ├─→ Redirección a /dashboard
  │
  ├─→ Detectar perfil incompleto (UserProfile no existe)
  │
  ├─→ Mostrar Modal de Bienvenida:
  │   │
  │   ├─→ Título: "¡Bienvenido a [Nombre Clínica]!"
  │   │
  │   ├─→ Contenido:
  │   │   "Para comenzar tu evaluación cognitiva y aprovechar
  │   │    al máximo nuestra plataforma, necesitamos conocerte mejor.
  │   │    
  │   │    Este proceso tomará aproximadamente 5-7 minutos:
  │   │    1️⃣ Completar tu perfil (datos demográficos y clínicos)
  │   │    2️⃣ Realizar tu evaluación cognitiva inicial
  │   │    3️⃣ Visualizar tus resultados
  │   │    
  │   │    Toda tu información está protegida y será utilizada
  │   │    únicamente para fines clínicos y de investigación."
  │   │
  │   └─→ Botones:
  │       • [Comenzar ahora] → /dashboard/profile/complete
  │       • [Más tarde] → Cerrar modal, recordar en próximo login
  │
  ├─→ Usuario click "Comenzar ahora"
  │
  ├─→ Redirección a /dashboard/profile/complete
  │   │
  │   ├─→ Formulario Multi-Step (3 pasos):
  │   │   │
  │   │   ├─→ PASO 1: Información Demográfica
  │   │   │   • Fecha de nacimiento*
  │   │   │   • Género*
  │   │   │   • País*
  │   │   │   • Ciudad*
  │   │   │   • Teléfono (opcional)
  │   │   │   [Siguiente →]
  │   │   │
  │   │   ├─→ PASO 2: Información Educativa y Laboral
  │   │   │   • Nivel educativo*
  │   │   │   • Ocupación actual*
  │   │   │   • Horas de trabajo semanales
  │   │   │   [← Anterior] [Siguiente →]
  │   │   │
  │   │   └─→ PASO 3: Información de Salud y Estilo de Vida
  │   │       • ¿Has consumido productos cognitivos antes? (Sí/No)
  │   │       • Si sí, ¿cuáles? (textarea)
  │   │       • Medicamentos actuales (textarea, encriptado)
  │   │       • Condiciones de salud relevantes (textarea, encriptado)
  │   │       • Antecedentes familiares neurológicos (textarea)
  │   │       • Calidad de sueño* (escala 1-5)
  │   │       • Horas de sueño promedio*
  │   │       • Nivel de actividad física* (escala)
  │   │       • Checkbox: Doy mi consentimiento informado*
  │   │       • Checkbox: Acepto política de privacidad*
  │   │       [← Anterior] [Completar perfil]
  │   │
  │   └─→ POST /api/user/profile
  │       • Validación Zod
  │       • Encriptación de campos sensibles
  │       • Guardar en DB
  │       • Log en audit_logs
  │
  ├─→ Redirección a /evaluation/initial
  │   │
  │   ├─→ Pantalla de Introducción:
  │   │   "Evaluación Cognitiva Inicial
  │   │   
  │   │    Esta evaluación medirá diferentes aspectos de tu
  │   │    función cognitiva. Durará aproximadamente 15-20 minutos.
  │   │    
  │   │    Recomendaciones:
  │   │    • Busca un lugar tranquilo sin distracciones
  │   │    • Usa auriculares si es posible
  │   │    • Responde con honestidad y sin apuros
  │   │    
  │   │    La evaluación incluye:
  │   │    ✓ Memoria (5 min)
  │   │    ✓ Atención (3 min)
  │   │    ✓ Velocidad de procesamiento (4 min)
  │   │    ✓ Función ejecutiva (5 min)
  │   │    ✓ Fluidez verbal (3 min)"
  │   │   
  │   │   [Comenzar evaluación]
  │   │
  │   ├─→ Serie de preguntas/ejercicios por dominio cognitivo
  │   │   • Guardar respuestas en tiempo real (auto-save cada 30s)
  │   │   • Progress bar indicando avance
  │   │   • Timer visible
  │   │   • Permitir pausar y reanudar (1 vez máximo)
  │   │
  │   ├─→ POST /api/evaluation/create (al iniciar)
  │   ├─→ PATCH /api/evaluation/[id]/response (cada respuesta)
  │   └─→ POST /api/evaluation/[id]/complete (al finalizar)
  │
  ├─→ Procesamiento de resultados (loading 2-3s)
  │   • Calcular scores por dominio
  │   • Calcular score general
  │   • Calcular percentiles (comparar con población)
  │   • Generar análisis textual
  │
  └─→ Redirección a /evaluation/results/[id]
      │
      ├─→ Pantalla de Resultados:
      │   │
      │   ├─→ Sección 1: Score General
      │   │   "Tu Puntuación Global: 78/100
      │   │    Esto te sitúa en el percentil 65 de la población"
      │   │   [Badge visual: "Rendimiento Bueno"]
      │   │
      │   ├─→ Sección 2: Gráfico de Radar
      │   │   Visualización de 6 dominios cognitivos
      │   │   (Radar Chart con Recharts)
      │   │
      │   ├─→ Sección 3: Análisis Detallado
      │   │   Por cada dominio:
      │   │   • Nombre del dominio
      │   │   • Score numérico
      │   │   • Interpretación textual
      │   │   • Recomendaciones
      │   │
      │   ├─→ Sección 4: Próximos Pasos
      │   │   "Recomendaciones:
      │   │    • Realizar seguimiento en 1 semana
      │   │    • Explorar nuestros productos cognitivos
      │   │    • Mantener hábitos saludables"
      │   │
      │   └─→ Botones:
      │       • [Descargar PDF]
      │       • [Ir al Dashboard]
      │       • [Ver productos recomendados]
      │
      └─→ Usuario navega al Dashboard
          (ahora puede ver historial, realizar nuevas evaluaciones, etc.)

FIN
```

---

## 7. COMPONENTES PRINCIPALES

### 7.1 Componente: LoginForm

**Ubicación**: `src/components/auth/LoginForm.tsx`

**Funcionalidad**:
- Input email con validación
- Input password con toggle show/hide
- Botón "Recordarme"
- Botón submit con loading state
- Links a: "Olvidé mi contraseña", "Crear cuenta"
- Separador "o continuar con"
- Botón Google OAuth
- Manejo de errores con mensajes amigables

**Props**:
```typescript
interface LoginFormProps {
  callbackUrl?: string;
  onSuccess?: () => void;
}
```

**Validación (Zod)**:
```typescript
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
  rememberMe: z.boolean().optional()
});
```

---

### 7.2 Componente: RegisterForm

**Ubicación**: `src/components/auth/RegisterForm.tsx`

**Funcionalidad**:
- Input email
- Input password con indicador de fortaleza
- Input confirmar password
- Input nombre completo
- Checkbox términos y condiciones
- Botón submit
- Link a login
- Botón Google OAuth

**Validación (Zod)**:
```typescript
const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos y condiciones"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});
```

---

### 7.3 Componente: ProfileCompletionForm

**Ubicación**: `src/components/dashboard/ProfileCompletionForm.tsx`

**Funcionalidad**:
- Multi-step form (3 pasos)
- Progress indicator
- Validación por paso
- Auto-save en localStorage (backup, borrar al completar)
- Navegación anterior/siguiente
- Encriptación de campos sensibles antes de enviar

**Estado**:
```typescript
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState<ProfileFormData>({...});
```

---

### 7.4 Componente: ResultsRadarChart

**Ubicación**: `src/components/evaluation/ResultsRadarChart.tsx`

**Funcionalidad**:
- Visualización de 6 dominios cognitivos
- Tooltip con detalles al hover
- Responsive
- Colores diferenciados por nivel de desempeño
- Comparación con promedio poblacional (opcional)

**Props**:
```typescript
interface RadarChartProps {
  data: {
    domain: string;
    score: number;
    maxScore: number;
    populationAvg?: number;
  }[];
  showPopulationAvg?: boolean;
}
```

**Librería**: Recharts
```tsx
<RadarChart data={chartData}>
  <PolarGrid />
  <PolarAngleAxis dataKey="domain" />
  <PolarRadiusAxis angle={90} domain={[0, 100]} />
  <Radar name="Tu puntuación" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
  {showPopulationAvg && (
    <Radar name="Promedio poblacional" dataKey="populationAvg" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
  )}
  <Legend />
  <Tooltip />
</RadarChart>
```

---

### 7.5 Componente: DashboardStats

**Ubicación**: `src/components/dashboard/DashboardStats.tsx`

**Funcionalidad**:
- Cards con estadísticas principales:
  - Evaluaciones completadas
  - Última evaluación (fecha)
  - Score promedio
  - Progreso vs evaluación inicial
- Iconos visuales
- Animaciones al cargar

---

### 7.6 Componente: EvaluationForm

**Ubicación**: `src/components/evaluation/EvaluationForm.tsx`

**Funcionalidad**:
- Renderizado dinámico de preguntas según tipo
- Tipos de preguntas:
  - Opción múltiple
  - Verdadero/Falso
  - Escala Likert
  - Entrada de texto
  - Memoria de secuencias
  - Reacción temporal
- Progress bar
- Timer
- Auto-save cada 30s
- Validación de respuesta antes de avanzar

---

## 8. SEGURIDAD

### 8.1 Medidas Implementadas

#### Autenticación
- ✅ Passwords hasheados con bcrypt (12 rounds)
- ✅ JWT tokens con expiración (7 días)
- ✅ Refresh tokens para sesiones largas
- ✅ Cookies httpOnly, secure, sameSite=strict
- ✅ Verificación de email obligatoria
- ✅ OAuth con Google (validación server-side)

#### Autorización
- ✅ Middleware de Next.js para rutas protegidas
- ✅ Validación de rol en API routes
- ✅ Verificación de ownership de recursos
- ✅ Rate limiting por IP y usuario

#### Protección de Datos
- ✅ Encriptación AES-256 para campos sensibles:
  - Teléfono
  - Medicamentos
  - Historial médico
  - Antecedentes familiares
- ✅ HTTPS obligatorio en producción
- ✅ CORS restrictivo (solo dominios permitidos)
- ✅ Sanitización de inputs (XSS prevention)
- ✅ Prepared statements (SQL injection prevention)

#### Rate Limiting
```typescript
// Configuración por endpoint
const rateLimits = {
  '/api/auth/login': { max: 5, window: 15 * 60 * 1000 }, // 5 intentos/15min
  '/api/auth/register': { max: 3, window: 60 * 60 * 1000 }, // 3 intentos/hora
  '/api/auth/forgot-password': { max: 3, window: 60 * 60 * 1000 },
  '/api/evaluation/*': { max: 10, window: 60 * 1000 }, // 10 requests/min
};
```

#### Validación
- ✅ Validación en cliente (React Hook Form + Zod)
- ✅ Validación en servidor (Zod schemas)
- ✅ Validación de tipos de archivo (uploads futuros)
- ✅ Validación de tamaño de payloads

#### Auditoría
- ✅ Logging de acciones sensibles:
  - Registro de usuario
  - Login/Logout
  - Cambio de contraseña
  - Creación/modificación de evaluaciones
  - Acceso a datos sensibles
- ✅ Retención de logs: 90 días
- ✅ IP address y user agent tracking

#### Headers de Seguridad (Helmet.js)
```typescript
{
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.anthropic.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
}
```

### 8.2 Cumplimiento Normativo

#### GDPR (Europa)
- ✅ Consentimiento explícito para procesamiento de datos
- ✅ Derecho al olvido (delete account + cascade)
- ✅ Derecho a portabilidad de datos (export JSON)
- ✅ Política de privacidad accesible
- ✅ Data breach notification process

#### CCPA (California)
- ✅ Derecho a saber qué datos se recopilan
- ✅ Derecho a eliminar datos personales
- ✅ Opt-out de venta de datos (N/A, no vendemos datos)

#### HIPAA Considerations (EE.UU. - datos de salud)
- ⚠️ No es totalmente HIPAA-compliant (requiere BAA con hosting)
- ✅ Encriptación de PHI (Protected Health Information)
- ✅ Audit logs de acceso a datos de salud
- ✅ Access controls basados en rol
- 📋 TODO: Implementar firma de BAA con proveedor de hosting

---

## 9. TESTING

### 9.1 Estrategia de Testing

#### Unit Tests (Jest + React Testing Library)
- Componentes individuales
- Funciones de utilidad
- Validaciones Zod
- Servicios de negocio

**Cobertura objetivo**: >80%

**Ejemplo**:
```typescript
// tests/unit/components/auth/LoginForm.test.tsx
describe('LoginForm', () => {
  it('should display validation errors for invalid email', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });
});
```

#### Integration Tests
- Flujos de autenticación completos
- Creación de evaluación end-to-end
- API routes con DB en memoria

#### E2E Tests (Playwright)
- Flujo de registro completo
- Flujo de evaluación completa
- Flujo de recuperación de contraseña

**Ejemplo**:
```typescript
// tests/e2e/auth/register.spec.ts
test('user can register and verify email', async ({ page }) => {
  await page.goto('/auth/register');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'Test123!@#');
  await page.fill('[name="confirmPassword"]', 'Test123!@#');
  await page.fill('[name="name"]', 'Test User');
  await page.check('[name="acceptTerms"]');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=Registro exitoso')).toBeVisible();
});
```

### 9.2 Testing de Seguridad

- SQL Injection tests
- XSS tests
- CSRF tests
- Rate limiting tests
- Authentication bypass tests

---

## 10. DEPLOYMENT Y CI/CD

### 10.1 Entornos

1. **Development** (local)
   - Database: PostgreSQL local
   - Variables: `.env.local`

2. **Staging** (pre-producción)
   - URL: `staging.neuroclínica.com`
   - Database: PostgreSQL en Vercel/Supabase
   - Variables: Vercel Environment Variables

3. **Production**
   - URL: `neuroclínica.com`
   - Database: PostgreSQL en Vercel/Supabase (instancia separada)
   - Variables: Vercel Environment Variables

### 10.2 Pipeline CI/CD (GitHub Actions)

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:unit
      - run: npm run test:integration
  
  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
  
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}
```

### 10.3 Variables de Entorno

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/neuro_clinic"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Service (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@neuroclínica.com"

# Encryption
ENCRYPTION_KEY="generate-with: openssl rand -hex 32"

# App Config
APP_URL="http://localhost:3000"
NODE_ENV="development"

# Rate Limiting (Redis - optional)
REDIS_URL="redis://localhost:6379"
```

---

## 11. CRONOGRAMA Y FASES

### Fase 1: Configuración Inicial (Semana 1)
- ✅ Setup proyecto Next.js + TypeScript
- ✅ Configuración Prisma + PostgreSQL
- ✅ Configuración TailwindCSS
- ✅ Setup NextAuth.js
- ✅ Configuración variables de entorno
- ✅ Estructura de carpetas
- ✅ Configuración ESLint + Prettier

### Fase 2: Autenticación (Semana 2)
- ✅ Modelo de datos User + Account + Session
- ✅ API routes de autenticación
- ✅ Login/Register forms
- ✅ Google OAuth integration
- ✅ Email verification
- ✅ Forgot/Reset password
- ✅ Tests unitarios

### Fase 3: Perfil de Usuario (Semana 3)
- ✅ Modelo UserProfile
- ✅ Formulario multi-step de perfil
- ✅ Encriptación de campos sensibles
- ✅ API routes de perfil
- ✅ Validaciones Zod
- ✅ Tests

### Fase 4: Evaluaciones (Semanas 4-5)
- ✅ Modelos Evaluation + EvaluationDomain + EvaluationResponse
- ✅ API routes de evaluaciones
- ✅ Componente EvaluationForm dinámico
- ✅ Lógica de scoring
- ✅ Auto-save functionality
- ✅ Tests

### Fase 5: Visualización de Resultados (Semana 6)
- ✅ Componente RadarChart
- ✅ Página de resultados
- ✅ Análisis textual de resultados
- ✅ Export a PDF (opcional)
- ✅ Tests

### Fase 6: Dashboard (Semana 7)
- ✅ Página principal dashboard
- ✅ Stats cards
- ✅ Historial de evaluaciones
- ✅ Gráficos de progreso
- ✅ Tests

### Fase 7: Seguridad y Optimización (Semana 8)
- ✅ Implementación rate limiting
- ✅ Audit logs
- ✅ Security headers
- ✅ Performance optimization
- ✅ Lazy loading
- ✅ PWA configuration
- ✅ Tests de seguridad

### Fase 8: Testing y QA (Semana 9)
- ✅ Tests E2E completos
- ✅ Testing de seguridad
- ✅ Performance testing
- ✅ Cross-browser testing
- ✅ Mobile testing
- ✅ Accessibility audit

### Fase 9: Deployment (Semana 10)
- ✅ Setup Vercel project
- ✅ Configuración DB producción
- ✅ Setup CI/CD
- ✅ Deploy staging
- ✅ UAT (User Acceptance Testing)
- ✅ Deploy production
- ✅ Monitoring setup

### Fase 10: Documentación y Entrega (Semana 10)
- ✅ Documentación técnica
- ✅ Documentación de usuario
- ✅ Runbook de operaciones
- ✅ Capacitación equipo
- ✅ Handover

**Duración total estimada**: 10 semanas (2.5 meses)

---

## 12. MEJORAS FUTURAS (POST-MVP)

### Corto Plazo (3 meses)
1. **Notificaciones push** (PWA)
2. **Recordatorios de evaluaciones** (email + push)
3. **Exportación de datos** (GDPR compliance)
4. **Multi-idioma** (i18n - español/inglés)
5. **Modo oscuro**

### Mediano Plazo (6 meses)
1. **Panel de administración** (gestión de usuarios)
2. **Dashboard de investigador** (análisis agregados)
3. **Comparación con grupos** (estadísticas poblacionales)
4. **Gamificación** (badges, logros)
5. **Integración con wearables** (Fitbit, Apple Health)

### Largo Plazo (12 meses)
1. **Machine Learning** (predicción de deterioro cognitivo)
2. **Recomendaciones personalizadas** (productos, ejercicios)
3. **Telemedicina** (videoconsultas)
4. **Mobile apps nativas** (iOS/Android)
5. **API pública** (para investigadores)

---

## 13. RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Breach de datos de salud | Media | Crítico | Encriptación, auditorías, penetration testing |
| Performance issues con muchos usuarios | Media | Alto | Caching, CDN, load testing, escalamiento horizontal |
| Problemas de accesibilidad | Alta | Medio | Audit WCAG 2.1, testing con usuarios |
| Tasa de abandono alta en evaluación | Alta | Alto | UX testing, auto-save, feedback claro |
| Cumplimiento regulatorio insuficiente | Media | Crítico | Legal review, consultoría HIPAA/GDPR |
| Falta de adopción de usuarios | Media | Alto | Marketing, onboarding fluido, gamificación |

---

## 14. MÉTRICAS DE ÉXITO

### Métricas Técnicas
- **Uptime**: >99.9%
- **Response time**: <500ms (p95)
- **Error rate**: <0.1%
- **Test coverage**: >80%

### Métricas de Producto
- **Tasa de registro**: >40% de visitantes
- **Tasa de verificación de email**: >70%
- **Tasa de completación de perfil**: >80%
- **Tasa de completación de evaluación inicial**: >60%
- **Retención 30 días**: >50%
- **Retención 90 días**: >30%

### Métricas de Negocio
- **Usuarios activos mensuales** (MAU)
- **Evaluaciones completadas por usuario**: >2 en 3 meses
- **Tasa de conversión a compra**: (si aplica)
- **NPS (Net Promoter Score)**: >50

---

## 15. DOCUMENTACIÓN REQUERIDA

### Para Desarrollo
1. ✅ Este documento de plan técnico
2. API documentation (OpenAPI/Swagger)
3. Database schema diagram
4. Component library (Storybook)
5. Testing guidelines

### Para Usuarios
1. User manual
2. FAQ
3. Video tutorials
4. Términos y condiciones
5. Política de privacidad

### Para Operaciones
1. Runbook de deployment
2. Troubleshooting guide
3. Backup & recovery procedures
4. Incident response plan
5. Monitoring & alerting setup

---

## PRÓXIMOS PASOS

Una vez aprobado este plan:

1. **Revisar y validar** con stakeholders
2. **Ajustar cronograma** según recursos disponibles
3. **Setup de proyecto** (Fase 1)
4. **Kickoff de desarrollo**
5. **Sprints semanales** con revisiones
6. **Demo cada 2 semanas** a stakeholders

¿Estás listo para comenzar el desarrollo? 🚀