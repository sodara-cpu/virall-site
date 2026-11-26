"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fait apparaître les éléments [data-reveal] quand ils entrent à l'écran. Sans JavaScript, tout reste visible. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='in'])"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.setAttribute("data-reveal", "in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-reveal", "in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
