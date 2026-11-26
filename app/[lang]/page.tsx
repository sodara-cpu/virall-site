import Link from "next/link";
import { brands } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { productions } from "@/content/productions";
import { Picture } from "@/components/picture";
import { ProductionCard } from "@/components/production-card";
import { Universes } from "@/components/universes";
import { Numbers } from "@/components/numbers";
import { Reel } from "@/components/marks";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).meta;
  return pageMeta(lang, "", null, d.description, "hero_ville");
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang);
  const h = d.home;

  return (
    <>
      {/* 1. Hero institutionnel */}
      <section className="dark-zone relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-encre text-blanc">
        <div className="grain absolute inset-0">
          <Picture id="hero_ville" lang={lang} fill priority sizes="100vw" imgClassName="slow-push" caption={false} />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,45,.55)_0%,rgba(20,27,45,.15)_35%,rgba(20,27,45,.35)_60%,rgba(20,27,45,.92)_100%)]" />
        <div className="wrap relative pb-14 pt-36 lg:pb-20">
          <p className="kicker text-blanc/75" style={{ animation: "line-in 1s var(--ease-cine) both" }}>
            {h.kicker}
          </p>
          <h1 className="display mt-6 max-w-[13ch] text-[clamp(3.1rem,9.6vw,9.4rem)]">
            <span className="line-mask">
              <span style={{ ["--d" as string]: "40ms" }}>{h.title1}</span>
            </span>
            <span className="line-mask">
              <span style={{ ["--d" as string]: "120ms" }}>
                <em className="display-italic">{h.title2}</em>
              </span>
            </span>
            <span className="line-mask">
              <span style={{ ["--d" as string]: "200ms" }}>{h.title3}</span>
            </span>
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-blanc/85 lg:col-span-6 lg:text-xl">
              {h.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" style={{ animation: "line-in .9s var(--ease-cine) .25s both" }}>
              <Link href="#univers" className="btn bg-blanc text-encre hover:bg-brume">
                {h.ctaUniverses}
                <span aria-hidden className="btn-arrow">↓</span>
              </Link>
              <Link href={href(lang, routes.productions)} className="btn border border-blanc/40 text-blanc hover:border-blanc hover:bg-blanc/10">
                {h.ctaProductions}
                <span aria-hidden className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-14 flex items-center justify-between border-t border-blanc/20 pt-5 text-xs text-blanc/60">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label={d.nav.media}>
              {brands.map((b) => (
                <li key={b.slug} className="flex items-center gap-2">
                  <span aria-hidden className="h-2 w-2 rounded-[2px]" style={{ background: b.colorLight }} />
                  <Link href={href(lang, `${routes.media}/${b.slug}`)} className="link-underline uppercase tracking-[0.16em] hover:text-blanc">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="hidden sm:block">{d.common.aiConceptual}</span>
          </div>
        </div>
      </section>

      {/* 2. Nos univers */}
      <section id="univers" className="scroll-mt-16 bg-papier py-24 lg:py-36">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12" data-reveal>
            <div className="lg:col-span-7">
              <p className="kicker text-ardoise">{h.universesKicker}</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,5.6vw,5.2rem)]">{h.universesTitle}</h2>
            </div>
            <p className="self-end text-lg leading-relaxed text-ardoise lg:col-span-4 lg:col-start-9">{h.universesText}</p>
          </div>
          <div className="mt-16 lg:mt-24">
            <Universes
              cta={d.common.discover}
              items={brands.map((b) => ({
                slug: b.slug,
                name: b.name,
                domain: b.domain[lang],
                tagline: b.tagline[lang],
                status: b.status === "launch" ? d.common.launch : d.common.development,
                launched: b.status === "launch",
                color: b.color,
                colorLight: b.colorLight,
                bladeAngle: b.bladeAngle,
                href: href(lang, `${routes.media}/${b.slug}`),
                image: <Picture id={b.image} lang={lang} fill sizes="50vw" />,
                imageMobile: (
                  <div className="relative aspect-[16/10]">
                    <Picture id={b.image} lang={lang} fill sizes="100vw" />
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* 3. Dernières productions */}
      <section className="dark-zone relative overflow-hidden bg-encre py-24 text-blanc lg:py-36">
        <Reel className="pointer-events-none absolute -left-[10vw] top-10 w-[38vw] max-w-[520px] text-blanc/[0.04]" strokeWidth={4} />
        <div className="wrap relative">
          <div className="grid gap-8 lg:grid-cols-12" data-reveal>
            <div className="lg:col-span-7">
              <p className="kicker text-blanc/60">{h.productionsKicker}</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,5.6vw,5.2rem)]">{h.productionsTitle}</h2>
            </div>
            <div className="self-end lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-relaxed text-blanc/70">{h.productionsText}</p>
              <Link href={href(lang, routes.productions)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                <span className="link-underline">{h.productionsAll}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="snap-fade -mx-5 mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:mt-20 lg:grid-cols-4 lg:gap-6">
            {[...productions].reverse().slice(0, 4).map((p, i) => (
              <div key={p.slug} className="w-[78vw] shrink-0 snap-start sm:w-auto">
                <ProductionCard p={p} lang={lang} delay={i * 90} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 bis. Jeu « Vrai ou légende ? » */}
      <section className="relative overflow-hidden bg-papier py-24 lg:py-32">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="kicker text-ardoise">{d.quiz.teaserKicker}</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.6vw,5.2rem)]">{d.quiz.teaserTitle}</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ardoise">{d.quiz.teaserText}</p>
          </div>
          <Link
            href={href(lang, routes.quiz)}
            className="quiz-teaser group relative block border border-encre/15 bg-blanc p-8 transition-[transform,box-shadow] duration-700 ease-[var(--ease-cine)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(20,27,45,.45)] lg:col-span-6 lg:col-start-7 lg:p-12"
            data-reveal
          >
            <p className="kicker text-ardoise">
              {d.quiz.question} 1 {d.quiz.of} 10
            </p>
            <p className="display mt-6 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.1]">{d.quiz.teaserSample}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="quiz-choice inline-flex items-center px-6">{d.quiz.true}</span>
              <span className="quiz-choice inline-flex items-center px-6">{d.quiz.myth}</span>
              <span className="ml-auto inline-flex items-center gap-2 text-sm font-semibold">
                <span className="link-underline">{d.quiz.teaserCta}</span>
                <span aria-hidden className="btn-arrow">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Notre vision */}
      <section className="bg-blanc py-24 lg:py-36">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-6" data-reveal>
            <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <Picture id="vision_table" lang={lang} fill sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="kicker text-ardoise" data-reveal>{h.visionKicker}</p>
            <h2 className="display mt-5 text-[clamp(2.4rem,4.8vw,4.4rem)]" data-reveal>
              {h.visionTitle}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-encre/85" data-reveal>{h.visionText1}</p>
            <p className="mt-5 text-lg leading-relaxed text-ardoise" data-reveal>{h.visionText2}</p>
            <ol className="mt-12 grid gap-x-8 sm:grid-cols-2">
              {h.values.map((v, i) => (
                <li key={v.title} className="hairline border-t py-5" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                  <span className="kicker text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ardoise">{v.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 5. VIRALL en chiffres */}
      <Numbers lang={lang} />

      {/* 6. Partenariats */}
      <section className="dark-zone relative overflow-hidden bg-encre text-blanc">
        <div className="grain absolute inset-0">
          <Picture id="partenariat_tournage" lang={lang} fill sizes="100vw" caption={false} />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,27,45,.96)_0%,rgba(20,27,45,.88)_45%,rgba(20,27,45,.55)_100%)]" />
        <div className="wrap relative grid gap-14 py-24 lg:grid-cols-12 lg:py-36">
          <div className="lg:col-span-5" data-reveal>
            <p className="kicker text-blanc/60">{h.partnersKicker}</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.8rem)]">{h.partnersTitle}</h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-blanc/75">{h.partnersText}</p>
            <Link href={href(lang, routes.contact)} className="btn mt-10 bg-blanc text-encre hover:bg-brume">
              {h.partnersCta}
              <span aria-hidden className="btn-arrow">→</span>
            </Link>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {d.offers.map((o, i) => (
              <div key={o.title} className="border-t border-blanc/15 py-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <dt className="display text-2xl">{o.title}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-blanc/65">{o.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="absolute bottom-3 right-4 text-[0.65rem] text-blanc/45">{d.common.aiConceptual}</p>
      </section>
    </>
  );
}
