import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; Retour au tableau de bord
        </Link>

        <h1 className="mt-6 font-serif text-3xl text-foreground">
          Informations légales
        </h1>

        {/* Navigation */}
        <nav className="mt-4 flex flex-wrap gap-4 border-b border-border pb-4 text-sm">
          <a href="#mentions" className="text-primary hover:underline">
            Mentions légales
          </a>
          <a href="#confidentialite" className="text-primary hover:underline">
            Politique de confidentialité
          </a>
          <a href="#cgv" className="text-primary hover:underline">
            Conditions générales de vente
          </a>
        </nav>

        {/* ---------------------------------------------------------- */}
        {/* MENTIONS LÉGALES */}
        {/* ---------------------------------------------------------- */}
        <section id="mentions" className="mt-10 scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">
            Mentions légales
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <div>
              <h3 className="font-semibold text-foreground">Éditeur du site</h3>
              <p>
                Nom : Hassane Barry<br />
                Site : https://monpasscivique.fr<br />
                Email : contact@monpasscivique.fr
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Directeur de la publication
              </h3>
              <p>Hassane Barry</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Hébergeur</h3>
              <p>
                Vercel Inc.<br />
                340 Pine Street, Suite 701<br />
                San Francisco, CA 94104, USA<br />
                Site web : vercel.com
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Propriété intellectuelle
              </h3>
              <p>
                Les questions proposées sur cette plateforme sont issues des
                listes officielles publiées par le Ministère de l&apos;Intérieur
                dans le cadre des examens civiques. Elles sont diffusées sous
                licence Etalab 2.0 (licence ouverte). Le code source, le design
                et les contenus rédactionnels originaux sont la propriété de
                l&apos;éditeur.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* POLITIQUE DE CONFIDENTIALITÉ */}
        {/* ---------------------------------------------------------- */}
        <section id="confidentialite" className="mt-14 scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">
            Politique de confidentialité
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <div>
              <h3 className="font-semibold text-foreground">
                Responsable du traitement
              </h3>
              <p>
                Hassane Barry<br />
                Email : contact@monpasscivique.fr
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Données collectées
              </h3>
              <p>
                Nous collectons les données suivantes lors de votre utilisation
                du service :
              </p>
              <ul className="mt-1 list-inside list-disc space-y-1">
                <li>Adresse email (lors de l&apos;inscription)</li>
                <li>
                  Résultats d&apos;examens (scores, réponses, dates des
                  sessions)
                </li>
                <li>Statut premium (achat effectué ou non)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Base légale</h3>
              <p>
                Le traitement des données de compte et de résultats
                d&apos;examen est fondé sur l&apos;exécution du contrat entre
                l&apos;utilisateur et l&apos;éditeur (article 6.1.b du RGPD).
                Le traitement lié au Meta Pixel (mesure d&apos;audience
                publicitaire) est fondé sur le consentement de
                l&apos;utilisateur (article 6.1.a du RGPD), recueilli via le
                bandeau de consentement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Hébergement des données
              </h3>
              <ul className="mt-1 list-inside list-disc space-y-1">
                <li>
                  <strong>Supabase</strong> — hébergement de la base de données
                  et de l&apos;authentification (serveurs dans l&apos;Union
                  européenne)
                </li>
                <li>
                  <strong>Vercel</strong> — hébergement de l&apos;application
                  web (États-Unis, avec garanties adéquates de protection des
                  données)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Durée de conservation
              </h3>
              <p>
                Les données sont conservées pendant toute la durée de vie du
                compte utilisateur, puis supprimées 1 an après la suppression du
                compte.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Droits des utilisateurs
              </h3>
              <p>
                Conformément au RGPD, vous disposez des droits suivants sur vos
                données personnelles :
              </p>
              <ul className="mt-1 list-inside list-disc space-y-1">
                <li>Droit d&apos;accès</li>
                <li>Droit de rectification</li>
                <li>Droit de suppression</li>
                <li>Droit à la portabilité</li>
              </ul>
              <p className="mt-2">
                Pour exercer ces droits, contactez-nous par email à
                contact@monpasscivique.fr.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Partage des données
              </h3>
              <p>
                Vos données ne sont jamais vendues. Sous réserve de votre
                consentement préalable, des données d&apos;événements (visites,
                conversions) peuvent être transmises à Meta Platforms Ireland
                Ltd. via le Meta Pixel, à des fins exclusives de mesure
                d&apos;audience publicitaire. Aucun autre transfert à des tiers
                à des fins commerciales n&apos;est effectué.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Cookies</h3>
              <p>Le site utilise deux catégories de cookies :</p>
              <ul className="mt-1 list-inside list-disc space-y-1">
                <li>
                  <strong>Cookies strictement nécessaires</strong> — cookies de
                  session Supabase utilisés pour le fonctionnement de
                  l&apos;authentification. Exemptés de consentement (article 82
                  de la loi Informatique et Libertés).
                </li>
                <li>
                  <strong>
                    Cookies de mesure d&apos;audience et de publicité
                  </strong>{" "}
                  — Meta Pixel (Meta Platforms Ireland Ltd.), utilisé pour
                  mesurer l&apos;efficacité des campagnes publicitaires.
                  <br />
                  Base légale : consentement de l&apos;utilisateur (article
                  6.1.a du RGPD).
                  <br />
                  Durée de conservation : 90 jours.
                </li>
              </ul>
              <p className="mt-2">
                Pour le détail et la modification de vos préférences, consultez
                notre{" "}
                <Link
                  href="/politique-cookies"
                  className="text-primary hover:underline"
                >
                  politique de cookies
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* CONDITIONS GÉNÉRALES DE VENTE */}
        {/* ---------------------------------------------------------- */}
        <section id="cgv" className="mt-14 scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">
            Conditions générales de vente
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <div>
              <h3 className="font-semibold text-foreground">Service</h3>
              <p>
                MonPassCivique est une plateforme en ligne de préparation à
                l&apos;examen civique français (carte de séjour, carte de
                résident, naturalisation). Le service propose des QCM
                thématiques, des examens blancs et un mode révision.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Prix</h3>
              <p>
                L&apos;accès illimité est proposé au prix de 9,99&nbsp;€ TTC en
                paiement unique (one-shot). Ce tarif donne un accès permanent à
                l&apos;ensemble des questions et fonctionnalités.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Paiement</h3>
              <p>
                Le paiement est sécurisé et traité par Stripe. Les données
                bancaires ne transitent pas par nos serveurs. L&apos;accès
                premium est activé immédiatement après confirmation du paiement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Droit de rétractation
              </h3>
              <p>
                Conformément à l&apos;article L221-28 du Code de la
                consommation, le droit de rétractation de 14 jours ne
                s&apos;applique pas lorsque l&apos;accès au service numérique a
                été activé avec l&apos;accord exprès du consommateur. En
                acceptant l&apos;activation immédiate de l&apos;accès premium,
                vous renoncez à votre droit de rétractation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Remboursement</h3>
              <p>
                Aucun remboursement ne sera effectué après l&apos;activation de
                l&apos;accès premium. En cas de problème technique empêchant
                l&apos;utilisation du service, contactez-nous par email.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Fiscalité et TVA
              </h3>
              <p>
                L&apos;éditeur est résident fiscal en France. La TVA applicable
                est celle en vigueur au moment de l&apos;achat.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Droit applicable et litiges
              </h3>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de
                litige, le tribunal compétent est celui du domicile du
                consommateur, conformément au Code de la consommation. Avant
                toute action en justice, une tentative de résolution amiable sera
                privilégiée.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
