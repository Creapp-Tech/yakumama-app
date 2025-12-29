'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { AUTH_CONFIG } from '@/lib/supabase/config';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}${AUTH_CONFIG.routes.auth.callback}?next=/settings/password`,
            });

            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Error al enviar instrucciones');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Recuperar Contraseña
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Ingresa tu email y te enviaremos instrucciones.
                </p>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">
                        Si existe una cuenta con ese correo, recibirás instrucciones para restablecer tu contraseña.
                    </span>
                </div>
            )}

            <form className="space-y-6" onSubmit={handleReset}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        {loading ? 'Enviando...' : 'Enviar Instrucciones'}
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
                            ¿Ya recordaste tu contraseña?
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        href="/login"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white border-green-600 hover:bg-green-50"
                    >
                        Volver a Iniciar Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
