import "./ui/global.css"
import { montserrat } from "./ui/fonts";
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/public/images/icon.png" />
        <title>CineGoya - Login</title>
      </Head>

      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
