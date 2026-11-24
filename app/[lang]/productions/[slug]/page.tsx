import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrand } from "@/content/brands";
import { href, locales, routes, t, type Locale } from "@/content/i18n";
import { formatDuration, productions } from "@/content/productions";
import { sourceFile, type Reference } from "@/content/sources";
import { JsonLd } from "@/components/json-ld";
import { Picture } from "@/components/picture";
import { ProductionCard } from "@/components/production-card";
import { VideoFacade } from "@/components/video-facade";
import { domainOf, formatDate } from "@/lib/format";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ lang: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    productions
      .filter((p) => sourceFile(p.slug))
      .map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Params) {
  const { lang, slug } = await params;
  const p = productions.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(
    lang,
    `${routes.productions}/${slug}`,
    `${p.title[lang]} · ${t(lang).sources.kicker}`,
    p.summary[lang],
    p.image,
  );
}

function Bullets({ items, marker }: { items: string[]; marker: string }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((x) => (
        <li
          key={x}
          className="grid grid-cols-[1.5rem_1fr] gap-3 text-[1.05rem] leading-relaxed text-encre/85"
        >
          <span
            aria-hidden
            className="mt-[0.62em] h-2 w-2 rounded-[2px]"
            style={{ background: marker }}
          />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="scroll-mt-28 border-t border-encre/12 py-12 first:border-t-0 first:pt-0"
    >
      <h2 id={`${id}-t`} className="display text-[clamp(1.6rem,2.6vw,2.2rem)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Citation({ r, lang, n }: { r: Reference; lang: Locale; n: number }) {
  const d = t(lang).sources;
  const q = lang === "fr" ? ["« ", " »"] : ["“", "”"];
  const title = (
    <span className="font-semibold text-encre">
      {q[0]}
      {r.title}
      {q[1]}
    </span>
  );
  return (
    <li className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-encre/10 py-6 first:border-t-0">
      <span className="pt-[0.2rem] text-sm font-semibold text-ardoise tabular-nums">
        [{n}]
      </span>
      <div>
        <p className="text-[1.02rem] leading-relaxed text-encre/85">
          {r.author ? <>{r.author}, </> : null}
          {r.url ? (
            <a
              href={r.url}
              target="_blank"
              rel="noopener"
              className="link-underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
          {r.container ? (
            <>
              , <cite className="italic">{r.container}</cite>
            </>
          ) : null}
          {r.year ? <>, {r.year}</> : null}.
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ardoise">
          <span className="rounded-full border border-encre/20 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-encre/75">
            {d.kinds[r.kind]}
          </span>
          {r.url ? (
            <a
              href={r.url}
              target="_blank"
              rel="noopener"
              className="hover:text-encre"
            >
              {domainOf(r.url)} <span aria-hidden>↗</span>
            </a>
          ) : null}
          {r.accessed ? (
            <span>
              {d.accessed} {formatDate(lang, r.accessed)}
            </span>
          ) : null}
        </p>
        {r.note ? (
          <p className="mt-2 text-sm text-ardoise">{r.note[lang]}</p>
        ) : null}
      </div>
    </li>
  );
}

export default async function ProductionSources({ params }: Params) {
  const { lang, slug } = await params;
  const p = productions.find((x) => x.slug === slug);
  const s = sourceFile(slug);
  if (!p || !s) notFound();
  const d = t(lang);
  const ds = d.sources;
  const brand = getBrand(p.brand);
  const duration = formatDuration(p.durationSec);
  const accent = brand
    ? `color-mix(in srgb, ${brand.color} 80%, #141B2D)`
    : "#3557d4";
  const others = productions
    .filter((x) => x.slug !== slug && sourceFile(x.slug))
    .slice(0, 3);
  const poster = (
    <Picture
      id={p.image}
      lang={lang}
      fill
      sizes="(min-width:1024px) 30vw, 90vw"
      priority
    />
  );

  const blocks = [
    {
      id: "etabli",
      title: ds.established,
      items: s.established[lang],
      marker: accent,
    },
    s.debated && {
      id: "debattu",
      title: ds.debated,
      items: s.debated[lang],
      marker: "#b7791f",
    },
    s.legend && {
      id: "legende",
      title: ds.legend,
      items: s.legend[lang],
      marker: "#8a93a3",
    },
    s.simplifications && {
      id: "simplifications",
      title: ds.simplifications,
      items: s.simplifications[lang],
      marker: "#5b6474",
    },
  ].filter(Boolean) as {
    id: string;
    title: string;
    items: string[];
    marker: string;
  }[];

  const toc = [
    ...blocks.map((b) => ({ id: b.id, title: b.title })),
    ...(s.reading ? [{ id: "lecture", title: ds.reading }] : []),
    ...(s.openQuestions ? [{ id: "questions", title: ds.openQuestions }] : []),
    { id: "references", title: ds.references },
  ];

  const url = `${SITE_URL}/${lang}/${routes.productions}/${slug}/`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: `${p.title[lang]} · ${ds.kicker}`,
    description: p.summary[lang],
    inLanguage: lang,
    dateModified: s.updated,
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "CreativeWork",
      name: p.title[lang],
      temporalCoverage: p.period[lang],
    },
    citation: s.references.map((r) => ({
      "@type": "CreativeWork",
      name: r.title,
      ...(r.author ? { author: r.author } : {}),
      ...(r.url ? { url: r.url } : {}),
      ...(r.container ? { isPartOf: r.container } : {}),
      ...(r.year ? { datePublished: r.year } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <header className="bg-papier pb-16 pt-32 lg:pb-24 lg:pt-44">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <nav
              aria-label={ds.kicker}
              className="kicker flex flex-wrap items-center gap-2 text-ardoise"
            >
              <Link
                href={href(lang, routes.productions)}
                className="hover:text-encre"
              >
                {d.productions.title}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-encre">{ds.kicker}</span>
            </nav>
            {brand ? (
              <Link
                href={href(lang, `${routes.media}/${brand.slug}`)}
                className="kicker mt-10 inline-flex items-center gap-2"
                style={{ color: accent }}
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-[2px]"
                  style={{ background: brand.color }}
                />
                VIRALL {brand.name}
              </Link>
            ) : null}
            <h1 className="display mt-5 text-[clamp(2.6rem,6vw,5.4rem)]">
              <span className="line-mask">
                <span>{p.title[lang]}</span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ardoise">
              {p.summary[lang]}
            </p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-encre/15 pt-6 text-sm">
              <div>
                <dt className="text-ardoise">{d.productions.period}</dt>
                <dd className="mt-1 font-semibold">{p.period[lang]}</dd>
              </div>
              <div>
                <dt className="text-ardoise">Format</dt>
                <dd className="mt-1 font-semibold">
                  {p.format === "vertical"
                    ? d.common.vertical
                    : d.common.episode}
                </dd>
              </div>
              <div>
                <dt className="text-ardoise">
                  {duration ? d.productions.duration : ds.watch}
                </dt>
                <dd className="mt-1 font-semibold">
                  {duration ??
                    (p.status === "soon" ? d.common.soon : d.common.published)}
                </dd>
              </div>
            </dl>
            {p.links.length ? (
              <ul className="mt-8 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <li key={l.platform}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener"
                      className="btn border border-encre/30 hover:border-encre"
                    >
                      {d.productions.watchOn} {l.platform}{" "}
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="grain relative mx-auto aspect-[9/16] max-w-[19rem] overflow-hidden rounded-[2px] bg-encre-2">
              {p.youtubeId ? (
                <VideoFacade
                  youtubeId={p.youtubeId}
                  title={p.title[lang]}
                  label={d.productions.playVideo}
                  notice={d.productions.consentVideo}
                  poster={poster}
                />
              ) : (
                poster
              )}
            </div>
            {!p.links.length ? (
              <p className="mx-auto mt-4 max-w-[19rem] text-sm text-ardoise">
                {ds.noVideo}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="bg-blanc py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="kicker text-ardoise">{ds.kicker}</p>
              <p className="display mt-4 text-[1.9rem] leading-[1.05]">
                {ds.title}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ardoise">
                {ds.lead}
              </p>
              <p
                className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${s.status === "verified" ? "bg-[#e3f1e8] text-[#1d5b36]" : "bg-[#fbf0dc] text-[#7a4b0c]"}`}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-current"
                />
                {s.status === "verified"
                  ? ds.verified
                  : ds.review.split(".")[0]}
              </p>
              <p className="mt-3 text-sm text-ardoise">
                {ds.updated} {formatDate(lang, s.updated)}
              </p>
              <nav
                aria-label={ds.title}
                className="mt-8 hidden border-t border-encre/12 pt-6 lg:block"
              >
                <ol className="space-y-2.5 text-sm">
                  {toc.map((x) => (
                    <li key={x.id}>
                      <a
                        href={`#${x.id}`}
                        className="text-ardoise hover:text-encre"
                      >
                        {x.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {s.status === "review" ? (
              <p
                role="note"
                className="mb-12 border-l-2 border-[#b7791f] bg-[#fbf0dc]/60 px-5 py-4 text-[0.98rem] leading-relaxed text-[#5c3a0a]"
              >
                {ds.review}
              </p>
            ) : null}

            <div>
              {blocks.map((b) => (
                <Block key={b.id} id={b.id} title={b.title}>
                  <Bullets items={b.items} marker={b.marker} />
                </Block>
              ))}

              {s.reading ? (
                <Block id="lecture" title={ds.reading}>
                  <p
                    className="mt-6 border-l-2 pl-5 text-[1.05rem] leading-relaxed text-encre/85"
                    style={{ borderColor: accent }}
                  >
                    {s.reading[lang]}
                  </p>
                </Block>
              ) : null}

              {s.openQuestions ? (
                <Block id="questions" title={ds.openQuestions}>
                  <Bullets items={s.openQuestions[lang]} marker="#8a93a3" />
                </Block>
              ) : null}

              <Block id="references" title={ds.references}>
                <ol className="mt-4">
                  {s.references.map((r, i) => (
                    <Citation key={r.title} r={r} lang={lang} n={i + 1} />
                  ))}
                </ol>
              </Block>
            </div>

            <div className="mt-6 grid gap-6 border-t border-encre/12 pt-12 sm:grid-cols-2">
              <div className="bg-papier p-6">
                <h2 className="kicker text-encre">{ds.imagesTitle}</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ardoise">
                  {ds.imagesText}
                </p>
                <Link
                  href={`${href(lang, routes.about)}#ia`}
                  className="link-underline mt-4 inline-block text-sm font-semibold"
                >
                  {ds.imagesMore}
                </Link>
              </div>
              <div className="bg-papier p-6">
                <h2 className="kicker text-encre">{ds.errorTitle}</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ardoise">
                  {ds.errorText}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${ds.kicker} : ${p.title[lang]}`)}`}
                  className="link-underline mt-4 inline-block text-sm font-semibold"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {others.length ? (
        <section className="dark-zone bg-encre py-20 text-blanc lg:py-28">
          <div className="wrap">
            <h2 className="display text-[clamp(2rem,4vw,3.2rem)]">
              {ds.others}
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o, i) => (
                <ProductionCard key={o.slug} p={o} lang={lang} delay={i * 90} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
