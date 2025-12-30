
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { DesktopHeader } from '@/components/dashboard/DesktopHeader';
import { BottomNav } from '@/components/dashboard/BottomNav';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, profile, loading } = useAuth();
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const checkInitialEvaluation = async () => {
            if (!user) return;

            try {
                // Check if user has initial evaluation
                const { data, error } = await supabase
                    .from('evaluations')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('type', 'initial')
                    .limit(1);

                if (error) throw error;

                if (!data || data.length === 0) {
                    setShowOnboarding(true);
                }
            } catch (error) {
                console.error('Error checking initial evaluation:', error);
            }
        };

        if (!loading && user) {
            // Redirect admin users to admin dashboard
            if (profile?.role === 'admin') {
                router.push('/admin/dashboard');
                return;
            }
            checkInitialEvaluation();
        }
    }, [user, profile, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6]">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8dbf44] border-r-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            {/* md:pl-64 pushes content to right of sidebar on desktop */}
            <div className="md:pl-64 flex flex-col min-h-screen">

                {/* Desktop Header */}
                <DesktopHeader />

                {/* Content */}
                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>

                {/* Mobile Bottom Nav */}
                <div className="md:hidden">
                    <BottomNav />
                </div>
            </div>
        </div>
    );
}
