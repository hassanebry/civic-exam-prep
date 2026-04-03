"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useExam } from "@/hooks/useExam";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { ScoreBoard } from "@/components/exam/ScoreBoard";
import type { Theme } from "@/types";

const THEME_LABELS: Record<Theme, string> = {
  valeurs_republicaines: "Valeurs républicaines",
  symboles: "Symboles de la République",
  institutions: "Les institutions",
  droits_devoirs: "Droits et devoirs",
  vie_en_france: "Vie en France",
};

const VALID_THEMES: ReadonlySet<string> = new Set<string>([
  "valeurs_republicaines",
  "symboles",
  "institutions",
  "droits_devoirs",
  "vie_en_france",
]);

function parseTheme(value: string | null): Theme | undefined {
  if (value && VALID_THEMES.has(value)) return value as Theme;
  return undefined;
}

function LoadingFallback() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-foreground" />
      <p className="text-sm text-foreground/60">Chargement des questions...</p>
    </main>
  );
}

function ReviewContent() {
  const searchParams = useSearchParams();
  const theme = parseTheme(searchParams.get("theme"));

  const {
    questions,
    answers,
    currentIndex,
    isLoading,
    currentQuestion,
    score,
    correctAnswers,
    progress,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    restartExam,
  } = useExam({ mode: "review", theme });

  const isLastQuestion = currentIndex === questions.length - 1;
  const allAnswered = isLastQuestion && answers[currentIndex] !== null;
  const themeLabel = theme ? THEME_LABELS[theme] : "Toutes les questions";

  const backLink = (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-1 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
    >
      &larr; Retour au tableau de bord
    </Link>
  );

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col px-6 py-6">
        <div className="mx-auto w-full max-w-2xl">{backLink}</div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-foreground" />
          <p className="text-sm text-foreground/60">Chargement des questions...</p>
        </div>
      </main>
    );
  }

  if (allAnswered) {
    return (
      <main className="flex flex-1 flex-col px-6 py-6">
        <div className="mx-auto w-full max-w-2xl">{backLink}</div>
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <ScoreBoard
            score={score}
            totalQuestions={questions.length}
            correctAnswers={correctAnswers}
            theme={themeLabel}
            onRestart={restartExam}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-6">
      {/* Header + progress */}
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
        {backLink}
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-lg font-bold">Révision — {themeLabel}</h1>
          <span className="text-xs text-foreground/60">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question — showResult after answering */}
      <div className="flex flex-1 flex-col items-center justify-center py-8">
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentIndex]}
            onAnswer={answerQuestion}
            showResult={answers[currentIndex] !== null}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
        <button
          type="button"
          onClick={previousQuestion}
          disabled={currentIndex === 0}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Question précédente
        </button>
        <button
          type="button"
          onClick={nextQuestion}
          disabled={isLastQuestion}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Question suivante
        </button>
      </div>
    </main>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReviewContent />
    </Suspense>
  );
}
