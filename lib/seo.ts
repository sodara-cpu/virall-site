import type { Metadata } from "next";
import { imageInfo } from "@/content/images";
import type { Locale } from "@/content/i18n";
import { SITE_URL } from "./paths";

/** Métadonnées d'une page : titre, description, URL canonique, versions FR/EN, image Open Graph. */
export function pageMeta(lang: Locale, path: string, title: string | null, description: string, image = "hero_ville"): Metadata {
  const clean = path ? `${path.replace(/^\/|\/$/g, "")}/` : "";
  const url = `${SITE_URL}/${lang}/${clean}`;
  const info = imageInfo(image);
  const w = info ? info.widths.find((x) => x >= 1200) ?? info.widths.at(-1) : null;
  const og = info && w ? [{ url: `${SITE_URL}/img/${image}-${w}.webp`, width: w, height: Math.round((w * info.h) / info.w), alt: info.alt[lang] }] : [];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: { fr: `${SITE_URL}/fr/${clean}`, en: `${SITE_URL}/en/${clean}`, "x-default": `${SITE_URL}/fr/${clean}` },
    },
    openGraph: { title: title ?? "VIRALL", description, url, images: og },
    twitter: { card: "summary_large_image", title: title ?? "VIRALL", description, images: og.map((o) => o.url) },
  };
}
