import Link from "next/link";
import { getBrand } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { formatDuration, type Production } from "@/content/productions";
import { Picture } from "./picture";

export function ProductionCard({ p, lang, priority, delay = 0 }: { p: Production; lang: Locale; priority?: boolean; delay?: number }) {
  const d = t(lang);
  const brand = getBrand(p.brand);
  const duration = formatDuration(p.durationSec);
  return (
    <article data-reveal style={{ ["--reveal-delay" as string]: `${delay}ms` }} className="group relative">
      <Link href={href(lang, `${routes.productions}/${p.slug}`)} className="block">
        <div className="grain relative aspect-[9/14] overflow-hidden rounded-[2px] bg-encre-2">
          <Picture
            id={p.image}
            lang={lang}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 80vw"
            imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.045]"
            captionClassName="!bottom-auto !top-3 !right-3"
            shortCaption
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-encre via-encre/55 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="kicker text-blanc/70">
              {p.category[lang]} · {p.period[lang]}
            </p>
            <h3 className="display mt-3 text-[1.65rem] leading-[1.02] text-blanc lg:text-[1.9rem]">{p.title[lang]}</h3>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-blanc/70">
          <span className="flex items-center gap-2">
            {brand ? <span aria-hidden className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: brand.colorLight }} /> : null}
            <span className="sr-only">{brand ? `VIRALL ${brand.name}, ` : ""}</span>
            {p.format === "vertical" ? d.common.vertical : d.common.episode}
            {duration ? <span className="whitespace-nowrap">· {duration}</span> : null}
          </span>
          <span className="shrink-0 rounded-full border border-blanc/25 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-blanc/85">
            {p.status === "soon" ? d.common.soon : d.common.published}
          </span>
        </div>
      </Link>
    </article>
  );
}
