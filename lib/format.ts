import type { Locale } from "@/content/i18n";

/** Date AAAA-MM-JJ en toutes lettres : « 18 novembre 2026 » / « 18 November 2026 ». */
export const formatDate = (lang: Locale, iso: string) =>
  new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

/** Nom de domaine lisible d'une URL (sans www.). */
export const domainOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");
