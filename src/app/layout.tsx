import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthListener from '@/components/auth/AuthListener';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Yakumama Lifestyle',
    description: 'Evaluación y Bienestar Cognitivo',
    icons: {
        icon: '/icon_yakumama.png',
        apple: '/icon_yakumama.png',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning={true}>
                <AuthProvider>
                    <AuthListener />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
