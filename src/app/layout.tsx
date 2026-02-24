import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mecánica Giavino | Taller Mecánico en Neuquén",
  description:
    "Taller mecánico especializado en mantenimiento y reparación de vehículos en Neuquén Capital. 5 estrellas en Google. Diagnóstico computarizado, service completo y más.",
  keywords: "mecánica, taller, Neuquén, reparación autos, service, diagnóstico, Giavino",
  openGraph: {
    title: "Mecánica Giavino | Taller Mecánico en Neuquén",
    description: "Taller mecánico especializado en Neuquén. Calidad garantizada.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-[#050a14]`}>{children}</body>
    </html>
  );
}
