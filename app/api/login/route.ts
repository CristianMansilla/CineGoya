import { NextRequest, NextResponse } from "next/server";
import users from "./users.json";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.json();
    const { user, password } = body;

    const usuarioEncontrado = users.usuarios.find(
        (usuario) => usuario.user === user && usuario.password === password
    );

    if (usuarioEncontrado !== undefined) {
        return Response.json({ message: 'Bienvenido' });
    } else {
        return Response.json({ message: 'usuario no encontrado' });
    }
}