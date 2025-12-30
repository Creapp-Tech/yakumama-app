
'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { StepsCard } from '@/components/dashboard/StepsCard';

export default function DashboardPage() {
    // Auth logic handled in layout.tsx

    return (
        <div className="relative pb-24 md:pb-0">
            {/* pb-24 for mobile bottom nav space, md:pb-0 for desktop */}

            {/* Background pattern (dots) - using radial gradient to simulate */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="relative z-10 max-w-md mx-auto md:max-w-4xl lg:max-w-6xl">

                <DashboardHeader />

                {/* Grid for desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ActionCard
                        badge="Entrenamiento Fisico"
                        title="Fuerza en Casa"
                        description={`Pecho, Espalda, Triceps +2\n40 Min`}
                        buttonText="Entrenamiento Fisico"
                        imageSrc="/assets/dashboard/physical.png"
                        href="/dashboard/workout"
                        accentColor="bg-[#8b5cf6]"
                    />

                    <ActionCard
                        badge="Nutricion Cerebral"
                        title="Bajar de Peso"
                        description={`Comidas y Snacks\nPlan Balanceado`}
                        buttonText="Recetas Diarias"
                        imageSrc="/assets/dashboard/nutrition.png"
                        href="/dashboard/diet"
                        accentColor="bg-[#8b5cf6]"
                    />

                    <ActionCard
                        badge="Bienestar Cognitivo"
                        title="Contracion y Memoria"
                        description={`Actividades de la vida diaria\nEstimulación Mental`}
                        buttonText="Rutina Cognitiva"
                        imageSrc="/assets/dashboard/cognitive.png"
                        href="/dashboard/cognitive"
                        accentColor="bg-[#8b5cf6]"
                    />
                </div>

                <div className="mt-6">
                    <StepsCard />
                </div>
            </div>
        </div>
    );
}
