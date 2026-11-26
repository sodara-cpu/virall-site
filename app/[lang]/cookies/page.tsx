import { t, type Locale } from "@/content/i18n";
import { LegalPage } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).legal;
  return pageMeta(lang, "cookies", d.cookiesTitle, d.cookiesTitle);
}

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return <LegalPage lang={lang} kind="cookies" />;
}
