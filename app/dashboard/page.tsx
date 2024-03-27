import { json } from "stream/consumers";
import { lusitana } from "../ui/fonts";
import { redirect } from "next/dist/server/api-utils";
import PeliCard from "../components/peliCard";

let api_key = "736af24316f62ca3b6e44f1263462e62";
let url_base = "https://api.themoviedb.org/3/movie/popular";
let url_img = "https://image.tmdb.org/t/p/w500";


interface Pelicula {
    id: number;
    poster_path: string;
}

const Dashboard = async () => {
    const response = await fetch(`${url_base}?api_key=${api_key}`);
    const data = await response.json();
    const peliculasPopulares = data.results;

    interface Pelicula {
        id: number;
        poster_path: string;
    }

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Cartelera
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
                {peliculasPopulares.map((peli: Pelicula) => {
                    return (
                        <PeliCard key={peli.id} peli={peli}></PeliCard>
                    )

                })}
            </div>
        </main>
    )
}

export default Dashboard;
