import Image from "next/image";

let url_img = "https://image.tmdb.org/t/p/w500";
const api_key = process.env.API_KEY;

const getPeliculaData = async (id: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES`);
    const data = await response.json();
    console.log(data);
    
    return data || {}
}
const PeliculaPorIdPage = async ({ params }: any) => {
    console.log("param", params);

    const data = await getPeliculaData(params.id);
    console.log("data", data);

    const horas = Math.floor(data.runtime / 60);
    const minutos = data.runtime % 60;
    const duration = `${horas}h: ${minutos.toString().padStart(2,'0')}m`

    return (
        <>
            <div className="flex overflow-hidden justify-center items-center">
                <Image className="w-500 object-cover card-img" width={250} height={333} src={`${url_img}${data.poster_path}`} alt={data.title} />
                <div className="p-6">
                    <h2 className="text-5xl font-semibold text-gray-800">{data.title}</h2>
                    <p className="text-gray-600 mt-2">
                        <span className="font-bold">Genres: </span>{data.genres.map((genre: { name: string }) => genre.name).join(', ')}
                    </p>
                    <p className="text-gray-600 mt-2">
                    <span className="font-bold">Reseña: </span>{data.overview}
                    </p>
                    <p className="text-gray-600 mt-2">
                    <span className="font-bold">Voto promedio: </span>{data.vote_average}
                    </p>
                    <p className="text-gray-600 mt-2">
                    <span className="font-bold">Duración: </span>{duration}
                    </p>
                </div>
            </div>
        </>
    )
}

export default PeliculaPorIdPage;
