"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// TODO Phase 3 - add auth state: user avatar, login/logout button

const NAV_LINKS = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/exam", label: "Examen blanc" },
  { href: "/review", label: "Révision" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/dashboard" className="text-lg font-bold tracking-tight">
          Prépare ton examen
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
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
      </div>
    </header>
  );
}
