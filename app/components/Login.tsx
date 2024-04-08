import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
    const [error, setError] = useState<String | null>(null);
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 flex justify-center">
            <form onSubmit={async (e: any) => {
                e.preventDefault();
                
                const formData = new FormData(e.currentTarget);
                const user = formData.get("user");
                const password = formData.get("password");

                const response = await fetch(
                    "/api/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "aplication/json"
                        },
                        body: JSON.stringify({ user, password })
                    }
                );

                const data = await response.json();

                if(response.ok === false){
                    setError(data.message);
                } else{
                    router.push("/dashboard");
                }
                
            }} className="w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-gray-800">Iniciar sesión</h2>
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Usuario</label>
                    <input
                        type="text"
                        name="user"
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
                    <span>Ingresar</span> <ArrowRightIcon className="w-5 md:w-6" />
                </button>

                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    )
}

export default Login;