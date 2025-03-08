// Реализовать по своему усмотрению, но чтобы была пагинация,
// фильтр, поиск, страница планет, персонажей и отдельно для
// каждой планеты персонажа также страницы
// Апи стягивать с помощью useServerProps и axios
// https://swapi.dev/ - ПРОЕКТ ЗВЕЗДНЫЙ ВОЙНЫ НА next js ts template using daisyui
// с использованием апи swapi.

import Link from 'next/link';

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Star Wars Universe</h1>
            <div className="flex justify-center space-x-4">
                {/* Ссылка на страницу персонажей */}
                <Link href="/characters">
                    <div className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                        Characters
                    </div>
                </Link>

                {/* Ссылка на страницу планет */}
                <Link href="/planets">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300">
                        Planets
                    </div>
                </Link>
            </div>
        </div>
    );
}
