// Jeu « Vrai ou légende ? » : chaque affirmation est tirée d'un dossier de sources du site (content/sources.ts).
// Une affirmation « vraie » est établie par les sources ; une « légende » est une idée reçue que le dossier dément.
// Ne jamais ajouter une question sur un point marqué « débattu » ou « non vérifié ».

import type { Locale } from "./i18n";

export type QuizItem = {
  slug: string; // production liée
  answer: "true" | "myth";
  statement: Record<Locale, string>;
  explanation: Record<Locale, string>;
};

export const quiz: QuizItem[] = [
  {
    slug: "formose",
    answer: "true",
    statement: {
      fr: "En 897, à Rome, un pape mort depuis neuf mois a été jugé devant un tribunal d'Église.",
      en: "In 897, in Rome, a pope who had been dead for nine months was put on trial before a church court.",
    },
    explanation: {
      fr: "Le corps de Formose est jugé sur ordre du pape Étienne VI ; un diacre répond à la place du mort.",
      en: "Formosus's body was tried on the orders of Pope Stephen VI; a deacon answered for the dead man.",
    },
  },
  {
    slug: "bastille",
    answer: "myth",
    statement: {
      fr: "Le 14 juillet 1789, la foule attaque la Bastille d'abord pour libérer ses nombreux prisonniers.",
      en: "On 14 July 1789, the crowd attacked the Bastille first of all to free its many prisoners.",
    },
    explanation: {
      fr: "Elle venait chercher la poudre : la forteresse ne comptait ce jour-là que sept prisonniers.",
      en: "It came for the gunpowder: that day the fortress held only seven prisoners.",
    },
  },
  {
    slug: "mkwawa",
    answer: "true",
    statement: {
      fr: "Le traité de Versailles de 1919 exigeait que l'Allemagne rende un crâne.",
      en: "The 1919 Treaty of Versailles required Germany to hand over a skull.",
    },
    explanation: {
      fr: "L'article 246 vise le crâne du sultan Mkwawa, chef des Hehe, dans le même article qu'un Coran ancien.",
      en: "Article 246 names the skull of Sultan Mkwawa, leader of the Hehe, in the same article as an ancient Koran.",
    },
  },
  {
    slug: "tewodros",
    answer: "myth",
    statement: {
      fr: "La reine Victoria a répondu en 1863 à la lettre de l'empereur Tewodros II.",
      en: "Queen Victoria replied in 1863 to Emperor Tewodros II's letter.",
    },
    explanation: {
      fr: "La lettre arrive à Londres en février 1863 et reste sans réponse. Cinq ans plus tard, une armée débarque.",
      en: "The letter reached London in February 1863 and went unanswered. Five years later, an army landed.",
    },
  },
  {
    slug: "cherbourg-1864",
    answer: "true",
    statement: {
      fr: "En 1864, une bataille de la guerre de Sécession américaine s'est déroulée au large de Cherbourg.",
      en: "In 1864, a battle of the American Civil War was fought off Cherbourg.",
    },
    explanation: {
      fr: "Le 19 juin 1864, le Kearsarge de l'Union coule le croiseur confédéré Alabama devant la Normandie.",
      en: "On 19 June 1864, the Union's Kearsarge sank the Confederate cruiser Alabama off Normandy.",
    },
  },
  {
    slug: "formose",
    answer: "myth",
    statement: {
      fr: "Un tremblement de terre a frappé Rome pendant le procès du pape mort.",
      en: "An earthquake struck Rome during the dead pope's trial.",
    },
    explanation: {
      fr: "Ce séisme est un ajout tardif au récit : nos sources ne l'attestent pas.",
      en: "This earthquake is a later addition to the story: our sources do not attest it.",
    },
  },
  {
    slug: "tewodros",
    answer: "true",
    statement: {
      fr: "L'armée britannique envoyée en Éthiopie en 1868 emmenait des éléphants.",
      en: "The British army sent to Ethiopia in 1868 brought elephants with it.",
    },
    explanation: {
      fr: "Quarante-quatre éléphants portaient l'artillerie lourde, sur environ 640 km de montagnes.",
      en: "Forty-four elephants carried the heavy artillery across some 640 km of mountains.",
    },
  },
  {
    slug: "vingre-1914",
    answer: "myth",
    statement: {
      fr: "Les six fusillés de Vingré, en 1914, avaient déserté vers les lignes ennemies.",
      en: "The six men shot at Vingré in 1914 had deserted to the enemy lines.",
    },
    explanation: {
      fr: "Ils avaient reculé vers une tranchée en arrière, puis regagné leur poste peu après.",
      en: "They had fallen back to a trench in the rear, then returned to their post shortly afterwards.",
    },
  },
  {
    slug: "mkwawa",
    answer: "myth",
    statement: {
      fr: "Le crâne rendu aux Hehe en 1954 a été formellement prouvé comme celui de Mkwawa.",
      en: "The skull returned to the Hehe in 1954 was formally proven to be Mkwawa's.",
    },
    explanation: {
      fr: "Il a été reconnu par des mesures et un trou de balle, sans preuve formelle.",
      en: "It was recognised from measurements and a bullet hole, without formal proof.",
    },
  },
  {
    slug: "vingre-1914",
    answer: "true",
    statement: {
      fr: "En 1921, la Cour de cassation a innocenté les six soldats fusillés à Vingré.",
      en: "In 1921, France's Court of Cassation cleared the six soldiers shot at Vingré.",
    },
    explanation: {
      fr: "Le 29 janvier 1921, elle annule le jugement et « décharge leur mémoire ». Six ans trop tard.",
      en: "On 29 January 1921, it quashed the verdict and \"cleared their memory\". Six years too late.",
    },
  },
];
