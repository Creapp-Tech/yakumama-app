export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  email: string | undefined;
  role?: UserRole;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  initialized: boolean;
}
