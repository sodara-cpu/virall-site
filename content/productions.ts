// Catalogue des productions VIRALL. Une entrée par vidéo réelle.
// status "soon" : vidéo produite ou en production, pas encore publiée (aucun lien de plateforme).
// Quand une vidéo est publiée : passer status à "published", renseigner publishedAt et links.

import type { Locale } from "./i18n";

export type Production = {
  slug: string;
  brand: string; // slug de la marque
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  period: Record<Locale, string>;
  category: Record<Locale, string>;
  format: "vertical" | "episode";
  /** Durée finale en secondes ; null tant que le montage n'est pas définitif. */
  durationSec: number | null;
  status: "soon" | "published";
  publishedAt: string | null;
  image: string; // clé du registre content/images.ts
  links: { platform: "YouTube" | "TikTok" | "Instagram" | "Facebook"; url: string }[];
  youtubeId?: string; // pour le lecteur intégré, après publication
};

export const productions: Production[] = [
  {
    slug: "formose",
    brand: "epoques",
    title: {
      fr: "L'accusé ne pouvait pas répondre : il était mort",
      en: "The defendant could not answer: he was dead",
    },
    summary: {
      fr: "Rome, 897. Un pape fait déterrer son prédécesseur, l'habille de ses vêtements de pontife et le juge devant un concile. Le procès le plus étrange de l'histoire de l'Église.",
      en: "Rome, 897. A pope has his predecessor exhumed, dressed in his papal robes and put on trial before a council. The strangest trial in the history of the Church.",
    },
    period: { fr: "897", en: "897" },
    category: { fr: "Procès", en: "Trials" },
    format: "vertical",
    durationSec: 102,
    status: "soon",
    publishedAt: null,
    image: "prod_formose_trone",
    links: [],
  },
  {
    slug: "bastille",
    brand: "epoques",
    title: {
      fr: "Ils ont pris une prison presque vide. Pourquoi ?",
      en: "They stormed an almost empty prison. Why?",
    },
    summary: {
      fr: "Le 14 juillet 1789, la foule prend la Bastille. À l'intérieur, sept prisonniers seulement. Ce que la foule venait vraiment chercher.",
      en: "On 14 July 1789, the crowd took the Bastille. Inside were only seven prisoners. What the crowd had really come for.",
    },
    period: { fr: "1789", en: "1789" },
    category: { fr: "Révolutions", en: "Revolutions" },
    format: "episode",
    durationSec: null,
    status: "soon",
    publishedAt: null,
    image: "prod_bastille_tours",
    links: [],
  },
  {
    slug: "mkwawa",
    brand: "epoques",
    title: {
      fr: "Le crâne du traité de Versailles",
      en: "The skull in the Treaty of Versailles",
    },
    summary: {
      fr: "En 1919, un article du traité de Versailles exige la restitution d'un crâne. Celui de Mkwawa, chef hehe qui avait tenu tête à l'armée coloniale allemande.",
      en: "In 1919, an article of the Treaty of Versailles demanded that a skull be returned. It belonged to Mkwawa, the Hehe chief who had stood up to the German colonial army.",
    },
    period: { fr: "1898 – 1954", en: "1898 – 1954" },
    category: { fr: "Empires et résistances", en: "Empires and resistance" },
    format: "vertical",
    durationSec: null,
    status: "soon",
    publishedAt: null,
    image: "prod_mkwawa_guerriers",
    links: [],
  },
  {
    slug: "tewodros",
    brand: "epoques",
    title: {
      fr: "La lettre restée sans réponse",
      en: "The letter that was never answered",
    },
    summary: {
      fr: "Éthiopie, 1862. L'empereur Tewodros II écrit à la reine Victoria. La lettre reste sans réponse, et ce silence va mener à une guerre.",
      en: "Ethiopia, 1862. Emperor Tewodros II writes to Queen Victoria. The letter goes unanswered, and that silence leads to war.",
    },
    period: { fr: "1862 – 1868", en: "1862 – 1868" },
    category: { fr: "Diplomatie", en: "Diplomacy" },
    format: "vertical",
    durationSec: null,
    status: "soon",
    publishedAt: null,
    image: "prod_tewodros_shamma",
    links: [],
  },
];

export const formatDuration = (s: number | null) =>
  s == null ? null : `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")}`;
