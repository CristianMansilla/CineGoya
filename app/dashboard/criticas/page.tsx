import CriticismCard from "@/app/components/CriticismCard";

const urlLocal = process.env.NEXT_PUBLIC_URL;

const getDashboardData = async () => {
    try {
        const response = await fetch(
            `${urlLocal}/api/criticisms`
        );

        const data = await response.json();
        // console.log(data);


        return data;
    } catch (error) {
        console.error(error);

        return { data: [] };
    }
};

interface Critica {
    id: number;
    title: string;
    description: string;
    image: string;
}

const Criticas = async () => {
    const data = await getDashboardData();
    const criticisms = data.criticisms;
    console.log(criticisms);

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Críticas</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
                {criticisms.map((critica: Critica) => {
                    return (
                        <CriticismCard key={critica.id} criticism={critica}></CriticismCard>
                    )
                })}
            </div>
        </main>
    )
}

export default Criticas;

export const revalidate = 0;
