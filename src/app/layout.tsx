import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monpasscivique.fr"),
  title:
    "MonPassCivique — Préparez l'examen civique CSP, CR et Naturalisation",
  description:
    "Entraînez-vous avec les 656 questions officielles du Ministère de l'Intérieur. Examens blancs chronométrés, corrigés détaillés. CSP, Carte de résident, Naturalisation.",
  keywords:
    "examen civique, naturalisation française, CSP, carte de résident, questions officielles, examen blanc, livret du citoyen",
  openGraph: {
    title:
      "MonPassCivique — Préparez l'examen civique CSP, CR et Naturalisation",
    description:
      "Entraînez-vous avec les 656 questions officielles du Ministère de l'Intérieur. Examens blancs chronométrés, corrigés détaillés. CSP, Carte de résident, Naturalisation.",
    url: "https://www.monpasscivique.fr",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} ${dmSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
