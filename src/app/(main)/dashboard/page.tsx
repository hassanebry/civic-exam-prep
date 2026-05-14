"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Level } from "@/types";
import { useProfile } from "@/hooks/useProfile";
import { useStats } from "@/hooks/useStats";
import { LEVELS, getThemesForLevel } from "@/lib/utils/levels";
import { getStoredReferrer } from "@/lib/utils/referrer";
import { event as pixelEvent } from "@/lib/analytics/pixel";

const STAT_COLORS = [
  "border-t-primary",
  "border-t-success",
  "border-t-warning",
  "border-t-accent",
] as const;

function UpgradeBanner() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleCheckout() {
    setIsRedirecting(true);
    try {
      const referrer = getStoredReferrer();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referrer }),
      });
      if (!res.ok) {
        setIsRedirecting(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setIsRedirecting(false);
      }
    } catch {
      setIsRedirecting(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[#E8A020]/30 bg-[#FFFBF0] p-4 text-center shadow-[var(--shadow-sm)] sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Passez à l&apos;accès illimité
        </p>
        <p className="text-xs text-muted">
          Toutes les questions et fonctionnalités pour 9,99&nbsp;€
        </p>
      </div>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isRedirecting}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isRedirecting ? "Redirection..." : "Débloquer l\u2019accès"}
      </button>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const { isPremium, isLoading: profileLoading } = useProfile();
  const { stats, isLoading: statsLoading } = useStats();
  const [selectedLevel, setSelectedLevel] = useState<Level>("csp");

  // Fire Purchase event when returning from Stripe checkout
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      pixelEvent("Purchase", {
        value: 9.99,
        currency: "EUR",
        content_name: "premium_subscription",
      });
    }
  }, [searchParams]);

  const themes = getThemesForLevel(selectedLevel);

  const statItems = stats
    ? [
        { value: `${stats.totalSessions}`, label: "Sessions passées" },
        { value: `${stats.averageScore}%`, label: "Score moyen" },
        { value: `${stats.bestScore}%`, label: "Meilleur score" },
        { value: `${stats.passRate}%`, label: "Taux de réussite" },
      ]
    : [];

  function handleLevelClick(level: Level, levelIsPremium: boolean) {
    if (levelIsPremium && !isPremium) return;
    setSelectedLevel(level);
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-3xl text-foreground">
            Tableau de bord
          </h1>
          {!profileLoading && isPremium && (
            <span className="rounded-full bg-[#E8F5EE] px-3 py-0.5 text-xs font-semibold text-success">
              Accès illimité
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">
          Choisissez votre objectif puis entraînez-vous par thème.
        </p>

        {/* Level selector */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {LEVELS.map((lvl) => {
            const isSelected = selectedLevel === lvl.id;
            const isLocked = lvl.isPremium && !isPremium && !profileLoading;

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => handleLevelClick(lvl.id, lvl.isPremium)}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 text-center transition-all ${
                  isSelected
                    ? "border-primary bg-[#EEF2FF] shadow-[var(--shadow-sm)]"
                    : "border-border bg-card hover:border-primary/40"
                } ${isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              >
                {isLocked && (
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-[#FFFBF0] px-2 py-0.5 text-[10px] font-bold text-warning">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Premium
                  </span>
                )}
                <span className="text-2xl">{lvl.emoji}</span>
                <span className="text-sm font-semibold text-foreground">
                  {lvl.label}
                </span>
                <span className="text-xs text-muted">{lvl.description}</span>
              </button>
            );
          })}
        </div>

        {/* Upgrade banner */}
        {!profileLoading && !isPremium && (
          <div className="mt-5">
            <UpgradeBanner />
          </div>
        )}

        {/* Stats */}
        <div className="mt-6">
          {statsLoading ? (
            <div className="h-24 animate-pulse rounded-xl bg-card" />
          ) : stats ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {statItems.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`rounded-xl border border-border ${STAT_COLORS[i]} border-t-[3px] bg-card p-4 text-center shadow-[var(--shadow-sm)]`}
                >
                  <p className="font-serif text-2xl text-foreground">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted">
              Aucune session pour le moment — commencez un entraînement !
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Examen blanc CTA */}
          <Link
            href={`/exam?level=${selectedLevel}`}
            className="flex flex-col items-center gap-3 rounded-xl bg-primary p-8 text-white shadow-[var(--shadow-sm)] transition-opacity hover:opacity-95 sm:col-span-2 lg:col-span-3"
          >
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-serif text-xl">Examen blanc</span>
            <span className="text-sm text-white/70">
              40 questions — 45 minutes — Conditions réelles
            </span>
          </Link>

          {/* Theme cards */}
          {themes.map(({ value, label, emoji }) => (
            <div
              key={value}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-[2rem]">{emoji}</span>
              <span className="font-semibold text-foreground">{label}</span>
              <Link
                href={`/exam/thematic?theme=${value}&level=${selectedLevel}`}
                className="mt-auto inline-flex h-10 items-center justify-center rounded-lg border border-primary px-5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                S&apos;entraîner
              </Link>
            </div>
          ))}

          {/* Mode révision */}
          <Link
            href={`/review?level=${selectedLevel}`}
            className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card p-6 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
            <span className="font-semibold text-foreground">Mode révision</span>
            <span className="text-sm text-muted">
              Revoir les questions ratées
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
