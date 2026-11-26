import { brands } from "@/content/brands";
import { productions } from "@/content/productions";
import { t, type Locale } from "@/content/i18n";

/** Chiffres réels uniquement. Un indicateur sans valeur n'est pas affiché. */
export function Numbers({ lang }: { lang: Locale }) {
  const d = t(lang);
  const platforms = new Set(brands.flatMap((b) => b.socials.map((s) => s.platform)));
  const sum = (k: "followers" | "views") => {
    const vals = brands.map((b) => b.stats[k]).filter((v): v is number => typeof v === "number");
    return vals.length ? vals.reduce((a, b) => a + b, 0) : null;
  };
  const fmt = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { notation: "compact", maximumFractionDigits: 1 });
  const items = [
    { value: brands.length, label: d.numbers.brands },
    { value: brands.filter((b) => b.status === "launch").length, label: d.numbers.activeBrands },
    { value: productions.filter((p) => p.status === "soon").length, label: d.numbers.productions },
    { value: platforms.size, label: d.numbers.platforms },
    { value: sum("followers"), label: d.numbers.followers },
    { value: sum("views"), label: d.numbers.views },
  ].filter((i) => i.value != null && i.value > 0);

  return (
    <section className="bg-brume py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12" data-reveal>
          <p className="kicker text-ardoise lg:col-span-3">{d.home.numbersKicker}</p>
          <h2 className="display text-[clamp(2.2rem,4.4vw,3.8rem)] lg:col-span-8">{d.home.numbersTitle}</h2>
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.label} className="hairline flex flex-col-reverse border-l pl-5 lg:pl-8" data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <dt className="mt-3 max-w-[14ch] text-[0.95rem] text-ardoise">{it.label}</dt>
              <dd className="display text-[clamp(4rem,8vw,7.5rem)] leading-none text-encre">{fmt.format(it.value as number)}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-14 max-w-2xl text-sm text-ardoise">
          {d.home.numbersNote} <span>({d.common.asOf} 24/11/2026)</span>
        </p>
      </div>
    </section>
  );
}
