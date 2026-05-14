"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value !== "accepted" && value !== "rejected") {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    window.location.reload();
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-4 py-4 shadow-lg sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-xs leading-relaxed text-muted sm:text-left sm:text-sm">
          Nous utilisons des cookies de mesure d&apos;audience pour améliorer
          votre expérience.{" "}
          <Link
            href="/politique-cookies"
            className="underline underline-offset-2 transition-colors hover:text-primary"
          >
            En savoir plus
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={reject}
            className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground sm:text-sm"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:text-sm"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
