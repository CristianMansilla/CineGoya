import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/app/utils/supabase/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.json();
    
    const supabase = createServerClient();

    const { user, password } = body;

    const usuarioEncontrado = await supabase.from("users")
                                            .select("*")
                                            .filter("username", "eq", user)
                                            .filter("password", "eq", password)
                                            .limit(1)
                                            .single();
    

    if (usuarioEncontrado.data !== null) {
        return Response.json({ message: 'Bienvenido' });
    } else {
        return Response.json({ message: 'Usuario no encontrado' },{status:401});
    }
}