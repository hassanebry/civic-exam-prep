import Link from "next/link";

const FEATURES = [
  {
    title: "QCM thématiques",
    description:
      "Entraînez-vous par thème : valeurs républicaines, symboles, institutions, droits et devoirs, vie en France.",
    emoji: "📚",
  },
  {
    title: "Examen blanc",
    description:
      "Simulez les conditions réelles : 40 questions, 45 minutes, seuil de réussite à 80%.",
    emoji: "📝",
  },
  {
    title: "Mode révision",
    description:
      "Révisez à votre rythme avec les corrections et explications affichées immédiatement.",
    emoji: "🔄",
  },
] as const;

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Préparez votre examen de naturalisation
        </h1>
        <p className="mt-4 max-w-lg text-lg text-foreground/70">
          Entraînez-vous avec des QCM basés sur les questions officielles du
          livret du citoyen. Gratuit et accessible.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Commencer gratuitement
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 px-8 font-medium transition-colors hover:bg-zinc-50"
          >
            En savoir plus
          </a>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-zinc-200 bg-zinc-50 px-6 py-20"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold">
            Tout pour réussir votre examen
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map(({ title, description, emoji }) => (
              <div
                key={title}
                className="rounded-xl border border-zinc-200 bg-white p-6 text-center"
              >
                <span className="text-3xl">{emoji}</span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-foreground/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
