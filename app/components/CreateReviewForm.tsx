"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { useEffect, useState } from "react";

interface DataProps {
    id: any
    title: any
}

const CreateReviewForm = () => {

    const supabase = createClient();
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState('');
    const [criticisms, setCriticisms] = useState<DataProps[]>([]);

    useEffect(() => {
        async function fetchCriticisms() {
            try {
                const { data, error } = await supabase.from('criticisms').select('id, title');
                if (error) {
                    throw error;
                }
                setCriticisms(data || []);
            } catch (error: any) {
                console.error('Error al obtener los títulos de las críticas:', error.message);
            }
        }

        fetchCriticisms();
    }, [supabase]);

    useEffect(() => {
        let timer: any;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage('');
                router.push('/dashboard/criticas');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [successMessage, router]);

    return (
        <main >
            <h1 className="text-2xl font-bold mb-4">Crear Reseña</h1>

            <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={async (event) => {
                event.preventDefault();

                const formData = new FormData(event.currentTarget);
                const review = formData.get('review')?.toString();
                const author = formData.get('author ')?.toString();
                const company = formData.get('company ')?.toString();

                const { error } = await supabase.from('reviews').insert({ review, author, company });

                if (error) {
                    console.error('Error al crear la crítica:', error.message);
                } else {
                    console.log('Crítica creada exitosamente');
                    setSuccessMessage('¡La crítica se creó con éxito!');
                }
            }}>
                <div className="mb-4">
                    <label htmlFor="selectedTitle" className="block text-sm font-medium text-gray-700">Título de la Crítica:</label>
                    <select
                        id="selectedTitle"
                        name="selectedTitle"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    >
                        <option value="">Selecciona un título</option>
                        {criticisms.map((criticism) => (
                            <option key={criticism.title} value={criticism.title}>{criticism.title}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700">Reseña:</label>
                    <input
                        type="text"
                        id="review"
                        name="review"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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