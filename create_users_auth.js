
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mwpjnvwcrjmggnqgobyt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cGpudndjcmptZ2ducWdvYnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTQ2MTAsImV4cCI6MjA4MjUzMDYxMH0.H54EGi1kk5_cIltYRdxuN0MPqMddlfAPnWlnaGT4S04.'; // Anon key provided

const supabase = createClient(supabaseUrl, supabaseKey);

async function createUsers() {
    console.log('Creating Admin User...');
    const { data: adminData, error: adminError } = await supabase.auth.signUp({
        email: 'admin@mail.com',
        password: 'admin123',
        options: {
            data: {
                full_name: 'Administrator'
            }
        }
    });

    if (adminError) {
        console.error('Error creating admin:', adminError.message);
    } else {
        console.log('Admin User created/exists. ID:', adminData.user?.id);
    }

    console.log('Creating Regular User...');
    const { data: userData, error: userError } = await supabase.auth.signUp({
        email: 'user@mail.com',
        password: 'user123',
        options: {
            data: {
                full_name: 'Regular User'
            }
        }
    });

    if (userError) {
        console.error('Error creating user:', userError.message);
    } else {
        console.log('Regular User created/exists. ID:', userData.user?.id);
    }
}

createUsers();
