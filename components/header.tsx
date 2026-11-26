"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { href, routes, t, type Locale } from "@/content/i18n";
import { Logo } from "./marks";

const OVERLAY = /^\/(fr|en)\/(medias\/[^/]+\/)?$/; // pages ouvertes par une image plein écran

export function Header({ lang }: { lang: Locale }) {
  const d = t(lang).nav;
  const pathname = usePathname() || `/${lang}/`;
  const path = pathname.replace(process.env.NEXT_PUBLIC_BASE_PATH || "", "") || "/";
  const overlayPage = OVERLAY.test(path);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", k);
    };
  }, [open]);

  const other: Locale = lang === "fr" ? "en" : "fr";
  const switchHref = path.replace(/^\/(fr|en)/, `/${other}`);
  const solid = scrolled || !overlayPage;
  const dark = !solid || open;

  const items = [
    { label: d.media, to: href(lang, routes.media) },
    { label: d.productions, to: href(lang, routes.productions) },
    { label: d.quiz, to: href(lang, routes.quiz) },
    { label: d.about, to: href(lang, routes.about) },
    { label: d.partners, to: href(lang, routes.partners) },
    { label: d.contact, to: href(lang, routes.contact) },
  ];
  const isActive = (to: string) => path.startsWith(to);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        open ? "bg-encre text-blanc" : solid ? "bg-blanc/92 text-encre shadow-[0_1px_0_rgba(20,27,45,.08)] backdrop-blur-md" : "bg-transparent text-blanc"
      } ${dark ? "dark-zone" : ""}`}
    >
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-blanc">
        {d.skip}
      </a>
      <div className="wrap flex h-[4.25rem] items-center justify-between gap-6 lg:h-20">
        <Link href={href(lang)} className="text-[1.35rem] lg:text-[1.55rem]" aria-label={`VIRALL, ${d.home}`}>
          <Logo label="VIRALL" accent={dark ? "#8EA3EE" : "#3557D4"} />
        </Link>

        <nav aria-label={d.menu} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.9rem] font-medium xl:gap-8">
            {items.map((it) => (
              <li key={it.to}>
                <Link href={it.to} aria-current={isActive(it.to) ? "page" : undefined} className={`link-underline py-1 ${isActive(it.to) ? "bg-[length:100%_1px]" : ""}`}>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            className="hidden rounded-full border border-current/25 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] transition-colors hover:border-current/60 sm:inline-flex"
            aria-label={d.switchLang}
          >
            <span className={lang === "fr" ? "opacity-100" : "opacity-45"}>FR</span>
            <span className="mx-1.5 opacity-30">/</span>
            <span className={lang === "en" ? "opacity-100" : "opacity-45"}>EN</span>
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? d.close : d.menu}</span>
            <span aria-hidden className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span aria-hidden className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.25rem] overflow-y-auto bg-encre text-blanc lg:hidden"
      >
        <nav aria-label={d.menu} className="wrap flex min-h-full flex-col justify-between pb-10 pt-8">
          <ul className="space-y-1">
            {[{ label: d.home, to: href(lang) }, ...items].map((it, i) => (
              <li key={it.to} style={{ animation: open ? `line-in .8s var(--ease-cine) ${i * 60}ms both` : undefined }}>
                <Link
                  href={it.to}
                  onClick={() => setOpen(false)}
                  className={`display flex items-baseline justify-between gap-4 py-2 text-[clamp(2.1rem,9vw,2.6rem)] transition-colors ${path === it.to ? "text-accent-clair" : "hover:text-blanc/80"}`}
                  aria-current={path === it.to ? "page" : undefined}
                >
                  {it.label}
                  <span aria-hidden className="kicker text-blanc/35">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={switchHref} hrefLang={other} lang={other} className="kicker mt-10 inline-flex text-blanc/70">
            {d.switchLang}
          </Link>
        </nav>
      </div>
    </header>
  );
}
