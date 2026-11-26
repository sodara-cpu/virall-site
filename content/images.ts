// Registre des images du site : provenance, licence, texte alternatif.
// Les fichiers optimisés (AVIF, WebP, plusieurs largeurs) sont produits par `npm run images`
// à partir de assets/images/<clé>.<ext> ; leurs dimensions sont lues dans content/image-meta.json.

import meta from "./image-meta.json";
import type { Locale } from "./i18n";

export type ImageSource = "creation" | "production" | "externe";

export type ImageEntry = {
  alt: Record<Locale, string>;
  source: ImageSource;
  /** creation : visuel original créé pour VIRALL ; production : extrait d'une vidéo VIRALL ; externe : photo sous licence */
  provenance: string;
  licence: string;
  /** Générée par IA : une mention est affichée sous l'image (charte IA). */
  ai: boolean;
  /** Reconstitution historique : la mention précise qu'il ne s'agit pas d'une archive. */
  reconstitution?: boolean;
  /** Image d'illustration d'un univers ou d'une méthode, sans lien avec une scène réelle de VIRALL. */
  conceptual?: boolean;
  focal?: string; // object-position CSS
};

const CREATION = "Créée pour VIRALL (image générée par IA)";
const LIC_CREATION = "Propriété de VIRALL";
const PRODUCTION = "Extrait des productions VIRALL Époques";

