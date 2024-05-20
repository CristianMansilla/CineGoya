"use client";

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/app/hooks/useUserProfile';

export default function SideNav() {
  const router = useRouter();
  const { profile, loading, error } = useUserProfile();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      console.log('Sesión cerrada exitosamente');
      return router.push('/');
    }
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-blue-600 p-4 md:h-40"
        href="/dashboard"
      >
        <div className="flex flex-col justify-center items-center gap-3 text-xs">
          <Image src="/logo-cinegoya.png" alt="Logo CineGoya" width={100} height={50} className="h-auto max-h-full sidenavLogo" />
          {loading ? (
            <h2 className="text-white">Cargando...</h2>
          ) : error ? (
            <h2 className="text-red-500">Error: {error}</h2>
          ) : (
            <h2 className="text-white">Usuario: <span className='text-amber-200'>{profile?.full_name}</span></h2>
          )}
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" onClick={handleLogout}>
          <PowerIcon className="w-6" />
          Salir
        </button>
      </div>
    </div>
  );
}
