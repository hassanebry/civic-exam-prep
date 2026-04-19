"use client";

import { useState } from "react";
import Link from "next/link";

interface Option {
  label: string;
  text: string;
  correct: boolean;
}

const QUESTION = "Combien y a-t-il de députés à l'Assemblée nationale ?";

const OPTIONS: Option[] = [
  { label: "A", text: "350", correct: false },
  { label: "B", text: "450", correct: false },
  { label: "C", text: "577", correct: true },
  { label: "D", text: "925", correct: false },
];

const EXPLANATION =
  "L'Assemblée nationale compte 577 députés, élus au suffrage universel direct pour un mandat de 5 ans.";

const CORRECT_INDEX = OPTIONS.findIndex((o) => o.correct);

export function QuestionDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  function handleClick(index: number) {
    if (answered) return;
    setSelected(index);
  }

  function optionCls(index: number): string {
    const base =
      "flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-3 text-left text-sm font-medium transition-all";
    if (!answered)
      return `${base} border-border bg-card text-foreground hover:border-primary/40 hover:bg-[#EEF2FF] active:scale-[0.99]`;
    if (index === CORRECT_INDEX)
      return `${base} border-green-500 bg-green-50 text-green-800`;
    if (index === selected)
      return `${base} border-accent bg-red-50 text-red-800`;
    return `${base} border-border bg-card text-muted`;
  }

  function badgeCls(index: number): string {
    const base =
      "flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold transition-colors";
    if (!answered) return `${base} bg-[#F0F0ED] text-muted`;
    if (index === CORRECT_INDEX) return `${base} bg-green-600 text-white`;
    if (index === selected) return `${base} bg-accent text-white`;
    return `${base} bg-[#F0F0ED] text-muted`;
  }

  return (
    <section id="demo-question" className="scroll-mt-16 px-5 pb-8 pt-2 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-sm)] sm:p-6">
          {/* Label */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Question officielle — niveau CSP
          </p>

          {/* Question */}
          <p className="mt-2 font-serif text-base leading-relaxed text-foreground sm:text-lg">
            {QUESTION}
          </p>

          {/* Options */}
          <div className="mt-4 flex flex-col gap-2">
            {OPTIONS.map((opt, i) => (
              <button
                key={opt.label}
                type="button"
                disabled={answered}
                onClick={() => handleClick(i)}
                className={optionCls(i)}
              >
                <span className={badgeCls(i)}>
                  {answered && i === CORRECT_INDEX ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : answered && i === selected ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    opt.label
                  )}
                </span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>

          {/* Post-answer feedback */}
          {answered && (
            <div className="mt-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex gap-2 rounded-lg bg-[#EEF2FF] px-3.5 py-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p className="text-sm leading-relaxed text-primary">
                  {EXPLANATION}
                </p>
              </div>

              <p className="mt-4 text-center text-sm text-muted">
                Vous venez de répondre à 1 question sur 656.
              </p>

              <Link
                href="/register"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:h-12"
              >
                Continuer l&apos;entraînement — gratuit, sans inscription
              </Link>

              <p className="mt-2.5 text-center text-xs text-gray-400">
                Rejoint par plus de 200 candidats
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
