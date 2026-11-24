import Link from "next/link";
import { brands } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { PageHeader } from "@/components/page-header";
import { Picture } from "@/components/picture";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).partners;
  return pageMeta(lang, routes.partners, d.title, `${d.lead} ${d.text}`.slice(0, 300), "partenariat_tournage");
}

export default async function Partners({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang);
  return (
    <>
      <PageHeader kicker="VIRALL" title={d.partners.title} lead={d.partners.lead} />

      <section className="dark-zone relative overflow-hidden bg-encre text-blanc">
        <div className="grain relative aspect-[16/7] min-h-[340px] w-full">
          <Picture id="partenariat_tournage" lang={lang} fill sizes="100vw" />
        </div>
      </section>

      <section className="bg-blanc py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <p className="display text-[clamp(1.8rem,3vw,2.7rem)] leading-[1.15] lg:col-span-7" data-reveal>{d.partners.text}</p>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
            {d.offers.map((o, i) => (
              <div key={o.title} className="hairline border-t py-8" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <dt>
                  <span className="kicker block text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display mt-3 block text-3xl">{o.title}</span>
                </dt>
                <dd className="mt-3 leading-relaxed text-ardoise">{o.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-papier py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <h2 className="display text-[clamp(2.2rem,4.2vw,3.8rem)] lg:col-span-4" data-reveal>{d.partners.how}</h2>
          <ol className="grid gap-x-8 sm:grid-cols-2 lg:col-span-8">
            {d.partners.steps.map((s, i) => (
              <li key={s.title} className="hairline border-t py-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <span className="display text-4xl text-accent">{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-ardoise">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-blanc py-20">
        <div className="wrap flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <ul className="flex flex-wrap gap-3">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link href={href(lang, `${routes.media}/${b.slug}`)} className="inline-flex items-center gap-2 rounded-full border border-encre/15 px-4 py-2 text-sm font-medium hover:border-encre/40">
                  <span aria-hidden className="h-2 w-2 rounded-[2px]" style={{ background: b.color }} />
                  VIRALL {b.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href(lang, routes.contact)} className="btn bg-encre text-blanc hover:bg-accent">
            {d.partners.cta}
            <span aria-hidden className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
