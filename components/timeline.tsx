import Link from "next/link";
import { href, routes, t, type Locale } from "@/content/i18n";
import { chronological, productionYear } from "@/content/productions";
import { sourceFile } from "@/content/sources";
import { Picture } from "./picture";

/** Frise chronologique des productions : une colonne par récit, de la plus ancienne à la plus récente. */
export function Timeline({ lang, dark = true }: { lang: Locale; dark?: boolean }) {
  const items = chronological().filter((p) => sourceFile(p.slug));
  if (items.length < 2) return null;
  return (
    <div className={`timeline ${dark ? "timeline-dark text-blanc" : "text-encre"}`}>
      <div className="-mx-5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
        <ol className="timeline-track" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(8.5rem, 1fr))` }}>
          {items.map((p, k) => (
            <li key={p.slug} className="timeline-item" data-reveal style={{ ["--reveal-delay" as string]: `${k * 70}ms` }}>
              <Link href={href(lang, `${routes.productions}/${p.slug}`)} className="group flex h-full flex-col">
                <span className="timeline-card">
                  <span className="grain relative block aspect-[4/5] w-full overflow-hidden bg-encre-2">
                    <Picture
                      id={p.image}
                      lang={lang}
                      fill
                      sizes="(min-width:1024px) 14vw, 9rem"
                      caption={false}
                      imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-cine)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                    />
                  </span>
                  <span className="mt-3 line-clamp-3 block text-[0.85rem] font-medium leading-snug">{p.title[lang]}</span>
                </span>
                <span aria-hidden className="timeline-dot" />
                <span className="display timeline-year mt-4 text-[clamp(1.4rem,2.2vw,2rem)] tabular-nums">{productionYear(p)}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <p className="caption mt-3 opacity-75">{t(lang).common.aiReconstitution}</p>
    </div>
  );
}
