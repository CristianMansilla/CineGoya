import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/app/utils/supabase/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.json();
    const { user, password } = body;
    
    const supabase = createServerClient();

    const { data: usuarioEncontrado, error } = await supabase.auth.signInWithPassword({
        email: user,
        password,
    });
    

    if (error === null) {
        return Response.json({ message: 'Bienvenido' });
    } else {
        return Response.json({ message: 'Usuario no encontrado' },{status:401});
    }
}