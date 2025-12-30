'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useIdleTimeout } from '@/hooks/useIdleTimeout';
import IdleWarningModal from '@/components/auth/IdleWarningModal';
import { useState } from 'react';

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { signOut } = useAuth();
    const [showIdleWarning, setShowIdleWarning] = useState(false);

    const { resetHelper } = useIdleTimeout({
        onIdle: () => {
            // Auto-logout functionality
            console.log('User is idle, logging out...');
            signOut();
        },
        onWarning: () => {
            setShowIdleWarning(true);
        },
    });

    const handleContinue = () => {
        setShowIdleWarning(false);
        resetHelper();
    };

    const handleLogout = () => {
        setShowIdleWarning(false);
        signOut();
    };

    // Note: We don't need to check session existence here explicitly logic-wise
    // because Middleware handles the protection. This layout just adds the generic
    // authenticated features like inactivity monitoring.

    return (
        <>
            <IdleWarningModal
                isOpen={showIdleWarning}
                onContinue={handleContinue}
                onLogout={handleLogout}
            />
            {children}
        </>
    );
}
