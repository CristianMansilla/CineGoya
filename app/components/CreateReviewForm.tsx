"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr';


interface DataProps {
    id: number;
    title: string;
}

const urlLocal = process.env.NEXT_PUBLIC_URL;

const CreateReviewForm = ({ selectedCriticismId }: { selectedCriticismId: number }) => {
    const supabase = createClient();
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState('');
    const [criticisms, setCriticisms] = useState<DataProps[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string>('');

    useEffect(() => {
        async function fetchCriticisms() {
            try {
                const { data, error } = await supabase.from('criticisms').select('id, title');
                if (error) {
                    throw error;
                }
                setCriticisms(data || []);
                // Encontrar el título correspondiente al ID seleccionado
                const selectedCriticism = data.find((criticism: DataProps) => criticism.id === Number(selectedCriticismId));
                console.log(selectedCriticism);

                if (selectedCriticism) {
                    setSelectedTitle(selectedCriticism.title);
                }
            } catch (error: any) {
                console.error('Error al obtener los títulos de las críticas:', error.message);
            }
        }

        fetchCriticisms();
    }, [supabase, selectedCriticismId]);

    useEffect(() => {
        let timer: any;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage('');
                router.push(`/dashboard/criticas/${selectedCriticismId}`);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [successMessage, router, selectedCriticismId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const review = formData.get('review')?.toString();
        const author = formData.get('author')?.toString();
        const company = formData.get('company')?.toString();
        const id_criticisms = criticisms.find(criticism => criticism.title === formData.get('selectedTitle'))?.id;

        const { error } = await supabase.from('reviews').insert({ review, author, company, id_criticisms });

        if (error) {
            console.error('Error al crear la reseña:', error.message);
        } else {
            console.log('Crítica creada exitosamente');
            setSuccessMessage('¡La reseña se creó con éxito!');

            // Actualizar el estado de críticas
            const updatedCriticisms = await supabase.from('criticisms').select('id, title');
            if (!updatedCriticisms.error) {
                setCriticisms(updatedCriticisms.data || []);
            }

            // Actualizar los datos de críticas
            mutate(`${urlLocal}/api/criticisms`);
        }
    };

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Crear Reseña</h1>

            <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="selectedTitle" className="block text-sm font-medium text-gray-700">Título de la Crítica:</label>
                    <select
                        id="selectedTitle"
                        name="selectedTitle"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un título</option>
                        {criticisms.map((criticism) => (
                            <option key={criticism.id} value={criticism.title}>{criticism.title}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700">Reseña:</label>
                    <textarea
                        id="review"
                        name="review"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full h-36"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Autor:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Compañía:</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Crear Reseña</button>
            </form>

            {successMessage && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-200 text-green-800 p-2 rounded-md">{successMessage}</div>
            )}
        </main>
    );
};

export default CreateReviewForm;

export const revalidate = 0;
