import Link from "next/link";
import { brands } from "@/content/brands";
import { href, routes, t, type Locale } from "@/content/i18n";
import { CONTACT_EMAIL } from "@/lib/paths";
import { Wordmark } from "./marks";

export function Footer({ lang }: { lang: Locale }) {
  const d = t(lang);
  const epoques = brands.find((b) => b.slug === "epoques");
  const nav = [
    { label: d.nav.media, to: href(lang, routes.media) },
    { label: d.nav.productions, to: href(lang, routes.productions) },
    { label: d.nav.quiz, to: href(lang, routes.quiz) },
    { label: d.nav.about, to: href(lang, routes.about) },
    { label: d.nav.partners, to: href(lang, routes.partners) },
    { label: d.nav.contact, to: href(lang, routes.contact) },
  ];
  return (
    <footer className="dark-zone relative overflow-hidden border-t border-blanc/10 bg-encre text-blanc">
      <div className="wrap relative pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="h-10 w-auto text-blanc lg:h-14" title="VIRALL" />
            <p className="display-italic mt-5 text-2xl text-blanc/80">{d.footer.tagline}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline mt-8 inline-block text-lg text-blanc">
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="kicker text-blanc/60">{d.footer.navigation}</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link href={n.to} className="link-underline text-blanc/85 hover:text-blanc">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="kicker text-blanc/60">{d.footer.brands}</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {brands.map((b) => (
                  <li key={b.slug}>
                    <Link href={href(lang, `${routes.media}/${b.slug}`)} className="link-underline text-blanc/85 hover:text-blanc">
                      VIRALL {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {epoques && epoques.socials.length > 0 ? (
              <div className="col-span-2 sm:col-span-1">
                <h2 className="kicker text-blanc/60">{d.footer.follow}</h2>
                <ul className="mt-5 space-y-3 text-[0.95rem]">
                  {epoques.socials.map((s) => (
                    <li key={s.platform}>
                      <a href={s.url} rel="noopener" target="_blank" className="link-underline text-blanc/85 hover:text-blanc">
                        {s.platform}
                        <span className="sr-only"> ({lang === "fr" ? "nouvel onglet" : "new tab"})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-blanc/12 pt-8 text-sm text-blanc/55 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 VIRALL. {d.footer.rights}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link className="link-underline hover:text-blanc" href={href(lang, routes.legal)}>{d.footer.legal}</Link></li>
            <li><Link className="link-underline hover:text-blanc" href={href(lang, routes.privacy)}>{d.footer.privacy}</Link></li>
            <li><Link className="link-underline hover:text-blanc" href={href(lang, routes.cookies)}>{d.footer.cookies}</Link></li>
            <li><Link className="link-underline hover:text-blanc" href={`${href(lang, routes.about)}#ia`}>{d.footer.charter}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
