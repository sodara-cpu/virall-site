import { routes, t, type Locale } from "@/content/i18n";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { CONTACT_EMAIL } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).contact;
  return pageMeta(lang, routes.contact, d.title, d.lead);
}

export default async function Contact({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).contact;
  return (
    <>
      <PageHeader kicker="VIRALL" title={d.title} lead={d.lead} />
      <section className="bg-blanc py-20 lg:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="kicker text-ardoise">{d.emailLabel}</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className="display link-underline mt-4 inline-block text-[clamp(1.8rem,3vw,2.6rem)]">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display text-4xl">{d.formTitle}</h2>
            <div className="mt-8">
              <ContactForm d={d} email={CONTACT_EMAIL} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
