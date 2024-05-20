"use client";

import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="container px-4 flex flex-col justify-center items-center">
            <div className="flex justify-start mb-5">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-lg`}
                >
                    Iniciar Sesión
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-2 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-lg`}
                >
                    Registrarse
                </button>
            </div>

            <div className="w-full max-w-sm h-85">
                {isLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
}

export default Auth;
