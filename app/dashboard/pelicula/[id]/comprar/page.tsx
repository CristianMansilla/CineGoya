"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StopIcon } from "@heroicons/react/24/solid";
import Seats from '@/app/components/Seats';

const SeatsDistribution = () => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const router = useRouter();
    const [movieId, setMovieId] = useState<string | null>(null);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const id = pathParts[3];
        setMovieId(id);
    }, []);

    const handleSelectionChange = (selectedSeats: string[]) => {
        setSelectedSeats(selectedSeats);
    };

    const handleNextClick = () => {
        if (movieId) {
            const totalSeats = selectedSeats.length;
            router.push(`/dashboard/pelicula/${movieId}/comprar/detalle?totalSeats=${totalSeats}`);
        }
    };

    console.log(movieId);
    

    return (
        <>
            <div className="grid grid-cols-9 gap-1 justify-center mb-4">
                <div className="col-span-9 text-center bg-gray-200 py-2 mb-2">Pantalla</div>
                <Seats onSelectionChange={handleSelectionChange} />
            </div>

            <section className="grid grid-cols-2 align-middle">
                <div className="flex justify-around space-x-6 p-5">
                    <div className="flex items-center space-x-2">
                        <StopIcon className="h-8 w-8 text-yellow-300" />
                        <p>Disponible</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <StopIcon className="h-8 w-8 text-green-500" />
                        <p>Seleccionado</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <StopIcon className="h-8 w-8 text-red-500" />
                        <p>Ocupado</p>
                    </div>
                </div>
                <div className="flex justify-end mr-5 m-auto">
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                        onClick={handleNextClick}
                    >
                        Siguiente
                    </button>
                </div>
            </section>
        </>
    );
};

export default SeatsDistribution;
