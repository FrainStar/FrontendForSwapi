"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    
    const isActive = (path: string) => {
        return pathname.startsWith(path) ? 'bg-primary text-primary-content' : 'bg-base-200 hover:bg-base-300';
    };

    return (
        <header className="bg-base-100 shadow-lg mb-8">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Star Wars Explorer
                    </Link>
                    <div className="flex gap-4">
                        <Link 
                            href="/characters" 
                            className={`btn ${isActive('/characters')}`}
                        >
                            Characters
                        </Link>
                        <Link 
                            href="/planets" 
                            className={`btn ${isActive('/planets')}`}
                        >
                            Planets
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
} 