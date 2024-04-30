"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { useEffect, useState } from "react";

const CreateCriticaForm = () => {

    const supabase = createClient();
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        let timer:any;
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
            <h1 className="text-2xl font-bold mb-4">Crear Crítica</h1>

            <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={async (event) => {
                event.preventDefault();

                const formData = new FormData(event.currentTarget);
                const title = formData.get('title')?.toString();
                const description = formData.get('description')?.toString();
                const image = formData.get('image')?.toString();

                const { error } = await supabase.from('criticisms').insert({ title, description, image });

                if (error) {
                    console.error('Error al crear la crítica:', error.message);
                } else {
                    console.log('Crítica creada exitosamente');
                    setSuccessMessage('¡La crítica se creó con éxito!');
                }
            }}>
                
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Crear Crítica</button>
            </form>
            

            {successMessage && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-200 text-green-800 p-2 rounded-md">{successMessage}</div>
            )}
        </main>
    );
};

export default CreateCriticaForm;