
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ActionCardProps {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    href: string;
    accentColor?: string;
}

export const ActionCard: FC<ActionCardProps> = ({ badge, title, description, buttonText, imageSrc, href, accentColor = 'bg-[#8b5cf6]' }) => {
    return (
        <div className="bg-[#0b1745] p-5 rounded-2xl mb-4 text-white relative flex overflow-hidden shadow-lg border border-[#1e3a8a]/50">
            <div className="flex-1 z-10 pr-2">
                <span className="inline-block bg-gray-500/30 backdrop-blur-sm text-gray-200 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md mb-2">
                    {badge}
                </span>
                <h3 className="font-bold text-lg leading-tight mb-2">{title}</h3>
                <p className="text-xs text-gray-300 mb-4 whitespace-pre-line leading-relaxed">{description}</p>
                <Link href={href} className={`${accentColor} hover:brightness-110 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md transition-all inline-block`}>
                    {buttonText}
                </Link>
            </div>
            <div className="w-[120px] flex items-center justify-center relative">
                <Image src={imageSrc} alt={title} width={120} height={120} className="object-contain drop-shadow-2xl" />
            </div>

            {/* Decoration line connecting button */}
            <div className="absolute left-[30%] bottom-[28px] w-full h-[2px] bg-cyan-400 opacity-60 -z-0 pointer-events-none"></div>
            <div className="absolute left-[30%] bottom-[26px] w-[6px] h-[6px] bg-cyan-400 rounded-full -z-0 pointer-events-none"></div>
        </div>
    );
};
