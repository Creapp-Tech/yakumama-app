
const API_URL = 'http://localhost:3001';

async function simulateRegistration() {
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'Password123!';
    const name = 'Test User';

    console.log('--- 1. Simulating Registration ---');
    try {
        console.log(`Sending POST to ${API_URL}/auth/register...`);
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });

        if (!registerResponse.ok) {
            const err = await registerResponse.text();
            throw new Error(`Registration failed: ${registerResponse.status} ${err}`);
        }
        const registerData = await registerResponse.json();
        console.log('✅ Registration Successful:', registerData);

        console.log('--- 2. Simulating Login (to get token) ---');
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!loginResponse.ok) {
            const err = await loginResponse.text();
            throw new Error(`Login failed: ${loginResponse.status} ${err}`);
        }

        const loginData = await loginResponse.json();
        console.log('✅ Login Successful');
        const token = loginData.access_token;
        console.log('Token received:', token ? 'YES' : 'NO');

        console.log('--- 3. Simulating Profile Creation ---');
        const profileData = {
            dateOfBirth: '1990-01-01',
            gender: 'MALE',
            country: 'Test Country',
            city: 'Test City',
            occupation: 'Tester',
            consentGiven: true,
            privacyAccepted: true
        };

        const profileResponse = await fetch(`${API_URL}/users/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });

        if (!profileResponse.ok) {
            const err = await profileResponse.text();
            throw new Error(`Profile Creation failed: ${profileResponse.status} ${err}`);
        }

        const profileResult = await profileResponse.json();
        console.log('✅ Profile Creation Successful:', profileResult);

        console.log('--- 4. Simulating Evaluation Submission ---');
        const evaluationData = {
            type: 'INITIAL',
            responses: {
                q7: 1, q8: 1, q10: 1, q9: 5, q12: 5, q29: 5, q11: 5, q13: 1, q17: 5, // ECF
                q18: '3-4 días', q19: 'Caminar', q20: 5, q21: [], // EFC
                q22: '1 vez a la semana', q23: 5, q24: 'Sí', q25: '0 veces', q26: 5, // NSC
                q27: 'sol agua libro verde camino nube tiempo mano' // Memory test
            }
        };

        const evaluationResponse = await fetch(`${API_URL}/evaluation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(evaluationData)
        });

        if (!evaluationResponse.ok) {
            const err = await evaluationResponse.text();
            throw new Error(`Evaluation failed: ${evaluationResponse.status} ${err}`);
        }

        const evaluationResult = await evaluationResponse.json();
        console.log('✅ Evaluation Submission Successful. ID:', evaluationResult.id);
        console.log('Scores:', {
            ECF: evaluationResult.ecfScore,
            EFC: evaluationResult.efcScore,
            NSC: evaluationResult.nscScore,
            IBCY: evaluationResult.ibcyScore
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

simulateRegistration();
