import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Trocamos Geist por Inter
import "./globals.css";

const inter = Inter({ subsets: ["latin"] }); // Usamos a Inter

export const metadata: Metadata = {
  title: "Greenbook",
  description: "Sua plataforma de gestão de apostas estratégicas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}