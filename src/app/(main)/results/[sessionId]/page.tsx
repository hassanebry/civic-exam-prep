"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ScoreBoard } from "@/components/exam/ScoreBoard";

interface SessionData {
  score: number;
  total_questions: number;
  correct_answers: number;
  mode: string;
  theme: string | null;
}

export default function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchSession = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("exam_sessions")
      .select("score, total_questions, correct_answers, mode, theme")
      .eq("id", sessionId)
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setSession(data as SessionData);
    }

    setIsLoading(false);
  }, [sessionId]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const backLink = (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
      >
        &larr; Retour au tableau de bord
      </Link>
    </div>
  );

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col px-6 py-6">
        {backLink}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-foreground" />
          <p className="text-sm text-foreground/60">Chargement...</p>
        </div>
      </main>
    );
  }

  if (notFound || !session) {
    return (
      <main className="flex flex-1 flex-col px-6 py-6">
        {backLink}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-lg font-semibold">Session introuvable</p>
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-5 text-sm font-medium transition-colors hover:bg-zinc-50"
          >
            Retour au tableau de bord
          </Link>
        </div>
      </main>
    );
  }

  const themeLabel = session.theme ?? session.mode === "blanc" ? "Examen blanc" : "Entraînement";

  return (
    <main className="flex flex-1 flex-col px-6 py-6">
      {backLink}
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <ScoreBoard
          score={session.score}
          totalQuestions={session.total_questions}
          correctAnswers={session.correct_answers}
          theme={themeLabel}
          onRestart={() => {
            window.location.href = "/exam";
          }}
        />
      </div>
    </main>
  );
}
