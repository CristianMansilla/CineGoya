export const getPeliculaData = async (id: string) => {
    const api_key = process.env.API_KEY;
    
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES`);
    const data = await response.json();
    return data || {};
};
