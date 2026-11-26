import { brands } from "@/content/brands";
import { t, type Locale } from "@/content/i18n";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/paths";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Données structurées : le groupe et ses marques (schema.org Organization). */
export function organizationLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "VIRALL",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo_principal_fond_clair.svg`,
    email: CONTACT_EMAIL,
    slogan: t(lang).footer.tagline,
    description: t(lang).meta.description,
    subOrganization: brands.map((b) => ({
      "@type": "Organization",
      name: `VIRALL ${b.name}`,
      url: `${SITE_URL}/${lang}/medias/${b.slug}/`,
      description: b.tagline[lang],
      sameAs: b.socials.map((s) => s.url),
    })),
  };
}
