"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type QuizQuestion = {
  statement: string;
  answer: "true" | "myth";
  explanation: string;
  storyHref: string;
  storyTitle: string;
};

export type QuizTexts = {
  true: string;
  myth: string;
  correct: string;
  wrong: string;
  itWas: string;
  trueWord: string;
  mythWord: string;
  next: string;
  results: string;
  question: string;
  of: string;
  scoreTitle: string;
  scoreLines: string[];
  again: string;
  readStory: string;
};

/** Jeu « Vrai ou légende ? » : une affirmation à la fois, réponse expliquée, score final. */
export function Quiz({ questions, tx }: { questions: QuizQuestion[]; tx: QuizTexts }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<"true" | "myth" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const focusRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const started = useRef(false);

  // Le focus suit la question pour les lecteurs d'écran et le clavier (pas au premier affichage).
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      return;
    }
    focusRef.current?.focus();
  }, [i, done]);

  // Après une réponse, le focus passe au bouton « Question suivante » (les boutons de choix sont désactivés).
  useEffect(() => {
    if (picked) nextRef.current?.focus({ preventScroll: true });
  }, [picked]);

  const q = questions[i];
  const total = questions.length;
  const ok = picked != null && picked === q.answer;

  const choose = (a: "true" | "myth") => {
    if (picked) return;
    setPicked(a);
    if (a === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= total) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  };
  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const ratio = score / total;
    const line = tx.scoreLines[ratio === 1 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0];
    return (
      <div ref={focusRef} tabIndex={-1} className="quiz-card outline-none" aria-live="polite">
        <p className="kicker text-ardoise">{tx.scoreTitle}</p>
        <p className="display mt-4 text-[clamp(4rem,12vw,8rem)] leading-none">
          {score}
          <span className="text-ardoise-clair">/{total}</span>
        </p>
        <div className="mt-6 flex gap-1.5" aria-hidden>
          {questions.map((_, k) => (
            <span key={k} className={`h-1 flex-1 ${k < score ? "bg-accent" : "bg-encre/12"}`} />
          ))}
        </div>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-encre/85">{line}</p>
        <button type="button" onClick={restart} className="btn mt-10 bg-encre text-blanc hover:bg-encre-2">
          {tx.again}
          <span aria-hidden className="btn-arrow">↻</span>
        </button>
      </div>
    );
  }

  return (
    <div ref={focusRef} tabIndex={-1} className="quiz-card outline-none">
      <div className="flex items-center justify-between gap-4">
        <p className="kicker text-ardoise">
          {tx.question} {i + 1} {tx.of} {total}
        </p>
        <p className="kicker text-ardoise tabular-nums" aria-hidden>
          {score} ✓
        </p>
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {questions.map((_, k) => (
          <span key={k} className={`h-[3px] flex-1 transition-colors duration-500 ${k < i ? "bg-encre" : k === i ? "bg-accent" : "bg-encre/12"}`} />
        ))}
      </div>

      <p key={i} className="quiz-statement display mt-10 text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.08]">
        {q.statement}
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-md">
        {(["true", "myth"] as const).map((a) => {
          const state = !picked ? "" : a === q.answer ? "is-answer" : a === picked ? "is-wrong" : "is-dim";
          return (
            <button
              key={a}
              type="button"
              onClick={() => choose(a)}
              aria-pressed={picked === a}
              disabled={!!picked}
              className={`quiz-choice ${state}`}
            >
              {a === "true" ? tx.true : tx.myth}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="min-h-[1px]">
        {picked ? (
          <div className="quiz-feedback mt-10 border-t border-encre/12 pt-8">
            <p className={`kicker ${ok ? "text-[#1d5b36]" : "text-[#9b2c2c]"}`}>
              {ok ? tx.correct : tx.wrong} {tx.itWas} {q.answer === "true" ? tx.trueWord : tx.mythWord}.
            </p>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-encre/85">{q.explanation}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button ref={nextRef} type="button" onClick={next} className="btn bg-encre text-blanc hover:bg-encre-2">
                {i + 1 >= total ? tx.results : tx.next}
                <span aria-hidden className="btn-arrow">→</span>
              </button>
              <Link href={q.storyHref} className="text-sm font-semibold">
                <span className="link-underline">
                  {tx.readStory} : {q.storyTitle}
                </span>{" "}
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
