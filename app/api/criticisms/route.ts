import { createServerClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const supabase = createServerClient();

    const { data: criticisms } = await supabase.from("criticisms").select("*");
    console.log(criticisms);
    

    return Response.json({ criticisms });
};