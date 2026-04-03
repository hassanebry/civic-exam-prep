"use client";

import { useState } from "react";
import Link from "next/link";
import type { Theme } from "@/types";
import { useProfile } from "@/hooks/useProfile";
import { useStats } from "@/hooks/useStats";

interface ThemeInfo {
  value: Theme;
  label: string;
  emoji: string;
}

const THEMES: ThemeInfo[] = [
  { value: "valeurs_republicaines", label: "Valeurs républicaines", emoji: "🏛️" },
  { value: "symboles", label: "Symboles de la République", emoji: "🇫🇷" },
  { value: "institutions", label: "Les institutions", emoji: "🏗️" },
  { value: "droits_devoirs", label: "Droits et devoirs", emoji: "⚖️" },
  { value: "vie_en_france", label: "Vie en France", emoji: "🗼" },
];

function UpgradeBanner() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleCheckout() {
    setIsRedirecting(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
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
    <div className="flex flex-col items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="text-sm font-medium text-amber-900">
        Passez à l&apos;accès illimité pour 9,99&nbsp;€
      </p>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isRedirecting}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-amber-600 px-4 text-sm font-medium text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
      >
        {isRedirecting ? "Redirection..." : "Débloquer"}
      </button>
    </div>
  );
}

export default function DashboardPage() {
  const { isPremium, isLoading: profileLoading } = useProfile();
  const { stats, isLoading: statsLoading } = useStats();

  return (
    <main className="flex flex-1 flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          {!profileLoading && isPremium && (
            <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700">
              Accès illimité
            </span>
          )}
        </div>
        <p className="mt-2 text-foreground/60">
          Choisissez un thème ou lancez un examen blanc.
        </p>

        {/* Upgrade banner for free users */}
        {!profileLoading && !isPremium && (
          <div className="mt-4">
            <UpgradeBanner />
          </div>
        )}

        {/* Stats bar */}
        <div className="mt-6">
          {statsLoading ? (
            <div className="h-20 animate-pulse rounded-xl bg-zinc-100" />
          ) : stats ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-zinc-200 p-4 text-center">
                <p className="text-2xl font-bold">{stats.totalSessions}</p>
                <p className="text-xs text-foreground/60">Sessions passées</p>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4 text-center">
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
                <p className="text-xs text-foreground/60">Score moyen</p>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4 text-center">
                <p className="text-2xl font-bold">{stats.bestScore}%</p>
                <p className="text-xs text-foreground/60">Meilleur score</p>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4 text-center">
                <p className="text-2xl font-bold">{stats.passRate}%</p>
                <p className="text-xs text-foreground/60">Taux de réussite</p>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-6 text-center text-sm text-foreground/60">
              Aucune session pour le moment — commencez un entraînement !
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Examen blanc CTA */}
          <Link
            href="/exam"
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-foreground bg-foreground p-6 text-background transition-opacity hover:opacity-90 sm:col-span-2 lg:col-span-3"
          >
            <span className="text-4xl">📝</span>
            <span className="text-xl font-bold">Examen blanc</span>
            <span className="text-sm text-background/70">
              40 questions — 45 minutes — Conditions réelles
            </span>
          </Link>

          {/* Theme cards */}
          {THEMES.map(({ value, label, emoji }) => (
            <div
              key={value}
              className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 p-6 text-center"
            >
              <span className="text-3xl">{emoji}</span>
              <span className="font-semibold">{label}</span>
              <Link
                href={`/exam/thematic?theme=${value}`}
                className="mt-auto inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-5 text-sm font-medium transition-colors hover:bg-zinc-50"
              >
                S&apos;entraîner
              </Link>
            </div>
          ))}

          {/* Mode révision */}
          <Link
            href="/review"
            className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-300 p-6 text-center transition-colors hover:border-zinc-400 hover:bg-zinc-50"
          >
            <span className="text-3xl">🔄</span>
            <span className="font-semibold">Mode révision</span>
            <span className="text-sm text-foreground/60">
              Revoir les questions ratées
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
