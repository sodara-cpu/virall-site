import localFont from "next/font/local";

// Polices hébergées sur le site (SIL Open Font License 1.1), réduites aux caractères latins utilisés.
// Fraunces est figée sur ses réglages d'affichage (opsz 144 ; 560 en romain, 400 en italique).
export const inter = localFont({
  src: "./inter-text.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const fraunces = localFont({
  src: [
    { path: "./fraunces-display.woff2", style: "normal", weight: "560" },
    { path: "./fraunces-display-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// EB Garamond : police des sous-titres et des couvertures de VIRALL Époques (marque/polices).
// Sur le site : textes de lecture (chapôs, faits, citations, légendes). Fichiers latins de @fontsource-variable/eb-garamond 5.3.0.
export const garamond = localFont({
  src: [
    { path: "./eb-garamond-text.woff2", style: "normal", weight: "400 800" },
    { path: "./eb-garamond-text-italic.woff2", style: "italic", weight: "400 800" },
  ],
  variable: "--font-garamond",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
