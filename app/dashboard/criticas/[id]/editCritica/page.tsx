import EditCriticaForm from "@/app/components/EditCriticaForm";
import { createServerClient } from "@/app/utils/supabase/server";

const EditCritica = async ({ params }: any) => {
    const supabase = createServerClient();
    const { data } = await supabase
        .from('criticisms')
        .select('*')
        .eq('id', params.id)
        .single();

    return <EditCriticaForm criticism={data}></EditCriticaForm>;
}

export default EditCritica
