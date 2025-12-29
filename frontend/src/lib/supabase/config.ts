export const AUTH_CONFIG = {
    // Routes
    routes: {
        public: [
            '/',
            '/login',
            '/register',
            '/forgot-password',
            '/privacy',
            '/terms',
        ],
        protected: [
            '/dashboard',
            '/evaluation',
            '/profile',
            '/plans',
            '/progress',
            '/settings',
            '/admin',
        ],
        auth: {
            login: '/login',
            callback: '/auth/callback',
            home: '/dashboard',
        },
    },
    // Timeouts (in minutes)
    timeouts: {
        idle: 15,
        warning: 2,
    },
} as const;
