import { NextRequest } from 'next/server';
import { Planet, SWAPIResponse } from '../../types/swapi';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';

    const response = await fetch(
        `https://swapi.dev/api/planets/?page=${page}&search=${search}`
    );
    const data: SWAPIResponse<Planet> = await response.json();

    return Response.json(data);
} 