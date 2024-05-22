import { NextRequest, NextResponse } from 'next/server';

let url_base = "https://api.themoviedb.org/3/movie/popular";
const api_key = process.env.API_KEY;

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {
        const response = await fetch(`${url_base}?api_key=${api_key}&language=es-ES`);
        const data = await response.json();
        const peliculasPopulares = data.results;
        console.log("Datos de películas populares:", peliculasPopulares);
        return Response.json({ peliculasPopulares });
    } catch (error) {
        console.error("Error al obtener películas populares:", error);
        return Response.error();
    }
};