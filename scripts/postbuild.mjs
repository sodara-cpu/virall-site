// Après `next build` (export statique dans out/) : page racine, page 404, fichiers GitHub Pages.
import fs from "node:fs";

const OUT = "out";
const base = process.env.BASE_PATH || "";
const domain = process.env.CUSTOM_DOMAIN || ""; // ex. virall.art au moment de la mise en production

const shell = (title, body, head = "") => `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'self'; object-src 'none'"><meta name="referrer" content="strict-origin-when-cross-origin">
<title>${title}</title><meta name="robots" content="noindex"><link rel="icon" href="${base}/favicon.svg">${head}
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#141B2D;color:#F7F8FA;font:16px/1.6 system-ui,sans-serif;text-align:center;padding:2rem}
h1{font:600 clamp(2.4rem,6vw,4.5rem)/1 Georgia,serif;margin:1.5rem 0 1rem}a{color:#F7F8FA}p{opacity:.75;margin:.4rem 0}</style></head>
<body><main><img src="${base}/brand/logo_compact.svg" width="72" height="72" alt="VIRALL">${body}</main></body></html>`;

// Racine : choix de la langue selon le navigateur (FR par défaut)
fs.writeFileSync(
  `${OUT}/index.html`,
  shell(
    "VIRALL",
    `<h1>VIRALL</h1><p><a href="${base}/fr/">Français</a> · <a href="${base}/en/">English</a></p>`,
    `<link rel="canonical" href="https://virall.art/fr/"><link rel="alternate" hreflang="fr" href="https://virall.art/fr/"><link rel="alternate" hreflang="en" href="https://virall.art/en/">
<script>var l=(navigator.languages&&navigator.languages[0]||navigator.language||"fr").toLowerCase();location.replace("${base}/"+(l.indexOf("fr")===0?"fr":"en")+"/");</script>
<noscript><meta http-equiv="refresh" content="0;url=${base}/fr/"></noscript>`,
  ),
);

// 404 bilingue
fs.writeFileSync(
  `${OUT}/404.html`,
  shell(
    "Page introuvable | VIRALL",
    `<h1>Page introuvable</h1><p>Cette page n'existe pas ou a été déplacée.</p><p lang="en">This page does not exist or has moved.</p><p style="margin-top:2rem"><a href="${base}/fr/">Retour à l'accueil</a> · <a href="${base}/en/" lang="en">Back to home</a></p>`,
  ),
);

// Liens courts des descriptions vidéo : /s/<slug>/ -> /fr|en/productions/<slug>/ selon la langue du navigateur
const prodDir = `${OUT}/fr/productions`;
const slugs = fs.existsSync(prodDir) ? fs.readdirSync(prodDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name) : [];
for (const slug of slugs) {
  fs.mkdirSync(`${OUT}/s/${slug}`, { recursive: true });
  fs.writeFileSync(
    `${OUT}/s/${slug}/index.html`,
    shell(
      "Sources | VIRALL",
      `<h1>Sources</h1><p><a href="${base}/fr/productions/${slug}/">Voir les sources</a> · <a href="${base}/en/productions/${slug}/" lang="en">See the sources</a></p>`,
      `<link rel="canonical" href="https://virall.art/fr/productions/${slug}/">
<script>var l=(navigator.languages&&navigator.languages[0]||navigator.language||"fr").toLowerCase();location.replace("${base}/"+(l.indexOf("fr")===0?"fr":"en")+"/productions/${slug}/");</script>
<noscript><meta http-equiv="refresh" content="0;url=${base}/fr/productions/${slug}/"></noscript>`,
    ),
  );
}

fs.writeFileSync(`${OUT}/.nojekyll`, "");
if (domain) fs.writeFileSync(`${OUT}/CNAME`, `${domain}\n`);
console.log("postbuild ok", domain ? `(domaine ${domain})` : "", `liens courts: ${slugs.map((s) => `/s/${s}/`).join(" ")}`);
