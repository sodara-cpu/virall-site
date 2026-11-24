"use client";

import { useId, useState } from "react";
import type { Dict } from "@/content/i18n";

type Field = "name" | "email" | "subject" | "message" | "consent";

/** Formulaire sans serveur : il prépare un e-mail dans la messagerie du visiteur. Rien n'est stocké. */
export function ContactForm({ d, email }: { d: Dict["contact"]; email: string }) {
  const id = useId();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("website") || "")) return; // champ piège anti-robots
    const v = (k: string) => String(f.get(k) || "").trim();
    const err: Partial<Record<Field, string>> = {};
    if (!v("name")) err.name = d.required;
    if (!v("email")) err.email = d.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) err.email = d.invalidEmail;
    if (!v("message")) err.message = d.required;
    if (!f.get("consent")) err.consent = d.required;
    setErrors(err);
    if (Object.keys(err).length) {
      const first = Object.keys(err)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const subject = `[VIRALL] ${v("subject")} : ${v("name")}${v("organisation") ? ` (${v("organisation")})` : ""}`;
    const body = `${v("message")}\n\n${v("name")}\n${v("email")}${v("organisation") ? `\n${v("organisation")}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input =
    "mt-2 w-full rounded-[2px] border border-encre/20 bg-blanc px-4 py-3.5 text-base outline-none transition-colors focus:border-accent aria-[invalid=true]:border-[#B42318]";
  const label = "text-sm font-semibold";
  const errorText = (k: Field) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-1.5 text-sm text-[#B42318]">
        {errors[k]}
      </p>
    ) : null;
  const a = (k: Field) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>{d.name}</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required className={input} {...a("name")} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>{d.email}</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={input} {...a("email")} />
          {errorText("email")}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-org`} className={label}>{d.organisation}</label>
          <input id={`${id}-org`} name="organisation" autoComplete="organization" className={input} />
        </div>
        <div>
          <label htmlFor={`${id}-subject`} className={label}>{d.subject}</label>
          <select id={`${id}-subject`} name="subject" className={input}>
            {d.subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={label}>{d.message}</label>
        <textarea id={`${id}-message`} name="message" rows={6} required className={input} {...a("message")} />
        {errorText("message")}
      </div>
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ardoise">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-accent" {...a("consent")} />
          {d.consent}
        </label>
        {errorText("consent")}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn justify-center bg-encre text-blanc hover:bg-accent">
          {d.send}
          <span aria-hidden className="btn-arrow">→</span>
        </button>
        <p className="text-sm text-ardoise">{d.sendHelp}</p>
      </div>
      <p role="status" className="text-sm">
        {sent ? (
          <>
            {d.sent}{" "}
            <a className="underline" href={`mailto:${email}`}>
              {email}
            </a>
            .
          </>
        ) : null}
      </p>
    </form>
  );
}
