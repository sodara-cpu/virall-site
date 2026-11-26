import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fraunces, garamond, inter } from "../fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RevealObserver } from "@/components/reveal";
import { JsonLd, organizationLd } from "@/components/json-ld";
import { isLocale, locales, t, type Locale } from "@/content/i18n";
import { SITE_URL, asset } from "@/lib/paths";
import { CSP } from "@/lib/security";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#141B2D",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const d = t(lang as Locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.title, template: `%s | VIRALL` },
    description: d.description,
    applicationName: "VIRALL",
    icons: { icon: asset("/favicon.svg"), apple: asset("/apple-touch-icon.png") },
    openGraph: { siteName: "VIRALL", locale: lang === "fr" ? "fr_FR" : "en_GB", type: "website" },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={`no-js ${inter.variable} ${fraunces.variable} ${garamond.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <Header lang={lang} />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer lang={lang} />
        <RevealObserver />
        <JsonLd data={organizationLd(lang)} />
      </body>
    </html>
  );
}
