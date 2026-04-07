"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { getExamHistory } from "@/lib/supabase/sessions";
import { useProfile } from "@/hooks/useProfile";
import { PremiumGate } from "@/components/ui/PremiumGate";

interface HistoryItem {
  id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  theme: string | null;
  started_at: string;
}

const PASS_THRESHOLD = 80;

export default function HistoryPage() {
  const { isPremium, isLoading: profileLoading } = useProfile();
  const [sessions, setSessions] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSessions([]);
      setIsLoading(false);
      return;
    }

    const data = await getExamHistory(user.id);
    setSessions(data as HistoryItem[]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isPremium) {
      fetchHistory();
    } else {
      setIsLoading(false);
    }
  }, [fetchHistory, isPremium]);

  if (profileLoading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
        <p className="text-sm text-muted">Chargement...</p>
      </main>
    );
  }

  return (
    <PremiumGate isPremium={isPremium} feature="Historique des examens blancs">
    <main className="flex flex-1 flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; Retour au tableau de bord
        </Link>

        <h1 className="mt-6 font-serif text-3xl text-foreground">
          Historique des examens
        </h1>
        <p className="mt-1 text-sm text-muted">
          Vos résultats d&apos;examens blancs
        </p>

        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
              <p className="text-sm text-muted">Chargement...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
              <p className="text-muted">
                Aucun examen blanc effectué pour le moment
              </p>
              <Link
                href="/exam"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Lancer un examen blanc
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {sessions.map((s) => {
                const passed = s.score >= PASS_THRESHOLD;
                const date = new Date(s.started_at).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                );

                return (
                  <Link
                    key={s.id}
                    href={`/results/${s.id}`}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {s.theme ?? "Examen blanc"}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{date}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted">
                          {s.correct_answers} / {s.total_questions}
                        </p>
                      </div>
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full font-serif text-sm font-bold ${
                          passed
                            ? "bg-[#E8F5EE] text-success"
                            : "bg-[#FFF5F5] text-accent"
                        }`}
                      >
                        {s.score}%
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
    </PremiumGate>
  );
}
