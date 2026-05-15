export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Combien de questions comporte l'examen civique français ?",
    answer:
      "L'examen civique comporte 40 questions à choix multiples (QCM), à traiter en français en 45 minutes. Source : service-public.gouv.fr.",
  },
  {
    question: "Quelle note faut-il obtenir pour réussir l'examen civique ?",
    answer:
      "Il faut obtenir au moins 32 bonnes réponses sur 40, soit un seuil de réussite de 80%. Source : service-public.gouv.fr.",
  },
  {
    question: "Quels thèmes sont abordés à l'examen civique ?",
    answer:
      "L'examen porte sur quatre grands domaines officiels : les grands repères de l'histoire de France ; les principes, symboles et institutions de la République ; l'exercice de la citoyenneté française ; et la place de la France dans l'Europe et dans le monde. MonPassCivique structure ses questions en 5 thèmes pédagogiques (valeurs républicaines, symboles, institutions, droits et devoirs, vie en France).",
  },
  {
    question: "Quel niveau de français faut-il pour passer l'examen ?",
    answer:
      "L'examen est rédigé en français et nécessite la compréhension de phrases simples. Il s'agit d'un test de connaissances civiques, pas d'un test de langue : les énoncés sont généralement accessibles aux candidats ayant atteint le niveau de français requis par la procédure (B1 pour la naturalisation, A2 pour la carte de résident).",
  },
  {
    question: "Les questions sont-elles officielles ?",
    answer:
      "Oui. Les 656 questions proviennent des listes officielles publiées par le Ministère de l'Intérieur français pour les trois niveaux d'examen — CSP (189 questions), Carte de résident (209 questions) et Naturalisation (258 questions) — et sont diffusées sous licence Etalab 2.0.",
  },
  {
    question: "Combien coûte la préparation sur MonPassCivique ?",
    answer:
      "L'accès gratuit permet de s'entraîner au niveau CSP sans inscription. L'accès premium est proposé à 9,99 € en paiement unique, sans abonnement : il débloque la carte de résident, la naturalisation et les examens blancs chronométrés avec corrigés détaillés.",
  },
  {
    question: "À quoi ressemble l'examen blanc ?",
    answer:
      "L'examen blanc reproduit les conditions réelles : 40 questions tirées aléatoirement, minuteur de 45 minutes, seuil de réussite à 80%. À la fin, vous accédez au corrigé complet avec la bonne réponse et l'explication pour chaque question.",
  },
];
