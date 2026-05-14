"use client";

import Link from "next/link";

function handleReset() {
  localStorage.removeItem("cookie_consent");
  window.location.reload();
}

export default function PolitiqueCookiesPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; Retour à l&apos;accueil
        </Link>

        <h1 className="mt-6 font-serif text-3xl text-foreground">
          Politique de cookies
        </h1>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-semibold text-foreground">
              Cookies utilisés
            </h2>
            <p className="mt-2">
              MonPassCivique utilise le Meta Pixel (Facebook) à des fins de
              mesure d&apos;audience publicitaire. Ce cookie permet de mesurer
              l&apos;efficacité de nos campagnes et d&apos;améliorer votre
              expérience sur le site.
            </p>
            <p className="mt-2">
              Aucun cookie publicitaire n&apos;est chargé tant que vous
              n&apos;avez pas cliqué sur « Accepter » dans le bandeau de
              consentement. Si vous refusez, aucun cookie de mesure
              d&apos;audience n&apos;est déposé.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground">
              Cookies de session
            </h2>
            <p className="mt-2">
              Les cookies de session Supabase (authentification) sont des
              cookies strictement nécessaires au fonctionnement du service. Ils
              ne nécessitent pas votre consentement.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground">
              Modifier vos préférences
            </h2>
            <p className="mt-2">
              Vous pouvez à tout moment modifier votre choix en cliquant sur le
              bouton ci-dessous. Le bandeau de consentement réapparaîtra lors
              de votre prochaine visite.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              Modifier mes préférences cookies
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
