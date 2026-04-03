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

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  showResult,
}: QuestionCardProps) {
  function getOptionClasses(index: number): string {
    const base =
      "w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors";

    if (showResult) {
      if (index === question.correct_index) {
        return `${base} border-green-500 bg-green-50 text-green-900`;
      }
      if (index === selectedAnswer && index !== question.correct_index) {
        return `${base} border-red-500 bg-red-50 text-red-900`;
      }
      return `${base} border-zinc-200 bg-zinc-50 text-zinc-400`;
    }

    if (index === selectedAnswer) {
      return `${base} border-blue-500 bg-blue-50 text-blue-900`;
    }

    return `${base} border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50`;
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="mb-4 text-sm font-medium text-foreground/60">
        Question {questionNumber} / {totalQuestions}
      </p>

      <h2 className="mb-6 text-lg font-semibold leading-relaxed">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={getOptionClasses(index)}
            onClick={() => onAnswer(index)}
            disabled={showResult}
          >
            <span className="mr-2 font-bold">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {showResult && question.explanation && (
        <p className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900">
          {question.explanation}
        </p>
      )}
    </div>
  );
}
