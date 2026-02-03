import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import { dinPro } from "./font";
import { Roboto, Roboto_Condensed } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    default: "Let’s Catch Carbon : Devenez un Karbon Killer avec chaque Tasse de Café en Soutenant l’Agroforesterie pour le Climat et la Biodiversité",
    template: "Let's Catch Carbon : %s",
  },
  description:
    "Soyez un pionnier de l'épopée climatique et changez notre destinée",
  icons: {
    icon: "/Images/icon.webp",
  },
  robots: {
    index: process.env.NEXT_PUBLIC_ENV === "prod",
    follow: process.env.NEXT_PUBLIC_ENV === "prod",
    googleBot: {
      index: process.env.NEXT_PUBLIC_ENV === "prod",
      follow: process.env.NEXT_PUBLIC_ENV === "prod",
    },
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-roboto-condensed',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://erp.chacunsoncafe.fr" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      </head>
      <body className={`${dinPro.variable} ${roboto.variable} ${robotoCondensed.variable}`}>{children}</body>
    </html>
  );
}
