
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { DesktopHeader } from '@/components/dashboard/DesktopHeader';
import { Footer } from '@/components/dashboard/Footer';
import { BottomNav } from '@/components/dashboard/BottomNav';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple auth check
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/auth/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
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
