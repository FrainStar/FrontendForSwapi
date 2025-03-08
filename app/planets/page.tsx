// app/planets/page.tsx
import { use } from 'react';
import PlanetsClient from './PlanetsClient';
import { Planet, SWAPIResponse } from '../types/swapi';

interface PageProps {
    searchParams: Promise<{ page?: string; search?: string }>;
}

async function getPlanets(searchParams: { page?: string; search?: string }) {
    const page = searchParams.page || '1';
    const search = searchParams.search || '';
    
    const res = await fetch(
        `https://swapi.dev/api/planets/?page=${page}&search=${search}`,
        { cache: 'no-store' }
    );
    
    if (!res.ok) {
        throw new Error('Failed to fetch planets');
    }
    
    return res.json();
}

export default function PlanetsPage({ searchParams }: PageProps) {
    const resolvedParams = use(searchParams);
    const data = use(getPlanets(resolvedParams)) as SWAPIResponse<Planet>;
    
    return <PlanetsClient data={data} />;
}