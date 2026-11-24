// Dossiers de sources des productions : une entrée par vidéo (clé = slug de content/productions.ts).
// Chaque vidéo publiée renvoie, dans sa description, vers https://virall.art/s/<slug>
// (redirection vers /fr/productions/<slug>/ ou /en/productions/<slug>/ selon la langue du visiteur).
// Ne jamais publier une vidéo dont le dossier est en statut "review".

import type { Locale } from "./i18n";

export type RefKind = "primaire" | "institution" | "encyclopedie" | "article" | "ouvrage";

export type Reference = {
  kind: RefKind;
  author?: string;
  title: string;
  container?: string; // revue, encyclopédie, site ou éditeur
  year?: string;
  url?: string;
  accessed?: string; // AAAA-MM-JJ
  note?: Record<Locale, string>;
};

export type SourceFile = {
  /** verified : relu et validé pour publication ; review : relecture en cours */
  status: "verified" | "review";
  updated: string; // AAAA-MM-JJ
  established: Record<Locale, string[]>;
  debated?: Record<Locale, string[]>;
  legend?: Record<Locale, string[]>;
  simplifications?: Record<Locale, string[]>;
  /** Interprétation présentée comme telle dans la vidéo */
  reading?: Record<Locale, string>;
  references: Reference[];
  /** Points soumis à un historien, publiés tant qu'ils ne sont pas tranchés */
  openQuestions?: Record<Locale, string[]>;
};

