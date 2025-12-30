
import { FC } from 'react';

export const Footer: FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-6 hidden md:flex flex-col items-center justify-center text-sm text-gray-500 mt-auto">
            <p className="mb-1">
                Desarrollado por <span className="font-bold text-gray-700">Creapp-Tech</span>
            </p>
            <a
                href="https://creapp-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8dbf44] hover:underline"
            >
                creapp-portfolio.vercel.app
            </a>
        </footer>
    );
};
