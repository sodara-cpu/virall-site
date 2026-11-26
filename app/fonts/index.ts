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
