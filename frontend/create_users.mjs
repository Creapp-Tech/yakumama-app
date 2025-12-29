
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwpjnvwcrjmggnqgobyt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cGpudndjcmptZ2ducWdvYnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTQ2MTAsImV4cCI6MjA4MjUzMDYxMH0.H54EGi1kk5_cIltYRdxuN0MPqMddlfAPnWlnaGT4S04';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createUsers() {
    const users = [
        { email: 'admin_test2@yakumama.com', password: 'admin123', name: 'Administrador', role: 'admin' },
        { email: 'user_test2@yakumama.com', password: 'user123', name: 'Usuario Regular', role: 'user' }
    ];

    for (const u of users) {
        console.log(`Creating ${u.role} user: ${u.email}...`);
        const { data, error } = await supabase.auth.signUp({
            email: u.email,
            password: u.password,
            options: {
                data: {
                    full_name: u.name,
                    role: u.role
                }
            }
        });

        if (error) {
            console.error(`Error creating ${u.role}:`, error.message);
        } else {
            console.log(`✅ ${u.role} User created. ID:`, data.user?.id);
        }
    }
}

createUsers();
