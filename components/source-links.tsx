"use client";

import { useEffect, useState } from "react";

/**
 * Parcours entre affirmations et références (pages de sources).
 * - Un clic sur un renvoi (a[data-from]) mémorise le passage de départ et affiche « Revenir au passage ».
 * - Une ancre visée à l'intérieur d'un <details> fermé l'ouvre avant de s'y placer.
 * Sans JavaScript, les ancres fonctionnent normalement (le bouton de retour n'apparaît pas).
 */
export function SourceLinks({ label }: { label: string }) {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    const reveal = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const parent = el.closest("details");
      if (!parent) return;
      for (let d: HTMLDetailsElement | null = parent; d; d = d.parentElement?.closest("details") ?? null) d.open = true;
      // Une fois la partie dépliée, on se replace sur la cible (en tenant compte de l'en-tête fixe).
      requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-from]");
      if (a) setOrigin(a.dataset.from ?? null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOrigin(null);
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", reveal);
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!origin) return null;
  return (
    <a
      href={`#${origin}`}
      onClick={() => {
        // Le navigateur se place sur l'ancre ; on y déplace aussi le focus clavier.
        requestAnimationFrame(() => document.getElementById(origin)?.focus({ preventScroll: true }));
        setOrigin(null);
      }}
      className="fixed bottom-5 left-1/2 z-40 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 bg-encre px-5 py-2.5 text-sm font-semibold text-blanc"
    >
      <span aria-hidden>↑</span> {label}
    </a>
  );
}
