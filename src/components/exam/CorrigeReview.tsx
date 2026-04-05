"use client";

import type { Question } from "@/types";

interface CorrigeReviewProps {
  questions: Question[];
  answers: (number | null)[];
}

const LETTERS = ["A", "B", "C", "D"] as const;

export function CorrigeReview({ questions, answers }: CorrigeReviewProps) {
  return (
    <div className="flex flex-col gap-8">
      {questions.map((q, qi) => {
        const userAnswer = answers[qi];
        const isCorrect = userAnswer === q.correct_index;

        return (
          <div
            key={q.id}
            className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
          >
            {/* Question header */}
            <div className="flex items-start gap-3">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  isCorrect ? "bg-success" : "bg-accent"
                }`}
              >
                {qi + 1}
              </span>
              <p className="font-serif text-base leading-relaxed text-foreground">
                {q.question}
              </p>
            </div>

            {/* Options */}
            <div className="mt-4 flex flex-col gap-2 pl-10">
              {q.options.map((option, oi) => {
                const isThisCorrect = oi === q.correct_index;
                const isThisSelected = oi === userAnswer;

                let classes =
                  "flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm";

                if (isThisCorrect) {
                  classes +=
                    " border-success bg-[#F0FFF4] text-green-800";
                } else if (isThisSelected && !isThisCorrect) {
                  classes +=
                    " border-accent bg-[#FFF5F5] text-red-800";
                } else {
                  classes += " border-border bg-background text-muted";
                }

                return (
                  <div key={oi} className={classes}>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                        isThisCorrect
                          ? "bg-success text-white"
                          : isThisSelected
                            ? "bg-accent text-white"
                            : "bg-border text-muted"
                      }`}
                    >
                      {isThisCorrect ? (
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : isThisSelected ? (
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        LETTERS[oi]
                      )}
                    </span>
                    <span className="pt-0.5">{option}</span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {q.explanation && (
              <div className="mt-4 ml-10 flex gap-2 rounded-lg bg-[#EEF2FF] px-4 py-3">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <p className="text-sm leading-relaxed text-primary">
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
