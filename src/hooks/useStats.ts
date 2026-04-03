"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const PASS_THRESHOLD = 80;

interface ExamSessionRow {
  score: number;
}

interface Stats {
  totalSessions: number;
  averageScore: number;
  bestScore: number;
  passRate: number;
}

interface UseStatsReturn {
  stats: Stats | null;
  isLoading: boolean;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStats(null);
      setIsLoading(false);
      return;
    }

    const { data } = await supabase
      .from("exam_sessions")
      .select("score")
      .eq("user_id", user.id)
      .order("finished_at", { ascending: false })
      .limit(10);

    const sessions = (data ?? []) as ExamSessionRow[];

    if (sessions.length === 0) {
      setStats(null);
      setIsLoading(false);
      return;
    }

    const scores = sessions.map((s) => s.score);
    const totalSessions = scores.length;
    const averageScore = Math.round(
      scores.reduce((sum, s) => sum + s, 0) / totalSessions,
    );
    const bestScore = Math.max(...scores);
    const passRate = Math.round(
      (scores.filter((s) => s >= PASS_THRESHOLD).length / totalSessions) * 100,
    );

    setStats({ totalSessions, averageScore, bestScore, passRate });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading };
}
