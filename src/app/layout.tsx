import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anto's Films | Antonia Villalba - Filmmaker & Visual Artist",
  description:
    "Portfolio of Antonia Villalba, a filmmaker and visual artist based in Argentina. Specializing in film production, photography, and video editing.",
  keywords: [
    "filmmaker",
    "visual artist",
    "photography",
    "video production",
    "Argentina",
    "portfolio",
  ],
  authors: [{ name: "Antonia Villalba" }],
  openGraph: {
    title: "Anto's Films | Antonia Villalba",
    description: "Filmmaker & Visual Artist based in Argentina",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
