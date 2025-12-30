# Instrucciones para Configurar Supabase

## Paso 1: Ejecutar la Migración SQL

1. Ve al dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto `yakumama_lyfestyle`
3. Ve a la sección **SQL Editor** en el menú lateral
4. Crea una nueva query
5. Copia y pega todo el contenido del archivo `supabase-migration.sql`
6. Ejecuta la query (botón "Run" o Ctrl+Enter)

Esto creará todas las tablas, índices, políticas de seguridad y triggers necesarios.

## Paso 2: Configurar Autenticación

### Habilitar Email/Password Authentication

1. En el dashboard de Supabase, ve a **Authentication** > **Providers**
2. Asegúrate de que **Email** esté habilitado
3. Desactiva "Confirm email" si quieres que los usuarios puedan iniciar sesión inmediatamente sin confirmar email (recomendado para desarrollo)

### Configurar Google OAuth (Opcional)

1. Ve a **Authentication** > **Providers**
2. Habilita **Google**
3. Necesitarás configurar OAuth en Google Cloud Console:
   - Ve a https://console.cloud.google.com
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita Google+ API
   - Ve a "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID"
   - Tipo de aplicación: Web application
   - Authorized redirect URIs: `https://mwpjnvwcrjmggnqgobyt.supabase.co/auth/v1/callback`
   - Copia el Client ID y Client Secret
4. Pega el Client ID y Client Secret en Supabase
5. Guarda los cambios

## Paso 3: Crear Usuarios Iniciales

### Opción A: Desde el Dashboard de Supabase

1. Ve a **Authentication** > **Users**
2. Click en "Add user" > "Create new user"
3. Para el administrador:
   - Email: `admin@mail.com`
   - Password: `admin123`
   - Auto Confirm User: ✓ (marcado)
4. Repite para el usuario regular:
   - Email: `user@mail.com`
   - Password: `user123`
   - Auto Confirm User: ✓ (marcado)

### Opción B: Desde SQL Editor

Después de crear los usuarios en Authentication, ejecuta este SQL para crear sus perfiles:

```sql
-- Obtener los IDs de los usuarios creados
SELECT id, email FROM auth.users;

-- Crear perfil de admin (reemplaza 'ADMIN_USER_ID' con el ID real)
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
    'ADMIN_USER_ID',
    'admin@mail.com',
    'Administrador',
    'admin'
);

-- Crear perfil de usuario (reemplaza 'USER_USER_ID' con el ID real)
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
    'USER_USER_ID',
    'user@mail.com',
    'Usuario Regular',
    'user'
);

-- Crear progreso inicial para ambos usuarios
INSERT INTO public.user_progress (user_id, exercises_completed, tests_completed)
VALUES 
    ('ADMIN_USER_ID', 0, 0),
    ('USER_USER_ID', 0, 0);
```

## Paso 4: Configurar URLs de Redirección

1. Ve a **Authentication** > **URL Configuration**
2. Agrega las siguientes URLs:
   - Site URL: `http://localhost:3000` (para desarrollo)
   - Redirect URLs: 
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/dashboard`
     - `http://localhost:3000/admin/dashboard`

## Paso 5: Verificar la Configuración

1. Inicia el servidor de desarrollo:
   ```bash
   cd frontend
   npm run dev
   ```

2. Abre http://localhost:3000/auth/login

3. Prueba iniciar sesión con:
   - Admin: `admin@mail.com` / `admin123`
   - Usuario: `user@mail.com` / `user123`

## Notas Importantes

- **Row Level Security (RLS)**: Todas las tablas tienen RLS habilitado. Los usuarios solo pueden ver sus propios datos, excepto los administradores que pueden ver todo.
- **Roles**: Los roles se asignan en la tabla `profiles`. Solo los usuarios con rol 'admin' pueden acceder al panel de administrador.
- **Google OAuth**: Si configuras Google OAuth, los usuarios que se registren con Google tendrán automáticamente el rol 'user'. Para hacerlos admin, debes actualizar su rol manualmente en la base de datos.

## Solución de Problemas

### Error: "relation does not exist"
- Asegúrate de haber ejecutado el archivo `supabase-migration.sql` completo

### Error: "new row violates row-level security policy"
- Verifica que las políticas RLS se hayan creado correctamente
- Asegúrate de que el usuario esté autenticado

### Los usuarios no pueden ver sus datos
- Verifica que el perfil del usuario exista en la tabla `profiles`
- Verifica que el `id` del perfil coincida con el `id` del usuario en `auth.users`
