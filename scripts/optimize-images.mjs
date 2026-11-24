// Optimise les images sources (assets/images) en AVIF et WebP à plusieurs largeurs, dans public/img.
// Écrit aussi content/image-meta.json (dimensions, largeurs produites, aperçu flou).
// Usage : npm run images  (ne retraite que les images nouvelles ou modifiées)

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/images";
const OUT = "public/img";
const META = "content/image-meta.json";
const WIDTHS = [480, 800, 1280, 1920, 2560];

fs.mkdirSync(OUT, { recursive: true });
const meta = fs.existsSync(META) ? JSON.parse(fs.readFileSync(META, "utf8")) : {};
const files = fs.readdirSync(SRC).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));

for (const file of files) {
  const key = file.replace(/\.[^.]+$/, "");
  const src = path.join(SRC, file);
  const mtime = fs.statSync(src).mtimeMs;
  if (meta[key]?.mtime === mtime && fs.existsSync(path.join(OUT, `${key}-${meta[key].widths.at(-1)}.avif`))) continue;

  const img = sharp(src).rotate();
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (!widths.length || widths.at(-1) < width * 0.8) widths.push(Math.min(width, 2560));

  for (const w of [...new Set(widths)]) {
    const base = sharp(src).rotate().resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(OUT, `${key}-${w}.avif`));
    await base.clone().webp({ quality: 76 }).toFile(path.join(OUT, `${key}-${w}.webp`));
  }
  const tiny = await sharp(src).resize(24).webp({ quality: 40 }).toBuffer();
  meta[key] = {
    w: width,
    h: height,
    widths: [...new Set(widths)].sort((a, b) => a - b),
    blur: `data:image/webp;base64,${tiny.toString("base64")}`,
    mtime,
  };
  console.log("ok", key, width, "x", height);
}

// Nettoie les entrées dont la source a disparu
for (const key of Object.keys(meta)) {
  if (!files.some((f) => f.replace(/\.[^.]+$/, "") === key)) delete meta[key];
}
fs.writeFileSync(META, JSON.stringify(meta, null, 1));
console.log(Object.keys(meta).length, "images");
