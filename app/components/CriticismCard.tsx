"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import DeleteCriticaButton from "./DeleteCriticaButton";
import { createClient } from "../utils/supabase/client";

const CriticismCard = ({ criticism, rol }: any) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const supabase = createClient();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSeeClick = () => {
        router.push(`/dashboard/criticas/${criticism.id}`);
    };

    const handleEditClick = () => {
        router.push(`/dashboard/criticas/${criticism.id}/editCritica`);
    };

    const onDelete = async () => {
        console.log("Deleting criticism with id:", criticism.id); // Log the ID for debugging
        const { data, error } = await supabase
            .from('criticisms')
            .delete()
            .eq("id", criticism.id);

        console.log(data, error);

        if (!error) {
            setSuccessMessage('¡La crítica se eliminó con éxito!');
            setIsVisible(false);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } else {
            console.error("Failed to delete the criticism", error);
        }
    };

    if (!isVisible) {
        return null;
    }

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
                                handleSeeClick();
                            }}
                        >
                            <EyeIcon className="h-9 w-9" />
                        </button>

                        {rol === 'administrador' && (
                            <>
                                <button
                                    className="text-gray-300 hover:text-blue-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick();
                                    }}
                                >
                                    <PencilIcon className="h-9 w-9" />
                                </button>

                                <DeleteCriticaButton onDelete={onDelete}></DeleteCriticaButton>
                            </>
                        )}
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-200 text-green-800 p-2 rounded-md">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default CriticismCard;

export const revalidate = 0;
