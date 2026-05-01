"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface QuizQuestion {
  theme: string;
  themeColor: string;
  themeIcon: React.ReactNode;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    theme: "Institutions",
    themeColor: "#002395",
    themeIcon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    question: "Combien y a-t-il de députés à l'Assemblée nationale ?",
    options: ["350", "450", "577", "925"],
    correctIndex: 2,
    explanation:
      "L'Assemblée nationale compte 577 députés, élus au suffrage universel direct pour un mandat de 5 ans.",
  },
  {
    theme: "Histoire",
    themeColor: "#ED2939",
    themeIcon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    question:
      "En quelle année a été adoptée la Déclaration des droits de l'homme et du citoyen ?",
    options: ["1776", "1789", "1804", "1848"],
    correctIndex: 1,
    explanation:
      "La Déclaration des droits de l'homme et du citoyen a été adoptée le 26 août 1789 par l'Assemblée constituante.",
  },
  {
    theme: "Droits & Devoirs",
    themeColor: "#002395",
    themeIcon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    question: "À partir de quel âge le vote est-il un droit en France ?",
    options: ["16 ans", "18 ans", "20 ans", "21 ans"],
    correctIndex: 1,
    explanation:
      "En France, le droit de vote est acquis à 18 ans, âge de la majorité civile.",
  },
];

const LABELS = ["A", "B", "C", "D"] as const;
const AUTO_ADVANCE_MS = 1800;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function QuestionDemo() {
  const [step, setStep] = useState(0); // 0-2 = questions, 3 = score
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [fading, setFading] = useState(false);

  const isScore = step >= QUESTIONS.length;
  const currentQ = !isScore ? QUESTIONS[step] : null;
  const currentAnswer = !isScore ? answers[step] : null;
  const answered = currentAnswer !== null;

  const correctCount = answers.filter(
    (a, i) => a === QUESTIONS[i].correctIndex,
  ).length;

  const advanceToNext = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setFading(false);
    }, 250);
  }, []);

  // Auto-advance after answering
  useEffect(() => {
    if (!answered || isScore) return;
    const t = setTimeout(advanceToNext, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [answered, isScore, advanceToNext]);

  function handleClick(index: number) {
    if (answered || isScore) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = index;
      return next;
    });
  }

  function restart() {
    setFading(true);
    setTimeout(() => {
      setStep(0);
      setAnswers([null, null, null]);
      setFading(false);
    }, 250);
  }

  /* — dots — */
  function dotCls(i: number): string {
    const base = "h-2 rounded-full transition-all duration-300";
    if (i === step && !isScore) return `${base} w-6 bg-foreground`;
    if (answers[i] === null) return `${base} w-2 bg-gray-300`;
    if (answers[i] === QUESTIONS[i].correctIndex)
      return `${base} w-2 bg-green-500`;
    return `${base} w-2 bg-red-500`;
  }

  /* — option styling — */
  function optCls(i: number): string {
    const base =
      "flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-3 text-left text-sm font-medium transition-all";
    if (!answered)
      return `${base} border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50 active:scale-[0.99]`;
    if (i === currentQ!.correctIndex)
      return `${base} border-green-500 bg-green-50 text-green-800`;
    if (i === currentAnswer)
      return `${base} border-red-500 bg-red-50 text-red-800`;
    return `${base} border-gray-200 bg-white text-gray-300`;
  }

  function badgeCls(i: number): string {
    const base =
      "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors";
    if (!answered) return `${base} bg-gray-100 text-gray-500`;
    if (i === currentQ!.correctIndex) return `${base} bg-green-600 text-white`;
    if (i === currentAnswer) return `${base} bg-red-500 text-white`;
    return `${base} bg-gray-100 text-gray-300`;
  }

  /* — score helpers — */
  function scoreColor(): string {
    if (correctCount === 3) return "text-green-600 border-green-200";
    if (correctCount === 2) return "text-orange-500 border-orange-200";
    return "text-red-500 border-red-200";
  }
  function scoreMsg(): string {
    if (correctCount === 3) return "Excellent !";
    if (correctCount === 2) return "Bon début !";
    return "Vous avez besoin de préparation.";
  }

  return (
    <section id="demo-question" className="scroll-mt-16 px-4 pb-8 pt-2 sm:py-12">
      <div className="mx-auto max-w-md">
        {/* Progress dots */}
        <div className="mb-3 flex items-center justify-center gap-1.5">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={dotCls(i)} />
          ))}
        </div>

        <div
          className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity duration-250 sm:p-6 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* ---------- Question card ---------- */}
          {currentQ && !isScore && (
            <>
              {/* Theme header */}
              <div className="flex items-center gap-1.5">
                <span style={{ color: currentQ.themeColor }}>
                  {currentQ.themeIcon}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: currentQ.themeColor }}
                >
                  {currentQ.theme}
                </span>
                <span className="ml-auto text-[11px] font-medium text-gray-400">
                  {step + 1}/{QUESTIONS.length}
                </span>
              </div>

              {/* Question text */}
              <p className="mt-2.5 font-serif text-base leading-relaxed text-gray-900 sm:text-lg">
                {currentQ.question}
              </p>

              {/* Options */}
              <div className="mt-4 flex flex-col gap-2">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={answered}
                    onClick={() => handleClick(i)}
                    className={optCls(i)}
                  >
                    <span className={badgeCls(i)}>
                      {answered && i === currentQ.correctIndex ? (
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : answered && i === currentAnswer ? (
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        LABELS[i]
                      )}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {answered && (
                <div
                  className={`mt-3 rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    currentAnswer === currentQ.correctIndex
                      ? "bg-green-50 text-green-800"
                      : "bg-orange-50 text-orange-800"
                  }`}
                >
                  {currentQ.explanation}
                </div>
              )}
            </>
          )}

          {/* ---------- Score screen ---------- */}
          {isScore && (
            <div className="flex flex-col items-center py-2 text-center">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full border-4 font-serif text-3xl font-bold ${scoreColor()}`}
              >
                {correctCount}/3
              </div>

              <p className="mt-3 font-serif text-lg text-gray-900">
                {scoreMsg()}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Vous venez de répondre à 3 questions sur 656.
              </p>

              <Link
                href="/register"
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:h-12"
              >
                Continuer l&apos;entraînement — c&apos;est gratuit
              </Link>

              <p className="mt-2 text-xs text-gray-400">
                Rejoint par plus de 200 candidats
              </p>

              <button
                type="button"
                onClick={restart}
                className="mt-3 text-sm font-medium text-gray-500 underline underline-offset-2 transition-colors hover:text-gray-700"
              >
                Recommencer le quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
