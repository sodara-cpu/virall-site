// Registre des marques VIRALL : seule source de vérité pour le site.
// Ajouter, renommer ou retirer une marque = modifier ce fichier.

import type { Locale } from "./i18n";

export type BrandStatus = "launch" | "development";

export type Social = { platform: "YouTube" | "TikTok" | "Instagram" | "Facebook" | "LinkedIn" | "X"; url: string; handle: string };

export type Brand = {
  slug: string;
  /** Nom affiché après « VIRALL ». Modifiable sans toucher au reste du site. */
  name: string;
  /** Angle de la carte colorée dans la bobine du logo (degrés). Ne pas modifier : il suit le logo validé. */
  bladeAngle: number;
  color: string; // couleur pleine (texte et fonds)
  colorLight: string; // teinte pour fonds sombres
  logo: string; // logo pour fond clair
  logoOnDark: string; // logo pour fond sombre
  status: BrandStatus;
  domain: Record<Locale, string>;
  tagline: Record<Locale, string>;
  mission: Record<Locale, string>;
  themes: Record<Locale, string[]>;
  formats: Record<Locale, string[]>;
  collaboration: Record<Locale, string>;
  image: string; // image signature (clé du registre content/images.ts)
  gallery: string[];
  video?: string; // clé du registre content/videos.ts
  socials: Social[];
  /** Chiffres réels uniquement. null = indicateur masqué. */
  stats: { followers: number | null; views: number | null; videos: number | null; asOf: string | null };
};

