"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ScoreBoard } from "@/components/exam/ScoreBoard";

// TODO Phase 3 - load real session from Supabase by sessionId

export default function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();

  return (
    <main className="flex flex-1 flex-col px-6 py-6">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
        >
          &larr; Retour au tableau de bord
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <p className="mb-6 text-xs text-foreground/40">
          Session : {sessionId}
        </p>
        <ScoreBoard
          score={85}
          totalQuestions={40}
          correctAnswers={34}
          theme="Examen blanc"
          onRestart={() => {
            window.location.href = "/exam";
          }}
        />
      </div>
    </main>
  );
}
