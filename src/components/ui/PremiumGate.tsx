"use client";

import { type ReactNode, useState } from "react";
import { getStoredReferrer } from "@/lib/utils/referrer";

interface PremiumGateProps {
  isPremium: boolean;
  feature: string;
  children: ReactNode;
}

export function PremiumGate({ isPremium, feature, children }: PremiumGateProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  if (isPremium) {
    return <>{children}</>;
  }

  async function handleCheckout() {
    setIsRedirecting(true);

    try {
      const referrer = getStoredReferrer();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referrer }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Checkout error:", res.status, body);
        alert("Une erreur est survenue, veuillez réessayer.");
        setIsRedirecting(false);
        return;
      }

      const data = (await res.json()) as { url?: string };

      if (data.url) {
        window.location.href = data.url;
      } else {
        setIsRedirecting(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Une erreur est survenue, veuillez réessayer.");
      setIsRedirecting(false);
    }
  }

  return (
    <div className="relative flex flex-1 flex-col">
      {/* Blurred content behind the overlay */}
      <div className="pointer-events-none select-none blur-sm" aria-hidden>
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 px-6 text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
          <span className="text-4xl">🔒</span>
          <h2 className="text-xl font-bold">
            Fonctionnalité réservée aux membres
          </h2>
          <p className="text-sm text-foreground/60">{feature}</p>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isRedirecting}
            className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
          >
            {isRedirecting
              ? "Redirection..."
              : "Débloquer l\u2019accès \u2014 9,99\u00a0\u20ac"}
          </button>
        </div>
      </div>
    </div>
  );
}
