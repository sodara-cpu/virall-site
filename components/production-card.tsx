import Link from "next/link";
import { getBrand } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { formatDuration, type Production } from "@/content/productions";
import { Picture } from "./picture";

/**
 * Récit dans une liste : l'image d'abord, puis la rubrique, le titre et une ligne d'informations,
 * comme une une de magazine. Aucun texte posé sur l'image, aucun badge. S'adapte au fond (couleur héritée).
 */
export function ProductionCard({
  p,
  lang,
  priority,
  delay = 0,
  lead = false,
}: {
  p: Production;
  lang: Locale;
  priority?: boolean;
  delay?: number;
  /** Récit mis en avant : image plus grande, titre plus fort. */
  lead?: boolean;
}) {
  const d = t(lang);
  const brand = getBrand(p.brand);
  const duration = formatDuration(p.durationSec);
  return (
    <article data-reveal style={{ ["--reveal-delay" as string]: `${delay}ms` }} className="group relative">
      <Link href={href(lang, `${routes.productions}/${p.slug}`)} className="block">
        <div className={`grain relative overflow-hidden bg-encre-2 ${lead ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
          <Picture
            id={p.image}
            lang={lang}
            fill
            priority={priority}
            sizes={lead ? "(min-width: 1024px) 45vw, 90vw" : "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 80vw"}
            imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-cine)] group-hover:scale-[1.035]"
            shortCaption
          />
        </div>
        <p className="kicker mt-5 opacity-75">
          {p.category[lang]}, {p.period[lang]}
        </p>
        <h3
          className={`display mt-2 ${lead ? "text-[clamp(1.9rem,3vw,2.7rem)]" : "text-[1.45rem] lg:text-[1.6rem]"} leading-[1.08] decoration-1 underline-offset-[0.18em] group-hover:underline`}
        >
          {p.title[lang]}
        </h3>
        {lead ? <p className="dek mt-4 max-w-xl opacity-80">{p.summary[lang]}</p> : null}
        <p className="mt-3 text-sm opacity-65">
          {brand ? `VIRALL ${brand.name} · ` : ""}
          {p.format === "vertical" ? d.common.vertical : d.common.episode}
          {duration ? ` · ${duration}` : ""}
          {" · "}
          {p.status === "soon" ? d.common.soon : d.common.published}
        </p>
      </Link>
    </article>
  );
}
