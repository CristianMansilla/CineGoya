"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from 'swr';

interface EditCriticismFormProps {
    criticism: any
}

const urlLocal = process.env.NEXT_PUBLIC_URL;

const EditCriticaForm = ({ criticism }: EditCriticismFormProps) => {
    const supabase = createClient();
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState('');

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

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get('title')?.toString();
        const description = formData.get('description')?.toString();
        const image = formData.get('image')?.toString();

        const { error } = await supabase.from('criticisms').update({ title, description, image }).eq('id', criticism.id);

        if (error) {
            console.error('Error al editar la crítica:', error.message);
        } else {
            console.log('Crítica editada exitosamente');
            setSuccessMessage('¡La crítica se editó con éxito!');

            // Invalida el caché después de editar la crítica con éxito
            mutate(`${urlLocal}/api/criticisms`);
        }
    };

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Editar Crítica</h1>

            <form className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        defaultValue={criticism?.title}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full h-36"
                        defaultValue={criticism?.description}
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
                        defaultValue={criticism?.image}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Guardar Cambios</button>
            </form>

            {successMessage && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-200 text-green-800 p-2 rounded-md">{successMessage}</div>
            )}
        </main>
    );
};

export default EditCriticaForm;

export const revalidate = 0;