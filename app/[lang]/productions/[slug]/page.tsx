import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrand } from "@/content/brands";
import { href, locales, routes, t, type Locale } from "@/content/i18n";
import { chronological, formatDuration, productionYear, productions } from "@/content/productions";
import {
  checkLabels,
  refAnchor,
  resolveCites,
  sourceFile,
  type CitedSection,
  type Reference,
  type SourceFile,
} from "@/content/sources";
import { JsonLd } from "@/components/json-ld";
import { Picture } from "@/components/picture";
import { ProductionCard } from "@/components/production-card";
import { VideoFacade } from "@/components/video-facade";
import { ReadingProgress } from "@/components/reading-progress";
import { SourceLinks } from "@/components/source-links";
import { domainOf, formatDate } from "@/lib/format";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ lang: Locale; slug: string }> };
type Dict = ReturnType<typeof t>;
type SourcesDict = Dict["sources"];

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

/* ---------- Données dérivées ---------- */

/** Ancres historiques des rubriques (conservées : elles peuvent être citées ailleurs). */
const SECTION_ID: Record<CitedSection, string> = {
  established: "etabli",
  debated: "debattu",
  legend: "legende",
  simplifications: "simplifications",
  reading: "lecture",
  openQuestions: "questions",
};

type Item = { anchor: string; text: string; label?: string; refs: number[] };
type Backlink = { anchor: string; label: string };

function buildSection(
  slug: string,
  s: SourceFile,
  section: Exclude<CitedSection, "reading">,
  lang: Locale,
): Item[] {
  const items = s[section]?.[lang];
  if (!items?.length) return [];
  const refs = resolveCites(slug, s, section, items.length);
  return items.map((text, i) => ({
    anchor: `${SECTION_ID[section]}-${i + 1}`,
    text,
    label: section === "established" ? s.labels?.[lang][i] : undefined,
    refs: [...refs[i]].sort((a, b) => a - b),
  }));
}

const plural = (n: number, [one, many]: readonly string[]) => `${n} ${n > 1 ? many : one}`;
const quote = (lang: Locale, x: string) => (lang === "fr" ? `« ${x} »` : `“${x}”`);

/* ---------- Petits composants ---------- */

function SectionHead({ id, kicker, title, count }: { id: string; kicker?: string; title: string; count?: number }) {
  return (
    <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start xl:col-span-3">
      {kicker ? <p className="rubric mb-2 text-ardoise">{kicker}</p> : null}
      <h2 id={`${id}-t`} className="display text-[clamp(1.6rem,2.4vw,2.05rem)] leading-[1.08]">
        {title}
      </h2>
      {count ? <p className="mt-3 text-sm tabular-nums text-ardoise">{count}</p> : null}
    </div>
  );
}

function Section({
  id,
  title,
  kicker,
  count,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="src-anchor grid gap-6 border-t border-encre/15 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
    >
      <SectionHead id={id} title={title} kicker={kicker} count={count} />
      <div className="min-w-0 lg:col-span-8 xl:col-span-7 xl:col-start-5">{children}</div>
    </section>
  );
}

/** Renvois vers les références, sous une affirmation. */
function Cites({ item, refs, ds }: { item: Item; refs: Reference[]; ds: SourcesDict }) {
  if (!item.refs.length) return null;
  return (
    <p className="mt-2 flex flex-wrap items-baseline text-[0.875rem] text-ardoise">
      <span className="mr-1.5">{ds.sourcesOf}</span>
      {item.refs.map((ri) => (
        <span key={ri} className="inline-flex items-baseline">
          <a
            href={`#${refAnchor(refs[ri], ri)}`}
            data-from={item.anchor}
            title={refs[ri].title}
            aria-label={`${ds.reference} ${ri + 1}${ds.colon}${refs[ri].title}`}
            className="cite-ref"
          >
            {ri + 1}
          </a>
        </span>
      ))}
    </p>
  );
}

