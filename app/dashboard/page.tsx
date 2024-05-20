import PeliCard from "../components/PeliCard";
import { createServerClient } from "../utils/supabase/server";
import { redirect } from 'next/navigation';

const urlLocal = process.env.NEXT_PUBLIC_URL;

const getDashboardData = async () => {
    try {
        const response = await fetch(
            `${urlLocal}/api/dashboard`
        );
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);

        return { data: [] };
    }
};

interface Pelicula {
    id: number;
    poster_path: string;
}

const Dashboard = async () => {
    const supabase = createServerClient();
    const user = await supabase.auth.getUser();
    
    if (user.error) {
        return redirect('/');
    }
    
    const { peliculasPopulares } = await getDashboardData();

    try {
        const { peliculasPopulares } = await getDashboardData();
        // console.log("Datos de películas popus:", peliculasPopulares);
        
        return (
            <>
                <title>Inicio - CineGoya</title>

                <main>
                    <h1 className="text-2xl font-bold mb-4">Cartelera</h1>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
                        {peliculasPopulares.map((peli: Pelicula) => {
                            return (
                                <PeliCard key={peli.id} peli={peli}></PeliCard>
                            )
    
                        })}
                    </div>
                </main>
                <footer className="mt-10 mb-1 flex justify-center items-center">
                    <p>Hecho con 💙 por CRISTIAN</p>
                </footer>
            </>
        )
    } catch (error) {
        console.error("Error al obtener películas populares:", error);
    }
}

export default Dashboard;

export const revalidate = 0;
