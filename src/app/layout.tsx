import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://antoniavillalba.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Antonia Villalba | Realizadora Audiovisual",
    template: "%s | Antonia Villalba",
  },
  description:
    "Portafolio de Antonia Villalba, realizadora audiovisual basada en Colombia. Especializada en dirección, cinematografía y producción audiovisual.",
  keywords: [
    "realizadora audiovisual",
    "directora de cine",
    "filmmaker",
    "cinematógrafa",
    "producción audiovisual",
    "Colombia",
    "portafolio",
    "videoarte",
    "documental",
    "cortometraje",
  ],
  authors: [{ name: "Antonia Villalba" }],
  creator: "Antonia Villalba",
  publisher: "Antonia Villalba",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "Antonia Villalba",
    title: "Antonia Villalba | Realizadora Audiovisual",
    description: "Realizadora audiovisual basada en Colombia. Dirección, cinematografía y producción.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Antonia Villalba - Realizadora Audiovisual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonia Villalba | Realizadora Audiovisual",
    description: "Realizadora audiovisual basada en Colombia",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
