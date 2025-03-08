import CharactersClient from './CharactersClient';

async function getCharacters(page = 1, search = '') {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}&search=${search}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function CharactersPage({
                                                 searchParams,
                                             }: {
    searchParams: { page?: string; search?: string };
}) {
    const page = parseInt(searchParams.page || '1', 10);
    const search = searchParams.search || '';
    const data = await getCharacters(page, search);

    return <CharactersClient data={data} />;
}