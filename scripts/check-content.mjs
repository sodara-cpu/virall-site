// Contrôle de cohérence des contenus avant publication : npm run check
// Vérifie que chaque image citée existe dans le registre et a été optimisée, que les marques et productions sont complètes.
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const meta = JSON.parse(read("content/image-meta.json"));
const imagesTs = read("content/images.ts");
const registered = new Set([...imagesTs.matchAll(/^  ([a-z0-9_]+): \{/gm)].map((m) => m[1]));
const errors = [];

const used = [
  ...[...read("content/brands.ts").matchAll(/image: "([^"]+)"/g)].map((m) => m[1]),
  ...[...read("content/brands.ts").matchAll(/gallery: \[([^\]]+)\]/g)].flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])),
  ...[...read("content/productions.ts").matchAll(/image: "([^"]+)"/g)].map((m) => m[1]),
  ...[...read("app/[lang]/page.tsx").matchAll(/<Picture id="([a-z0-9_]+)"/g)].map((m) => m[1]),
];
for (const k of new Set(used)) {
  if (!registered.has(k)) errors.push(`Image « ${k} » utilisée mais absente de content/images.ts`);
  if (!meta[k]) errors.push(`Image « ${k} » non optimisée : déposer assets/images/${k}.webp puis lancer npm run images`);
}
for (const k of registered) if (!meta[k]) errors.push(`Image « ${k} » enregistrée sans fichier optimisé`);

const brands = read("content/brands.ts");
for (const field of ["tagline", "mission", "themes", "formats", "collaboration", "domain"]) {
  const n = (brands.match(new RegExp(`\\n    ${field}: \\{`, "g")) || []).length;
  const total = (brands.match(/\n    slug: "/g) || []).length;
  if (n !== total) errors.push(`Marques : champ « ${field} » présent ${n} fois pour ${total} marques`);
}

if (errors.length) {
  console.error("Contrôle des contenus : " + errors.length + " problème(s)\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`Contrôle des contenus : OK (${registered.size} images, ${new Set(used).size} utilisées)`);
