export interface Character {
    name: string;
    height: string;
    mass: string;
    gender: string;
    url: string;
}

export interface Planet {
    name: string;
    climate: string;
    population: string;
    terrain: string;
    url: string;
}

export interface SWAPIResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
} 