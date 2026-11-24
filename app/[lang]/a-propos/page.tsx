import { routes, t, type Locale } from "@/content/i18n";
import { PageHeader } from "@/components/page-header";
import { Picture } from "@/components/picture";
import { Reel } from "@/components/marks";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).about;
  return pageMeta(lang, routes.about, d.title, `${d.lead} ${d.text1}`, "hero_foule");
}

export default async function About({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).about;
  return (
    <>
      <PageHeader kicker="VIRALL" title={d.title} lead={d.lead} />

      <section className="bg-blanc py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="grain relative aspect-[16/10] overflow-hidden rounded-[2px] lg:col-span-7" data-reveal>
            <Picture id="hero_foule" lang={lang} fill sizes="(min-width:1024px) 58vw, 100vw" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal>
            <p className="display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.18]">{d.text1}</p>
            <p className="mt-8 text-lg leading-relaxed text-ardoise">{d.text2}</p>
          </div>
        </div>
      </section>

      <section className="bg-papier py-24 lg:py-32">
        <div className="wrap">
          <h2 className="display text-[clamp(2.4rem,4.8vw,4.4rem)]" data-reveal>{d.methodTitle}</h2>
          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
            {d.method.map((m, i) => (
              <li key={m.title} className="hairline border-t pt-6 pb-10" data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span className="display text-5xl text-accent">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{m.title}</h3>
                <p className="mt-2 leading-relaxed text-ardoise">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="ia" className="dark-zone relative scroll-mt-20 overflow-hidden bg-encre py-24 text-blanc lg:py-32">
        <Reel className="pointer-events-none absolute -right-24 top-1/2 w-[34rem] -translate-y-1/2 text-blanc/[0.05]" strokeWidth={4} />
        <div className="wrap relative grid gap-12 lg:grid-cols-12">
          <h2 className="display text-[clamp(2.2rem,4.2vw,3.8rem)] lg:col-span-5" data-reveal>{d.aiTitle}</h2>
          <ul className="lg:col-span-6 lg:col-start-7">
            {d.ai.map((a, i) => (
              <li key={a} className="flex gap-5 border-t border-blanc/15 py-6 text-lg leading-relaxed text-blanc/85" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <span className="kicker mt-1.5 text-accent-clair">{String(i + 1).padStart(2, "0")}</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
