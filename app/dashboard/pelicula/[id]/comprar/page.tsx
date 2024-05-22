"use client";

import { StopIcon } from "@heroicons/react/24/solid";
import Seats from '@/app/components/Seats';

const SeatsDistribution = () => {
    return (
        <>
            <div className="grid grid-cols-9 gap-1 justify-center mb-4">
                <div className="col-span-9 text-center bg-gray-200 py-2 mb-2">Pantalla</div>
                {<Seats />}
            </div>

            <section className='grid grid-cols-2 align-middle'>
                <div className="flex justify-around space-x-6 p-5">
                    <div className="flex items-center space-x-2">
                        <StopIcon className="h-8 w-8 text-yellow-300" />
                        <p className="">Disponible</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <StopIcon className="h-8 w-8 text-green-500" />
                        <p className="">Seleccionado</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <StopIcon className="h-8 w-8 text-red-500" />
                        <p className="">Ocupado</p>
                    </div>
                </div>
                <div className="flex justify-end mr-5 m-auto">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Siguiente</button>
                </div>
            </section>
        </>
    );
};

export default SeatsDistribution;
