import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/content/brands";
import { href, locales, routes, t, type Locale } from "@/content/i18n";
import { productions } from "@/content/productions";
import { Picture } from "@/components/picture";
import { ProductionCard } from "@/components/production-card";
import { Reel } from "@/components/marks";
import { JsonLd } from "@/components/json-ld";
import { AmbientVideo } from "@/components/ambient-video";
import { videos } from "@/content/videos";
import { asset, SITE_URL } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => brands.map((b) => ({ lang, slug: b.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  return pageMeta(lang, `${routes.media}/${b.slug}`, `VIRALL ${b.name}`, `${b.tagline[lang]} ${b.mission[lang]}`.slice(0, 300), b.image);
}

export default async function BrandPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();
  const d = t(lang);
  const list = productions.filter((p) => p.brand === b.slug);
  const others = brands.filter((x) => x.slug !== b.slug);
  const stats = [
    { v: b.stats.followers, l: d.numbers.followers },
    { v: b.stats.views, l: d.numbers.views },
  ].filter((s) => s.v != null);
  const status = b.status === "launch" ? d.common.launch : d.common.development;
  const video = b.video ? videos[b.video] : null;

  return (
    <>
      {/* Image signature */}
      <section className="dark-zone relative flex min-h-[88svh] flex-col justify-end overflow-hidden bg-encre text-blanc">
        <div className="grain absolute inset-0">
          <Picture id={b.image} lang={lang} fill priority sizes="100vw" imgClassName="slow-push" captionClassName="!bottom-auto !top-24" />
        </div>
        <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(20,27,45,.35) 0%, rgba(20,27,45,.1) 40%, ${b.color}B3 100%)` }} />
        <div className="wrap relative pb-14 pt-40 lg:pb-20">
          <Link href={href(lang, routes.media)} className="kicker link-underline text-blanc/75">
            ← {d.media.title}
          </Link>
          <img src={asset(b.logoOnDark)} alt={`VIRALL ${b.name}`} width={792} height={300} className="mt-8 h-20 w-auto lg:h-28" />
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <p className="dek italic text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight lg:col-span-8">{b.tagline[lang]}</p>
            <p className="lg:col-span-4 lg:text-right">
              <span className="text-[0.95rem] font-semibold">{status}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Mission, thématiques, formats */}
      <section className="bg-blanc py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="rubric" style={{ color: `color-mix(in srgb, ${b.color} 80%, #141B2D)` }}>{d.media.mission}</p>
            <p className="display mt-4 text-[clamp(1.8rem,3vw,2.7rem)] leading-[1.14]">{b.mission[lang]}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
            {[
              { title: d.media.themes, items: b.themes[lang] },
              { title: d.media.formats, items: b.formats[lang] },
            ].map((g) => (
              <div key={g.title} data-reveal>
                <h2 className="kicker text-ardoise">{g.title}</h2>
                <ul className="mt-4">
                  {g.items.map((it) => (
                    <li key={it} className="hairline border-t py-3 text-[1.02rem]">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie : extrait vidéo réel s'il existe, puis images */}
      {b.gallery.length ? (
        <section className="bg-blanc pb-24 lg:pb-32">
          <div className="wrap grid gap-5 lg:grid-cols-12">
            {(video ? ["__video", ...b.gallery.slice(0, 2)] : b.gallery.slice(0, 3)).map((g, i) => {
              const cls = `grain relative overflow-hidden ${i === 0 ? "aspect-[4/5] lg:col-span-5" : i === 1 ? "aspect-[4/5] lg:col-span-4 lg:mt-24" : "aspect-[4/5] lg:col-span-3 lg:mt-48"}`;
              if (g === "__video" && video)
                return (
                  <figure key={g} data-reveal className={cls}>
                    <AmbientVideo src={video.src} poster={video.poster} label={video.label[lang]} className="h-full w-full" playLabel={d.common.play} pauseLabel={d.common.pause} />
                    <figcaption className="pointer-events-none absolute right-0 top-0 z-10 bg-encre/70 px-2 py-1 text-[0.68rem] leading-tight text-blanc/90">
                      {d.common.excerpt} · {d.common.aiShortReconstitution}
                    </figcaption>
                  </figure>
                );
              return (
                <div key={g} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }} className={cls}>
                  <Picture id={g} lang={lang} fill sizes="(min-width:1024px) 40vw, 100vw" shortCaption />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Productions */}
      <section className="dark-zone bg-encre py-24 text-blanc lg:py-32">
        <div className="wrap">
          <h2 className="display text-[clamp(2.4rem,4.6vw,4.2rem)]" data-reveal>{d.media.latest}</h2>
          {list.length ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((p, i) => (
                <ProductionCard key={p.slug} p={p} lang={lang} delay={i * 80} />
              ))}
            </div>
          ) : (
            <p className="mt-8 max-w-xl text-lg text-blanc/70" data-reveal>{d.media.noProductions}</p>
          )}
        </div>
      </section>

      {/* Réseaux, chiffres, collaboration */}
      <section className="bg-papier py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <h2 className="kicker text-ardoise">{d.media.socials}</h2>
            {b.socials.length ? (
              <ul className="mt-5">
                {b.socials.map((s) => (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noopener" className="hairline group flex items-baseline justify-between border-t py-4">
                      <span className="display text-2xl">{s.platform}</span>
                      <span className="text-sm text-ardoise transition-colors group-hover:text-encre">
                        {s.handle} <span aria-hidden>↗</span>
                        <span className="sr-only"> ({lang === "fr" ? "nouvel onglet" : "new tab"})</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-lg text-ardoise">{d.media.noSocials}</p>
            )}
            <h2 className="kicker mt-14 text-ardoise">{d.media.numbers}</h2>
            {stats.length ? (
              <dl className="mt-5 grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div key={s.l}>
                    <dt className="text-sm text-ardoise">{s.l}</dt>
                    <dd className="display text-5xl">{s.v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-5 text-ardoise">{d.media.noNumbers}</p>
            )}
          </div>
          <div className="relative overflow-hidden p-10 text-blanc lg:col-span-6 lg:col-start-7 lg:p-14" style={{ background: b.color }} data-reveal>
            <h2 className="rubric text-blanc/85">
              {d.media.collaborate} VIRALL {b.name}
            </h2>
            <p className="display relative mt-6 text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.15]">{b.collaboration[lang]}</p>
            <Link href={href(lang, routes.contact)} className="btn relative mt-10 bg-blanc text-encre hover:bg-papier">
              {d.common.contactUs}
              <span aria-hidden className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Autres univers */}
      <nav aria-label={d.media.otherBrands} className="bg-blanc py-16">
        <div className="wrap">
          <h2 className="kicker text-ardoise">{d.media.otherBrands}</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={href(lang, `${routes.media}/${o.slug}`)} className="hairline group flex items-center gap-4 border-t pt-5">
                  <Reel className="h-9 w-9 text-encre" bladeColors={brands.map((x) => (x.slug === o.slug ? o.color : "#141B2D"))} strokeWidth={12} />
                  <span className="display text-2xl transition-colors" style={{ color: undefined }}>
                    <span className="group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{o.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: `VIRALL ${b.name}`,
          url: `${SITE_URL}/${lang}/${routes.media}/${b.slug}/`,
          parentOrganization: { "@id": `${SITE_URL}/#organization` },
          description: b.mission[lang],
          sameAs: b.socials.map((s) => s.url),
        }}
      />
    </>
  );
}
