import { NextRequest } from 'next/server';
import { Character, SWAPIResponse } from '../../types/swapi';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';

    const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}&search=${search}`
    );
    const data: SWAPIResponse<Character> = await response.json();

    return Response.json(data);
} 