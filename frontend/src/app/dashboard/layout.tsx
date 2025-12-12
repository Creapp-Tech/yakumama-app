
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { DesktopHeader } from '@/components/dashboard/DesktopHeader';
import { Footer } from '@/components/dashboard/Footer';
import { BottomNav } from '@/components/dashboard/BottomNav';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const user = localStorage.getItem('user');
            if (!user) {
                router.push('/auth/login');
                return;
            }

            // Check if user has initial evaluation
            try {
                const response = await api.get('/evaluation/user/has-initial');
                if (!response.data.hasInitialEvaluation) {
                    setShowOnboarding(true);
                }
            } catch (error) {
                console.error('Error checking initial evaluation:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    if (isLoading) return null;

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

                {/* Desktop Footer */}
                <Footer />

                {/* Mobile Bottom Nav */}
                <div className="md:hidden">
                    <BottomNav />
                </div>
            </div>
        </div>
    );
}
