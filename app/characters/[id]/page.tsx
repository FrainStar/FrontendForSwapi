"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Character } from '../../types/swapi';
import MainLayout from '../../components/MainLayout';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function CharacterDetails({ params }: PageProps) {
    const router = useRouter();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const id = await params.then(p => p.id);
                const res = await fetch(`https://swapi.dev/api/people/${id}`);
                const data = await res.json();
                setCharacter(data);
            } catch (error) {
                console.error('Error fetching character:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [params]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-[50vh]">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </MainLayout>
        );
    }

    if (!character) {
        return (
            <MainLayout>
                <div className="alert alert-error">
                    <span>Character not found</span>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-8">
                <button 
                    onClick={() => router.back()} 
                    className="btn btn-primary"
                >
                    ← Back
                </button>
            </div>
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl mb-4">{character.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><span className="font-bold">Height:</span> {character.height}</p>
                        <p><span className="font-bold">Mass:</span> {character.mass}</p>
                        <p><span className="font-bold">Gender:</span> {character.gender}</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}