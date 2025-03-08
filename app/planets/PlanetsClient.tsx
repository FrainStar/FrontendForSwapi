"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';
import { Planet, SWAPIResponse } from '../types/swapi';

export default function PlanetsClient({ data }: { data: SWAPIResponse<Planet> }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [planets, setPlanets] = useState<Planet[]>(data.results);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
    const [search, setSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const fetchPlanets = async () => {
            const res = await fetch(`/api/planets?page=${currentPage}&search=${search}`);
            const newData = await res.json();
            setPlanets(newData.results);
        };
        fetchPlanets();
    }, [currentPage, search]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (currentPage > 1) params.set('page', currentPage.toString());
        if (search) params.set('search', search);
        router.push(`/planets?${params.toString()}`);
    }, [currentPage, search, router]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Star Wars Planets</h1>
            <div className="mb-6">
                <SearchFilter onSearch={handleSearch} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planets.map((planet: Planet) => (
                    <div
                        key={planet.name}
                        className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                    >
                        <div className="card-body">
                            <h2 className="card-title">{planet.name}</h2>
                            <p>Climate: {planet.climate}</p>
                            <p>Population: {planet.population}</p>
                            <p>Terrain: {planet.terrain}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => router.push(`/planets/${planet.url.split('/').slice(-2, -1)[0]}`)}
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
        </div>
    );
}