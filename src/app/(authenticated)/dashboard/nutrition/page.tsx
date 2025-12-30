
import NutritionWizard from '@/components/nutrition/NutritionWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Evaluación Nutricional | Yakumama',
    description: 'Descubre tu estado nutricional y recibe recomendaciones personalizadas.',
};

export default function NutritionPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Evaluación de Nutrición Cerebral
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Analizamos 6 dominios clave para crear tu stack de suplementación ideal.
                </p>
            </div>

            <NutritionWizard />
        </div>
    );
}
