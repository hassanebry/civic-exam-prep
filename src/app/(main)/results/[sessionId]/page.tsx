"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ScoreBoard } from "@/components/exam/ScoreBoard";
import { CorrigeReview } from "@/components/exam/CorrigeReview";
import { useProfile } from "@/hooks/useProfile";
import type { Question } from "@/types";

async function startCheckout(): Promise<void> {
  try {
    const res = await fetch("/api/checkout", { method: "POST" });
    if (!res.ok) {
      alert("Une erreur est survenue, veuillez réessayer.");
      return;
    }
    const data = (await res.json()) as { url?: string };
    if (data.url) {
      window.location.href = data.url;
    }
  } catch {
    alert("Une erreur est survenue, veuillez réessayer.");
  }
}

interface SessionData {
  score: number;
  total_questions: number;
  correct_answers: number;
  mode: string;
  theme: string | null;
  questions: Question[] | null;
  answers: (number | null)[] | null;
}

export default function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { isPremium } = useProfile();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showCorrige, setShowCorrige] = useState(false);

  const fetchSession = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("exam_sessions")
      .select(
        "score, total_questions, correct_answers, mode, theme, questions, answers",
      )
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
        className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
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
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
          <p className="text-sm text-muted">Chargement...</p>
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
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:bg-card"
          >
            Retour au tableau de bord
          </Link>
        </div>
      </main>
    );
  }

  const themeLabel =
    session.theme ?? (session.mode === "blanc" ? "Examen blanc" : "Entraînement");
  const hasCorrige =
    session.questions && session.answers && session.questions.length > 0;

  return (
    <main className="flex flex-1 flex-col px-6 py-6">
      {backLink}

      {/* Score */}
      <div className="flex flex-col items-center py-12">
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

      {/* Corrigé — premium only */}
      {hasCorrige && (
        <div className="mx-auto w-full max-w-2xl">
          {isPremium ? (
            <>
              <button
                type="button"
                onClick={() => setShowCorrige((prev) => !prev)}
                className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-primary text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {showCorrige
                  ? "Masquer le corrigé"
                  : "Voir le corrigé détaillé"}
              </button>

              {showCorrige && (
                <div className="mt-8">
                  <h2 className="mb-6 font-serif text-xl text-foreground">
                    Corrigé détaillé
                  </h2>
                  <CorrigeReview
                    questions={session.questions!}
                    answers={session.answers!}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-[var(--shadow-sm)]">
              <span className="text-4xl">🔒</span>
              <h2 className="font-serif text-xl text-foreground">
                Corrigé détaillé
              </h2>
              <p className="max-w-sm text-sm text-muted">
                Le corrigé détaillé est réservé aux membres premium.
              </p>
              <button
                type="button"
                onClick={startCheckout}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Débloquer l&apos;accès — 9,99&nbsp;€
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
