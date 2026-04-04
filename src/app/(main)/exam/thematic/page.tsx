"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import type { Theme } from "@/types";
import { useExam } from "@/hooks/useExam";
import { useProfile } from "@/hooks/useProfile";
import { FREE_QUESTIONS_LIMIT } from "@/lib/utils/questions";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { ScoreBoard } from "@/components/exam/ScoreBoard";

const THEME_LABELS: Record<Theme, string> = {
  valeurs_republicaines: "Valeurs républicaines",
  symboles: "Symboles de la République",
  institutions: "Les institutions",
  droits_devoirs: "Droits et devoirs",
  vie_en_france: "Vie en France",
  histoire_geo_culture: "Histoire, géographie et culture",
};

const VALID_THEMES = new Set<string>(Object.keys(THEME_LABELS));

function parseTheme(value: string | null): Theme | null {
  if (value && VALID_THEMES.has(value)) return value as Theme;
  return null;
}

function LoadingFallback() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
      <p className="text-sm text-muted">Chargement des questions...</p>
    </main>
  );
}

function ThematicContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = parseTheme(searchParams.get("theme"));
  const { isPremium, isLoading: profileLoading } = useProfile();

  const {
    questions,
    answers,
    currentIndex,
    isFinished,
    isLoading,
    currentQuestion,
    score,
    correctAnswers,
    progress,
    answerQuestion,
    previousQuestion,
    finishExam,
    restartExam,
  } = useExam({
    mode: "thematic",
    theme: theme ?? undefined,
    maxQuestions: isPremium ? undefined : FREE_QUESTIONS_LIMIT,
  });

  useEffect(() => {
    if (!theme) {
      router.replace("/dashboard");
    }
  }, [theme, router]);

  if (!theme) return null;

  const themeLabel = THEME_LABELS[theme];

  if (isLoading || profileLoading) {
    return <LoadingFallback />;
  }

  if (isFinished) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <ScoreBoard
          score={score}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          theme={themeLabel}
          onRestart={restartExam}
        />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-6">
      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              &larr;
            </Link>
            <h1 className="font-serif text-lg text-foreground">
              {themeLabel}
            </h1>
          </div>
          <span className="text-xs text-muted">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col items-center justify-center py-8">
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentIndex]}
            onAnswer={answerQuestion}
            showResult={false}
          />
        )}
      </div>

      {/* Bottom navigation */}
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
        <button
          type="button"
          onClick={previousQuestion}
          disabled={currentIndex === 0}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-card disabled:cursor-not-allowed disabled:opacity-40"
        >
          Question précédente
        </button>
        <button
          type="button"
          onClick={finishExam}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Terminer l&apos;entraînement
        </button>
      </div>
    </main>
  );
}

export default function ThematicExamPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ThematicContent />
    </Suspense>
  );
}
