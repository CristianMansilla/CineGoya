"use client"

import Image from "next/image"

const CriticismCard = ({ criticism }: any) => {
    return (
        <a className="block cursor-pointer border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out" onClick={() => { }}>
            <div className="relative h-48 w-full">
                <Image src="https://img-tomatazos.buscafs.com/432471/432471_1140x516.jpg" layout="fill" objectFit="cover" alt={criticism.title} />
            </div>
            <div className="p-4 h-52">
                <h2 className="text-lg font-semibold mb-2">{criticism.title}</h2>
                <p className="text-gray-600 overflow-hidden line-clamp-5">{criticism.description}</p>
            </div>
        </a>
    );
}

export default CriticismCard;
