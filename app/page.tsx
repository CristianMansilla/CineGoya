"use client"

import Image from 'next/image';
import Login from './components/Login';

export default function Page() {
  return (
    <main className="flex justify-center flex-col p-3">
      <div className="flex shrink-0 items-end rounded-lg bg-blue-500 md:h-30">
        <Image src="/logo-cinegoya.png" alt='Logo CineGoya' width={100} height={100}></Image>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <Login />
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12 loginImage">
          <Image className='bord' src="/hero-cinema.svg" alt='Logo CineGoya' width={350} height={350}></Image>
        </div>
      </div>
    </main>
  );
}