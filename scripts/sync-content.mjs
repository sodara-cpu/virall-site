// Applique un export de contenus au site : npm run sync -- <export.json> [--racine <dossier des images>]
// Écrit content/productions.auto.json (productions, dossiers de sources, images) et dépose les images
// nouvelles dans assets/images. Le contenu écrit à la main (productions.ts, sources.ts, images.ts) prime
// toujours : une production déjà présente à la main n'est jamais remplacée.
// Un dossier généré est toujours en statut « review » : il passe en « verified » après relecture humaine,
// en recopiant l'entrée dans content/sources.ts.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const fichier = args.find((a) => !a.startsWith("--"));
if (!fichier) {
  console.error("Usage : npm run sync -- <export.json> [--racine <dossier>]");
  process.exit(2);
}
const exp = JSON.parse(fs.readFileSync(fichier, "utf8"));
if (exp.schema !== 1 || !Array.isArray(exp.productions)) throw new Error("Export illisible (schema 1 attendu)");
const iR = args.indexOf("--racine");
const racine = iR >= 0 ? args[iR + 1] : exp.racine || path.dirname(fichier);

const manuels = new Set([...fs.readFileSync("content/productions.ts", "utf8").matchAll(/\n    slug: "([^"]+)"/g)].map((m) => m[1]));
const today = new Date().toISOString().slice(0, 10);
const deux = (o, def = "") => ({ fr: o?.fr || def, en: o?.en || o?.fr || def });
const genre = (s) =>
  /wikip|britannica|encyclop|larousse/i.test(s) ? "encyclopedie"
  : /rapport|lettre|arrêt|journal des marches|archives|hansard|traité|compte rendu|proposition de loi|journal officiel/i.test(s) ? "primaire"
  : /ministère|office|institut|cnrs|musée|museum|library|bibliothèque|ligue|sénat|assemblée|national/i.test(s) ? "institution"
  : "article";

const out = { genere_le: exp.genere_le || null, productions: [], sources: {}, images: {} };
let nouvellesImages = 0;
const vus = new Set();

for (const p of exp.productions) {
  if (!/^[a-z0-9-]+$/.test(p.slug || "")) { console.warn(`Ignoré (slug invalide) : ${p.id}`); continue; }
  if (manuels.has(p.slug) || vus.has(p.slug)) continue; // le manuel prime ; un slug une seule fois
  vus.add(p.slug);
  const titre = deux(p.titre, p.id);
  const cle = (i) => `auto_${p.slug.replace(/-/g, "_")}_${i + 1}`;
  const images = (p.images || []).slice(0, 2);
  for (const [i, rel] of images.entries()) {
    const k = cle(i);
    const dest = `assets/images/${k}.webp`;
    const src = path.isAbsolute(rel) ? rel : path.join(racine, rel);
    if (!fs.existsSync(dest)) {
      if (!fs.existsSync(src)) { console.warn(`Image absente : ${src}`); continue; }
      await sharp(src).rotate().webp({ quality: 90 }).toFile(dest);
      nouvellesImages++;
    }
    out.images[k] = {
      alt: { fr: `Reconstitution de la production « ${titre.fr} »`, en: `Reconstruction from the production "${titre.en}"` },
      source: "production", provenance: `Extrait des productions VIRALL Époques (${p.slug})`, licence: "Propriété de VIRALL", ai: true, reconstitution: true,
    };
  }
  const image = out.images[cle(0)] ? cle(0) : null;
  if (!image) { console.warn(`Ignoré (aucune image) : ${p.slug}`); continue; }
  out.productions.push({
    slug: p.slug, brand: "epoques", title: titre, summary: deux(p.resume),
    period: deux({ fr: p.periode }), category: { fr: "Histoire", en: "History" },
    format: p.format === "episode" ? "episode" : "vertical", durationSec: p.duree_secondes ?? null,
    status: "soon", publishedAt: null, image, links: [],
  });
  const par = (st) => (p.affirmations || []).filter((a) => a.statut === st).map((a) => a.texte);
  const bloc = (st) => { const l = par(st); return l.length ? { fr: l, en: l } : undefined; };
  const lecture = par("interpretation");
  out.sources[p.slug] = {
    status: "review", updated: today,
    established: { fr: par("etabli"), en: par("etabli") },
    ...(bloc("debattu") && { debated: bloc("debattu") }),
    ...(bloc("legende") && { legend: bloc("legende") }),
    ...(bloc("simplification") && { simplifications: bloc("simplification") }),
    ...(lecture.length && { reading: { fr: lecture.join(" "), en: lecture.join(" ") } }),
    ...(bloc("question") && { openQuestions: bloc("question") }),
    references: [...new Set(p.sources || [])].slice(0, 20).map((s) => ({ kind: genre(s), title: s })),
  };
}

fs.writeFileSync("content/productions.auto.json", JSON.stringify(out, null, 1) + "\n");
console.log(`Synchronisation : ${out.productions.length} production(s) ajoutée(s) automatiquement, ${nouvellesImages} image(s) nouvelle(s). Lancer ensuite npm run images.`);
