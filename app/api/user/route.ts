import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/app/utils/supabase/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
    const supabase = createServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('rol')
        .eq('id', user?.id)
        .single();

    if (profileError) {
        return NextResponse.json({ message: profileError.message }, { status: 401 });
    }

    return NextResponse.json({ profile }, { status: 200 });
};
