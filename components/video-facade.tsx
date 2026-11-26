"use client";

import { useState } from "react";

/** Lecteur YouTube chargé seulement au clic (aucun cookie avant action de l'utilisateur). */
export function VideoFacade({ youtubeId, title, label, notice, poster }: { youtubeId: string; title: string; label: string; notice: string; poster: React.ReactNode }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  return (
    <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 text-left">
      {poster}
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-encre/35 p-6 text-center text-blanc transition-colors group-hover:bg-encre/20">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blanc text-encre transition-transform duration-500 group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden>
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </span>
        <span className="text-sm font-semibold">{label}</span>
        <span className="max-w-xs text-xs text-blanc/75">{notice}</span>
      </span>
    </button>
  );
}
