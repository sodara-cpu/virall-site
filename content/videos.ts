// Registre des vidéos du site (extraits réels des productions VIRALL).
import type { Locale } from "./i18n";

export type VideoEntry = { src: string; poster: string; w: number; h: number; label: Record<Locale, string>; provenance: string };

export const videos: Record<string, VideoEntry> = {
  epoques_bastille_foule: {
    src: "/video/epoques_bastille_foule.mp4",
    poster: "/video/epoques_bastille_foule.webp",
    w: 720,
    h: 1278,
    label: { fr: "Extrait de « La Bastille était presque vide », VIRALL Époques", en: "Excerpt from \"The Bastille was almost empty\", VIRALL Époques" },
    provenance: "Plan animé de la production Bastille (23/11/2026), réencodé en 720 px sans son",
  },
};
