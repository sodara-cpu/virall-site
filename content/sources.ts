// Dossiers de sources des productions : une entrée par vidéo (clé = slug de content/productions.ts).
// Chaque vidéo publiée renvoie, dans sa description, vers https://virall.art/s/<slug>
// (redirection vers /fr/productions/<slug>/ ou /en/productions/<slug>/ selon la langue du visiteur).
// Ne jamais publier une vidéo dont le dossier est en statut "review".

import type { Locale } from "./i18n";
import auto from "./productions.auto.json";

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

const manualSources: Record<string, SourceFile> = {
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
        "La date d'entrée en fonction de De Launay : septembre 1775 selon la notice de la BnF, 1776 chez d'autres auteurs. La vidéo dit « depuis plus de dix ans ».",
      ],
      en: [
        "The number of muskets taken at the Invalides: from 28,000 to over 30,000 depending on the source.",
        "The exact toll among the attackers (94 to 98 dead depending on the count) and among defenders killed after the surrender.",
        "The time of the surrender, placed in the late afternoon (around 5 pm in most accounts).",
        "When de Launay took office: September 1775 according to the French National Library, 1776 in other accounts. The video says \"for more than ten years\".",
      ],
    },
    simplifications: {
      fr: [
        "Les journées du 12 et du 13 juillet (renvoi de Necker, pillages, formation d'une milice bourgeoise) sont résumées en une phrase.",
        "Les deux délégations de la matinée et la négociation autour des canons sont réunies en une seule.",
      ],
      en: [
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

  "cherbourg-1864": {
    status: "review",
    updated: "2026-11-26",
    established: {
      fr: [
        "Le 19 juin 1864, au large de Cherbourg, la corvette de l'Union USS Kearsarge et le croiseur confédéré CSS Alabama s'affrontent.",
        "L'Alabama a été construit en Angleterre, au chantier Laird de Birkenhead, en 1862. Pendant près de deux ans, il chasse les navires marchands du Nord sur tous les océans et brûle souvent ses prises en mer.",
        "Le 11 juin 1864, l'Alabama, usé, entre à Cherbourg pour être réparé. Le Kearsarge arrive devant le port le 14 juin.",
        "Le capitaine Semmes fait savoir qu'il sortira se battre. Le dimanche 19 juin au matin, l'Alabama quitte la rade, accompagné par le cuirassé français Couronne jusqu'à la limite des eaux françaises.",
        "Les deux navires tournent l'un autour de l'autre en sept cercles. D'après le rapport du capitaine Winslow, l'Alabama tire environ 370 coups, le Kearsarge 173.",
        "Le Kearsarge a suspendu ses chaînes d'ancre le long de ses flancs. Un obus de l'Alabama reste planté dans son étambot sans exploser.",
        "Le Kearsarge et des bateaux pilotes français repêchent des survivants ; le yacht anglais Deerhound recueille une quarantaine d'hommes, dont Semmes, et part vers l'Angleterre.",
        "Washington réclame réparation à Londres. En 1872, un tribunal d'arbitrage réuni à Genève condamne la Grande-Bretagne à payer 15,5 millions de dollars.",
      ],
      en: [
        "On 19 June 1864, off Cherbourg, the Union sloop USS Kearsarge and the Confederate cruiser CSS Alabama fought each other.",
        "The Alabama had been built in England, at the Laird yard in Birkenhead, in 1862. For almost two years it hunted Northern merchant ships across the oceans, often burning its prizes at sea.",
        "On 11 June 1864, the worn-out Alabama entered Cherbourg for repairs. The Kearsarge arrived off the port on 14 June.",
        "Captain Semmes let it be known that he would come out and fight. On the morning of Sunday 19 June, the Alabama left the roadstead, escorted by the French ironclad Couronne to the limit of French waters.",
        "The two ships circled each other seven times. According to Captain Winslow's report, the Alabama fired about 370 rounds, the Kearsarge 173.",
        "The Kearsarge had hung its anchor chains along its sides. A shell from the Alabama lodged in its sternpost without exploding.",
        "The Kearsarge and French pilot boats picked up survivors; the English yacht Deerhound rescued about forty men, Semmes among them, and sailed for England.",
        "Washington demanded compensation from London. In 1872, an arbitration tribunal sitting in Geneva ordered Britain to pay 15.5 million dollars.",
      ],
    },
    debated: {
      fr: [
        "La durée du combat : environ une heure avant que l'Alabama ne prenne l'eau, puis une vingtaine de minutes avant qu'il ne sombre selon Winslow ; environ une heure dix selon Semmes. La vidéo dit « environ ».",
        "Le nombre de navires capturés par l'Alabama : de 58 à 65 selon les sources. La vidéo dit « des dizaines ».",
      ],
      en: [
        "How long the fight lasted: about an hour before the Alabama began taking water, then some twenty minutes before it sank according to Winslow; about an hour and ten minutes according to Semmes. The video says \"about\".",
        "How many ships the Alabama captured: 58 to 65 depending on the source. The video says \"dozens\".",
      ],
    },
    simplifications: {
      fr: [
        "Les 15,5 millions de dollars couvrent les « réclamations de l'Alabama », c'est-à-dire plusieurs croiseurs confédérés, pas l'Alabama seul.",
        "Les réparations refusées à l'Alabama à Cherbourg avant le combat ne sont pas racontées.",
        "Les noyades sont évoquées, jamais montrées ; aucun visage de personne réelle n'apparaît.",
      ],
      en: [
        "The 15.5 million dollars covered the \"Alabama claims\", that is several Confederate cruisers, not the Alabama alone.",
        "The repairs the Alabama was refused at Cherbourg before the fight are left out.",
        "The drownings are mentioned, never shown; no real person's face appears.",
      ],
    },
    reading: {
      fr: "« La bataille de Cherbourg s'est terminée devant des juges » est notre lecture : le combat dure environ une heure, mais son dénouement est l'arbitrage de Genève, huit ans plus tard.",
      en: "\"The Battle of Cherbourg ended in front of judges\" is our reading: the fight lasted about an hour, but its outcome was the Geneva arbitration, eight years later.",
    },
    openQuestions: {
      fr: ["La foule de spectateurs massée sur la côte, souvent racontée, n'apparaît pas dans les rapports des deux capitaines. La vidéo ne la montre pas."],
      en: ["The crowd of onlookers on the shore, often described, does not appear in either captain's report. The video does not show it."],
    },
    references: [
      { kind: "primaire", title: "Rapports du capitaine Winslow (19 juin et 30 juillet 1864) et du capitaine Semmes (Southampton, 21 juin 1864)", container: "Naval History and Heritage Command" },
      { kind: "primaire", title: "Étambot du Kearsarge avec l'obus de l'Alabama (photographie NH 58781)", container: "Naval History and Heritage Command, photothèque" },
      { kind: "institution", title: "Histoire du CSS Alabama", container: "Naval History and Heritage Command" },
      { kind: "institution", author: "Office of the Historian (département d'État américain)", title: "The Alabama Claims, 1862-1872" },
      { kind: "institution", title: "The Alabama arbitration, Geneva 1872", container: "Library of Congress" },
      { kind: "encyclopedie", title: "Alabama claims", container: "Encyclopaedia Britannica" },
      { kind: "encyclopedie", title: "USS Kearsarge (1861)", container: "Wikipédia, d'après le Dictionary of American Naval Fighting Ships" },
      { kind: "article", title: "Almanach du 19 juin 1864", container: "Hérodote" },
      { kind: "article", author: "W. Topp", title: "Military History Now", year: "2021" },
      { kind: "article", title: "A shell from Alabama lodged in USS Kearsarge", container: "Civil War Picket", year: "2024" },
    ],
  },

  "vingre-1914": {
    status: "review",
    updated: "2026-11-26",
    established: {
      fr: [
        "Le 27 novembre 1914, en fin de journée, après un bombardement, les Allemands entrent dans une tranchée française près de Vingré, dans l'Aisne. Vingt-quatre hommes de la 19e compagnie du 298e régiment d'infanterie se replient vers une tranchée en arrière, puis regagnent leur poste peu après.",
        "Le 3 décembre 1914, les vingt-quatre passent devant le conseil de guerre spécial de la 53e division d'infanterie pour abandon de poste en présence de l'ennemi. Six sont condamnés à mort.",
        "Le caporal Henri Floch, 33 ans, écrit à sa femme Lucie : « Je ne suis pas plus coupable que les autres, mais il faut un exemple. » Le soir du 3 décembre, Jean Blanchard écrit à sa femme Michelle : « Nous sommes six pour payer pour tous. »",
        "Le 4 décembre 1914 à 7 h 30, les six sont fusillés à 200 mètres à l'ouest du calvaire de Vingré, puis les troupes présentes défilent devant les corps.",
        "Les six fusillés : le caporal Henri Floch, Jean Blanchard, Francisque Durantet, Pierre Gay, Claude Pettelet et Jean Quinault.",
        "Le 29 janvier 1921, la Cour de cassation annule le jugement et « décharge leur mémoire » de la condamnation.",
        "Le 5 avril 1925, un monument portant leurs six noms est inauguré à l'endroit de l'exécution.",
        "Le Service historique de la défense recense 639 soldats français fusillés pour l'exemple pendant la Grande Guerre ; une quarantaine de cas seulement ont été réhabilités (Sénat, 2 février 2023).",
      ],
      en: [
        "On 27 November 1914, late in the day, after a bombardment, German troops entered a French trench near Vingré, in the Aisne. Twenty-four men of the 19th company of the 298th Infantry Regiment fell back to a trench in the rear, then returned to their post shortly afterwards.",
        "On 3 December 1914, the twenty-four came before the special court martial of the 53rd Infantry Division for abandoning their post in the presence of the enemy. Six were sentenced to death.",
        "Corporal Henri Floch, 33, wrote to his wife Lucie: \"I am no guiltier than the others, but they need an example.\" On the evening of 3 December, Jean Blanchard wrote to his wife Michelle: \"There are six of us paying for everyone.\"",
        "On 4 December 1914 at 7.30 am, the six were shot 200 metres west of the Vingré wayside cross; the troops present then marched past the bodies.",
        "The six men shot: Corporal Henri Floch, Jean Blanchard, Francisque Durantet, Pierre Gay, Claude Pettelet and Jean Quinault.",
        "On 29 January 1921, France's Court of Cassation quashed the verdict and \"cleared their memory\" of the conviction.",
        "On 5 April 1925, a memorial bearing their six names was unveiled where they were executed.",
        "France's Defence Historical Service counts 639 French soldiers shot as an example during the First World War; only about forty cases have been rehabilitated (French Senate, 2 February 2023).",
      ],
    },
    debated: {
      fr: [
        "L'ordre de repli : les soldats disent avoir obéi à leur sous-lieutenant, qui nie l'avoir donné. La vidéo présente les deux versions sans citer le nom de l'officier.",
        "La désignation des six condamnés : tirage au sort selon plusieurs récits, désignation arbitraire selon d'autres, dont la Ligue des droits de l'homme.",
        "La date du conseil de guerre : 3 décembre selon le texte de l'arrêt de 1921, 4 décembre selon le CNRS. La vidéo retient le 3.",
      ],
      en: [
        "The order to fall back: the soldiers said they obeyed their second lieutenant, who denied giving it. The video gives both versions without naming the officer.",
        "How the six were chosen: by drawing lots according to several accounts, arbitrarily according to others, including the French Human Rights League.",
        "The date of the court martial: 3 December according to the 1921 ruling, 4 December according to the CNRS. The video uses 3 December.",
      ],
    },
    simplifications: {
      fr: [
        "Le sort des dix-huit autres soldats n'est pas raconté : une seule source le précise.",
        "La date exacte de la dernière lettre de Floch n'est pas connue. Il signait « Henry » ; la vidéo dit Henri. L'orthographe Quinault (arrêt et monument) est retenue ; on trouve aussi Quinaud.",
        "L'exécution est évoquée, jamais montrée ; aucun visage des soldats fusillés n'apparaît.",
      ],
      en: [
        "What happened to the other eighteen soldiers is left out: only one source gives it.",
        "The exact date of Floch's last letter is unknown. He signed \"Henry\"; the video says Henri. The spelling Quinault (ruling and memorial) is used; Quinaud is also found.",
        "The execution is mentioned, never shown; none of the executed soldiers' faces appears.",
      ],
    },
    reading: {
      fr: "« Un jugement, ça s'annule. Une vie, non. » est notre lecture : l'arrêt de 1921 annule la condamnation plus de six ans après l'exécution.",
      en: "\"A verdict can be quashed. A life cannot.\" is our reading: the 1921 ruling quashed the conviction more than six years after the execution.",
    },
    openQuestions: {
      fr: ["La réhabilitation collective des fusillés pour l'exemple : adoptée par l'Assemblée nationale en 2022, rejetée par le Sénat en 2023, la proposition de loi a été renvoyée en commission le 23 juillet 2024. Aucune loi n'a été trouvée en 2025 et 2026 (recherche du 26 novembre 2026)."],
      en: ["Collective rehabilitation of the soldiers shot as an example: passed by the National Assembly in 2022, rejected by the Senate in 2023, the bill was sent back to committee on 23 July 2024. No law was found in 2025 or 2026 (search of 26 November 2026)."],
    },
    references: [
      { kind: "primaire", title: "Arrêt de la Cour de cassation du 29 janvier 1921", container: "Journal officiel du 18 février 1921", year: "1921" },
      { kind: "primaire", title: "Journal des marches et opérations du 298e régiment d'infanterie, 4 décembre 1914" },
      { kind: "primaire", title: "Lettres du caporal Henri Floch à sa femme Lucie", container: "Horizon 14-18" },
      { kind: "primaire", title: "Lettre de Jean Blanchard à sa femme Michelle, 3 décembre 1914", container: "14-18Hebdo" },
      { kind: "primaire", title: "Compte rendu de la séance du 2 février 2023", container: "Sénat" },
      { kind: "primaire", title: "Proposition de loi n° 153 (17e législature)", container: "Assemblée nationale" },
      { kind: "institution", author: "Ligue des droits de l'homme", title: "La réhabilitation des fusillés pour l'exemple" },
      { kind: "institution", author: "CNRS, Centre d'histoire sociale", title: "La mémoire des fusillés de Vingré" },
      { kind: "institution", title: "Monument aux fusillés de Vingré", container: "Picardie 14-18 ; mairie de Saint-Victor" },
      { kind: "encyclopedie", title: "Martyrs de Vingré", container: "Wikipédia" },
    ],
  },
};

// Dossiers générés par scripts/sync-content.mjs : le dossier écrit à la main prime.
export const sources: Record<string, SourceFile> = { ...(auto.sources as Record<string, SourceFile>), ...manualSources };

export const sourceFile = (slug: string) => sources[slug] ?? null;
