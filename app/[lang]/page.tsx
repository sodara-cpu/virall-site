import Link from "next/link";
import { brands, getBrand } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { formatDuration, productions } from "@/content/productions";
import { Picture } from "@/components/picture";
import { ProductionCard } from "@/components/production-card";
import { Universes } from "@/components/universes";
import { Numbers } from "@/components/numbers";
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

  const latest = [...productions].reverse().slice(0, 4);
  const [leadStory, ...rail] = latest;

  return (
    <>
      {/* 1. Ouverture photographique : l'image d'abord, un titre de une, une seule action principale */}
      <section className="dark-zone relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-encre text-blanc">
        <div className="grain absolute inset-0">
          <Picture id="hero_ville" lang={lang} fill priority sizes="100vw" imgClassName="slow-push" caption={false} />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,45,.45)_0%,rgba(20,27,45,0)_30%,rgba(20,27,45,.2)_55%,rgba(20,27,45,.9)_100%)]" />
        {/* Sur téléphone, le texte couvre la moitié de l'image : voile plus dense pour la lisibilité */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,45,0)_25%,rgba(20,27,45,.72)_60%)] lg:hidden" />
        <div className="wrap relative pb-10 pt-36 lg:pb-14">
          <p className="rubric text-blanc/85" style={{ animation: "line-in 1s var(--ease-cine) both" }}>
            {h.kicker}
          </p>
          <h1 className="display mt-4 max-w-[15ch] text-[clamp(2.9rem,7vw,6.6rem)]">
            <span className="line-mask">
              <span style={{ ["--d" as string]: "40ms" }}>
                {h.title1} {h.title2} {h.title3}
              </span>
            </span>
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="dek max-w-xl text-blanc/90 lg:col-span-6">{h.subtitle}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-6 lg:justify-end" style={{ animation: "line-in .9s var(--ease-cine) .25s both" }}>
              <Link href="#univers" className="btn bg-blanc text-encre hover:bg-papier">
                {h.ctaUniverses}
                <span aria-hidden className="btn-arrow">↓</span>
              </Link>
              <Link href={href(lang, routes.productions)} className="text-link inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold">
                {h.ctaProductions}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="mt-12 flex items-end justify-between gap-6 border-t border-blanc/25 pt-4 text-[0.8125rem]">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label={d.nav.media}>
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link href={href(lang, `${routes.media}/${b.slug}`)} className="inline-flex min-h-6 items-center font-semibold hover:underline" style={{ color: b.colorLight }}>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="caption hidden text-blanc/70 sm:block">{d.common.aiConceptual}</span>
          </div>
        </div>
      </section>

      {/* 2. Nos univers */}
      <section id="univers" className="scroll-mt-16 bg-blanc py-20 lg:py-32">
        <div className="wrap">
          <div className="grid gap-6 border-b border-encre/15 pb-12 lg:grid-cols-12" data-reveal>
            <div className="lg:col-span-7">
              <p className="rubric text-ardoise">{h.universesKicker}</p>
              <h2 className="display mt-3 text-[clamp(2.3rem,4.6vw,4.2rem)]">{h.universesTitle}</h2>
            </div>
            <p className="dek self-end text-encre/80 lg:col-span-4 lg:col-start-9">{h.universesText}</p>
          </div>
          <div className="mt-12 lg:mt-16">
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

      {/* 3. Productions : une salle de projection. Un récit à la une, les suivants en colonne (composition de presse). */}
      <section className="dark-zone bg-encre py-20 text-blanc lg:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-blanc/20 pb-8" data-reveal>
            <div>
              <p className="rubric text-blanc/75">{h.productionsKicker}</p>
              <h2 className="display mt-3 text-[clamp(2.3rem,4.6vw,4.2rem)]">{h.productionsTitle}</h2>
            </div>
            <Link href={href(lang, routes.productions)} className="text-link inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold">
              {h.productionsAll} <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="dek mt-8 max-w-2xl text-blanc/80">{h.productionsText}</p>
          {leadStory ? (
            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <ProductionCard p={leadStory} lang={lang} lead />
              </div>
              <ol className="lg:col-span-5 lg:border-l lg:border-blanc/15 lg:pl-10">
                {rail.map((p, i) => {
                  const brand = getBrand(p.brand);
                  const duration = formatDuration(p.durationSec);
                  return (
                    <li key={p.slug} className={`border-blanc/15 ${i ? "border-t" : "border-t lg:border-t-0"} py-6 ${i === 0 ? "lg:pt-0" : ""}`} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                      <Link href={href(lang, `${routes.productions}/${p.slug}`)} className="group grid grid-cols-[6.5rem_minmax(0,1fr)] gap-5 sm:grid-cols-[8rem_minmax(0,1fr)]">
                        <span className="grain relative block aspect-[4/5] overflow-hidden bg-encre-2">
                          <Picture id={p.image} lang={lang} fill sizes="8rem" shortCaption />
                        </span>
                        <span>
                          <span className="kicker block opacity-75">
                            {p.category[lang]}, {p.period[lang]}
                          </span>
                          <span className="display mt-2 block text-[1.35rem] leading-[1.1] decoration-1 underline-offset-[0.18em] group-hover:underline">{p.title[lang]}</span>
                          <span className="mt-2 block text-sm opacity-65">
                            {brand ? `VIRALL ${brand.name} · ` : ""}
                            {duration ?? (p.status === "soon" ? d.common.soon : d.common.published)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}
        </div>
      </section>

      {/* 3 bis. Jeu « Vrai ou légende ? » : une affirmation, deux réponses */}
      <section className="bg-blanc py-20 lg:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="rubric text-ardoise">{d.quiz.teaserKicker}</p>
            <h2 className="display mt-3 text-[clamp(2.3rem,4.6vw,4.2rem)]">{d.quiz.teaserTitle}</h2>
            <p className="dek mt-5 max-w-md text-encre/80">{d.quiz.teaserText}</p>
          </div>
          <Link
            href={href(lang, routes.quiz)}
            className="group block border-y border-encre py-10 lg:col-span-6 lg:col-start-7 lg:py-12"
            data-reveal
          >
            <p className="kicker text-ardoise">
              {d.quiz.question} 1 {d.quiz.of} 10
            </p>
            <p className="display mt-5 text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.15]">« {d.quiz.teaserSample} »</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="quiz-choice inline-flex items-center px-6">{d.quiz.true}</span>
              <span className="quiz-choice inline-flex items-center px-6">{d.quiz.myth}</span>
              <span className="text-link ml-auto inline-flex items-center gap-2 text-sm font-semibold">
                {d.quiz.teaserCta}
                <span aria-hidden className="btn-arrow">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Notre vision */}
      <section className="bg-papier py-20 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-6" data-reveal>
            <div className="grain relative aspect-[4/5] overflow-hidden">
              <Picture id="vision_table" lang={lang} fill sizes="(min-width:1024px) 50vw, 100vw" caption={false} />
            </div>
            <figcaption className="caption mt-3 text-ardoise">{d.common.aiConceptual}</figcaption>
          </figure>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
            <p className="rubric text-ardoise" data-reveal>{h.visionKicker}</p>
            <h2 className="display mt-3 text-[clamp(2.3rem,4.4vw,4rem)]" data-reveal>
              {h.visionTitle}
            </h2>
            <p className="dek mt-8 text-encre/90" data-reveal>{h.visionText1}</p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ardoise" data-reveal>{h.visionText2}</p>
            <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {h.values.map((v, i) => (
                <div key={v.title} className="border-t border-encre/15 py-5" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                  <dt className="font-semibold">{v.title}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed text-ardoise">{v.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 5. VIRALL en chiffres : une ligne de faits */}
      <Numbers lang={lang} />

      {/* 6. Partenariats */}
      <section className="dark-zone relative overflow-hidden bg-encre text-blanc">
        <div className="grain absolute inset-0">
          <Picture id="partenariat_tournage" lang={lang} fill sizes="100vw" caption={false} />
        </div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,27,45,.95)_0%,rgba(20,27,45,.88)_48%,rgba(20,27,45,.76)_100%)]" />
        <div className="wrap relative grid gap-14 py-20 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-5" data-reveal>
            <p className="rubric text-blanc/75">{h.partnersKicker}</p>
            <h2 className="display mt-3 text-[clamp(2.3rem,4.4vw,4rem)]">{h.partnersTitle}</h2>
            <p className="dek mt-6 max-w-md text-blanc/85">{h.partnersText}</p>
            <Link href={href(lang, routes.contact)} className="btn mt-10 bg-blanc text-encre hover:bg-papier">
              {h.partnersCta}
              <span aria-hidden className="btn-arrow">→</span>
            </Link>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {d.offers.map((o, i) => (
              <div key={o.title} className="border-t border-blanc/20 py-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <dt className="display text-[1.55rem]">{o.title}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-blanc/75">{o.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="caption absolute bottom-3 right-4 text-[0.8rem] text-blanc/65">{d.common.aiConceptual}</p>
      </section>
    </>
  );
}
