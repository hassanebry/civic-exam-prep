import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
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
  title: "CitoyenPrep — Préparation au test de naturalisation",
  description:
    "Préparez votre examen civique de naturalisation française avec des QCM officiels.",
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
      </body>
    </html>
  );
}
