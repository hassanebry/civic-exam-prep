"use client";

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
      <div
        className={`flex h-32 w-32 items-center justify-center rounded-full text-4xl font-bold ${
          passed
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {score}%
      </div>

      <h2
        className={`text-2xl font-bold ${
          passed ? "text-green-700" : "text-red-700"
        }`}
      >
        {passed ? "Félicitations, vous avez réussi !" : "Dommage, essayez encore"}
      </h2>

      <p className="text-foreground/60">
        Seuil de réussite : {PASS_THRESHOLD}%
      </p>

      <div className="w-full rounded-lg border border-zinc-200 p-4">
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-foreground/60">Thème</dt>
            <dd className="font-medium">{theme}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-foreground/60">Bonnes réponses</dt>
            <dd className="font-medium">
              {correctAnswers} / {totalQuestions}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-foreground/60">Score</dt>
            <dd className="font-medium">{score}%</dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-colors hover:bg-foreground/90"
      >
        Recommencer
      </button>
    </div>
  );
}
