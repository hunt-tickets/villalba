import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Antonia Villalba',
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head />
      <body>{children}</body>
    </html>
  );
}
