 Sistema de Autenticación y Seguridad
Contexto del Proyecto
Proyecto: Yakumama Lifestyle - Plataforma de evaluación y seguimiento de bienestar cognitivo
Stack: Next.js 14+ (App Router) + Supabase
Arquitectura: Modular

REQUERIMIENTO: Implementar Sistema Completo de Autenticación y Seguridad
1. Objetivos del Sistema
Implementar un sistema robusto de autenticación con las siguientes capacidades:

✅ Tokens de acceso JWT con expiración configurable
✅ Protección de rutas (públicas vs privadas)
✅ Auto-renovación de tokens antes de expirar
✅ Auto-logout por inactividad (15 minutos configurable)
✅ Modal de advertencia antes del cierre de sesión
✅ Protección de API Routes
✅ Row Level Security (RLS) en base de datos
✅ Session management con Supabase Auth


2. Estructura de Archivos a Crear
src/
├── middleware.ts                           # ⭐ NUEVO - Protección global
├── lib/
│   ├── supabase/
│   │   ├── client.ts                       # ⭐ NUEVO - Cliente browser
│   │   ├── server.ts                       # ⭐ NUEVO - Cliente server
│   │   ├── middleware.ts                   # ⭐ NUEVO - Cliente middleware
│   │   └── config.ts                       # ⭐ NUEVO - Configuración auth
├── hooks/
│   ├── useAuth.ts                          # ⭐ NUEVO - Hook de autenticación
│   ├── useIdleTimeout.ts                   # ⭐ NUEVO - Detección inactividad
│   └── useSession.ts                       # ⭐ NUEVO - Manejo de sesión
├── components/
│   ├── providers/
│   │   └── AuthProvider.tsx                # ⭐ NUEVO - Provider de auth
│   ├── auth/
│   │   ├── AuthListener.tsx                # ⭐ NUEVO - Listener de cambios
│   │   ├── IdleWarningModal.tsx            # ⭐ NUEVO - Modal de advertencia
│   │   └── ProtectedRoute.tsx              # ⭐ NUEVO - Wrapper de protección
├── app/
│   ├── (auth)/                             # ⭐ NUEVO - Group de rutas públicas
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx                    # ⭐ NUEVO - Página de login
│   │   ├── register/
│   │   │   └── page.tsx                    # ⭐ NUEVO - Página de registro
│   │   └── forgot-password/
│   │       └── page.tsx                    # ⭐ NUEVO - Recuperar contraseña
│   └── (authenticated)/                    # ⭐ NUEVO - Group de rutas protegidas
│       ├── layout.tsx                      # ⭐ MODIFICAR - Con protección
│       ├── dashboard/
│       ├── evaluation/
│       ├── profile/
│       └── settings/
└── types/
    └── auth.types.ts                       # ⭐ NUEVO - Tipos de autenticación

3. Configuraciones Requeridas
3.1. Variables de Entorno
bash# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
3.2. Instalación de Dependencias
bashnpm install @supabase/auth-helpers-nextjs @supabase/supabase-js
```

### 3.3. Configuración de Supabase Dashboard

En **Supabase Dashboard** → Authentication → Settings:
```
JWT Expiry: 3600 segundos (1 hora)
Refresh Token Expiry: 2592000 segundos (30 días)
Enable Email Confirmations: false (para desarrollo)

4. Implementaciones Específicas
4.1. Middleware Global (CRÍTICO)
Archivo: src/middleware.ts
Funcionalidad:

Interceptar TODAS las requests
Verificar sesión activa
Redirigir rutas protegidas sin auth → /login
Redirigir /login con auth → /dashboard
Renovar sesión automáticamente

Rutas a proteger:
javascriptprotectedRoutes: [
  '/dashboard',
  '/evaluation',
  '/profile',
  '/plans',
  '/progress',
  '/settings'
]
Rutas públicas:
javascriptpublicRoutes: [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/privacy',
  '/terms'
]

4.2. Hook de Inactividad
Archivo: src/hooks/useIdleTimeout.ts
Parámetros configurables:
typescript{
  timeoutMinutes: 15,        // Tiempo de inactividad
  warningMinutes: 2,         // Advertencia antes del logout
  enabled: true              // Activar/desactivar
}
Eventos que resetean el timer:

mousedown, mousemove, keypress, scroll, touchstart, click

Comportamiento:

A los 13 minutos → Mostrar modal de advertencia
A los 15 minutos → Logout automático
Usuario puede extender sesión haciendo click en "Continuar activo"


4.3. Modal de Advertencia
Archivo: src/components/auth/IdleWarningModal.tsx
UI Requirements:

Modal centrado con overlay oscuro
Countdown visible (120 segundos)
Botón: "Continuar activo"
Al hacer click → resetear timer y cerrar modal


4.4. AuthListener (CRÍTICO)
Archivo: src/components/auth/AuthListener.tsx
Funcionalidad:

Escuchar eventos: TOKEN_REFRESHED, SIGNED_OUT, USER_DELETED
Renovar token automáticamente antes de expirar
Redirigir a login cuando se cierra sesión
Debe incluirse en el Root Layout


