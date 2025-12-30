import { useState, useEffect, useCallback, useRef } from 'react';
import { AUTH_CONFIG } from '@/lib/supabase/config';

interface UseIdleTimeoutProps {
    onIdle: () => void;
    onWarning?: () => void;
}

export function useIdleTimeout({ onIdle, onWarning }: UseIdleTimeoutProps) {
    const [isIdle, setIsIdle] = useState(false);
    const [isWarning, setIsWarning] = useState(false);
    const timeoutId = useRef<NodeJS.Timeout>(null);
    const warningTimeoutId = useRef<NodeJS.Timeout>(null);

    const idleTimeout = AUTH_CONFIG.timeouts.idle * 60 * 1000;
    const warningTime = AUTH_CONFIG.timeouts.warning * 60 * 1000;
    const timeBeforeWarning = idleTimeout - warningTime;

    const resetTimeout = useCallback(() => {
        setIsIdle(false);
        setIsWarning(false);

        if (timeoutId.current) clearTimeout(timeoutId.current);
        if (warningTimeoutId.current) clearTimeout(warningTimeoutId.current);

        // Set warning timeout
        warningTimeoutId.current = setTimeout(() => {
            setIsWarning(true);
            if (onWarning) onWarning();
        }, timeBeforeWarning);

        // Set idle timeout
        timeoutId.current = setTimeout(() => {
            setIsIdle(true);
            if (onIdle) onIdle();
        }, idleTimeout);
    }, [timeBeforeWarning, idleTimeout, onIdle, onWarning]);

    useEffect(() => {
        const events = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click',
        ];

        const handleActivity = () => {
            if (!isWarning) { // Only reset if not in warning state, or user action should explicitly confirm?
                // Actually, any activity usually resets idle timer unless we want strict confirmation.
                // 'autenticacion_seguridad.md' says: "Usuario puede extender sesión haciendo click en 'Continuar activo'".
                // This implies activity during normal flow prevents it, but once warning shows, maybe we wait for interaction?
                // Standard behavior: Activity resets timer.
                resetTimeout();
            }
        };

        // Initial setup
        resetTimeout();

        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
            if (warningTimeoutId.current) clearTimeout(warningTimeoutId.current);
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [resetTimeout, isWarning]);

    return {
        isIdle,
        isWarning,
        resetHelper: resetTimeout, // Explicit reset function
    };
}
