"use client";

import CriticismCard from "@/app/components/CriticismCard";
import Link from "next/link";
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";

const urlLocal = process.env.NEXT_PUBLIC_URL;

const getDashboardData = async () => {
    try {
        const response = await fetch(`${urlLocal}/api/criticisms`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
};

const getUserData = async () => {
    try {
        const response = await fetch(`${urlLocal}/api/user`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { profile: null };
    }
};

interface Critica {
    id: number;
    title: string;
    description: string;
    image: string;
}

const Criticas = () => {
    const [criticisms, setCriticisms] = useState([]);
    const [userRole, setUserRole] = useState<string | null>(null);

    const fetchData = async () => {
        const data = await getDashboardData();
        setCriticisms(data.criticisms);
    };

    const fetchUserData = async () => {
        const data = await getUserData();
        setUserRole(data.profile?.rol || null);
    };

    useEffect(() => {
        fetchData();
        fetchUserData();
    }, []);

    return (
        <>
            <title>Críticas - CineGoya</title>

            <main>
                <h1 className="text-2xl font-bold mb-4">Críticas</h1>

                {userRole === 'administrador' && (
                    <div className="flex justify-end mb-4 gap-3">
                        <Link href="/dashboard/criticas/create" passHref>
                            <div className="bg-green-500 hover:bg-yellow-400 text-white hover:text-black font-bold py-2 px-4 rounded cursor-pointer">
                                <PlusIcon className="w-6" />
                            </div>
                        </Link>
                    </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
                    {criticisms.map((critica: Critica) => (
                        <CriticismCard key={critica.id} criticism={critica} rol={userRole}></CriticismCard>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Criticas;

export const revalidate = 0;
