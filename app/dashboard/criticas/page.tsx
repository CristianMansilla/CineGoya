"use client"

import CriticismCard from "@/app/components/CriticismCard";
import Link from "next/link";
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";

const urlLocal = process.env.NEXT_PUBLIC_URL;


const getDashboardData = async () => {
    try {
        const response = await fetch(
            `${urlLocal}/api/criticisms`
        );

        const data = await response.json();
        // console.log(data);


        return data;
    } catch (error) {
        console.error(error);

        return { data: [] };
    }
};

interface Critica {
    id: number;
    title: string;
    description: string;
    image: string;
}

const Criticas = () => {
    /* const data = await getDashboardData();
    const criticisms = data.criticisms;
    console.log(criticisms); */

    const [criticisms, setCriticisms] = useState([]);

    const fetchData = async () => {
        const data = await getDashboardData();
        setCriticisms(data.criticisms);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateCriticisms = async () => {
        await fetchData();
    };

    return (
        <>
            <title>Críticas - CineGoya</title>

            <main>
                <h1 className="text-2xl font-bold mb-4">Críticas</h1>

                <div className="flex justify-end mb-4 gap-3">
                    <Link href="/dashboard/criticas/create" passHref>
                        <div className="bg-green-500 hover:bg-yellow-400 text-white hover:text-black font-bold py-2 px-4 rounded cursor-pointer">
                            <PlusIcon className="w-6" />
                        </div>
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
                    {criticisms.map((critica: Critica) => {
                        return (
                            <CriticismCard key={critica.id} criticism={critica} updateCriticisms={updateCriticisms}></CriticismCard>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default Criticas;

