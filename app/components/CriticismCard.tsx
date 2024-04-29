"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useState } from "react";

const CriticismCard = ({ criticism }: any) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        router.push(`/dashboard/criticas/${criticism.id}`);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={`block cursor-pointer border rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out ${isHovered ? 'hover:bg-gray-800 hover:text-white hover:shadow-xl' : ''}`}>
                <div className="relative h-48 w-full">
                    <Image src={criticism.image} layout="fill" objectFit="cover" alt={criticism.title} />
                </div>
                <div className="p-4 h-52">
                    <h2 className="text-lg font-semibold mb-2">{criticism.title}</h2>
                    <p className="text-gray-600 overflow-hidden line-clamp-5">{criticism.description}</p>
                </div>
            </div>
            {isHovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="flex gap-10">
                        <button
                            className="text-gray-300 hover:text-yellow-400"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick();
                            }}
                        >
                            <EyeIcon className="h-9 w-9" />
                        </button>

                        <button
                            className="text-gray-300 hover:text-blue-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Manejar acción de editar
                            }}
                        >
                            <PencilIcon className="h-9 w-9" />
                        </button>

                        <button
                            className="text-gray-300 hover:text-red-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Manejar acción de eliminar
                                alert("Estas seguro que deseas eliminar?")
                            }}
                        >
                            <TrashIcon className="h-9 w-9" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CriticismCard;