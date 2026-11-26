import { href, routes, t, type Locale } from "@/content/i18n";
import { productions } from "@/content/productions";
import { quiz } from "@/content/quiz";
import { sourceFile } from "@/content/sources";
import { PageHeader } from "@/components/page-header";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { Timeline } from "@/components/timeline";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang).quiz;
  return pageMeta(lang, routes.quiz, d.title, d.lead, "prod_formose_trone");
}

export default async function QuizPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const d = t(lang);
  const questions: QuizQuestion[] = quiz
    .map((q) => {
      const p = productions.find((x) => x.slug === q.slug);
      if (!p || !sourceFile(p.slug)) return null;
      return {
        statement: q.statement[lang],
        answer: q.answer,
        explanation: q.explanation[lang],
        storyHref: href(lang, `${routes.productions}/${p.slug}`),
        storyTitle: p.title[lang],
      };
    })
    .filter((x): x is QuizQuestion => x !== null);
  const { kicker, title, lead, ...tx } = d.quiz;

  return (
    <>
      <PageHeader kicker={kicker} title={title} lead={lead} />
      <section className="bg-blanc py-20 lg:py-28">
        <div className="wrap">
          <Quiz questions={questions} tx={tx} />
        </div>
      </section>
      <section className="dark-zone bg-encre py-20 text-blanc lg:py-28">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-12" data-reveal>
            <div className="lg:col-span-7">
              <p className="rubric text-blanc/75">{d.timeline.kicker}</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,4.4vw,3.8rem)]">{d.timeline.title}</h2>
            </div>
            <p className="self-end text-blanc/65 lg:col-span-4 lg:col-start-9">{d.timeline.hint}</p>
          </div>
          <div className="mt-14">
            <Timeline lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
