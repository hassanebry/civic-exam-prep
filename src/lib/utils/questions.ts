import { Level, Question, Theme } from "@/types";

const NATURALISATION_THEMES: Theme[] = [
  "valeurs_republicaines",
  "institutions",
  "droits_devoirs",
  "histoire_geo_culture",
  "vie_en_france",
];

const CSP_THEMES: Theme[] = [
  "valeurs_republicaines",
  "institutions",
  "droits_devoirs",
  "histoire_geo_culture",
  "vie_en_france",
];

const CR_THEMES: Theme[] = [
  "valeurs_republicaines",
  "institutions",
  "droits_devoirs",
  "histoire_geo_culture",
  "vie_en_france",
];

function getThemesForLevel(level: Level): Theme[] {
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

export async function getQuestionsByTheme(
  theme: Theme,
  level: Level = "naturalisation",
): Promise<Question[]> {
  const data = await import(`@/data/questions/${level}/${theme}.json`);
  return data.default as Question[];
}

export async function getAllQuestions(
  level: Level = "naturalisation",
): Promise<Question[]> {
  const themes = getThemesForLevel(level);

  const all = await Promise.all(
    themes.map((t) => getQuestionsByTheme(t, level).catch(() => [])),
  );
  return all.flat();
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildExamSession(questions: Question[], count = 40): Question[] {
  return shuffleArray(questions).slice(0, count);
}

export function calculateScore(questions: Question[], answers: (number | null)[]): number {
  const correct = questions.filter((q, i) => answers[i] === q.correct_index).length;
  return Math.round((correct / questions.length) * 100);
}

export const FREE_QUESTIONS_LIMIT = 10;

export function applyFreeLimit(questions: Question[], isPremium: boolean): Question[] {
  if (isPremium) return questions;
  return questions.slice(0, FREE_QUESTIONS_LIMIT);
}
