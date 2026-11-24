import type { MetadataRoute } from "next";
import { brands } from "@/content/brands";
import { productions } from "@/content/productions";
import { sourceFile } from "@/content/sources";
import { locales, routes } from "@/content/i18n";
import { SITE_URL } from "@/lib/paths";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", routes.media, ...brands.map((b) => `${routes.media}/${b.slug}`), routes.productions, ...productions.filter((p) => sourceFile(p.slug)).map((p) => `${routes.productions}/${p.slug}`), routes.about, routes.partners, routes.contact, routes.legal, routes.privacy, routes.cookies];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}/${p ? `${p}/` : ""}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : p.startsWith(routes.media) ? 0.8 : 0.5,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}/${p ? `${p}/` : ""}`])) },
    })),
  );
}
