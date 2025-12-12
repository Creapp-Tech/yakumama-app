const API_URL = 'http://localhost:3001';

async function testDuplicateEmail() {
    const email = `duplicate_${Date.now()}@example.com`;
    const password = 'Password123!';
    const name = 'Duplicate Test';

    console.log('\n=== TEST: Duplicate Email Registration ===');
    try {
        // First registration
        console.log('1. First registration...');
        await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });
        console.log('✅ First registration successful');

        // Second registration with same email
        console.log('2. Attempting duplicate registration...');
        const duplicateResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });

        if (!duplicateResponse.ok) {
            const error = await duplicateResponse.json();
            console.log('✅ PASS: Duplicate email correctly rejected:', error.message);
        } else {
            console.log('❌ FAIL: Duplicate email was allowed!');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function testDuplicateProfile() {
    const email = `profile_test_${Date.now()}@example.com`;
    const password = 'Password123!';
    const name = 'Profile Test';

    console.log('\n=== TEST: Duplicate Profile Creation ===');
    try {
        // Register and login
        await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });

        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const { access_token } = await loginResponse.json();

        const profileData = {
            dateOfBirth: '1990-01-01',
            gender: 'MALE',
            country: 'Test',
            city: 'Test',
            occupation: 'Tester',
            consentGiven: true
        };

        // First profile creation
        console.log('1. Creating first profile...');
        await fetch(`${API_URL}/users/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(profileData)
        });
        console.log('✅ First profile created');

        // Second profile creation
        console.log('2. Attempting duplicate profile...');
        const duplicateProfileResponse = await fetch(`${API_URL}/users/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(profileData)
        });

        if (!duplicateProfileResponse.ok) {
            const error = await duplicateProfileResponse.text();
            console.log('✅ PASS: Duplicate profile correctly rejected:', error);
        } else {
            console.log('❌ FAIL: Duplicate profile was allowed!');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function runAllTests() {
    await testDuplicateEmail();
    await testDuplicateProfile();
    console.log('\n=== All Tests Complete ===\n');
}

runAllTests();
