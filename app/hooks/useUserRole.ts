import { useEffect, useState } from 'react';

const useUserRole = () => {
    const [userRole, setUserRole] = useState< string | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await fetch('/api/userRole');
                const data = await response.json();
                if (response.ok) {
                    setUserRole(data.profile.rol);
                } else {
                    console.error("Failed to fetch user role:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchUserRole();
    });

    return userRole;
};

export default useUserRole;
