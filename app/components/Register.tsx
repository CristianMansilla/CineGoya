"use client";

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Register = () => {
    const [error, setError] = useState<String | null>(null);
    const [successMessage, setSuccessMessage] = useState<String | null>(null);
    const router = useRouter();

    useEffect(() => {
        let timer: any;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage('');
                router.push('/dashboard');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [successMessage, router]);

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch(
            "/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, email, password })
            }
        );

        const data = await response.json();

        if (response.ok === false) {
            setError(data.message);
        } else {
            setError(null);
            setSuccessMessage('¡Usuario registrado exitosamente!');
        }
    };

    return (
        <div className="container mx-auto px-4 flex justify-center">
            <form onSubmit={onSubmit} className="w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-gray-800">Registrarse</h2>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                        type="text"
                        name="fullName"
                        className="mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                        required
                    />
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                        required
                    />
                </div>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                >
                    <span>Registrarse</span> <ArrowRightIcon className="w-5 md:w-6" />
                </button>

                {error && <p className='text-red-500 mt-4'>{error}</p>}
                {successMessage && (
                    <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-200 text-green-800 p-2 rounded-md">{successMessage}</div>
                )}
            </form>
        </div>
    );
}

export default Register;
