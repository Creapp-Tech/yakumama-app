-- ============================================
-- YAKUMAMA APP - SUPABASE DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Evaluations table
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('initial', 'progress', 'final')),
    ecf_score NUMERIC NOT NULL,
    efc_score NUMERIC NOT NULL,
    nsc_score NUMERIC NOT NULL,
    ibcy_score NUMERIC NOT NULL,
    total_score NUMERIC NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Evaluation answers table
CREATE TABLE IF NOT EXISTS public.evaluation_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    evaluation_id UUID REFERENCES public.evaluations(id) ON DELETE CASCADE NOT NULL,
    question_id TEXT NOT NULL,
    answer_value INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- User progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    exercises_completed INTEGER DEFAULT 0 NOT NULL,
    tests_completed INTEGER DEFAULT 0 NOT NULL,
    last_activity TIMESTAMP WITH TIME ZONE,
    streak_days INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON public.evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_type ON public.evaluations(type);
CREATE INDEX IF NOT EXISTS idx_evaluations_created_at ON public.evaluations(created_at);
CREATE INDEX IF NOT EXISTS idx_evaluation_answers_evaluation_id ON public.evaluation_answers(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (public.is_admin());

-- Evaluations policies
CREATE POLICY "Users can view their own evaluations"
    ON public.evaluations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own evaluations"
    ON public.evaluations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all evaluations"
    ON public.evaluations FOR SELECT
    USING (public.is_admin());

-- Evaluation answers policies
CREATE POLICY "Users can view their own evaluation answers"
    ON public.evaluation_answers FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.evaluations
            WHERE evaluations.id = evaluation_answers.evaluation_id
            AND evaluations.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own evaluation answers"
    ON public.evaluation_answers FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.evaluations
            WHERE evaluations.id = evaluation_answers.evaluation_id
            AND evaluations.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all evaluation answers"
    ON public.evaluation_answers FOR SELECT
    USING (public.is_admin());

-- User progress policies
CREATE POLICY "Users can view their own progress"
    ON public.user_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
    ON public.user_progress FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
    ON public.user_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress"
    ON public.user_progress FOR SELECT
    USING (public.is_admin());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to check if user is admin (security definer to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger for profiles updated_at
DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
CREATE TRIGGER set_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for user_progress updated_at
DROP TRIGGER IF EXISTS set_updated_at_user_progress ON public.user_progress;
CREATE TRIGGER set_updated_at_user_progress
    BEFORE UPDATE ON public.user_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- INITIAL DATA
-- ============================================

-- Note: Users must be created through Supabase Auth first
-- Then their profiles can be created with the following SQL:

-- Example for admin user (run after creating user in Supabase Auth):
-- INSERT INTO public.profiles (id, email, full_name, role)
-- VALUES (
--     'USER_ID_FROM_AUTH',
--     'admin@mail.com',
--     'Administrator',
--     'admin'
-- );

-- Example for regular user (run after creating user in Supabase Auth):
-- INSERT INTO public.profiles (id, email, full_name, role)
-- VALUES (
--     'USER_ID_FROM_AUTH',
--     'user@mail.com',
--     'Regular User',
--     'user'
-- );
