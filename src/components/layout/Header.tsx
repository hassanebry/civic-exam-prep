"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/exam", label: "Examen blanc" },
  { href: "/review", label: "Révision" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-5 w-1 overflow-hidden rounded-full">
            <span className="w-full bg-[#002395]" />
          </div>
          <div className="flex h-5 w-1 overflow-hidden rounded-full">
            <span className="w-full bg-white" />
          </div>
          <div className="flex h-5 w-1 overflow-hidden rounded-full">
            <span className="w-full bg-[#ED2939]" />
          </div>
          <span className="font-serif text-xl text-foreground">
            CitoyenPrep
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Auth */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <span className="text-xs text-muted">{user.email}</span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
            aria-label="Menu"
          >
            <svg
              className="h-5 w-5 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-card px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted">{user.email}</span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full rounded-lg border border-border py-2 text-sm font-medium text-muted"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full rounded-lg bg-primary py-2 text-center text-sm font-medium text-white"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
