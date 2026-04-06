import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="font-serif text-3xl text-foreground">Nous contacter</h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Une question ? Un problème ? Écrivez-nous.
      </p>

      <a
        href="mailto:contact@monpasscivique.fr"
        className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        contact@monpasscivique.fr
      </a>

      <Link
        href="/"
        className="mt-8 text-sm text-muted transition-colors hover:text-foreground"
      >
        &larr; Retour à l&apos;accueil
      </Link>
    </main>
  );
}
