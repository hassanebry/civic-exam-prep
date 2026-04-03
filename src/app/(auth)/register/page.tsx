"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsSubmitting(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsSubmitting(false);

    if (authError) {
      setError("Impossible de créer le compte. Veuillez réessayer.");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold">Vérifiez votre email</h1>
          <p className="mt-3 text-sm text-foreground/60">
            Vérifiez votre email pour confirmer votre compte. Vous pouvez
            ensuite vous connecter.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-6 text-sm font-medium transition-colors hover:bg-zinc-50"
          >
            Retour à la connexion
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold">Inscription</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Créez un compte pour suivre votre progression.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.fr"
              className="h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Mot de passe</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Confirmer le mot de passe</span>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-lg border border-zinc-200 px-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-10 rounded-lg bg-foreground font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
          >
            {isSubmitting ? "Création..." : "Créer un compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Déjà un compte ?{" "}
          <Link href="/login" className="font-medium text-foreground hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}
