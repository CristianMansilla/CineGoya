import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/app/utils/supabase/server";
import { use } from "react";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const { fullName, email, password } = body;

    const supabase = createServerClient();


    // Registro de usuario
    const { data: user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }

    // Insertar perfil en la base de datos
    const { error: profileError } = await supabase
        .from('profiles')
        .insert([{id:user.user?.id, full_name: fullName }]);

    if (profileError) {
        return NextResponse.json({ message: profileError.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Usuario registrado exitosamente', user }, { status: 200 });
};

export const config = {
    api: {
        bodyParser: true,
    },
};
