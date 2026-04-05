import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "QCM thématiques",
    description:
      "Entraînez-vous par thème : valeurs républicaines, symboles, institutions, droits et devoirs, vie en France.",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Examen blanc",
    description:
      "Simulez les conditions réelles : 40 questions, 45 minutes, seuil de réussite à 80%.",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: "Mode révision",
    description:
      "Révisez à votre rythme avec les corrections et explications affichées immédiatement.",
  },
] as const;

const STATS = [
  { value: "650+", label: "questions officielles" },
  { value: "3", label: "niveaux d\u2019examen" },
  { value: "5", label: "thèmes couverts" },
] as const;

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pb-16 pt-20 text-center sm:pt-28">
        <h1 className="max-w-3xl font-serif text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          Réussissez votre examen civique
        </h1>

        {/* Tricolor accent line */}
        <div className="mt-5 flex h-[3px] w-24 overflow-hidden rounded-full">
          <span className="w-1/3 bg-[#002395]" />
          <span className="w-1/3 bg-white" />
          <span className="w-1/3 bg-[#ED2939]" />
        </div>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Entraînez-vous avec les questions officielles du Ministère de
          l&apos;Intérieur — CSP, Carte de résident ou Naturalisation.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Commencer gratuitement
          </Link>
          <a
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-8 text-sm font-semibold text-foreground transition-colors hover:bg-card"
          >
            En savoir plus
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-around gap-6 sm:flex-row sm:gap-0">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-3xl text-primary">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-2xl text-foreground sm:text-3xl">
            Tout pour réussir votre examen
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-sm)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF2FF]">
                  {icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
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
