import { FC, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProgress } from '@/lib/supabase-queries';
import { UserProgress } from '@/lib/supabase';

export const DashboardHeader: FC = () => {
    const { profile, user } = useAuth();
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        if (user) {
            getUserProgress(user.id).then(setProgress);
        }
    }, [user]);

    const todayDate = new Date().getDate();
    const todayDay = new Date().toLocaleDateString('es-ES', { weekday: 'short' }).split('.')[0];

    // Generate a simple week view
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - 3 + i); // Center today
        return {
            day: d.toLocaleDateString('es-ES', { weekday: 'short' }).charAt(0).toUpperCase() + d.toLocaleDateString('es-ES', { weekday: 'short' }).slice(1, 3) + '.',
            date: d.getDate(),
            active: d.getDate() === todayDate
        };
    });

    const totalExercises = 30; // Assuming 30 total for the level
    const completed = progress?.exercises_completed || 0;
    const percentage = Math.min(100, (completed / totalExercises) * 100);

    return (
        <div className="bg-[#051c70] p-6 text-white rounded-2xl mb-6 shadow-md">
            <h2 className="text-lg font-bold mb-1">¡Hola, {profile?.full_name || 'Usuario'}!</h2>
            <div className="mb-2 text-sm text-blue-200">
                Tu progreso actual: {completed}/{totalExercises} ejercicios
            </div>
            <div className="w-full bg-[#1e3a8a] rounded-full h-3 mb-6 overflow-hidden">
                <div
                    className="bg-[#a3e635] h-full rounded-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className="flex justify-between items-center text-center">
                {days.map((d, i) => (
                    <div key={i} className={`flex flex-col items-center ${d.active ? 'text-white scale-110' : 'text-blue-300'}`}>
                        <span className="text-xs font-semibold mb-1">{d.day}</span>
                        <span className={`text-sm font-bold ${d.active ? 'text-xl' : ''}`}>{d.date}</span>
                        {d.active && <div className="mt-1 w-1.5 h-1.5 bg-[#a3e635] rounded-full"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
