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
    status: "verified",
    updated: "2026-11-25",
    established: {
      fr: [
        "L'article 246 du traité de Versailles (1919) impose à l'Allemagne de remettre aux Britanniques le crâne du sultan Mkwawa, dans le même article qu'un Coran ancien, avec un délai de six mois.",
        "Mkwawa dirige les Hehe, un peuple des hautes terres de l'actuelle Tanzanie. En 1891, près de Lugalo, ses guerriers écrasent une colonne allemande et tuent son commandant ; il résiste encore sept ans.",
        "En 1898, cerné, il meurt. Selon le rapport du sergent allemand Merkl, sa tête est coupée et rapportée au camp.",
        "Après la Première Guerre mondiale, l'administrateur britannique veut rendre le crâne aux Hehe, alliés pendant la guerre, comme « preuve tangible » aux yeux de la population.",
        "En mai 1920, le ministère allemand des Affaires étrangères répond que rien n'indique que la tête ait été envoyée en Allemagne. Le 3 décembre 1930, à la Chambre des communes, le ministre confirme que la clause n'est pas exécutée.",
        "En 1953, le gouverneur Edward Twining examine des crânes sans nom au musée d'ethnologie de Brême. Il les mesure, les compare à la tête du petit-fils de Mkwawa et en retient un, percé d'une balle.",
        "Le 19 juin 1954, ce crâne est rendu aux Hehe, trente-cinq ans après le traité.",
      ],
      en: [
        "Article 246 of the Treaty of Versailles (1919) required Germany to hand over the skull of Sultan Mkwawa to the British, in the same article as an ancient Koran, within six months.",
        "Mkwawa led the Hehe, a people of the highlands of present-day Tanzania. In 1891, near Lugalo, his warriors crushed a German column and killed its commander; he held out for seven more years.",
        "In 1898, surrounded, he died. According to the report of the German sergeant Merkl, his head was cut off and taken back to camp.",
        "After the First World War, the British administrator wanted to return the skull to the Hehe, allies during the war, as \"tangible proof\" in the eyes of the population.",
        "In May 1920, the German Foreign Ministry replied that nothing showed the head had been sent to Germany. On 3 December 1930, in the House of Commons, the minister confirmed the clause had not been carried out.",
        "In 1953, governor Edward Twining examined unnamed skulls at the Bremen ethnology museum. He measured them, compared them with the head of Mkwawa's grandson and picked one with a bullet hole.",
        "On 19 June 1954, that skull was returned to the Hehe, thirty-five years after the treaty.",
      ],
    },
    debated: {
      fr: [
        "L'identification du crâne : elle repose sur des mesures et sur le trou de balle, sans aucun témoin vivant ni preuve formelle.",
        "Les circonstances exactes de la mort de Mkwawa : la vidéo s'en tient au rapport allemand, en le citant comme tel.",
        "Les effectifs de la colonne allemande de 1891 (de 250 à 320 askaris selon les sources) : aucun chiffre n'est donné dans la vidéo.",
        "La date de la restitution : le 19 juin 1954 s'appuie sur le discours de Twining (archives britanniques, CO 822/770) ; les dates de juillet 1954 citées ailleurs ne reposent sur aucune pièce.",
      ],
      en: [
        "The identification of the skull: it rests on measurements and the bullet hole, with no living witness and no formal proof.",
        "The exact circumstances of Mkwawa's death: the video sticks to the German report and presents it as such.",
        "The size of the German column in 1891 (250 to 320 askaris depending on the source): the video gives no figure.",
        "The date of the return: 19 June 1954 rests on Twining's speech (British archives, CO 822/770); the July 1954 dates cited elsewhere rest on no document.",
      ],
    },
    simplifications: {
      fr: ["La prime mise sur la tête de Mkwawa et la traque de 1898 ne sont pas racontées.", "Aucune image du crâne, de la tête ou du corps n'est montrée."],
      en: ["The bounty on Mkwawa's head and the 1898 manhunt are not told.", "No image of the skull, the head or the body is shown."],
    },
    reading: {
      fr: "« Il a été reconnu, pas prouvé » est notre lecture : les archives montrent une identification par mesures, sans preuve formelle ; ce n'est pas une erreur démontrée.",
      en: "\"It was recognised, not proven\" is our reading: the archives show an identification by measurement, without formal proof; it is not a proven mistake.",
    },
    references: [
      { kind: "primaire", title: "Treaty of Versailles, Part VIII, Article 246", container: "Foreign Relations of the United States, Paris Peace Conference 1919, vol. XIII", url: "https://history.state.gov/historicaldocuments/frus1919Parisv13/ch17subch2", accessed: "2026-11-24" },
      { kind: "primaire", title: "Sultan Mkwawa's Skull", container: "Hansard, House of Commons, 3 December 1930, vol. 245", year: "1930", url: "https://api.parliament.uk/historic-hansard/commons/1930/dec/03/sultan-mkwawas-skull", accessed: "2026-11-24" },
      { kind: "primaire", title: "Correspondance sur le crâne du sultan Mkwawa (1919-1954)", container: "The National Archives (Kew), FO 608/215/29, FO 371/3795, CO 822/566, CO 822/770" },
      { kind: "institution", author: "The National Archives (Royaume-Uni)", title: "The skull of Sultan Mkwawa", container: "The National Archives blog", year: "2019", url: "https://blog.nationalarchives.gov.uk/the-skull-of-sultan-mkwawa/", accessed: "2026-11-24" },
      { kind: "article", author: "Jesse Bucher", title: "The skull of Mkwawa and the politics of indirect rule in Tanganyika", container: "Journal of Eastern African Studies, vol. 10, n° 2, p. 284-302", year: "2016", url: "https://library.au.int/fr/skull-mkwawa-and-politics-indirect-rule-tanganyika", accessed: "2026-11-25" },
    ],
  },

  tewodros: {
    status: "verified",
    updated: "2026-11-25",
    established: {
      fr: [
        "Fin 1862 (la lettre est datée du 29 octobre), l'empereur Tewodros II d'Éthiopie écrit à la reine Victoria pour proposer une alliance et demander des artisans, des armes et des experts.",
        "Le consul britannique Charles Cameron transmet la lettre ; elle arrive à Londres en février 1863 et reste sans réponse.",
        "Tewodros fait enchaîner Cameron et d'autres Européens. En 1866, l'émissaire Hormuzd Rassam est retenu à son tour.",
        "Début 1868, une armée partie d'Inde débarque sur la mer Rouge : environ 13 000 soldats et 40 000 animaux, dont 44 éléphants pour l'artillerie lourde. Elle marche environ 640 km dans les montagnes jusqu'à Magdala.",
        "Le 10 avril 1868, à Arogee, l'armée de Tewodros est repoussée. Le 13 avril, les Britanniques prennent Magdala ; Tewodros se donne la mort.",
      ],
      en: [
        "In late 1862 (the letter is dated 29 October), Emperor Tewodros II of Ethiopia wrote to Queen Victoria to propose an alliance and ask for craftsmen, weapons and experts.",
        "The British consul Charles Cameron passed the letter on; it reached London in February 1863 and went unanswered.",
        "Tewodros had Cameron and other Europeans chained. In 1866, the envoy Hormuzd Rassam was held in turn.",
        "In early 1868, an army from India landed on the Red Sea coast: about 13,000 soldiers and 40,000 animals, including 44 elephants for the heavy artillery. It marched some 640 km through the mountains to Magdala.",
        "On 10 April 1868, at Arogee, Tewodros's army was driven back. On 13 April, the British took Magdala; Tewodros took his own life.",
      ],
    },
    debated: {
      fr: [
        "La date de la mise aux fers de Cameron : 1863 selon le National Army Museum, le 4 janvier 1864 selon l'historien Richard Pankhurst. La vidéo dit « au début de 1864 ».",
        "Les raisons du silence de Londres : non affirmées dans la vidéo.",
        "Le poids de la lettre dans la marche à la guerre : Pankhurst y voit l'origine de la brouille, mais la conduite de Cameron, la détention de missionnaires et la question des artisans ont aussi joué.",
        "La distance parcourue : de 630 à 680 km selon les sources.",
      ],
      en: [
        "When Cameron was put in chains: 1863 according to the National Army Museum, 4 January 1864 according to historian Richard Pankhurst. The video says \"early 1864\".",
        "Why London stayed silent: not stated in the video.",
        "How much the letter weighed in the road to war: Pankhurst sees it as the start of the quarrel, but Cameron's conduct, detained missionaries and the craftsmen question also played a part.",
        "The distance marched: 630 to 680 km depending on the source.",
      ],
    },
    simplifications: {
      fr: ["Le contenu exact de la lettre est résumé en une phrase.", "La mort de Tewodros est évoquée, jamais montrée ; aucun visage de personne réelle n'apparaît."],
      en: ["The exact content of the letter is summed up in one sentence.", "Tewodros's death is mentioned, never shown; no real person's face appears."],
    },
    reading: {
      fr: "« La seule réponse à la lettre aura été une guerre » est notre lecture, présentée comme telle dans la vidéo.",
      en: "\"The only reply to the letter was a war\" is our reading, presented as such in the video.",
    },
    references: [
      { kind: "primaire", title: "Débat sur l'Abyssinie (réception de la lettre de 1862 le 12 février 1863)", container: "Hansard, House of Commons, 30 June 1865" },
      { kind: "institution", author: "National Army Museum (Londres)", title: "Abyssinia expedition", container: "National Army Museum", url: "https://www.nam.ac.uk/explore/abyssinia", accessed: "2026-11-25" },
      { kind: "article", author: "Richard Pankhurst", title: "Two Unpublished 19th Century Ethiopian Letters: from Emperor Tewodros to Sir Robert Napier, and from Däjjazmach Negusé to Naib Hasän Bey", container: "Aethiopica, n° 11, p. 61-67", year: "2008", url: "https://journals.sub.uni-hamburg.de/aethiopica/article/download/145/122", accessed: "2026-11-25" },
      { kind: "article", author: "Richard Pankhurst", title: "An Essay in Nineteenth Century Ethiopian History", container: "Pankhurst History Library, Together We Learn Ethiopia", url: "https://twlethiopia.org/article/3-an-essay-in-nineteenth-century-ethiopian-history/", accessed: "2026-11-25" },
    ],
  },

  bastille: {
    status: "verified",
    updated: "2026-11-25",
    established: {
      fr: [
        "Le 12 juillet 1789, alors que Paris s'agite, les autorités royales font transférer 250 barils de poudre à la Bastille, confiés à son gouverneur, Bernard-René Jourdan de Launay.",
        "Le matin du 14 juillet, la foule prend des dizaines de milliers de fusils aux Invalides, mais il lui manque la poudre ; elle se rend à la Bastille.",
        "Des délégués de l'Hôtel de Ville demandent la poudre et le retrait des canons. De Launay fait reculer les canons mais refuse de livrer la poudre.",
        "Vers 15 h 30, des compagnies de gardes françaises passées du côté des Parisiens arrivent avec des canons, sous la conduite de Pierre-Augustin Hulin et Jacob-Job Élie. La forteresse se rend dans l'après-midi.",
        "Environ 98 assaillants sont tués ; côté défenseurs, un seul homme meurt pendant le combat. Plusieurs autres sont tués après la reddition.",
        "De Launay est conduit jusqu'à l'Hôtel de Ville, où il est tué par la foule avant tout jugement.",
        "La Bastille ne compte ce jour-là que sept prisonniers : quatre faussaires en attente de jugement, deux hommes jugés aliénés et le comte de Solages, enfermé à la demande de sa famille.",
      ],
      en: [
        "On 12 July 1789, as Paris grew restless, the royal authorities had 250 barrels of gunpowder moved to the Bastille, in the custody of its governor, Bernard-René Jourdan de Launay.",
        "On the morning of 14 July, the crowd seized tens of thousands of muskets at the Invalides, but it lacked gunpowder; it headed for the Bastille.",
        "Delegates from the Hôtel de Ville asked for the gunpowder and for the cannons to be withdrawn. De Launay pulled the cannons back but refused to hand over the gunpowder.",
        "Around 3:30 pm, companies of French Guards who had sided with the Parisians arrived with cannons, led by Pierre-Augustin Hulin and Jacob-Job Élie. The fortress surrendered that afternoon.",
        "About 98 attackers were killed; on the defenders' side, a single man died in the fighting. Several others were killed after the surrender.",
        "De Launay was taken to the Hôtel de Ville, where the crowd killed him before any trial.",
        "That day the Bastille held only seven prisoners: four forgers awaiting trial, two men judged insane and the Comte de Solages, locked up at his family's request.",
      ],
    },
    debated: {
      fr: [
        "Le nombre de fusils pris aux Invalides : de 28 000 à plus de 30 000 selon les sources.",
        "Le bilan exact chez les assaillants (de 94 à 98 morts selon les décomptes) et chez les défenseurs tués après la reddition.",
        "L'heure de la reddition, située en fin d'après-midi (vers 17 h selon la plupart des récits).",
        "La date d'entrée en fonction de De Launay : septembre 1775 selon la notice de la BnF, 1776 chez d'autres auteurs.",
      ],
      en: [
        "The number of muskets taken at the Invalides: from 28,000 to over 30,000 depending on the source.",
        "The exact toll among the attackers (94 to 98 dead depending on the count) and among defenders killed after the surrender.",
        "The time of the surrender, placed in the late afternoon (around 5 pm in most accounts).",
        "When de Launay took office: September 1775 according to the French National Library, 1776 in other accounts.",
      ],
    },
    simplifications: {
      fr: [
        "La vidéo dit que De Launay est tué « en chemin » vers l'Hôtel de Ville : il est en réalité tué devant l'Hôtel de Ville, avant d'avoir été jugé.",
        "Les journées du 12 et du 13 juillet (renvoi de Necker, pillages, formation d'une milice bourgeoise) sont résumées en une phrase.",
        "Les deux délégations de la matinée et la négociation autour des canons sont réunies en une seule.",
      ],
      en: [
        "The video says de Launay was killed \"on the way\" to the Hôtel de Ville: he was in fact killed in front of the Hôtel de Ville, before being tried.",
        "The days of 12 and 13 July (Necker's dismissal, looting, the forming of a citizens' militia) are summed up in one sentence.",
        "The morning's two delegations and the negotiation over the cannons are merged into one.",
      ],
    },
    reading: {
      fr: "« Prendre la Bastille, c'était prendre le symbole » est notre lecture : les assaillants venaient d'abord chercher la poudre, mais la forteresse incarnait l'enfermement sans jugement par lettre de cachet, et c'est ce symbole que retient la fête du 14 juillet.",
      en: "\"Taking the Bastille meant taking the symbol\" is our reading: the attackers first came for the gunpowder, but the fortress embodied imprisonment without trial by lettre de cachet, and that symbol is what Bastille Day remembers.",
    },
    references: [
      { kind: "primaire", title: "Liste des sept prisonniers détenus à la Bastille du 1er au 14 juillet 1789 (copie certifiée en 1791)", container: "Archives nationales, AE/II/1166/c" },
      { kind: "institution", title: "Archives de la Bastille", container: "Bibliothèque nationale de France", url: "https://www.bnf.fr/fr/archives-de-la-bastille", accessed: "2026-11-25" },
      { kind: "institution", title: "Bernard René Jourdan de Launay (1740-1789)", container: "data.bnf.fr", url: "https://data.bnf.fr/fr/14954034/bernard_rene_jourdan_de_launay/", accessed: "2026-11-25" },
      { kind: "encyclopedie", title: "Storming of the Bastille", container: "Encyclopaedia Britannica", url: "https://www.britannica.com/event/storming-of-the-Bastille", accessed: "2026-11-25" },
    ],
  },
};

export const sourceFile = (slug: string) => sources[slug] ?? null;
