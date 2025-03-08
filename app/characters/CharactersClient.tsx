"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';
import { Character, SWAPIResponse } from '../types/swapi';
import MainLayout from '../components/MainLayout';

export default function CharactersClient({ data }: { data: SWAPIResponse<Character> }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [characters, setCharacters] = useState<Character[]>(data.results);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
    const [search, setSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const fetchCharacters = async () => {
            const res = await fetch(`/api/characters?page=${currentPage}&search=${search}`);
            const newData: SWAPIResponse<Character> = await res.json();
            setCharacters(newData.results);
        };
        fetchCharacters();
    }, [currentPage, search]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (currentPage > 1) params.set('page', currentPage.toString());
        if (search) params.set('search', search);
        router.push(`/characters?${params.toString()}`);
    }, [currentPage, search, router]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm);
        setCurrentPage(1);
    };

    return (
        <MainLayout>
            <h1 className="text-4xl font-bold text-center mb-8">Star Wars Characters</h1>
            <div className="mb-6">
                <SearchFilter onSearch={handleSearch} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((character: Character) => (
                    <div
                        key={character.name}
                        className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                    >
                        <div className="card-body">
                            <h2 className="card-title">{character.name}</h2>
                            <p>Height: {character.height}</p>
                            <p>Mass: {character.mass}</p>
                            <p>Gender: {character.gender}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => router.push(`/characters/${character.url.split('/').slice(-2, -1)[0]}`)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(data.count / 10)}
                    onPageChange={handlePageChange}
                />
            </div>
        </MainLayout>
    );
}