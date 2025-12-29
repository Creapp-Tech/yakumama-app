'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { AUTH_CONFIG } from '@/lib/supabase/config';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    },
                    emailRedirectTo: `${location.origin}${AUTH_CONFIG.routes.auth.callback}`,
                },
            });

            if (error) throw error;

            // Note: Ideally show a success message or redirect to a verify email page if email confirmation is enabled.
            // Assuming auto-confirm or redirect to dashboard for now/dev.

            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push(AUTH_CONFIG.routes.auth.home);
                router.refresh();
            } else {
                setError('Revisa tu correo electrónico para confirmar tu cuenta.');
            }

        } catch (err: any) {
            setError(err.message || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Crear una cuenta
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Únete a Yakumama Lifestyle hoy.
                </p>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <form className="space-y-6" onSubmit={handleRegister}>
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Nombre Completo
                    </label>
                    <div className="mt-1">
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirmar Contraseña
                    </label>
                    <div className="mt-1">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            ¿Ya tienes cuenta?
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        href="/login"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white border-green-600 hover:bg-green-50"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
