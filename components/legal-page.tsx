import { legal } from "@/content/legal";
import { t, type Locale } from "@/content/i18n";
import { PageHeader } from "./page-header";

export function LegalPage({ lang, kind }: { lang: Locale; kind: "legal" | "privacy" | "cookies" }) {
  const d = t(lang).legal;
  const title = kind === "legal" ? d.legalTitle : kind === "privacy" ? d.privacyTitle : d.cookiesTitle;
  return (
    <>
      <PageHeader title={title} lead={d.updated} />
      <div className="bg-blanc py-20 lg:py-28">
        <div className="wrap grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            {legal[kind][lang].map((s) => (
              <section key={s.title} className="hairline border-t py-10">
                <h2 className="display text-3xl">{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 max-w-[68ch] text-[1.05rem] leading-relaxed text-encre/85">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
