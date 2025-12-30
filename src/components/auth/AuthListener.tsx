'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AUTH_CONFIG } from '@/lib/supabase/config';

export default function AuthListener() {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                // router.refresh();
                // Optional: Redirect to dashboard if on public page? 
                // Logic handled by middleware mostly, but client-side redirect helps UX
            }
            if (event === 'SIGNED_OUT') {
                router.push(AUTH_CONFIG.routes.auth.login);
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    return null;
}
