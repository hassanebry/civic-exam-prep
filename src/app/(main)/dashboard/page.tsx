"use client";

import Link from "next/link";
import type { Theme } from "@/types";

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

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="mt-2 text-foreground/60">
          Choisissez un thème ou lancez un examen blanc.
        </p>

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
