// Préfixe des fichiers statiques quand le site est servi dans un sous-dossier (aperçu).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE_PATH}${p}`;

/** Adresse publique du site (SEO, sitemap, Open Graph). */
export const SITE_URL = (process.env.SITE_URL || "https://virall.art").replace(/\/$/, "");
export const CONTACT_EMAIL = "contact@virall.art";
