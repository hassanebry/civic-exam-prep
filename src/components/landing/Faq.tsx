"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

const ITEMS: FaqItem[] = [
  {
    q: "Les questions sont-elles officielles ?",
    a: "Oui. Les 656 questions proviennent des listes officielles publiées par le Ministère de l'Intérieur français, réparties sur les trois niveaux : CSP (189 questions), Carte de résident (209 questions) et Naturalisation (258 questions).",
  },
  {
    q: "Quelle est la différence entre l'accès gratuit et l'accès premium ?",
    a: "L'accès gratuit permet de s'entraîner sur les 10 premières questions du niveau CSP. L'accès premium (9,99 € — paiement unique, sans abonnement) débloque les 656 questions, les trois niveaux et les examens blancs complets avec corrigés détaillés.",
  },
  {
    q: "L'accès premium est-il limité dans le temps ?",
    a: "Non. Le paiement est unique et l'accès est illimité. Vous pouvez vous entraîner autant que vous voulez, sans date d'expiration.",
  },
  {
    q: "Est-ce que ça fonctionne sur mobile ?",
    a: "Oui, MonPassCivique est entièrement optimisé pour mobile, tablette et ordinateur.",
  },
  {
    q: "À quoi ressemble l'examen blanc ?",
    a: "L'examen blanc reproduit les conditions réelles : 40 questions tirées aléatoirement, minuteur de 45 minutes, seuil de réussite à 80%. À la fin, vous accédez au corrigé complet avec la bonne réponse et l'explication pour chaque question.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-card px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-2xl text-foreground sm:text-3xl">
          Questions fréquentes
        </h2>

        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-background">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-card"
                >
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {item.q}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
