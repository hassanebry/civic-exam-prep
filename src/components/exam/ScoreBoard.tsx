"use client";

import Link from "next/link";

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  theme: string;
  onRestart: () => void;
}

const PASS_THRESHOLD = 80;

export function ScoreBoard({
  score,
  totalQuestions,
  correctAnswers,
  theme,
  onRestart,
}: ScoreBoardProps) {
  const passed = score >= PASS_THRESHOLD;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center">
      {/* Score circle */}
      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-border bg-card shadow-[var(--shadow-sm)]">
        <span
          className={`font-serif text-5xl ${
            passed ? "text-success" : "text-accent"
          }`}
        >
          {score}
        </span>
        <span
          className={`absolute -bottom-0.5 text-lg font-medium ${
            passed ? "text-success" : "text-accent"
          }`}
        >
          %
        </span>
      </div>

      {/* Pass / fail badge */}
      <span
        className={`rounded-full px-4 py-1 text-sm font-bold tracking-wide ${
          passed
            ? "bg-[#E8F5EE] text-success"
            : "bg-[#FFF5F5] text-accent"
        }`}
      >
        {passed ? "REÇU" : "NON REÇU"}
      </span>

      <h2 className="font-serif text-xl text-foreground">
        {passed
          ? "Félicitations, vous avez réussi !"
          : "Dommage, essayez encore"}
      </h2>

      <p className="text-sm text-muted">
        Seuil de réussite : {PASS_THRESHOLD}%
      </p>

      {/* Stats row */}
      <div className="grid w-full grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-serif text-lg text-foreground">{totalQuestions}</p>
          <p className="text-xs text-muted">Questions</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-serif text-lg text-foreground">{correctAnswers}</p>
          <p className="text-xs text-muted">Bonnes réponses</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-serif text-lg text-foreground">{theme}</p>
          <p className="text-xs text-muted">Thème</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary font-medium text-white transition-opacity hover:opacity-90"
        >
          Recommencer
        </button>
        <Link
          href="/dashboard"
          className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-border text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
