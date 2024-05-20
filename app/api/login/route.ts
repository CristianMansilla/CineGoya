import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/app/utils/supabase/server";
import { error } from "console";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.json();
    const { user, password } = body;
    
    const supabase = createServerClient();

    // await supabase.auth.getUser();

    /* const usuarioEncontrado = await supabase.from("users")
                                            .select("*")
                                            .filter("username", "eq", user)
                                            .filter("password", "eq", password)
                                            .filter("role", "eq", "admin")
                                            .limit(1)
                                            .single(); */

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