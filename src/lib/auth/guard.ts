import { createClient } from '@/lib/supabase/client';
import { UserProfile } from '@/types/auth.types';

// Standard error for unauthorized access
class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

// Standard error for forbidden access (e.g. valid user, wrong role)
class ForbiddenError extends Error {
    constructor(message = 'Forbidden') {
        super(message);
        this.name = 'ForbiddenError';
    }
}

/**
 * Layer 3: Logic Verification
 * Guarantees that the code running on the server has a valid user session.
 */
export const requireUser = async () => {
    const supabase = createClient();

    // Check session
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        throw new UnauthorizedError('User must be logged in');
    }

    return user;
};

/**
 * Prevents Privilege Escalation
 * Guarantees that the user is an admin.
 */
export const requireAdmin = async () => {
    const user = await requireUser();
    const supabase = createClient();

    // Fetch profile to check role
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (error || !profile) {
        throw new UnauthorizedError('Could not fetch user profile');
    }

    if (profile.role !== 'admin') {
        throw new ForbiddenError('User is not an admin');
    }

    return { user, profile };
};
