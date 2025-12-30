import { createClient } from './frontend/node_modules/@supabase/supabase-js/dist/main/index.js';

const supabaseUrl = 'https://mwpjnvwcrjmggnqgobyt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cGpudndjcmptZ2ducWdvYnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTQ2MTAsImV4cCI6MjA4MjUzMDYxMH0.H54EGi1kk5_cIltYRdxuN0MPqMddlfAPnWlnaGT4S04';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
    console.log('Testing login for admin_test2@yakumama.com...');
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin_test2@yakumama.com',
        password: 'admin123'
    });

    if (error) {
        console.error('Login error:', JSON.stringify(error, null, 2));
    } else {
        console.log('Login success! User ID:', data.user.id);

        console.log('Fetching profile...');
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError) {
            console.error('Profile fetch error:', JSON.stringify(profileError, null, 2));
        } else {
            console.log('Profile found:', JSON.stringify(profile, null, 2));
        }
    }
}

testLogin();
