import Image from 'next/image';
import Login from './components/Login';
import { createServerClient } from './utils/supabase/server';
import { redirect } from 'next/navigation';
import Auth from './components/Auth';

export default async function Page() {
  const supabase = createServerClient();
  const user = await supabase.auth.getUser();
  if (!user.error) {
    redirect("/dashboard");
  }
  return (
    <>
      <title>Login - CineGoya</title>

      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/cinegoya-255f9.appspot.com/o/Videos%2Fbackground-video.mp4?alt=media&token=e4073981-9a36-4c81-b795-7b703b622346"
        >
          Su navegador no soporta el video.
        </video>
        <div className="relative z-10 flex justify-center flex-col p-3 bg-black bg-opacity-50 h-full">
          <div className="flex shrink-0 items-end rounded-lg p-3 bg-blue-500 md:h-30 opacity-80">
            <Image className='opacity-100' src="/logo-cinegoya.png" alt="Logo CineGoya" width={100} height={100}></Image>
          </div>
          <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
            <div className="flex flex-col justify-center opacity-85 gap-6 rounded-lg bg-gray-50 px-6 -py-5 md:w-2/5 md:px-20">
              <Auth/>
            </div>
            <div className="flex items-center justify-center opacity-80 p-6 md:w-3/5 md:px-28 md:py-12 loginImage">
              <Image className="bord" src="/hero-cinema.svg" alt="Logo CineGoya" width={350} height={350}></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
