import Link from "next/link";
import { Faq } from "@/components/landing/Faq";
import { QuestionDemo } from "@/components/landing/QuestionDemo";
import { RefCapture } from "@/components/landing/RefCapture";
import { FAQ_ITEMS } from "@/lib/faq-items";

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MonPassCivique",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web Browser",
  description:
    "Plateforme de préparation aux examens civiques français (CSP, carte de résident, naturalisation) avec les 656 questions officielles du Ministère de l'Intérieur.",
  offers: [
    {
      "@type": "Offer",
      name: "Gratuit",
      price: "0",
      priceCurrency: "EUR",
      description: "Niveau CSP, sans limite de temps.",
    },
    {
      "@type": "Offer",
      name: "Premium",
      price: "9.99",
      priceCurrency: "EUR",
      description:
        "Carte de résident + naturalisation + examen blanc, paiement unique.",
    },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      <RefCapture />
      {/* Hero with embedded interactive quiz — quiz visible above the fold */}
      <section className="px-5 pb-6 pt-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">

          {/* Header — mobile row 1 / desktop top-left */}
          <div className="flex flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:text-left">
            <h1 className="max-w-xl font-serif text-2xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              Réussissez votre examen civique du premier coup.
            </h1>

            {/* Tricolor accent — desktop-only to preserve mobile above-the-fold */}
            <div className="mt-3 hidden h-[3px] w-20 overflow-hidden rounded-full lg:flex">
              <span className="w-1/3 bg-[#002395]" />
              <span className="w-1/3 bg-white" />
              <span className="w-1/3 bg-[#ED2939]" />
            </div>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:mt-4 sm:text-base lg:text-lg">
              Une préparation sérieuse fait toute la différence pour réussir l’
              <a
                href="https://www.service-public.gouv.fr/particuliers/vosdroits/F39426"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 hover:text-foreground"
              >
                examen civique officiel
              </a>
              . 656 questions officielles. Résultats immédiats.
            </p>
          </div>

          {/* Interactive quiz — mobile row 2 / desktop spans right column */}
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <QuestionDemo />
          </div>

          {/* CTA + exam-format stats — mobile row 3 / desktop bottom-left */}
          <div className="flex flex-col items-center lg:col-start-1 lg:row-start-2 lg:items-start">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:h-12 sm:px-8"
            >
              Commencer l’examen
            </Link>

            <dl className="mt-4 grid w-full max-w-md grid-cols-4 gap-2 sm:mt-6 sm:gap-3">
              {[
                { v: "40", l: "questions" },
                { v: "45 min", l: "durée" },
                { v: "80%", l: "requis" },
                { v: "5", l: "thèmes" },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="rounded-lg border border-border bg-card px-2 py-2 text-center"
                >
                  <dt className="font-serif text-base text-primary sm:text-lg">
                    {v}
                  </dt>
                  <dd className="text-[11px] text-muted sm:text-xs">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

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

      {/* FAQ */}
      <Faq />
    </main>
  );
}
