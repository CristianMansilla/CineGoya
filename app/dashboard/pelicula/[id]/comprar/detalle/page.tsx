"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PeliDetailTitle from '@/app/components/PeliDetailTitle';

const DetailBuy = () => {
    const searchParams = useSearchParams();
    const totalSeats = searchParams.get('totalSeats');
    const [movieId, setMovieId] = useState<string>('');

    useEffect(() => {
        const pathArray = window.location.pathname.split('/');
        const id = pathArray[pathArray.length - 3];
        setMovieId(id);
    }, []);

    const totalAmount = totalSeats ? Number(totalSeats) * 2500 : 0;

    return (
        <div>
            <h1>Detalle de la Compra</h1>
            <p>ID de la Película: {movieId}</p>
            {movieId && <PeliDetailTitle id={movieId} />}
            <p>Monto Total: {totalAmount} pesos</p>
        </div>
    );
};

export default DetailBuy;
