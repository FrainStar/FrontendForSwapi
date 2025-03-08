// app/planets/page.tsx
import PlanetsClient from './PlanetsClient';

async function getPlanets(page = 1, search = '') {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}&search=${search}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function PlanetsPage({
                                              searchParams,
                                          }: {
    searchParams: { page?: string; search?: string };
}) {
    const page = parseInt(searchParams.page || '1', 10);
    const search = searchParams.search || '';
    const data = await getPlanets(page, search);

    return <PlanetsClient data={data} />;
}