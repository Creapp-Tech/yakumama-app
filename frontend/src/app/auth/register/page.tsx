'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password, name });
            // Auto login or redirect to login
            router.push('/auth/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f9f0]">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-[#8dbf44]">Crear Cuenta</h1>
                    <p className="text-gray-600">Únete a Yakumama Lifestyle</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#8dbf44] text-white py-2 rounded-lg hover:bg-[#7ca93a] transition-colors font-semibold"
                    >
                        Registrarse
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/auth/login" className="text-[#8dbf44] hover:underline font-medium">
                        Inicia Sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