export const images: Record<string, ImageEntry> = {
  hero_ville: {
    alt: { fr: "Toits d'une vieille ville au petit matin, coupoles anciennes et tours modernes au loin", en: "Rooftops of an old city at dawn, ancient domes and modern towers in the distance" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true, focal: "50% 60%",
  },
  hero_foule: {
    alt: { fr: "Une rue piétonne animée à la tombée du jour, sous une arche de pierre", en: "A busy pedestrian street at dusk, beneath a stone arch" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  vision_table: {
    alt: { fr: "Des mains trient des photographies d'archives, des cartes et des notes sur une table", en: "Hands sorting archive photographs, maps and notes on a table" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  partenariat_tournage: {
    alt: { fr: "Une petite équipe de tournage filme dans une rue étroite", en: "A small film crew shooting in a narrow street" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  epoques_rome: {
    alt: { fr: "Marché dans une rue de la Rome antique, Ier siècle", en: "A street market in ancient Rome, first century" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, reconstitution: true,
  },
  epoques_port: {
    alt: { fr: "Porteurs sur un quai boueux de Dar es Salaam, 1898", en: "Porters on a muddy dock in Dar es Salaam, 1898" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, reconstitution: true,
  },
  epoques_magdala: {
    alt: { fr: "Haut plateau éthiopien dans les années 1860, une forteresse sur une montagne au loin", en: "The Ethiopian highlands in the 1860s, a mountain fortress in the distance" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, reconstitution: true,
  },
  epoques_scriptorium: {
    alt: { fr: "Un moine copie un manuscrit à la lumière d'une fenêtre, XIIe siècle", en: "A monk copying a manuscript by window light, twelfth century" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, reconstitution: true,
  },
  formose_rome: {
    alt: { fr: "Une rue de Rome sous un ciel gris en 896, boue et foule", en: "A street in Rome under a grey sky in 896, mud and crowd" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, reconstitution: true,
  },
  prod_formose_trone: {
    alt: { fr: "Le trône pontifical vu de dos dans la basilique, procès du pape Formose, 897", en: "The papal throne seen from behind in the basilica, trial of Pope Formosus, 897" },
    source: "production", provenance: `${PRODUCTION} (Formose)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_formose_concile: {
    alt: { fr: "Le concile réuni dans la basilique pour juger le pape Formose", en: "The council gathered in the basilica to try Pope Formosus" },
    source: "production", provenance: `${PRODUCTION} (Formose)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_formose_foule: {
    alt: { fr: "Une foule de Romains dans une rue étroite, 897", en: "A crowd of Romans in a narrow street, 897" },
    source: "production", provenance: `${PRODUCTION} (Formose)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_formose_cardinaux: {
    alt: { fr: "Un groupe d'ecclésiastiques assis lors du concile", en: "A group of clergymen seated during the council" },
    source: "production", provenance: `${PRODUCTION} (Formose)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_formose_procession: {
    alt: { fr: "Une procession à l'intérieur d'une basilique romaine", en: "A procession inside a Roman basilica" },
    source: "production", provenance: `${PRODUCTION} (Formose)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_bastille_tours: {
    alt: { fr: "Les tours rondes de la Bastille au-dessus d'une rue de Paris, 1789", en: "The round towers of the Bastille above a Paris street, 1789" },
    source: "production", provenance: `${PRODUCTION} (Bastille)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_bastille_fumee: {
    alt: { fr: "Fumée blanche autour d'une tour de la Bastille pendant l'assaut", en: "White smoke around a tower of the Bastille during the assault" },
    source: "production", provenance: `${PRODUCTION} (Bastille)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_bastille_cellule: {
    alt: { fr: "Une cellule étroite et vide de la Bastille", en: "A narrow, empty cell in the Bastille" },
    source: "production", provenance: `${PRODUCTION} (Bastille)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_bastille_lettre: {
    alt: { fr: "Une lettre pliée scellée de cire rouge sur une table", en: "A folded letter sealed with red wax on a table" },
    source: "production", provenance: `${PRODUCTION} (Bastille)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_bastille_tirs: {
    alt: { fr: "Des soldats tirent depuis le parapet de la Bastille", en: "Soldiers firing from the parapet of the Bastille" },
    source: "production", provenance: `${PRODUCTION} (Bastille)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_cherbourg_combat: {
    alt: { fr: "Deux navires de guerre à vapeur échangent des tirs sur une mer grise, au large de Cherbourg, 1864", en: "Two steam warships exchanging fire on a grey sea off Cherbourg, 1864" },
    source: "production", provenance: `${PRODUCTION} (Cherbourg)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_cherbourg_chaines: {
    alt: { fr: "Des chaînes d'ancre suspendues le long de la coque noire d'un navire de guerre", en: "Anchor chains hanging along the black hull of a warship" },
    source: "production", provenance: `${PRODUCTION} (Cherbourg)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_vingre_champ: {
    alt: { fr: "Six poteaux de bois au bord d'un champ labouré couvert de givre, à l'aube, 1914", en: "Six wooden posts at the edge of a frosty ploughed field at dawn, 1914" },
    source: "production", provenance: `${PRODUCTION} (Vingré)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_vingre_jugement: {
    alt: { fr: "Une feuille manuscrite et un képi d'officier sur une table de bois, 1914", en: "A handwritten sheet and an officer's kepi on a wooden table, 1914" },
    source: "production", provenance: `${PRODUCTION} (Vingré)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_mkwawa_guerriers: {
    alt: { fr: "Des guerriers hehe armés de lances dans la savane, fin du XIXe siècle", en: "Hehe warriors with spears in the savannah, late nineteenth century" },
    source: "production", provenance: `${PRODUCTION} (Mkwawa)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_mkwawa_foule: {
    alt: { fr: "Une foule immense réunie pour une cérémonie en Tanzanie, 1954", en: "A huge crowd gathered for a ceremony in Tanzania, 1954" },
    source: "production", provenance: `${PRODUCTION} (Mkwawa)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_tewodros_shamma: {
    alt: { fr: "Un homme vêtu d'une shamma blanche au bord d'un ravin des hauts plateaux éthiopiens", en: "A man in a white shamma at the edge of a ravine in the Ethiopian highlands" },
    source: "production", provenance: `${PRODUCTION} (Tewodros II)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_tewodros_elephants: {
    alt: { fr: "Des éléphants transportent des canons à travers les plateaux, 1868", en: "Elephants carrying cannons across the highlands, 1868" },
    source: "production", provenance: `${PRODUCTION} (Tewodros II)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  prod_tewodros_lettre: {
    alt: { fr: "Une lettre scellée de cire rouge sur une table de bois", en: "A letter sealed with red wax on a wooden table" },
    source: "production", provenance: `${PRODUCTION} (Tewodros II)`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
  },
  rire_scene: {
    alt: { fr: "Un humoriste sur la scène d'un petit club, micro à la main", en: "A comedian on the stage of a small club, microphone in hand" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  rire_public: {
    alt: { fr: "Le public d'un club de comédie éclate de rire", en: "A comedy club audience bursting into laughter" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  rire_micro: {
    alt: { fr: "Un micro sur pied sur une scène vide avant le spectacle", en: "A microphone on a stand on an empty stage before the show" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  fiction_plateau: {
    alt: { fr: "Tournage de nuit dans une rue mouillée, caméra sur un travelling", en: "A night shoot on a wet street, camera on a dolly" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  fiction_salle: {
    alt: { fr: "Une salle de cinéma ancienne, fauteuils rouges et faisceau du projecteur", en: "An old cinema, red seats and the projector beam" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  fiction_camera: {
    alt: { fr: "Une caméra 35 mm sur trépied, la main d'un opérateur sur la bague de mise au point", en: "A 35mm camera on a tripod, an operator's hand on the focus ring" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  cite_hemicycle: {
    alt: { fr: "Un hémicycle vide vu depuis une galerie latérale", en: "An empty assembly chamber seen from a side gallery" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  cite_presse: {
    alt: { fr: "Des journalistes attendent sur les marches d'un bâtiment public", en: "Journalists waiting on the steps of a public building" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  cite_rue: {
    alt: { fr: "Des citoyens réunis sur une place écoutent une prise de parole", en: "Citizens gathered in a square listening to a speech" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  pro_atrium: {
    alt: { fr: "Des salariés traversent l'atrium d'un immeuble de bureaux le matin", en: "Office workers crossing the atrium of an office building in the morning" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  pro_reunion: {
    alt: { fr: "Une petite équipe en réunion autour d'une table", en: "A small team meeting around a table" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
  pro_quartier: {
    alt: { fr: "Un quartier d'affaires à l'heure de pointe du matin", en: "A business district at morning rush hour" },
    source: "creation", provenance: CREATION, licence: LIC_CREATION, ai: true, conceptual: true,
  },
};

export type ImageMeta = { w: number; h: number; widths: number[]; blur: string };
const metaMap = meta as Record<string, ImageMeta>;

export function imageInfo(key: string) {
  const entry = images[key];
  const m = metaMap[key];
  if (!entry || !m) return null;
  return { key, ...entry, ...m };
}