export const brands: Brand[] = [
  {
    slug: "epoques",
    name: "Époques",
    bladeAngle: 12,
    color: "#6B2E5F",
    colorLight: "#C58AB9",
    logo: "/brand/virall_epoques.svg",
    logoOnDark: "/brand/virall_epoques_blanc.svg",
    status: "launch",
    domain: { fr: "Histoire", en: "History" },
    tagline: {
      fr: "L'histoire racontée comme un film, toujours sourcée.",
      en: "History told like a film, always sourced.",
    },
    mission: {
      fr: "Des histoires vraies et méconnues, de l'Antiquité au XXe siècle, vérifiées dans les sources puis mises en images. Chaque vidéo raconte une histoire complète, que l'on peut regarder du début à la fin sans attendre de suite.",
      en: "True, little-known stories from antiquity to the twentieth century, checked against the sources and then brought to the screen. Every video tells a complete story you can watch from start to finish, with no sequel to wait for.",
    },
    themes: {
      fr: ["Procès et affaires oubliés", "Traités, diplomatie et malentendus", "Empires et résistances", "Vies ordinaires face à la grande histoire"],
      en: ["Forgotten trials and affairs", "Treaties, diplomacy and misunderstandings", "Empires and resistance", "Ordinary lives in the face of history"],
    },
    formats: {
      fr: ["Épisodes de 6 minutes sur YouTube", "Récits verticaux de moins de 3 minutes", "Sources citées pour chaque récit"],
      en: ["Six-minute episodes on YouTube", "Vertical stories under three minutes", "Sources cited for every story"],
    },
    collaboration: {
      fr: "Musées, éditeurs, institutions culturelles et marques qui partagent le goût de l'histoire : parrainage d'épisodes, séries thématiques, récits sur mesure.",
      en: "Museums, publishers, cultural institutions and brands with a taste for history: episode sponsorship, themed series and bespoke stories.",
    },
    image: "epoques_rome",
    gallery: ["prod_formose_concile", "prod_bastille_fumee", "epoques_scriptorium", "prod_bastille_cellule"],
    video: "epoques_bastille_foule",
    socials: [
      { platform: "YouTube", url: "https://www.youtube.com/@VirallEpoques", handle: "@VirallEpoques" },
      { platform: "TikTok", url: "https://www.tiktok.com/@virall.epoques", handle: "@virall.epoques" },
      { platform: "Instagram", url: "https://www.instagram.com/virall.epoques/", handle: "@virall.epoques" },
      { platform: "Facebook", url: "https://www.facebook.com/profile.php?id=61596877020510", handle: "Virall Époques" },
    ],
    stats: { followers: null, views: null, videos: null, asOf: null },
  },
  {
    slug: "rire",
    name: "Rire",
    bladeAngle: 84,
    color: "#C23B6E",
    colorLight: "#E98AAE",
    logo: "/brand/virall_rire.svg",
    logoOnDark: "/brand/virall_rire_blanc.svg",
    status: "development",
    domain: { fr: "Humour", en: "Comedy" },
    tagline: {
      fr: "L'humour comme regard sur l'époque.",
      en: "Comedy as a way of looking at our times.",
    },
    mission: {
      fr: "Des sketchs, des chroniques et des situations du quotidien, écrits pour faire rire sans moquer. Le rire comme langage commun, d'un pays et d'une génération à l'autre.",
      en: "Sketches, columns and everyday situations, written to make people laugh without mocking anyone. Laughter as a common language across countries and generations.",
    },
    themes: {
      fr: ["Scènes du quotidien", "Travail et vie de bureau", "Famille et générations", "Chroniques de l'actualité légère"],
      en: ["Everyday scenes", "Work and office life", "Family and generations", "Light news columns"],
    },
    formats: {
      fr: ["Sketchs courts", "Séries de personnages récurrents", "Chroniques verticales"],
      en: ["Short sketches", "Recurring character series", "Vertical columns"],
    },
    collaboration: {
      fr: "Intégrations de marque dans des sketchs écrits pour elles, séries parrainées, campagnes à ton humoristique.",
      en: "Brand integrations in sketches written for them, sponsored series and campaigns with a comic tone.",
    },
    image: "rire_scene",
    gallery: ["rire_public", "rire_micro"],
    socials: [],
    stats: { followers: null, views: null, videos: null, asOf: null },
  },
  {
    slug: "fiction",
    name: "Fiction",
    bladeAngle: 156,
    color: "#3E3A8C",
    colorLight: "#A29EE6",
    logo: "/brand/virall_fiction.svg",
    logoOnDark: "/brand/virall_fiction_blanc.svg",
    status: "development",
    domain: { fr: "Cinéma et fiction", en: "Film and fiction" },
    tagline: {
      fr: "Des récits originaux, pensés pour l'écran.",
      en: "Original stories, made for the screen.",
    },
    mission: {
      fr: "Des fictions courtes et des séries originales, du drame au thriller, avec l'exigence d'écriture et de mise en scène du cinéma.",
      en: "Short fiction and original series, from drama to thriller, written and staged with the standards of cinema.",
    },
    themes: {
      fr: ["Drame", "Thriller et suspense", "Anticipation", "Récits inspirés de faits réels"],
      en: ["Drama", "Thriller and suspense", "Speculative fiction", "Stories inspired by true events"],
    },
    formats: {
      fr: ["Courts métrages", "Séries courtes en épisodes", "Bandes-annonces et affiches"],
      en: ["Short films", "Short episodic series", "Trailers and posters"],
    },
    collaboration: {
      fr: "Coproductions, fictions de marque, adaptations et développement de projets avec des auteurs et des producteurs.",
      en: "Co-productions, branded fiction, adaptations and project development with writers and producers.",
    },
    image: "fiction_plateau",
    gallery: ["fiction_salle", "fiction_camera"],
    socials: [],
    stats: { followers: null, views: null, videos: null, asOf: null },
  },
  {
    slug: "cite",
    name: "Cité",
    bladeAngle: 228,
    color: "#2563A8",
    colorLight: "#86B4E6",
    logo: "/brand/virall_cite.svg",
    logoOnDark: "/brand/virall_cite_blanc.svg",
    status: "development",
    domain: { fr: "Politique et société", en: "Politics and society" },
    tagline: {
      fr: "Comprendre les institutions et les débats, sans parti pris.",
      en: "Understanding institutions and debates, without taking sides.",
    },
    mission: {
      fr: "Expliquer comment fonctionnent les institutions, d'où viennent les grands débats et ce qu'ils changent, en donnant à chaque position sa place et ses arguments.",
      en: "Explaining how institutions work, where the big debates come from and what they change, giving every position its place and its arguments.",
    },
    themes: {
      fr: ["Institutions et démocratie", "Grands enjeux de société", "Relations internationales", "Histoire des idées politiques"],
      en: ["Institutions and democracy", "Major social issues", "International relations", "History of political ideas"],
    },
    formats: {
      fr: ["Explications courtes", "Dossiers thématiques", "Repères en chiffres sourcés"],
      en: ["Short explainers", "Thematic files", "Sourced facts and figures"],
    },
    collaboration: {
      fr: "Partenariats éditoriaux avec des médias, des écoles et des organisations publiques, dans le respect de l'indépendance éditoriale.",
      en: "Editorial partnerships with media, schools and public organisations, with full editorial independence.",
    },
    image: "cite_hemicycle",
    gallery: ["cite_presse", "cite_rue"],
    socials: [],
    stats: { followers: null, views: null, videos: null, asOf: null },
  },
  {
    slug: "pro",
    name: "Pro",
    bladeAngle: 300,
    color: "#1F6B57",
    colorLight: "#79C7AD",
    logo: "/brand/virall_pro.svg",
    logoOnDark: "/brand/virall_pro_blanc.svg",
    status: "development",
    domain: { fr: "Monde professionnel", en: "Business" },
    tagline: {
      fr: "L'entreprise expliquée clairement.",
      en: "Business, clearly explained.",
    },
    mission: {
      fr: "Finance d'entreprise, gestion de projet et intelligence artificielle au travail : des contenus précis et concrets pour les professionnels qui veulent comprendre vite et bien.",
      en: "Corporate finance, project management and artificial intelligence at work: precise, practical content for professionals who want to understand quickly and properly.",
    },
    themes: {
      fr: ["Finance d'entreprise", "Gestion de projet", "IA en entreprise", "Grandes décisions d'entreprises racontées"],
      en: ["Corporate finance", "Project management", "AI in business", "Major business decisions, told as stories"],
    },
    formats: {
      fr: ["Explications en vidéo", "Études de cas", "Formats pour LinkedIn"],
      en: ["Video explainers", "Case studies", "Formats for LinkedIn"],
    },
    collaboration: {
      fr: "Contenus de marque pour entreprises et écoles, séries pédagogiques parrainées, études de cas.",
      en: "Branded content for companies and schools, sponsored educational series and case studies.",
    },
    image: "pro_atrium",
    gallery: ["pro_reunion", "pro_quartier"],
    socials: [],
    stats: { followers: null, views: null, videos: null, asOf: null },
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
