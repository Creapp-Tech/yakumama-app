import { supabase, Profile, Evaluation, UserProgress } from './supabase';

// ============= USER QUERIES =============

export async function getUserProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
        });
        return null;
    }

    return data;
}

export async function createUserProfile(userId: string, email: string, fullName: string, role: 'admin' | 'user' = 'user'): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .insert({
            id: userId,
            email,
            full_name: fullName,
            role,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating user profile:', error);
        return null;
    }

    return data;
}

export async function updateUserProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error('Error updating user profile:', error);
        return null;
    }

    return data;
}

// ============= EVALUATION QUERIES =============

export async function getUserEvaluations(userId: string): Promise<Evaluation[]> {
    const { data, error } = await supabase
        .from('evaluations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user evaluations:', error);
        return [];
    }

    return data || [];
}

export async function createEvaluation(evaluationData: {
    user_id: string;
    type: 'initial' | 'progress' | 'final';
    ecf_score: number;
    efc_score: number;
    nsc_score: number;
    ibcy_score: number;
    total_score: number;
    raw_responses?: any;
    plan?: any;
    levels?: any;
}): Promise<Evaluation | null> {
    const { data, error } = await supabase
        .from('evaluations')
        .insert({
            ...evaluationData,
            completed_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating evaluation:', error);
        return null;
    }

    return data;
}

export async function getLatestEvaluation(userId: string): Promise<Evaluation | null> {
    const { data, error } = await supabase
        .from('evaluations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching latest evaluation:', error);
        return null;
    }

    return data;
}

export async function getEvaluationById(id: string): Promise<Evaluation | null> {
    const { data, error } = await supabase
        .from('evaluations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching evaluation by id:', error);
        return null;
    }

    return data;
}

// ============= USER PROGRESS QUERIES =============

export async function getUserProgress(userId: string): Promise<UserProgress | null> {
    const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user progress:', error);
        return null;
    }

    return data;
}

export async function updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | null> {
    const { data, error } = await supabase
        .from('user_progress')
        .upsert({
            user_id: userId,
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        console.error('Error updating user progress:', error);
        return null;
    }

    return data;
}

export async function incrementTestsCompleted(userId: string): Promise<void> {
    const progress = await getUserProgress(userId);
    const currentTests = progress?.tests_completed || 0;

    await updateUserProgress(userId, {
        tests_completed: currentTests + 1,
        last_activity: new Date().toISOString(),
    });
}

// ============= ADMIN QUERIES =============

export async function getAllUsers(): Promise<Profile[]> {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all users:', error);
        return [];
    }

    return data || [];
}

export async function getAllEvaluations(): Promise<Evaluation[]> {
    const { data, error } = await supabase
        .from('evaluations')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all evaluations:', error);
        return [];
    }

    return data || [];
}

export async function getUsersWithProgress(): Promise<any[]> {
    const { data, error } = await supabase
        .from('profiles')
        .select(`
      *,
      user_progress (*)
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users with progress:', error);
        return [];
    }

    return data || [];
}

export async function getEvaluationsWithUserInfo(): Promise<any[]> {
    const { data, error } = await supabase
        .from('evaluations')
        .select(`
      *,
      profiles (
        email,
        full_name
      )
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching evaluations with user info:', error);
        return [];
    }

    return data || [];
}

// ============= STATISTICS QUERIES =============

export async function getAdminStats() {
    // Total users
    const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    // Users who completed the plan (have at least one 'final' evaluation)
    const { data: completedUsers } = await supabase
        .from('evaluations')
        .select('user_id')
        .eq('type', 'final');

    const uniqueCompletedUsers = new Set(completedUsers?.map(e => e.user_id) || []);

    // Active users today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: activeToday } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .gte('last_activity', today.toISOString());

    return {
        totalUsers: totalUsers || 0,
        completedPlan: uniqueCompletedUsers.size,
        activeToday: activeToday || 0,
    };
}
