import Link from "next/link";
import { brands } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { PageHeader } from "@/components/page-header";
import { Picture } from "@/components/picture";
import { Reel } from "@/components/marks";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).media;
  return pageMeta(lang, routes.media, d.title, d.intro, "epoques_rome");
}

export default async function MediaIndex({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang);
  return (
    <>
      <PageHeader title={d.media.title} lead={d.media.intro} />
      <div className="bg-blanc">
        {brands.map((b, i) => {
          const flip = i % 2 === 1;
          const colors = brands.map((x) => (x.slug === b.slug ? b.color : "#141B2D"));
          return (
            <section key={b.slug} className="hairline border-t py-20 lg:py-28" aria-labelledby={`marque-${b.slug}`}>
              <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <Link
                  href={href(lang, `${routes.media}/${b.slug}`)}
                  className={`group relative block overflow-hidden lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
                  tabIndex={-1}
                  aria-hidden
                  data-reveal
                >
                  <div className="grain relative aspect-[16/10]">
                    <Picture id={b.image} lang={lang} fill sizes="(min-width:1024px) 58vw, 100vw" imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.035]" />
                  </div>
                </Link>
                <div className={`lg:col-span-4 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`} data-reveal>
                  <div className="flex items-center gap-4">
                    <Reel className="h-10 w-10 text-encre" bladeColors={colors} strokeWidth={12} />
                    <span className="kicker" style={{ color: `color-mix(in srgb, ${b.color} 80%, #141B2D)` }}>
                      {b.domain[lang]}
                    </span>
                  </div>
                  <h2 id={`marque-${b.slug}`} className="display mt-5 text-[clamp(2.8rem,5.4vw,4.8rem)]" style={{ color: b.color }}>
                    {b.name}
                  </h2>
                  <p className="dek mt-3 italic text-encre/85">{b.tagline[lang]}</p>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-ardoise">{b.mission[lang]}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link href={href(lang, `${routes.media}/${b.slug}`)} className="btn text-blanc" style={{ background: b.color }}>
                      {d.common.discover} VIRALL {b.name}
                      <span aria-hidden className="btn-arrow">→</span>
                    </Link>
                    <span className="text-sm text-ardoise">
                      {b.status === "launch" ? d.common.launch : d.common.development}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
        <p className="wrap pb-16 text-sm text-ardoise">{d.media.statusNote}</p>
      </div>
    </>
  );
}
