"use client";

import { useExam } from "@/hooks/useExam";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { Timer } from "@/components/exam/Timer";
import { ScoreBoard } from "@/components/exam/ScoreBoard";

const EXAM_DURATION_SECONDS = 2700; // 45 minutes

export default function ExamPage() {
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
  } = useExam({ mode: "blanc" });

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-foreground" />
        <p className="text-sm text-foreground/60">
          Chargement des questions...
        </p>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <ScoreBoard
          score={score}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          theme="Examen blanc"
          onRestart={restartExam}
        />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-6">
      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
        <Timer
          durationSeconds={EXAM_DURATION_SECONDS}
          onTimeUp={finishExam}
        />
        <div className="flex flex-1 flex-col items-end gap-1">
          <span className="text-xs text-foreground/60">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
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
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Question précédente
        </button>
        <button
          type="button"
          onClick={finishExam}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Terminer l&apos;examen
        </button>
      </div>
    </main>
  );
}