export const sources: Record<string, SourceFile> = {
  formose: {
    status: "verified",
    updated: "2026-11-18",
    established: {
      fr: [
        "En 897, à Rome, le corps du pape Formose, mort neuf mois plus tôt, est jugé devant un tribunal d'Église présidé par le pape Étienne VI.",
        "Un diacre répond à la place du mort. Les accusations : parjure et violation du droit de l'Église, Formose ayant été évêque de Porto avant d'être élu évêque de Rome.",
        "Le verdict déclare son élection nulle et annule ses actes, y compris les ordinations qu'il avait conférées.",
        "On lui arrache ses vêtements et on lui coupe les doigts de la bénédiction ; le corps est enterré parmi les étrangers, puis jeté dans le Tibre.",
        "Rome se soulève. Étienne VI est emprisonné puis étranglé en 897.",
        "Le pape Théodore II fait réinhumer Formose à Saint-Pierre ; en 898, Jean IX condamne le procès.",
      ],
      en: [
        "In 897, in Rome, the body of Pope Formosus, dead for nine months, was put on trial before a church court presided over by Pope Stephen VI.",
        "A deacon answered for the dead man. The charges: perjury and breach of canon law, since Formosus had been bishop of Porto before being elected bishop of Rome.",
        "The verdict declared his election void and annulled his acts, including the ordinations he had conferred.",
        "His vestments were torn off and the fingers of blessing cut off; the body was buried among foreigners, then thrown into the Tiber.",
        "Rome rose up. Stephen VI was imprisoned, then strangled, in 897.",
        "Pope Theodore II had Formosus reburied in St Peter's; in 898, John IX condemned the trial.",
      ],
    },
    debated: {
      fr: ["Le mois exact du procès (probablement janvier 897).", "Le nombre de doigts coupés (deux ou trois selon les auteurs).", "Les commanditaires du procès.", "Qui a repêché le corps dans le Tibre."],
      en: ["The exact month of the trial (probably January 897).", "The number of fingers cut off (two or three depending on the author).", "Who ordered the trial.", "Who recovered the body from the Tiber."],
    },
    legend: {
      fr: ["Le séisme qui aurait frappé Rome pendant le procès est un ajout tardif."],
      en: ["The earthquake said to have struck Rome during the trial is a later addition."],
    },
    simplifications: {
      fr: [
        "Étienne VI est parfois numéroté Étienne VII (ancienne numérotation).",
        "Les factions romaines et le couronnement de Guy et Lambert de Spolète par Formose en 892 ne sont pas racontés.",
        "La nouvelle condamnation de Formose sous Serge III (904-911) n'est pas racontée.",
      ],
      en: [
        "Stephen VI is sometimes numbered Stephen VII (older numbering).",
        "The Roman factions and Formosus's crowning of Guy and Lambert of Spoleto in 892 are left out.",
        "The renewed condemnation of Formosus under Sergius III (904–911) is left out.",
      ],
    },
    reading: {
      fr: "« Juger le mort, c'était frapper les vivants » est notre lecture : aucune de nos sources ne donne ce mobile en toutes lettres, mais le verdict, qui annule les ordinations de Formose, l'appuie.",
      en: "\"Trying the dead man was a way to strike the living\" is our reading: none of our sources states this motive outright, but the verdict, which annulled Formosus's ordinations, supports it.",
    },
    references: [
      { kind: "encyclopedie", title: "Formosus", container: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Formosus", accessed: "2026-11-18" },
      { kind: "encyclopedie", title: "Pope Formosus", container: "Catholic Encyclopedia", year: "1909", url: "https://www.newadvent.org/cathen/06139b.htm", accessed: "2026-11-18" },
      { kind: "encyclopedie", title: "Pope Stephen VI (VII)", container: "Catholic Encyclopedia", year: "1912", url: "https://www.catholic.com/encyclopedia/pope-stephen-vi-vii", accessed: "2026-11-18" },
      { kind: "encyclopedie", title: "Formosus, Pope", container: "New Catholic Encyclopedia (Encyclopedia.com)", url: "https://encyclopedia.com/religion/encyclopedias-almanacs-transcripts-and-maps/formosus-pope", accessed: "2026-11-18" },
      { kind: "encyclopedie", title: "Stephen VI (VII), Pope", container: "New Catholic Encyclopedia (Encyclopedia.com)", url: "https://encyclopedia.com/religion/encyclopedias-almanacs-transcripts-and-maps/stephen-vi-vii-pope", accessed: "2026-11-18" },
      { kind: "article", title: "The Cadaver Synod: Putting a Dead Pope on Trial", container: "JSTOR Daily", url: "https://daily.jstor.org/the-cadaver-synod-putting-a-dead-pope-on-trial/", accessed: "2026-11-18" },
    ],
    openQuestions: {
      fr: ["L'ordre exact des événements de mars et avril 896 (maladie d'Arnulf, mort de Formose).", "L'effet réel de l'annulation des ordinations sous Étienne VI."],
      en: ["The exact order of events in March and April 896 (Arnulf's illness, Formosus's death).", "The actual effect of the annulled ordinations under Stephen VI."],
    },
  },

  mkwawa: {
    status: "review",
    updated: "2026-11-24",
    established: {
      fr: [
        "Mkwawa, chef des Hehe, mène la résistance à la colonisation allemande en Afrique de l'Est ; il meurt en juillet 1898 et sa tête est emportée.",
        "L'article 246 du traité de Versailles (1919) impose à l'Allemagne de remettre le crâne du sultan Mkwawa au gouvernement britannique.",
        "En 1920, Berlin répond qu'il n'en trouve aucune trace. La question revient à la Chambre des communes, notamment le 3 décembre 1930.",
        "En 1953, le gouverneur britannique Edward Twining choisit au musée de Brême un crâne percé d'une balle ; il est rendu aux Hehe à Kalenga en 1954.",
      ],
      en: [
        "Mkwawa, chief of the Hehe, led the resistance to German colonisation in East Africa; he died in July 1898 and his head was taken away.",
        "Article 246 of the Treaty of Versailles (1919) required Germany to hand over the skull of Sultan Mkwawa to the British government.",
        "In 1920, Berlin replied that it could find no trace of it. The question came back to the House of Commons, notably on 3 December 1930.",
        "In 1953, the British governor Edward Twining picked out a skull with a bullet hole at the Bremen museum; it was returned to the Hehe at Kalenga in 1954.",
      ],
    },
    debated: {
      fr: ["L'identification du crâne rendu en 1954 comme étant celui de Mkwawa.", "La date exacte de la cérémonie de Kalenga en 1954."],
      en: ["Whether the skull returned in 1954 is really Mkwawa's.", "The exact date of the Kalenga ceremony in 1954."],
    },
    references: [
      { kind: "institution", author: "The National Archives (Royaume-Uni)", title: "The skull of Sultan Mkwawa", container: "The National Archives blog", url: "https://blog.nationalarchives.gov.uk/the-skull-of-sultan-mkwawa/", accessed: "2026-11-24" },
      { kind: "primaire", title: "Sultan Mkwawa's Skull", container: "Hansard, House of Commons", year: "1930", url: "https://api.parliament.uk/historic-hansard/commons/1930/dec/03/sultan-mkwawas-skull", accessed: "2026-11-24" },
      { kind: "primaire", title: "Treaty of Versailles, Part VIII, Article 246", container: "Foreign Relations of the United States, Paris Peace Conference 1919, vol. XIII", url: "https://history.state.gov/historicaldocuments/frus1919Parisv13/ch17subch2", accessed: "2026-11-24" },
    ],
    openQuestions: {
      fr: ["Dossier en relecture : il sera complété par le registre des faits de l'épisode avant la publication."],
      en: ["File under review: it will be completed from the episode's fact register before release."],
    },
  },

  tewodros: {
    status: "review",
    updated: "2026-11-24",
    established: {
      fr: [
        "En 1862, l'empereur Tewodros II d'Éthiopie écrit à la reine Victoria pour demander une alliance ; la lettre reste sans réponse.",
        "Après plus d'un an d'attente, Tewodros fait emprisonner le consul britannique Charles Cameron et d'autres Européens.",
        "Londres envoie une expédition commandée par le général Robert Napier. Magdala tombe le 13 avril 1868 et Tewodros meurt le même jour.",
      ],
      en: [
        "In 1862, Emperor Tewodros II of Ethiopia wrote to Queen Victoria to ask for an alliance; the letter went unanswered.",
        "After more than a year of waiting, Tewodros had the British consul Charles Cameron and other Europeans imprisoned.",
        "London sent an expedition under General Robert Napier. Magdala fell on 13 April 1868 and Tewodros died that day.",
      ],
    },
    references: [
      { kind: "institution", author: "National Army Museum (Londres)", title: "Abyssinia expedition", container: "National Army Museum", url: "https://www.nam.ac.uk/explore/abyssinia", accessed: "2026-11-24" },
    ],
    openQuestions: {
      fr: ["Le lien de cause entre la lettre restée sans réponse et l'expédition de 1868.", "Dossier en relecture : il sera complété par le registre des faits de l'épisode avant la publication."],
      en: ["The causal link between the unanswered letter and the 1868 expedition.", "File under review: it will be completed from the episode's fact register before release."],
    },
  },

  bastille: {
    status: "review",
    updated: "2026-11-24",
    established: {
      fr: [
        "Le matin du 14 juillet 1789, la foule prend des dizaines de milliers de fusils aux Invalides, mais il lui manque la poudre.",
        "Des barils de poudre avaient été transférés de l'Arsenal à la Bastille peu avant.",
        "Le jour de l'assaut, la Bastille ne compte que sept prisonniers.",
      ],
      en: [
        "On the morning of 14 July 1789, the crowd seized tens of thousands of muskets at the Invalides, but it lacked gunpowder.",
        "Barrels of gunpowder had recently been moved from the Arsenal to the Bastille.",
        "On the day of the assault, the Bastille held only seven prisoners.",
      ],
    },
    debated: {
      fr: ["Le nombre de fusils pris aux Invalides (de 28 000 à 35 000 selon les sources).", "Le nombre de défenseurs tués après la reddition."],
      en: ["The number of muskets taken at the Invalides (28,000 to 35,000 depending on the source).", "The number of defenders killed after the surrender."],
    },
    references: [
      { kind: "ouvrage", author: "Jean-Christian Petitfils", title: "La Bastille. Mystères et secrets d'une prison d'État", container: "Tallandier", year: "2016" },
      { kind: "institution", title: "Maquettes et collections sur la prise et la démolition de la Bastille", container: "Musée Carnavalet, Histoire de Paris" },
    ],
    openQuestions: {
      fr: ["Dossier en relecture : les sources web du premier jet sont remplacées par des références de référence (ouvrages, Archives nationales) avant la publication.", "Le nombre et la date du transfert des barils de poudre."],
      en: ["File under review: the draft's web sources are being replaced with reference works (books, French National Archives) before release.", "The number and date of the gunpowder transfer."],
    },
  },
};

export const sourceFile = (slug: string) => sources[slug] ?? null;
