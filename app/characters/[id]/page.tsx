import { notFound } from 'next/navigation';

async function getCharacter(id: string) {
    const res = await fetch(`https://swapi.dev/api/people/${id}`);
    if (!res.ok) return undefined;
    return res.json();
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
    const character = await getCharacter(params.id);
    if (!character) notFound();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">{character.name}</h1>
            <div className="card bg-base-200 shadow-xl max-w-2xl mx-auto">
                <div className="card-body">
                    <p>Height: {character.height}</p>
                    <p>Mass: {character.mass}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Hair Color: {character.hair_color}</p>
                    <p>Skin Color: {character.skin_color}</p>
                    <p>Birth Year: {character.birth_year}</p>
                </div>
            </div>
        </div>
    );
}