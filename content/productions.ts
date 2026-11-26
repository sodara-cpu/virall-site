// Catalogue des productions VIRALL. Une entrée par vidéo réelle.
// status "soon" : vidéo produite ou en production, pas encore publiée (aucun lien de plateforme).
// Quand une vidéo est publiée : passer status à "published", renseigner publishedAt et links.

import type { Locale } from "./i18n";
import auto from "./productions.auto.json";

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
  /** Année de l'événement central, pour la frise chronologique. */
  year?: number;
};

const manual: Production[] = [
  {
    slug: "formose",
    year: 897,
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
    year: 1789,
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
    format: "vertical",
    durationSec: 165,
    status: "soon",
    publishedAt: null,
    image: "prod_bastille_tours",
    links: [],
  },
  {
    slug: "mkwawa",
    year: 1919,
    brand: "epoques",
    title: {
      fr: "Le traité de Versailles exigeait un crâne",
      en: "The Treaty of Versailles demanded a skull",
    },
    summary: {
      fr: "En 1919, un article du traité de Versailles exige la restitution d'un crâne. Celui de Mkwawa, chef hehe qui avait tenu tête à l'armée coloniale allemande.",
      en: "In 1919, an article of the Treaty of Versailles demanded that a skull be returned. It belonged to Mkwawa, the Hehe chief who had stood up to the German colonial army.",
    },
    period: { fr: "1898 – 1954", en: "1898 – 1954" },
    category: { fr: "Empires et résistances", en: "Empires and resistance" },
    format: "vertical",
    durationSec: 98,
    status: "soon",
    publishedAt: null,
    image: "prod_mkwawa_guerriers",
    links: [],
  },
  {
    slug: "tewodros",
    year: 1862,
    brand: "epoques",
    title: {
      fr: "La lettre sans réponse qui mena à la guerre",
      en: "The unanswered letter that led to war",
    },
    summary: {
      fr: "Éthiopie, 1862. L'empereur Tewodros II écrit à la reine Victoria. La lettre reste sans réponse, et ce silence va mener à une guerre.",
      en: "Ethiopia, 1862. Emperor Tewodros II writes to Queen Victoria. The letter goes unanswered, and that silence leads to war.",
    },
    period: { fr: "1862 – 1868", en: "1862 – 1868" },
    category: { fr: "Diplomatie", en: "Diplomacy" },
    format: "vertical",
    durationSec: 93,
    status: "soon",
    publishedAt: null,
    image: "prod_tewodros_shamma",
    links: [],
  },
  {
    slug: "cherbourg-1864",
    year: 1864,
    brand: "epoques",
    title: {
      fr: "Une bataille américaine au large de Cherbourg",
      en: "An American battle off Cherbourg",
    },
    summary: {
      fr: "Juin 1864 : la guerre de Sécession se joue devant Cherbourg. Le corsaire sudiste Alabama, construit en Angleterre, affronte le Kearsarge de l'Union. La facture arrivera à Londres.",
      en: "June 1864: the American Civil War is fought off Cherbourg. The Confederate raider Alabama, built in England, faces the Union's Kearsarge. The bill will land in London.",
    },
    period: { fr: "1862 – 1872", en: "1862 – 1872" },
    category: { fr: "Batailles", en: "Battles" },
    format: "vertical",
    durationSec: 110,
    status: "soon",
    publishedAt: null,
    image: "prod_cherbourg_combat",
    links: [],
  },
  {
    slug: "vingre-1914",
    year: 1914,
    brand: "epoques",
    title: {
      fr: "Fusillés pour l'exemple, innocentés en 1921",
      en: "Shot as an example, cleared in 1921",
    },
    summary: {
      fr: "Décembre 1914, à Vingré, dans l'Aisne : six soldats français sont fusillés par leur propre armée. Six ans plus tard, la Cour de cassation annule le jugement.",
      en: "December 1914, at Vingré in the Aisne: six French soldiers are shot by their own army. Six years later, France's highest court quashes the verdict.",
    },
    period: { fr: "1914 – 1921", en: "1914 – 1921" },
    category: { fr: "Grande Guerre", en: "First World War" },
    format: "vertical",
    durationSec: 111,
    status: "soon",
    publishedAt: null,
    image: "prod_vingre_champ",
    links: [],
  },
];

// Productions ajoutées par scripts/sync-content.mjs ; une production écrite à la main prime toujours.
const manualSlugs = new Set(manual.map((p) => p.slug));
export const productions: Production[] = [
  ...manual,
  ...(auto.productions as Production[]).filter((p) => !manualSlugs.has(p.slug)),
];

/** Année de la frise : champ year, sinon première année de la période. */
export const productionYear = (p: Production) => p.year ?? Number((p.period.fr.match(/\d{3,4}/) || ["0"])[0]);

/** Productions dans l'ordre chronologique de leur histoire. */
export const chronological = () => [...productions].sort((a, b) => productionYear(a) - productionYear(b));

export const formatDuration = (s: number | null) =>
  s == null ? null : `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")}`;
