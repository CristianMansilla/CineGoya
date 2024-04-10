import { createServerClient } from "@/app/utils/supabase/server";
import Image from "next/image";

const getCriticaData = async (id: string) => {
    const supabase = createServerClient();

    // Obtener datos de la crítica
    const { data: criticisms } = await supabase
        .from("criticisms")
        .select()
        .filter("id", "eq", id)
        .limit(1)
        .single();

    // Obtener datos de las revisiones asociadas a la crítica
    const { data: reviews, error } = await supabase
        .from("reviews")
        .select()
        .filter("id_criticisms", "eq", id);

    if (error) {
        console.error("Error fetching reviews:", error.message);
        return { criticism: criticisms, reviews: [] };
    }

    console.log("Reviews:", reviews);

    return { criticism: criticisms, reviews: reviews }; // Devuelve datos de la crítica y las revisiones
}

const CriticaPorIdPage = async ({ params }: any) => {
    const { criticism, reviews } = await getCriticaData(params.id);

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8">
                <div className="w-full h-72 mb-4 relative">
                    <Image className="object-cover w-full h-full" width={500} height={1000} src={criticism.image} alt={criticism.title} />
                </div>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="">
                        <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">{criticism.title}</h2>
                        <p className="text-gray-600 mt-2">
                            {criticism.description}
                        </p>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Opiniones</h3>
            <div>
                {reviews.map((review: any) => (
                    <div className="mb-5" key={review.id}>
                        <p>&rdquo;{review.review}&rdquo; <span className="text-red-400">{review.author}</span> de <span className="text-sky-600">{review.company}</span></p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CriticaPorIdPage;