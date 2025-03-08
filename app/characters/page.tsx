import { use } from 'react';
import CharactersClient from './CharactersClient';
import { Character, SWAPIResponse } from '../types/swapi';

interface PageProps {
    searchParams: Promise<{ page?: string; search?: string }>;
}

async function getCharacters(searchParams: { page?: string; search?: string }) {
    const page = searchParams.page || '1';
    const search = searchParams.search || '';
    
    const res = await fetch(
        `https://swapi.dev/api/people/?page=${page}&search=${search}`,
        { cache: 'no-store' }
    );
    
    if (!res.ok) {
        throw new Error('Failed to fetch characters');
    }
    
    return res.json();
}

export default function CharactersPage({ searchParams }: PageProps) {
    const resolvedParams = use(searchParams);
    const data = use(getCharacters(resolvedParams)) as SWAPIResponse<Character>;
    
    return <CharactersClient data={data} />;
}