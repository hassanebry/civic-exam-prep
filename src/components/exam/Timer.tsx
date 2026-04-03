"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  durationSeconds: number;
  onTimeUp: () => void;
}

export function Timer({ durationSeconds, onTimeUp }: TimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    setRemaining(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onTimeUp]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = remaining < 300;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-lg font-bold tabular-nums ${
        isUrgent
          ? "border-accent bg-[#FFF5F5] text-accent"
          : "border-border bg-card text-foreground"
      }`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
        />
      </svg>
      <span>{display}</span>
    </div>
  );
}
