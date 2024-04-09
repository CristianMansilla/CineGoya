import { NextRequest, NextResponse } from 'next/server';

let url_base = "https://api.themoviedb.org/3/movie/popular";
const api_key = process.env.API_KEY;

export const GET = async (req: NextRequest, res: NextResponse) => {

    const response = await fetch(`${url_base}?api_key=${api_key}`);
    const data = await response.json();
    const peliculasPopulares = data.results;
    return Response.json({ peliculasPopulares });
};