let api_key = "736af24316f62ca3b6e44f1263462e62";
let url_img = "https://image.tmdb.org/t/p/w500";

const getPeliculaData = async (id: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
    const data = await response.json();
    return data || {}
}
const PeliculaPorIdPage = async ({ params }: any) => {
    console.log("param", params);

    const data = await getPeliculaData(params.id);
    // console.log("data", data);

    return (
        <>
            <div className=" ">
                <img className="w-full h-50 object-cover card-img" src={`${url_img}${data.poster_path}`} alt={data.title} />
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{data.title}</h2>
                    <p className="text-gray-600 mt-2">
                        Genres: {data.genres.map(genre => genre.name).join(', ')}
                    </p>
                    <p className="text-gray-600 mt-2">
                        Overview: {data.overview}
                    </p>
                    <p className="text-gray-600 mt-2">
                        Vote Average: {data.vote_average}
                    </p>
                </div>
            </div>
        </>
    )
}

export default PeliculaPorIdPage;
