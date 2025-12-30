// Re-export the configured client creator
export { createClient as supabaseClient } from './supabase/client';

// Create a singleton instance for backward compatibility
import { createClient } from './supabase/client';
export const supabase = createClient();

// Types for our database
export type UserRole = 'admin' | 'user';

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
    avatar_url?: string;
}

export interface Evaluation {
    id: string;
    user_id: string;
    type: 'initial' | 'progress' | 'final';
    ecf_score: number;
    efc_score: number;
    nsc_score: number;
    ibcy_score: number;
    total_score: number;
    completed_at: string;
    created_at: string;
    raw_responses?: any;
    plan?: any;
    levels?: any;
}

export interface UserProgress {
    id: string;
    user_id: string;
    exercises_completed: number;
    tests_completed: number;
    last_activity: string;
    streak_days: number;
    created_at: string;
    updated_at: string;
}
