'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            toast.success('¡Bienvenido de vuelta!', {
                duration: 2000,
                position: 'top-center',
            });

            setTimeout(() => {
                router.push('/dashboard');
            }, 500);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';

            if (errorMessage.includes('Invalid credentials') || errorMessage.includes('Unauthorized')) {
                toast.error('Usuario o contraseña incorrectos', {
                    duration: 3000,
                    position: 'top-center',
                });
            } else if (errorMessage.includes('not found')) {
                toast.error('Usuario no registrado', {
                    duration: 3000,
                    position: 'top-center',
                });
            } else {
                toast.error(errorMessage, {
                    duration: 3000,
                    position: 'top-center',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f9f0]">
            <Toaster /> {/* Color based on Yakumama brand */}
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-[#8dbf44]">YAKUMAMA</h1>
                    <p className="text-gray-600">Bienestar Cognitivo</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-[#8dbf44] focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#8dbf44] text-white py-2 rounded-lg hover:bg-[#7ca93a] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <Link href="/auth/register" className="text-[#8dbf44] hover:underline font-medium">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}
