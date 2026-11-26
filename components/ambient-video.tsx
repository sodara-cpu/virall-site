"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/paths";

/** Vidéo d'ambiance muette, lue seulement quand elle est visible et si le visiteur accepte les animations. */
export function AmbientVideo({ src, poster, label, className = "", pauseLabel, playLabel }: { src: string; poster: string; label: string; className?: string; pauseLabel: string; playLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [near, setNear] = useState(false);

  // Charge l'affiche seulement à l'approche de la vidéo
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px" });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUserPaused(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused) v.play().then(() => setPaused(false)).catch(() => setPaused(true));
      else {
        v.pause();
        setPaused(true);
      }
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [userPaused]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().then(() => setPaused(false)).catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video ref={ref} className="absolute inset-0 h-full w-full object-cover" src={asset(src)} poster={near ? asset(poster) : undefined} muted loop playsInline preload="none" aria-label={label} />
      <button type="button" onClick={toggle} className="absolute bottom-0 left-0 z-10 min-h-11 bg-encre/75 px-3 py-1.5 text-xs font-semibold text-blanc hover:bg-encre">
        {paused ? `▶ ${playLabel}` : `❚❚ ${pauseLabel}`}
      </button>
    </div>
  );
}
