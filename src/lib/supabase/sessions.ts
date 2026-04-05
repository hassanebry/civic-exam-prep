import { supabase } from "./client";

import type { Question } from "@/types";

interface SaveExamSessionParams {
  userId: string;
  mode: string;
  theme: string | undefined;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: (number | null)[];
  questions: Question[];
}

interface ExamHistoryRow {
  id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  mode: string;
  theme: string | null;
  started_at: string;
  finished_at: string | null;
}

export async function saveExamSession(
  params: SaveExamSessionParams,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("exam_sessions")
    .insert({
      user_id: params.userId,
      mode: params.mode,
      theme: params.theme ?? null,
      score: params.score,
      total_questions: params.totalQuestions,
      correct_answers: params.correctAnswers,
      answers: params.answers,
      questions: params.questions,
      finished_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save exam session:", error.message);
    return null;
  }

  return data.id as string;
}

export async function updateUserProgress(
  userId: string,
  theme: string,
  correct: number,
  total: number,
): Promise<void> {
  // Try to fetch existing progress for this user+theme
  const { data: existing } = await supabase
    .from("user_progress")
    .select("total_attempts, correct_answers")
    .eq("user_id", userId)
    .eq("theme", theme)
    .single();

  if (existing) {
    await supabase
      .from("user_progress")
      .update({
        total_attempts: existing.total_attempts + total,
        correct_answers: existing.correct_answers + correct,
        last_attempt: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("theme", theme);
  } else {
    await supabase.from("user_progress").insert({
      user_id: userId,
      theme,
      total_attempts: total,
      correct_answers: correct,
      last_attempt: new Date().toISOString(),
    });
  }
}

export async function getExamHistory(
  userId: string,
): Promise<ExamHistoryRow[]> {
  const { data, error } = await supabase
    .from("exam_sessions")
    .select(
      "id, score, total_questions, correct_answers, mode, theme, started_at, finished_at",
    )
    .eq("user_id", userId)
    .eq("mode", "blanc")
    .order("started_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch exam history:", error.message);
    return [];
  }

  return (data ?? []) as ExamHistoryRow[];
}
