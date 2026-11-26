import Link from "next/link";
import { getBrand } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { formatDuration, productions } from "@/content/productions";
import { sourceFile } from "@/content/sources";
import { PageHeader } from "@/components/page-header";
import { Picture } from "@/components/picture";
import { VideoFacade } from "@/components/video-facade";
import { Timeline } from "@/components/timeline";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).productions;
  return pageMeta(lang, routes.productions, d.title, d.intro, "prod_formose_concile");
}

export default async function Productions({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang);
  return (
    <>
      <PageHeader title={d.productions.title} lead={d.productions.intro} />
      <section aria-labelledby="frise-t" className="bg-blanc pb-16 pt-10 lg:pb-24 lg:pt-14">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="frise-t" className="rubric text-encre">{d.timeline.title}</h2>
            <p className="text-sm text-ardoise">{d.timeline.hint}</p>
          </div>
          <div className="mt-10">
            <Timeline lang={lang} dark={false} />
          </div>
        </div>
      </section>
      <div className="dark-zone bg-encre text-blanc">
        {productions.map((p, i) => {
          const brand = getBrand(p.brand);
          const duration = formatDuration(p.durationSec);
          const poster = <Picture id={p.image} lang={lang} fill sizes="(min-width:1024px) 34vw, 100vw" priority={i === 0} />;
          return (
            <article key={p.slug} id={p.slug} className="scroll-mt-24 border-b border-blanc/10 py-20 lg:py-28">
              <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className={`lg:col-span-4 ${i % 2 ? "lg:order-2 lg:col-start-9" : ""}`} data-reveal>
                  <div className="grain relative mx-auto aspect-[9/16] max-w-sm overflow-hidden bg-encre-2">
                    {p.youtubeId ? (
                      <VideoFacade youtubeId={p.youtubeId} title={p.title[lang]} label={d.productions.playVideo} notice={d.productions.consentVideo} poster={poster} />
                    ) : (
                      poster
                    )}
                  </div>
                </div>
                <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-2" : "lg:col-start-6"}`} data-reveal>
                  <p className="kicker">
                    {brand ? (
                      <Link href={href(lang, `${routes.media}/${brand.slug}`)} className="text-link" style={{ color: brand.colorLight }}>
                        VIRALL {brand.name}
                      </Link>
                    ) : null}
                    <span className="text-blanc/70">
                      {brand ? " · " : ""}
                      {p.category[lang]} · {p.status === "soon" ? d.common.soon : d.common.published}
                    </span>
                  </p>
                  <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)]">
                    {sourceFile(p.slug) ? <Link href={href(lang, `${routes.productions}/${p.slug}`)} className="hover:text-blanc/80">{p.title[lang]}</Link> : p.title[lang]}
                  </h2>
                  <p className="dek mt-5 max-w-xl text-blanc/85">{p.summary[lang]}</p>
                  <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-blanc/15 pt-6 text-sm">
                    <div>
                      <dt className="text-blanc/50">{d.productions.period}</dt>
                      <dd className="mt-1 font-semibold">{p.period[lang]}</dd>
                    </div>
                    <div>
                      <dt className="text-blanc/50">Format</dt>
                      <dd className="mt-1 font-semibold">{p.format === "vertical" ? d.common.vertical : d.common.episode}</dd>
                    </div>
                    {duration ? (
                      <div>
                        <dt className="text-blanc/50">{d.productions.duration}</dt>
                        <dd className="mt-1 font-semibold">{duration}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {sourceFile(p.slug) ? (
                    <Link href={href(lang, `${routes.productions}/${p.slug}`)} className="text-link mt-8 inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold">
                      {d.sources.link} <span aria-hidden>→</span>
                    </Link>
                  ) : null}
                  {p.links.length ? (
                    <ul className="mt-8 flex flex-wrap gap-3">
                      {p.links.map((l) => (
                        <li key={l.platform}>
                          <a href={l.url} target="_blank" rel="noopener" className="btn border border-blanc/35 hover:border-blanc">
                            {d.productions.watchOn} {l.platform} <span aria-hidden>↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
