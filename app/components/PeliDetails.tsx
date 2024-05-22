"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieData {
    id: number;
    title: string;
    genres: { name: string }[];
    overview: string;
    vote_average: number;
    runtime: number;
    poster_path: string;
}

const PeliDetails = ({ data }:{data:MovieData}) => {
    const router = useRouter();

    const handleComprarEntradas = () => {
        router.push(`/dashboard/pelicula/${data.id}/comprar`);
    };

    const horas = Math.floor(data.runtime / 60);
    const minutos = data.runtime % 60;
    const duration = `${horas}h ${minutos.toString().padStart(2, '0')}m`;

    return (
        <div className="container mx-auto px-4 ">
            <div className="flex flex-col justify-center md:flex-row items-center">
                <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
                    <Image className="object-cover" width={350} height={600} src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
                    <button onClick={handleComprarEntradas} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-max">
                        Comprar Entradas
                    </button>
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">{data.title}</h2>
                    <p className="text-gray-600 mt-2">
                        <span className="font-bold">Géneros: </span>{data.genres.map((genre) => genre.name).join(', ')}
                    </p>
                    <p className="text-gray-600 mt-2">
                        <span className="font-bold">Reseña: </span>{data.overview}
                    </p>
                    <p className="text-gray-600 mt-2">
                        <span className="font-bold">Voto promedio: </span>{data.vote_average}
                    </p>
                    <p className="text-gray-600 mt-2">
                        <span className="font-bold">Duración: </span>{duration}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PeliDetails;
