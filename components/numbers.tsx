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

  // Une ligne de faits, comme le bandeau d'informations d'un musée : pas de tableau de bord.
  return (
    <section aria-labelledby="chiffres-t" className="bg-blanc">
      <div className="wrap">
        <div className="grid gap-6 border-y border-encre/15 py-10 lg:grid-cols-12 lg:items-baseline lg:py-12">
          <h2 id="chiffres-t" className="rubric text-ardoise lg:col-span-3">
            {d.home.numbersKicker}
          </h2>
          <dl className="flex flex-wrap gap-x-10 gap-y-5 lg:col-span-9">
            {items.map((it) => (
              <div key={it.label} className="flex items-baseline gap-3">
                <dt className="order-2 max-w-[11ch] text-[0.95rem] leading-snug text-ardoise">{it.label}</dt>
                <dd className="order-1 display text-[2.4rem] leading-none tabular-nums text-encre">{fmt.format(it.value as number)}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-ardoise lg:col-span-9 lg:col-start-4">
            {d.home.numbersNote} <span>({d.common.asOf} 24/11/2026)</span>
          </p>
        </div>
      </div>
    </section>
  );
}
