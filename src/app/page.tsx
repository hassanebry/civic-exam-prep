import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Préparez votre examen civique
      </h1>
      <p className="mt-4 max-w-lg text-lg text-foreground/70">
        Entraînez-vous avec des QCM basés sur les questions officielles du test
        de naturalisation française.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background font-medium transition-colors hover:bg-foreground/90"
      >
        Commencer l&apos;entraînement
      </Link>
    </main>
  );
}
