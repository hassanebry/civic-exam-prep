"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExamSessionPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
      <p className="text-sm text-muted">Redirection...</p>
    </main>
  );
}
