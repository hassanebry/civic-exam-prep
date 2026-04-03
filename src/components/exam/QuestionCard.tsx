"use client";

import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  showResult: boolean;
}

const LETTERS = ["A", "B", "C", "D"] as const;

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  showResult,
}: QuestionCardProps) {
  function getOptionStyles(index: number) {
    const base =
      "group flex w-full items-start gap-3 rounded-lg border px-4 py-3.5 text-left text-sm transition-all";

    if (showResult) {
      if (index === question.correct_index) {
        return {
          button: `${base} border-success bg-[#F0FFF4] text-foreground`,
          badge: "bg-success text-white",
          icon: "check" as const,
        };
      }
      if (index === selectedAnswer && index !== question.correct_index) {
        return {
          button: `${base} border-accent bg-[#FFF5F5] text-foreground`,
          badge: "bg-accent text-white",
          icon: "x" as const,
        };
      }
      return {
        button: `${base} border-border bg-background text-muted`,
        badge: "bg-border text-muted",
        icon: null,
      };
    }

    if (index === selectedAnswer) {
      return {
        button: `${base} border-primary bg-[#EEF2FF] text-foreground`,
        badge: "bg-primary text-white",
        icon: null,
      };
    }

    return {
      button: `${base} border-border bg-card text-foreground hover:border-primary hover:bg-[#EEF2FF]`,
      badge: "bg-[#F0F0ED] text-muted group-hover:bg-primary group-hover:text-white",
      icon: null,
    };
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-sm)]">
      {/* Question number badge */}
      <span className="inline-block rounded-md bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-primary">
        Question {questionNumber} / {totalQuestions}
      </span>

      {/* Question text */}
      <h2 className="mt-4 font-serif text-xl leading-relaxed text-foreground">
        {question.question}
      </h2>

      {/* Options */}
      <div className="mt-6 flex flex-col gap-2.5">
        {question.options.map((option, index) => {
          const styles = getOptionStyles(index);
          return (
            <button
              key={index}
              type="button"
              className={styles.button}
              onClick={() => onAnswer(index)}
              disabled={showResult}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors ${styles.badge}`}
              >
                {styles.icon === "check" ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : styles.icon === "x" ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  LETTERS[index]
                )}
              </span>
              <span className="pt-0.5 font-medium">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && question.explanation && (
        <div className="mt-5 flex gap-2.5 rounded-lg bg-[#EEF2FF] px-4 py-3">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm leading-relaxed text-primary">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
