import type { Level, LevelInfo, Theme } from "@/types";

export const LEVELS: LevelInfo[] = [
  {
    id: "csp",
    label: "Carte de séjour pluriannuelle",
    description: "Premier titre de séjour longue durée",
    emoji: "📋",
    isPremium: false,
  },
  {
    id: "cr",
    label: "Carte de résident",
    description: "Résidence permanente en France",
    emoji: "🏠",
    isPremium: true,
  },
  {
    id: "naturalisation",
    label: "Naturalisation",
    description: "Acquisition de la nationalité française",
    emoji: "🇫🇷",
    isPremium: true,
  },
];

export function getLevelInfo(level: Level): LevelInfo {
  return LEVELS.find((l) => l.id === level) ?? LEVELS[0];
}

interface ThemeInfo {
  value: Theme;
  label: string;
  emoji: string;
}

const CSP_THEMES: ThemeInfo[] = [
  { value: "valeurs_republicaines", label: "Valeurs républicaines", emoji: "🏛️" },
  { value: "institutions", label: "Les institutions", emoji: "🏗️" },
  { value: "droits_devoirs", label: "Droits et devoirs", emoji: "⚖️" },
  { value: "histoire_geo_culture", label: "Histoire, géographie et culture", emoji: "🗺️" },
  { value: "vie_en_france", label: "Vie en France", emoji: "🗼" },
];

const CR_THEMES: ThemeInfo[] = [
  { value: "valeurs_republicaines", label: "Valeurs républicaines", emoji: "🏛️" },
  { value: "institutions", label: "Les institutions", emoji: "🏗️" },
  { value: "droits_devoirs", label: "Droits et devoirs", emoji: "⚖️" },
  { value: "histoire_geo_culture", label: "Histoire, géographie et culture", emoji: "🗺️" },
  { value: "vie_en_france", label: "Vie en France", emoji: "🗼" },
];

const NATURALISATION_THEMES: ThemeInfo[] = [
  { value: "valeurs_republicaines", label: "Valeurs républicaines", emoji: "🏛️" },
  { value: "symboles", label: "Symboles de la République", emoji: "🇫🇷" },
  { value: "institutions", label: "Les institutions", emoji: "🏗️" },
  { value: "droits_devoirs", label: "Droits et devoirs", emoji: "⚖️" },
  { value: "vie_en_france", label: "Vie en France", emoji: "🗼" },
];

export function getThemesForLevel(level: Level): ThemeInfo[] {
  switch (level) {
    case "csp":
      return CSP_THEMES;
    case "cr":
      return CR_THEMES;
    case "naturalisation":
    default:
      return NATURALISATION_THEMES;
  }
}

export const VALID_LEVELS = new Set<string>(["csp", "cr", "naturalisation"]);

export function parseLevel(value: string | null): Level {
  if (value && VALID_LEVELS.has(value)) return value as Level;
  return "csp";
}
