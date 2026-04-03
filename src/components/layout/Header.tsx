"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/exam", label: "Examen blanc" },
  { href: "/review", label: "Révision" },
] as const;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-lg font-bold tracking-tight">
          Prépare ton examen
        </Link>

        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-3 flex items-center gap-2 border-l border-zinc-200 pl-3">
            {user ? (
              <>
                <span className="hidden text-xs text-foreground/60 sm:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
