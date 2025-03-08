import { notFound } from 'next/navigation';

async function getPlanet(id: string) {
    const res = await fetch(`https://swapi.dev/api/planets/${id}`);
    if (!res.ok) return undefined;
    return res.json();
}

export default async function PlanetPage({ params }: { params: { id: string } }) {
    const planet = await getPlanet(params.id);
    if (!planet) notFound();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">{planet.name}</h1>
            <div className="card bg-base-200 shadow-xl max-w-2xl mx-auto">
                <div className="card-body">
                    <p>Climate: {planet.climate}</p>
                    <p>Population: {planet.population}</p>
                    <p>Terrain: {planet.terrain}</p>
                    <p>Diameter: {planet.diameter}</p>
                    <p>Gravity: {planet.gravity}</p>
                    <p>Rotation Period: {planet.rotation_period}</p>
                </div>
            </div>
        </div>
    );
}