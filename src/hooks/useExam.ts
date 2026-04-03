"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Question, Theme } from "@/types";
import {
  getAllQuestions,
  getQuestionsByTheme,
  shuffleArray,
  calculateScore,
} from "@/lib/utils/questions";
import { supabase } from "@/lib/supabase/client";
import {
  saveExamSession,
  updateUserProgress,
} from "@/lib/supabase/sessions";

const BLANC_QUESTION_COUNT = 40;
const AUTO_ADVANCE_DELAY_MS = 1000;

interface UseExamParams {
  mode: "thematic" | "blanc" | "review";
  theme?: Theme;
}

interface UseExamReturn {
  questions: Question[];
  answers: (number | null)[];
  currentIndex: number;
  isFinished: boolean;
  isLoading: boolean;
  currentQuestion: Question | undefined;
  score: number;
  correctAnswers: number;
  progress: number;
  sessionId: string | null;
  answerQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishExam: () => void;
  restartExam: () => void;
}

export function useExam({ mode, theme }: UseExamParams): UseExamReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setCurrentIndex(0);
    setIsFinished(false);

    try {
      const raw =
        mode === "thematic" && theme
          ? await getQuestionsByTheme(theme)
          : await getAllQuestions();

      const shuffled = shuffleArray(raw);
      const selected =
        mode === "blanc" ? shuffled.slice(0, BLANC_QUESTION_COUNT) : shuffled;

      setQuestions(selected);
      setAnswers(new Array<number | null>(selected.length).fill(null));
    } finally {
      setIsLoading(false);
    }
  }, [mode, theme]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // Cleanup auto-advance timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, []);

  const answerQuestion = useCallback(
    (index: number) => {
      if (isFinished) return;

      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = index;
        return next;
      });

      // In review mode, user navigates manually — no auto-advance
      if (mode === "review") return;

      // Clear any existing timer before setting a new one
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }

      autoAdvanceTimer.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev < questions.length - 1) return prev + 1;
          setIsFinished(true);
          return prev;
        });
      }, AUTO_ADVANCE_DELAY_MS);
    },
    [isFinished, currentIndex, questions.length, mode],
  );

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions.length]);

  const previousQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const finishExam = useCallback(async () => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    setIsFinished(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || questions.length === 0) return;

    const finalScore = calculateScore(questions, answers);
    const finalCorrect = questions.filter(
      (q, i) => answers[i] === q.correct_index,
    ).length;

    const id = await saveExamSession({
      userId: user.id,
      mode,
      theme,
      score: finalScore,
      totalQuestions: questions.length,
      correctAnswers: finalCorrect,
      answers,
    });

    if (id) setSessionId(id);

    // Update progress per theme
    const byTheme = new Map<string, { correct: number; total: number }>();
    for (let i = 0; i < questions.length; i++) {
      const t = questions[i].theme;
      const entry = byTheme.get(t) ?? { correct: 0, total: 0 };
      entry.total += 1;
      if (answers[i] === questions[i].correct_index) entry.correct += 1;
      byTheme.set(t, entry);
    }

    await Promise.all(
      Array.from(byTheme.entries()).map(([t, { correct, total }]) =>
        updateUserProgress(user.id, t, correct, total),
      ),
    );
  }, [questions, answers, mode, theme]);

  const restartExam = useCallback(() => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    setSessionId(null);
    loadQuestions();
  }, [loadQuestions]);

  const currentQuestion = questions[currentIndex] as Question | undefined;

  const score = useMemo(
    () => (questions.length > 0 ? calculateScore(questions, answers) : 0),
    [questions, answers],
  );

  const correctAnswers = useMemo(
    () =>
      questions.filter((q, i) => answers[i] === q.correct_index).length,
    [questions, answers],
  );

  const progress = questions.length > 0
    ? (currentIndex / questions.length) * 100
    : 0;

  return {
    questions,
    answers,
    currentIndex,
    isFinished,
    isLoading,
    currentQuestion,
    score,
    correctAnswers,
    progress,
    sessionId,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    finishExam,
    restartExam,
  };
}
