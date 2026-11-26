"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reel } from "./marks";

export type UniverseItem = {
  slug: string;
  name: string;
  domain: string;
  tagline: string;
  status: string;
  launched: boolean;
  color: string;
  colorLight: string;
  bladeAngle: number;
  href: string;
  /** Image rendue côté serveur (composant Picture). */
  image: ReactNode;
  imageMobile: ReactNode;
};

/** Section « Nos univers » : la bobine tourne pour présenter la marque active. */
export function Universes({ items, cta }: { items: UniverseItem[]; cta: string }) {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const idx = Number((visible[0].target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const current = items[active];
  const rotation = 12 - current.bladeAngle;
  const bladeColors = items.map((it, i) => (i === active ? it.color : "#141B2D"));

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-encre">
            {items.map((it, i) => (
              <div
                key={it.slug}
                className="grain absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-cine)]"
                style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.04)" }}
                aria-hidden={i !== active}
              >
                {it.image}
              </div>
            ))}
          </div>
          {/* Légende de l'image : la bobine signale la marque présentée (la carte de la marque se colore). */}
          <p className="mt-4 flex items-center gap-3">
            <Reel className="h-8 w-8" bladeColors={bladeColors} rotate={rotation} strokeWidth={12} title="" />
            <span className="rubric text-encre">VIRALL {current.name}</span>
          </p>
        </div>
      </div>

      <ol className="lg:col-span-6 lg:pl-6">
        {items.map((it, i) => (
          <li
            key={it.slug}
            ref={(el) => {
              rows.current[i] = el;
            }}
            data-index={i}
            className="hairline border-t py-9 last:border-b lg:py-14"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <Link href={it.href} className="group block">
              <div className="mb-6 overflow-hidden lg:hidden">{it.imageMobile}</div>
              <p className="kicker">
                <span style={{ color: `color-mix(in srgb, ${it.color} 80%, #141B2D)` }}>{it.domain}</span>
                <span className="text-ardoise"> · {it.status}</span>
              </p>
              <h3 className="display mt-3 text-[clamp(2.8rem,6vw,5.2rem)] transition-colors duration-500" style={{ color: i === active ? it.color : undefined }}>
                {it.name}
              </h3>
              <p className="dek mt-3 max-w-md text-encre/80">{it.tagline}</p>
              <span className="text-link mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                {cta} VIRALL {it.name}
                <span aria-hidden className="btn-arrow transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
