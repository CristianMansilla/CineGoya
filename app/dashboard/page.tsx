import PeliCard from "../components/PeliCard";
import { lusitana } from "../ui/fonts";

let url_base = "https://api.themoviedb.org/3/movie/popular";
const api_key = process.env.API_KEY;


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
        <>
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
            <footer className="mt-10 -mb-20 flex justify-center items-center">
                <p>Hecho con 💙 por CRISTIAN</p>
            </footer>
        </>
    )
}

export default Dashboard;
