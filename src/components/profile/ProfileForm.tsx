'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/lib/supabase-queries';
import { useRouter } from 'next/navigation';

export default function ProfileForm() {
    const [formData, setFormData] = useState({
        dateOfBirth: '',
        gender: '',
        country: '',
        city: '',
        occupation: '',
        phoneNumber: '', // Optional
        workHours: '', // Optional
        consentGiven: false,
        privacyAccepted: false,
    });
    const { user, refreshProfile } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            if (!formData.consentGiven || !formData.privacyAccepted) {
                alert('Debes aceptar el consentimiento y la política de privacidad.');
                return;
            }

            // Map frontend fields to DB snake_case fields
            await updateUserProfile(user.id, {
                date_of_birth: formData.dateOfBirth,
                gender: formData.gender,
                country: formData.country,
                city: formData.city,
                occupation: formData.occupation,
                phone_number: formData.phoneNumber,
                work_hours: Number(formData.workHours),
                consent_given: formData.consentGiven,
                privacy_accepted: formData.privacyAccepted
            } as any);

            await refreshProfile();
            router.push('/evaluation/initial');
        } catch (err: any) {
            console.error(err);
            alert('Error al guardar perfil. Intenta nuevamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#8dbf44]">Información General</h2>
                <p className="text-sm text-gray-500">Sección A: Tus datos para personalizar la experiencia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento *</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#8dbf44] outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sexo *</label>
                    <div className="flex space-x-4 mt-2">
                        {['Masculino', 'Femenino', 'Otro'].map((opt) => (
                            <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={opt === 'Masculino' ? 'MALE' : opt === 'Femenino' ? 'FEMALE' : 'OTHER'}
                                    onChange={handleChange}
                                    className="text-[#8dbf44] focus:ring-[#8dbf44]"
                                    required
                                />
                                <span className="text-sm text-gray-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">País *</label>
                    <input
                        type="text"
                        name="country"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#8dbf44] outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad *</label>
                    <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#8dbf44] outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ocupación Actual *</label>
                    <input
                        type="text"
                        name="occupation"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#8dbf44] outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Opcional)</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#8dbf44] outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horas de trabajo semanales (Opcional)</label>
                    <input
                        type="number"
                        name="workHours"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#8dbf44] outline-none"
                    />
                </div>
            </div>

            <div className="bg-[#f0f9f0] p-4 rounded-lg space-y-3 mt-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="consentGiven"
                        onChange={handleChange}
                        className="mt-1 text-[#8dbf44] focus:ring-[#8dbf44]"
                        required
                    />
                    <span className="text-sm text-gray-700">
                        <strong>Consentimiento Informado:</strong> Confirmo que participo voluntariamente en esta evaluación y autorizo el uso de mis respuestas para la personalización del programa.
                    </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="privacyAccepted"
                        onChange={handleChange}
                        className="mt-1 text-[#8dbf44] focus:ring-[#8dbf44]"
                        required
                    />
                    <span className="text-sm text-gray-700">
                        Acepto la <strong>Política de Privacidad</strong> y el tratamiento de mis datos personales.
                    </span>
                </label>
            </div>

            <button type="submit" className="w-full bg-[#8dbf44] text-white py-3 rounded-lg hover:bg-[#7ca93a] font-semibold transition-colors shadow-md">
                Guardar y Continuar a Evaluación
            </button>
        </form>
    );
}
