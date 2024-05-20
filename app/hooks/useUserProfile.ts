import { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';

interface Profile {
    full_name: string | null;
}

export const useUserProfile = () => {
    const [profile, setProfile] = useState < Profile | null > (null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState < string | null > (null);

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();

            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) {
                setError(userError.message);
                setLoading(false);
                return;
            }

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', user?.id)
                .single();

            if (profileError) {
                setError(profileError.message);
            } else {
                setProfile(profileData);
            }

            setLoading(false);
        };

        fetchProfile();
    }, []);

    return { profile, loading, error };
};
