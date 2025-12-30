'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { getUserProfile } from '@/lib/supabase-queries';
import { Profile } from '@/lib/supabase';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    signOut: async () => { },
    refreshProfile: async () => { },
});

// Create client once outside component to prevent re-instantiation
const supabase = createClient();

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = async () => {
        if (user) {
            const userProfile = await getUserProfile(user.id);
            setProfile(userProfile);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Get initial session
                const { data: { session } } = await supabase.auth.getSession();

                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    const userProfile = await getUserProfile(session.user.id);
                    setProfile(userProfile);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
            // setLoading(true); // Don't trigger loading on every update to avoid flickering
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                try {
                    const userProfile = await getUserProfile(session.user.id);
                    setProfile(userProfile);
                } catch (error) {
                    console.error('Error fetching profile on auth change:', error);
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }

            setLoading(false); // Ensure loading is false if it was true (e.g. initial load logic overlap)
        });

        return () => subscription.unsubscribe();
    }, []); // Empty deps since supabase is now a stable reference

    const signOut = async () => {
        try {
            // Clear state immediately
            setUser(null);
            setProfile(null);
            setSession(null);

            // Sign out from Supabase
            await supabase.auth.signOut();

            // Force full page reload to login page
            window.location.href = '/auth/login';
        } catch (error) {
            console.error('Error signing out:', error);
            // Even if signOut fails, redirect to login
            window.location.href = '/auth/login';
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, session, loading, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
