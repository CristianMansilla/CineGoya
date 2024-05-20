import { createServerClient } from "@/app/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';


const getCriticaData = async (id: string) => {
    const supabase = createServerClient();

    // Obtener datos de la crítica
    const { data: criticism } = await supabase
        .from("criticisms")
        .select()
        .eq("id", id)
        .single();

    // Obtener datos de las opiniones asociadas a la crítica
    const { data: reviews, error: reviewsError } = await supabase
        .from("reviews")
        .select()
        .eq("id_criticisms", id);

    if (reviewsError) {
        console.error("Error fetching reviews:", reviewsError.message);
        return { criticism, reviews: [] };
    }

    // Obtener el usuario y su rol
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error("Error fetching user:", userError.message);
        return { criticism, reviews, userRole: null };
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('rol')
        .eq('id', user?.id)
        .single();

    if (profileError) {
        console.error("Error fetching user profile:", profileError.message);
        return { criticism, reviews, userRole: null };
    }

    const userRole = profile.rol;

    return { criticism, reviews, userRole };
}


const CriticaPorIdPage = async ({ params }: any) => {
    const { criticism, reviews, userRole } = await getCriticaData(params.id);

    return (
        <>
            <title>Detalle Crítica - CineGoya</title>

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

                {userRole === 'administrador' && (
                    <div className="flex justify-end mb-4 gap-3">
                        <Link href={`/dashboard/criticas/${criticism.id}/create`} passHref>
                            <div className="bg-green-500 hover:bg-yellow-400 text-white hover:text-black font-bold py-2 px-4 rounded cursor-pointer">
                                <PlusIcon className="w-6" />
                            </div>
                        </Link>
                    </div>
                )}

                <h3 className="text-2xl font-semibold mb-4">¿Qué dice la crítca de &apos;{criticism.title}&apos;?</h3>
                <div>
                    {reviews.map((review: any) => (
                        <div className="mb-5" key={review.id}>
                            <p>&rdquo;{review.review}&rdquo; <span className="text-red-400">{review.author}</span> de <span className="text-sky-600">{review.company}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CriticaPorIdPage;

export const revalidate = 0;