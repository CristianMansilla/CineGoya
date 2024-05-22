interface PeliDetailTitleProps {
    id: string;
}

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

const PeliDetailTitle = async({ id }: PeliDetailTitleProps) => {
    const idPeli = id;
    try {
        const { peliculasPopulares } = await getDashboardData();
        const pelicula = peliculasPopulares.find((peli: any) => peli.id === Number(id));
        console.log(pelicula.title);
        
        return (
            <p>Nombre de la Película: {peliculasPopulares ? pelicula.title : "Cargando..."}</p>
        );
    }catch(error){
        console.error("Error al obtener películas populares:", error);
    }

    
};

export default PeliDetailTitle;
