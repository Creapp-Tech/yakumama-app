import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet: any[]) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protected routes that require authentication
    const protectedPaths = ['/dashboard', '/admin'];
    const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

    // If trying to access protected route without session, redirect to login
    if (isProtectedPath && !user) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Role-based redirection logic
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        const role = profile?.role;

        // If accessing admin routes, check for admin role
        if (request.nextUrl.pathname.startsWith('/admin')) {
            if (role !== 'admin') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        // If logged in and trying to access auth pages, redirect to appropriate dashboard
        if (request.nextUrl.pathname.startsWith('/auth')) {
            if (role === 'admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.url));
            } else {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
    }

    return response;
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
};
