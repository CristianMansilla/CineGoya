import PeliDetails from "@/app/components/PeliDetails";
import { getPeliculaData } from "@/app/utils/getPeliculaData";

const PeliculaPorIdPage = async ({ params }: any) => {
    const data = await getPeliculaData(params.id);

    return (
        <>
            <title>Detalle Película - CineGoya</title>
            <PeliDetails data={data} />
            
        </>
    );
};

export default PeliculaPorIdPage;
