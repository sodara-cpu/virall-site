"use client";

import { useEffect, useState } from "react";

/** Fine barre de progression de lecture, en haut de l'écran (pages de sources). */
export function ReadingProgress({ label, color }: { label: string; color: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p * 100)}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div className="h-full origin-left" style={{ transform: `scaleX(${p})`, background: color }} />
    </div>
  );
}
