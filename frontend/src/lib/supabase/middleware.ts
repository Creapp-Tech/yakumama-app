import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { AUTH_CONFIG } from './config'

export const updateSession = async (request: NextRequest) => {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Create client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value)
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    // Refresh session if needed
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname
    const { protected: protectedRoutes, public: publicRoutes, auth } = AUTH_CONFIG.routes

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

    // Check if route is an auth page (login/register) - prevent access if already logged in
    const isAuthPage = [auth.login, '/register', '/forgot-password'].includes(path)

    // If user is not signed in and tries to access a protected route
    if (!user && isProtectedRoute) {
        const url = request.nextUrl.clone()
        url.pathname = auth.login
        url.searchParams.set('next', path)
        return NextResponse.redirect(url)
    }

    // If user is signed in and tries to access login/register
    if (user && isAuthPage) {
        const url = request.nextUrl.clone()
        url.pathname = auth.home
        return NextResponse.redirect(url)
    }

    return response
}
