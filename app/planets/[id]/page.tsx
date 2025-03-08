"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Planet } from '../../types/swapi';
import MainLayout from '../../components/MainLayout';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function PlanetDetails({ params }: PageProps) {
    const router = useRouter();
    const [planet, setPlanet] = useState<Planet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                const id = await params.then(p => p.id);
                const res = await fetch(`https://swapi.dev/api/planets/${id}`);
                const data = await res.json();
                setPlanet(data);
            } catch (error) {
                console.error('Error fetching planet:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlanet();
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

    if (!planet) {
        return (
            <MainLayout>
                <div className="alert alert-error">
                    <span>Planet not found</span>
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
                    <h2 className="card-title text-3xl mb-4">{planet.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><span className="font-bold">Climate:</span> {planet.climate}</p>
                        <p><span className="font-bold">Population:</span> {planet.population}</p>
                        <p><span className="font-bold">Terrain:</span> {planet.terrain}</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}