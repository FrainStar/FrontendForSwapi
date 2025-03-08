// Реализовать по своему усмотрению, но чтобы была пагинация,
// фильтр, поиск, страница планет, персонажей и отдельно для
// каждой планеты персонажа также страницы
// Апи стягивать с помощью useServerProps и axios
// https://swapi.dev/ - ПРОЕКТ ЗВЕЗДНЫЙ ВОЙНЫ НА next js ts template using daisyui
// с использованием апи swapi.

import MainLayout from './components/MainLayout';
import Link from 'next/link';

export default function Home() {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-8">Welcome to Star Wars Explorer</h1>
                <div className="card bg-base-200 shadow-xl p-6 mb-8">
                    <p className="text-xl mb-6">
                        Explore the vast universe of Star Wars with our comprehensive database of characters and planets.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">Characters</h2>
                                <p className="mb-4">
                                    Discover detailed information about your favorite Star Wars characters,
                                    including their physical characteristics, origins, and more.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link href="/characters" className="btn btn-primary">
                                        Explore Characters
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">Planets</h2>
                                <p className="mb-4">
                                    Learn about the diverse worlds of the Star Wars galaxy,
                                    their climates, populations, and unique characteristics.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link href="/planets" className="btn btn-primary">
                                        Explore Planets
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-200 shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                    <p className="text-lg">
                        This project uses the SWAPI (Star Wars API) to provide you with accurate and detailed
                        information about the Star Wars universe. Built with Next.js and TypeScript,
                        it offers a modern and responsive interface for exploring Star Wars data.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