function FactList({ items, refs, ds, accent }: { items: Item[]; refs: Reference[]; ds: SourcesDict; accent: string }) {
  return (
    <ol>
      {items.map((it, i) => (
        <li
          key={it.anchor}
          id={it.anchor}
          tabIndex={-1}
          className="src-target grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-t border-encre/10 py-5 first:border-t-0 first:pt-0 sm:grid-cols-[2.75rem_minmax(0,1fr)]"
        >
          <span aria-hidden className="pt-[0.3rem] text-[0.95rem] font-semibold leading-none tabular-nums" style={{ color: accent }}>
            {i + 1}
          </span>
          <div className="min-w-0">
            {it.label ? <h3 className="text-[1rem] font-semibold leading-snug text-encre">{it.label}</h3> : null}
            <p className={`${it.label ? "mt-1 " : ""}serif text-[1.22rem] leading-[1.55] text-encre/90`}>{it.text}</p>
            <Cites item={it} refs={refs} ds={ds} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function NuanceList({ items, refs, ds, marker }: { items: Item[]; refs: Reference[]; ds: SourcesDict; marker: string }) {
  return (
    <ul className="border-l-2 pl-5 sm:pl-7" style={{ borderColor: marker }}>
      {items.map((it) => (
        <li key={it.anchor} id={it.anchor} tabIndex={-1} className="src-target py-3 first:pt-0 last:pb-0">
          <div className="min-w-0">
            <p className="serif text-[1.18rem] leading-[1.55] text-encre/90">{it.text}</p>
            <Cites item={it} refs={refs} ds={ds} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function RefMeta({ r, lang }: { r: Reference; lang: Locale }) {
  const parts = [r.author, r.container, r.year].filter(Boolean);
  if (!parts.length) return null;
  return (
    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ardoise">
      {r.author ? <>{r.author}</> : null}
      {r.author && r.container ? ", " : null}
      {r.container ? <cite className="not-italic">{r.container}</cite> : null}
      {r.year ? <>{r.author || r.container ? ", " : null}{r.year}</> : null}
    </p>
  );
}

function Backlinks({ links, ds }: { links: Backlink[]; ds: SourcesDict }) {
  if (!links.length) return null;
  return (
    <p className="mt-3 text-sm leading-relaxed text-ardoise">
      <span className="text-encre/80">{ds.citedFor}</span>{" "}
      {links.map((l, i) => (
        <span key={l.anchor}>
          {i ? <span aria-hidden> · </span> : null}
          <a href={`#${l.anchor}`} className="text-link hover:text-encre">
            {l.label}
          </a>
        </span>
      ))}
    </p>
  );
}

function ConsultLink({ r, ds, strong }: { r: Reference; ds: SourcesDict; strong?: boolean }) {
  if (!r.url) return <p className="caption mt-3 text-ardoise">{ds.offline}</p>;
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener"
      className={`text-link mt-3 inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-encre ${strong ? "font-semibold" : ""}`}
    >
      {ds.consult}
      <span className="font-normal text-ardoise">{domainOf(r.url)}</span>
      <span aria-hidden>↗</span>
      <span className="sr-only">({ds.newTab})</span>
    </a>
  );
}

function KindTag({ r, ds }: { r: Reference; ds: SourcesDict }) {
  return (
    <span className="caption text-ardoise">{ds.kinds[r.kind]}</span>
  );
}

/* ---------- Page ---------- */

export default async function ProductionSources({ params }: Params) {
  const { lang, slug } = await params;
  const p = productions.find((x) => x.slug === slug);
  const s = sourceFile(slug);
  if (!p || !s) notFound();
  checkLabels(slug, s);
  const d = t(lang);
  const ds = d.sources;
  const brand = getBrand(p.brand);
  const duration = formatDuration(p.durationSec);
  const accent = brand ? `color-mix(in srgb, ${brand.color} 80%, #141B2D)` : "#3557d4";
  // Histoire suivante dans l'ordre chronologique (on revient à la première après la dernière).
  const chrono = chronological().filter((x) => sourceFile(x.slug));
  const nextP = chrono.length > 1 ? chrono[(chrono.findIndex((x) => x.slug === slug) + 1) % chrono.length] : null;
  const others = productions
    .filter((x) => x.slug !== slug && x.slug !== nextP?.slug && sourceFile(x.slug))
    .slice(0, 3);
  // Sans vidéo, l'affiche devient une vignette sur téléphone : mention IA courte (charte : version courte sur les petites images).
  const poster = (
    <Picture id={p.image} lang={lang} fill sizes="(min-width:1024px) 20rem, 16rem" priority shortCaption={!p.youtubeId} />
  );

  const refs = s.references;
  const established = buildSection(slug, s, "established", lang);
  const debated = buildSection(slug, s, "debated", lang);
  const legend = buildSection(slug, s, "legend", lang);
  const simplifications = buildSection(slug, s, "simplifications", lang);
  const openQuestions = buildSection(slug, s, "openQuestions", lang);
  const readingRefs = s.reading ? [...resolveCites(slug, s, "reading", 1)[0]].sort((a, b) => a - b) : [];
  const readingItem: Item | null = s.reading
    ? { anchor: SECTION_ID.reading, text: s.reading[lang], refs: readingRefs }
    : null;

  // Renvois inverses : pour chaque référence, les passages qui la citent.
  const back: Backlink[][] = refs.map(() => []);
  const addBack = (items: Item[], name: string, useLabel = false) =>
    items.forEach((it, i) =>
      it.refs.forEach((ri) => back[ri].push({ anchor: it.anchor, label: useLabel && it.label ? it.label : `${name} ${i + 1}` })),
    );
  addBack(established, ds.short.established, true);
  addBack(debated, ds.short.debated);
  addBack(legend, ds.short.legend);
  addBack(simplifications, ds.short.simplifications);
  addBack(openQuestions, ds.short.openQuestions);
  readingRefs.forEach((ri) => back[ri].push({ anchor: SECTION_ID.reading, label: ds.short.reading }));

  const primaries = refs.filter((r) => r.kind === "primaire").length;
  const highlighted = refs.map((r, i) => ({ r, i })).filter((x) => x.r.highlight);
  const listed = refs.map((r, i) => ({ r, i })).filter((x) => !x.r.highlight);

  const toc = [
    { id: SECTION_ID.established, title: ds.established, n: established.length },
    debated.length && { id: SECTION_ID.debated, title: ds.debated, n: debated.length },
    legend.length && { id: SECTION_ID.legend, title: ds.legend, n: legend.length },
    simplifications.length && { id: SECTION_ID.simplifications, title: ds.simplifications, n: simplifications.length },
    readingItem && { id: SECTION_ID.reading, title: ds.reading, n: 0 },
    openQuestions.length && { id: SECTION_ID.openQuestions, title: ds.openQuestions, n: openQuestions.length },
    { id: "references", title: ds.references, n: refs.length },
  ].filter(Boolean) as { id: string; title: string; n: number }[];

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
    citation: refs.map((r) => ({
      "@type": "CreativeWork",
      name: r.title,
      ...(r.author ? { author: r.author } : {}),
      ...(r.url ? { url: r.url } : {}),
      ...(r.container ? { isPartOf: r.container } : {}),
      ...(r.year ? { datePublished: r.year } : {}),
    })),
  };

  const statusText = (
    <span className={`font-semibold ${s.status === "verified" ? "text-[#1d5b36]" : "text-[#7a4b0c]"}`}>
      {s.status === "verified" ? ds.verified : ds.review.split(".")[0]}
    </span>
  );

  return (
    <>
      <JsonLd data={ld} />
      <ReadingProgress label={ds.progress} color={accent} />
      <SourceLinks label={ds.backToPassage} />

      <header className="bg-blanc pt-28 lg:pt-36">
        <div className="wrap">
          <nav aria-label={ds.kicker} className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-ardoise">
            <Link href={href(lang, routes.productions)} className="text-link hover:text-encre">
              {d.productions.title}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-encre">{ds.kicker}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {brand ? (
                <Link href={href(lang, `${routes.media}/${brand.slug}`)} className="rubric hover:underline" style={{ color: accent }}>
                  VIRALL {brand.name}
                </Link>
              ) : null}
              <h1 className="display mt-2 text-[clamp(2.4rem,5.2vw,4.6rem)]">
                <span className="line-mask">
                  <span>{p.title[lang]}</span>
                </span>
              </h1>
              <p className="dek mt-6 max-w-[36rem] text-encre/85">{p.summary[lang]}</p>
              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-6 border-t border-encre/15 pt-4 text-sm">
                <div>
                  <dt className="text-ardoise">{d.productions.period}</dt>
                  <dd className="mt-1 font-semibold">{p.period[lang]}</dd>
                </div>
                <div>
                  <dt className="text-ardoise">Format</dt>
                  <dd className="mt-1 font-semibold">{p.format === "vertical" ? d.common.vertical : d.common.episode}</dd>
                </div>
                <div>
                  <dt className="text-ardoise">{duration ? d.productions.duration : ds.watch}</dt>
                  <dd className="mt-1 font-semibold">{duration ?? (p.status === "soon" ? d.common.soon : d.common.published)}</dd>
                </div>
              </dl>
              {p.links.length ? (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {p.links.map((l) => (
                    <li key={l.platform}>
                      <a href={l.url} target="_blank" rel="noopener" className="text-link inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-semibold">
                        {d.productions.watchOn} {l.platform} <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <figure
              className={`lg:col-span-4 lg:col-start-9 lg:block ${p.youtubeId ? "" : "flex items-end gap-5"}`}
            >
              <div
                className={`grain relative aspect-[9/16] overflow-hidden bg-encre-2 lg:ml-auto lg:w-full lg:max-w-[17rem] ${
                  p.youtubeId ? "mx-auto w-full max-w-[15rem]" : "w-[7.5rem] shrink-0 sm:w-[8.5rem]"
                }`}
              >
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
                <figcaption className="caption text-ardoise lg:ml-auto lg:mt-3 lg:max-w-[17rem]">{ds.noVideo}</figcaption>
              ) : null}
            </figure>
          </div>

          {/* A. Entrée du dossier : où sont les sources, en un coup d'œil (bandeau entre deux filets, sans encadré) */}
          <section
            aria-labelledby="dossier-t"
            className="mt-14 grid gap-6 border-y-2 border-encre py-8 lg:mt-16 lg:grid-cols-12 lg:gap-10 lg:py-10"
          >
            <div className="lg:col-span-4 xl:col-span-3">
              <p className="rubric text-ardoise">{ds.kicker}</p>
              <h2 id="dossier-t" className="display mt-1 text-[clamp(1.8rem,2.6vw,2.3rem)]">
                {ds.entryTitle}
              </h2>
            </div>
            <div className="lg:col-span-5 xl:col-span-5 xl:col-start-5">
              <p className="dek text-encre/85">
                {/* La promesse « chaque fait renvoie à ses sources » n'est affichée que si le dossier a des renvois. */}
                {s.cites?.established ? ds.entryLead : ds.lead}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ardoise">
                {statusText}
                <span aria-hidden> · </span>
                <span className="text-encre">{plural(refs.length, ds.refCount)}</span>
                {primaries ? (
                  <>
                    {" "}
                    {ds.including} {plural(primaries, ds.primaryCount)}
                  </>
                ) : null}
                <span aria-hidden> · </span>
                <span className="whitespace-nowrap">{ds.updated} <time dateTime={s.updated}>{formatDate(lang, s.updated)}</time></span>
              </p>
            </div>
            <ul className="flex flex-col gap-1 lg:col-span-3 lg:items-end lg:justify-end">
              <li>
                <a href="#references" className="text-link inline-flex min-h-11 items-center gap-2 text-[1.05rem] font-semibold">
                  {ds.seeReferences} <span aria-hidden>↓</span>
                </a>
              </li>
              <li>
                <a href={`#${SECTION_ID.established}`} className="text-link inline-flex min-h-11 items-center gap-2 text-[1.05rem] font-semibold">
                  {ds.checkFacts} <span aria-hidden>↓</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </header>

      <div id="dossier" className="bg-blanc pb-20 pt-8 lg:pb-28">
        <div className="wrap">
          {s.status === "review" ? (
            <p role="note" className="mb-10 max-w-[44rem] border-l-2 border-[#b7791f] pl-5 text-[0.98rem] leading-relaxed text-[#5c3a0a]">
              {ds.review}
            </p>
          ) : null}

          {/* Repères : sommaire en ligne et légende des statuts */}
          <div className="grid gap-6 pb-8 lg:grid-cols-12 lg:gap-10">
            <nav aria-label={ds.inThisFile} className="lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-5">
              <p className="rubric text-ardoise">{ds.inThisFile}</p>
              <ul className="mt-1 flex flex-wrap gap-x-5">
                {toc.map((x) => (
                  <li key={x.id}>
                    <a href={`#${x.id}`} className="text-link inline-flex min-h-11 items-center gap-1.5 text-[0.95rem]">
                      {x.title}
                      {x.n ? <span className="tabular-nums text-ardoise">({x.n})</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
              <details className="src-details mt-2">
                <summary>{ds.statusesTitle}</summary>
                <dl id="statuts" className="src-target mt-2 grid gap-2 text-[0.95rem] leading-relaxed text-encre/80">
                  {ds.statuses.map((x) => (
                    <div key={x.term}>
                      <dt className="inline font-semibold text-encre">{x.term}</dt>
                      <dd className="inline">{ds.colon}{x.text}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </nav>
          </div>

          {/* B. Vérifier une affirmation ou comprendre une nuance */}
          <Section id={SECTION_ID.established} title={ds.established} count={undefined}>
            <FactList items={established} refs={refs} ds={ds} accent={accent} />
          </Section>

          {debated.length ? (
            <Section id={SECTION_ID.debated} title={ds.debated}>
              <NuanceList items={debated} refs={refs} ds={ds} marker="#b7791f" />
            </Section>
          ) : null}

          {legend.length ? (
            <Section id={SECTION_ID.legend} title={ds.legend}>
              <NuanceList items={legend} refs={refs} ds={ds} marker="#8a93a3" />
            </Section>
          ) : null}

          {simplifications.length ? (
            <Section id={SECTION_ID.simplifications} title={ds.simplifications}>
              <NuanceList items={simplifications} refs={refs} ds={ds} marker="color-mix(in srgb, #141B2D 18%, transparent)" />
            </Section>
          ) : null}

          {readingItem ? (
            <Section id={SECTION_ID.reading} title={ds.reading} kicker={ds.readingLabel}>
              <figure className="src-target" tabIndex={-1}>
                <blockquote className="serif border-l-2 pl-5 text-[clamp(1.35rem,2.1vw,1.7rem)] italic leading-[1.4] text-encre sm:pl-7" style={{ borderColor: accent }}>
                  {readingItem.text}
                </blockquote>
                <Cites item={readingItem} refs={refs} ds={ds} />
              </figure>
            </Section>
          ) : null}

          {openQuestions.length ? (
            <Section id={SECTION_ID.openQuestions} title={ds.openQuestions}>
              <NuanceList items={openQuestions} refs={refs} ds={ds} marker="color-mix(in srgb, #141B2D 18%, transparent)" />
            </Section>
          ) : null}
        </div>
      </div>

      {/* C. Consulter les documents et les références : la salle des archives (fond papier, comme un fonds documentaire) */}
      <section id="references" aria-labelledby="references-t" className="src-anchor bg-papier py-16 lg:py-24">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start xl:col-span-3">
            <p className="rubric text-ardoise">{ds.kicker}</p>
            <h2 id="references-t" className="display mt-1 text-[clamp(2rem,3vw,2.6rem)] leading-[1.05]">
              {ds.references}
            </h2>
            <p className="mt-3 text-sm text-ardoise">
              {plural(refs.length, ds.refCount)}
              {primaries ? (
                <>
                  {" "}
                  {ds.including} {plural(primaries, ds.primaryCount)}
                </>
              ) : null}
            </p>
          </div>

          <div className="min-w-0 lg:col-span-8 xl:col-start-5">
            {highlighted.length ? (
              <div className="mb-14">
                <h3 className="rubric text-encre">{ds.keyDocuments}</h3>
                <p className="mt-1 text-[0.95rem] text-ardoise">{ds.keyDocumentsLead}</p>
                <ol className="mt-6 grid gap-x-10 gap-y-12 md:grid-cols-2">
                  {highlighted.map(({ r, i }) => (
                    <li key={refAnchor(r, i)} id={refAnchor(r, i)} tabIndex={-1} className="src-target doc-entry flex flex-col border-t-2 border-encre pt-5">
                      <p className="flex items-baseline justify-between gap-4">
                        <span className="caption text-ardoise">
                          {ds.kinds[r.kind]}
                          {r.year ? `, ${r.year}` : ""}
                        </span>
                        <span className="text-sm tabular-nums text-ardoise">
                          {ds.reference} {i + 1}
                        </span>
                      </p>
                      <p className="display mt-3 text-[1.5rem] leading-[1.15]">{r.title}</p>
                      <RefMeta r={{ ...r, year: undefined }} lang={lang} />
                      {r.note ? <p className="serif mt-4 text-[1.1rem] leading-[1.5] text-encre/85">{r.note[lang]}</p> : null}
                      <div className="mt-auto pt-2">
                        <Backlinks links={back[i]} ds={ds} />
                        <ConsultLink r={r} ds={ds} strong />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {highlighted.length ? <h3 className="rubric text-encre">{ds.allReferences}</h3> : null}
            <ol className={`grid gap-x-10 md:grid-cols-2 ${highlighted.length ? "mt-4" : ""}`}>
              {listed.map(({ r, i }) => (
                <li
                  key={refAnchor(r, i)}
                  id={refAnchor(r, i)}
                  tabIndex={-1}
                  className="src-target grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-t border-encre/20 py-6"
                >
                  <span className="pt-[0.15rem] text-[0.95rem] font-semibold leading-none tabular-nums text-ardoise">{i + 1}</span>
                  <div className="min-w-0">
                    <KindTag r={r} ds={ds} />
                    <p className="serif mt-1 text-[1.18rem] font-semibold leading-snug text-encre">
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener" className="text-link">
                          {quote(lang, r.title)}
                          <span className="sr-only"> ({ds.newTab})</span>
                        </a>
                      ) : (
                        quote(lang, r.title)
                      )}
                    </p>
                    <RefMeta r={r} lang={lang} />
                    {r.note ? <p className="serif mt-2.5 text-[1.05rem] leading-[1.5] text-encre/80">{r.note[lang]}</p> : null}
                    <Backlinks links={back[i]} ds={ds} />
                    {r.url ? (
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-ardoise">
                        <a href={r.url} target="_blank" rel="noopener" className="text-link inline-flex min-h-11 items-center gap-1 font-semibold text-encre">
                          {domainOf(r.url)} <span aria-hidden>↗</span>
                          <span className="sr-only"> ({ds.newTab})</span>
                        </a>
                        {r.accessed ? (
                          <span>
                            {ds.accessed} {formatDate(lang, r.accessed)}
                          </span>
                        ) : null}
                      </p>
                    ) : (
                      <p className="caption mt-2 text-ardoise">{ds.offline}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-10 border-t-2 border-encre pt-8 sm:grid-cols-2">
              <div>
                <h3 className="rubric text-encre">{ds.imagesTitle}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ardoise">{ds.imagesText}</p>
                <Link href={`${href(lang, routes.about)}#ia`} className="text-link mt-2 inline-flex min-h-11 items-center text-sm font-semibold">
                  {ds.imagesMore}
                </Link>
              </div>
              <div>
                <h3 className="rubric text-encre">{ds.errorTitle}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ardoise">{ds.errorText}</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${ds.kicker} : ${p.title[lang]}`)}`}
                  className="text-link mt-2 inline-flex min-h-11 items-center text-sm font-semibold"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {nextP ? (
        <section aria-label={ds.next} className="border-t border-encre/15 bg-blanc">
          <Link href={href(lang, `${routes.productions}/${nextP.slug}`)} className="next-story group block">
            <div className="wrap grid items-center gap-8 py-16 sm:grid-cols-[minmax(0,1fr)_auto] lg:py-24">
              <div>
                <p className="kicker text-ardoise">
                  {ds.next} · {productionYear(nextP)}
                </p>
                <p className="display mt-5 text-[clamp(2.2rem,5vw,4.6rem)]">
                  {nextP.title[lang].split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="whitespace-nowrap">
                    {nextP.title[lang].split(" ").at(-1)}
                    {" "}
                    <span aria-hidden className="btn-arrow inline-block">
                      →
                    </span>
                  </span>
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ardoise">{nextP.summary[lang]}</p>
              </div>
              <div className="grain relative hidden aspect-[3/4] w-48 overflow-hidden rounded-[2px] bg-encre-2 sm:block lg:w-60">
                <Picture id={nextP.image} lang={lang} fill sizes="15rem" shortCaption imgClassName="next-story-img" />
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      {others.length ? (
        <section className="dark-zone bg-encre py-20 text-blanc lg:py-28">
          <div className="wrap">
            <h2 className="display text-[clamp(2rem,4vw,3.2rem)]">{ds.others}</h2>
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