4.5. Protección de API Routes
Patrón para todas las API Routes:
typescript// Ejemplo: app/api/evaluation/calculate/route.ts

1. Crear cliente de Supabase con cookies
2. Verificar sesión existe
3. Verificar token no expirado
4. Si falla → return 401 Unauthorized
5. Si OK → procesar request

4.6. Row Level Security (RLS)
Archivo: Ejecutar en Supabase SQL Editor
Tablas a proteger:

evaluations
user_plans
user_progress
user_profiles

Políticas requeridas para cada tabla:
sql-- SELECT: Users can only read own data
-- INSERT: Users can only insert own data
-- UPDATE: Users can only update own data
-- DELETE: Users can only delete own data

WHERE auth.uid() = user_id
```

---

## 5. Flujos de Usuario

### 5.1. Flujo de Login
```
1. Usuario ingresa email/password
2. Supabase valida credenciales
3. Si OK → genera JWT + refresh token
4. Redirige a /dashboard
5. Middleware verifica sesión en cada navegación
```

### 5.2. Flujo de Protección de Ruta
```
1. Usuario intenta acceder a /dashboard
2. Middleware intercepta request
3. Verifica sesión en cookies
4. Si no existe → redirect a /login
5. Si existe → permite acceso
```

### 5.3. Flujo de Inactividad
```
1. Usuario deja de interactuar
2. Timer cuenta 13 minutos
3. Muestra modal: "Sesión expirará en 2 minutos"
4. Usuario tiene 2 opciones:
   a) Click "Continuar" → resetea timer
   b) No hace nada → logout automático a los 15 min
5. Redirige a /login?reason=inactivity
```

### 5.4. Flujo de Renovación de Token
```
1. Token expira en 60 minutos
2. A los 55 minutos, Supabase renueva automáticamente
3. AuthListener detecta evento TOKEN_REFRESHED
4. Usuario continúa sin interrupciones

6. Consideraciones Técnicas
6.1. Server vs Client Components
Server Components (usar createServerComponentClient):

Páginas protegidas en /app/(authenticated)
Verificación inicial de sesión
Mejor para SEO y performance

Client Components (usar createClientComponentClient):

Formularios de login/register
Componentes interactivos
Hooks de autenticación

6.2. Manejo de Errores
Códigos de respuesta:

401 Unauthorized → Token inválido/expirado
403 Forbidden → Sin permisos
307 Temporary Redirect → Redirigir a login

6.3. Testing
Escenarios a probar:

✅ Login exitoso
✅ Login con credenciales incorrectas
✅ Acceso a ruta protegida sin auth
✅ Logout manual
✅ Logout por inactividad
✅ Renovación automática de token
✅ Modal de advertencia funciona
✅ Protección de API routes
✅ RLS en base de datos


7. Prioridades de Implementación
FASE 1 - Base (CRÍTICA)

✅ Configurar Supabase Auth
✅ Crear clientes de Supabase (client, server, middleware)
✅ Implementar middleware.ts
✅ Crear páginas de login/register
✅ Proteger rutas existentes

FASE 2 - Seguridad Avanzada

✅ Implementar hook de inactividad
✅ Crear modal de advertencia
✅ AuthListener en root layout
✅ Proteger API routes

FASE 3 - Database Security

✅ Configurar RLS en Supabase
✅ Políticas por tabla
✅ Testing de políticas

FASE 4 - UX/Testing

✅ Mensajes de error claros
✅ Loading states
✅ Testing completo
✅ Documentación de uso


8. Configuración Final
8.1. Root Layout
Archivo: src/app/layout.tsx
Debe incluir:
tsx<AuthProvider>
  <AuthListener />
  {children}
</AuthProvider>
8.2. Authenticated Layout
Archivo: src/app/(authenticated)/layout.tsx
Debe incluir:
tsx- Verificación de sesión server-side
- useIdleTimeout hook
- IdleWarningModal

9. Entregables Esperados
Código Funcional

 Todos los archivos listados creados
 Middleware funcionando
 Login/Register funcionando
 Protección de rutas funcionando
 Auto-logout por inactividad funcionando
 API routes protegidas
 RLS configurado

Testing

 Script de tests automatizados
 Checklist de casos de prueba manual

Documentación

 README con setup instructions
 Guía de uso para desarrolladores
 Configuración de variables de entorno


10. Notas Importantes
⚠️ CRÍTICO:

El middleware DEBE estar en la raíz del proyecto (src/middleware.ts)
AuthListener DEBE incluirse en el root layout
Todas las API routes DEBEN verificar sesión
RLS DEBE configurarse antes de producción

🔒 Seguridad:

NUNCA exponer SUPABASE_SERVICE_ROLE_KEY en el cliente
Usar solo NEXT_PUBLIC_SUPABASE_ANON_KEY en cliente
Validar sesiones en server-side siempre

⏱️ Tiempos configurables:

JWT expiry: lib/supabase/config.ts
Idle timeout: lib/supabase/config.ts
Warning time: lib/supabase/config.ts


11. Contacto y Dudas
Si hay dudas técnicas sobre:

Estructura de archivos
Lógica específica de algún componente
Configuración de Supabase
Testing

Solicitar clarificación antes de implementar.