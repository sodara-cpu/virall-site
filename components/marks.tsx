import { WORDMARK_D } from "./marks-data";

/** Les cinq cartes de la bobine VIRALL, dans l'ordre du logo validé : Époques, Rire, Fiction, Cité, Pro. */
export const BLADE_ANGLES = [12, 84, 156, 228, 300];

type ReelProps = {
  className?: string;
  /** Couleur de chaque carte, dans l'ordre des angles. */
  bladeColors?: string[];
  stroke?: string;
  hub?: string;
  /** Rotation globale de la bobine (degrés). */
  rotate?: number;
  title?: string;
  strokeWidth?: number;
};

/** Bobine VIRALL dessinée à partir des cotes du logo (viewBox 300 × 300). */
export function Reel({ className, bladeColors, stroke = "currentColor", hub, rotate = 0, title, strokeWidth = 7.7 }: ReelProps) {
  const colors = bladeColors ?? BLADE_ANGLES.map(() => "currentColor");
  return (
    <svg viewBox="0 0 300 300" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <circle cx="150" cy="150" r="110" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <g style={{ transform: `rotate(${rotate}deg)`, transformOrigin: "150px 150px", transition: "transform 1.1s var(--ease-cine)" }}>
        <circle cx="150" cy="150" r="17.6" fill={hub ?? stroke} />
        {BLADE_ANGLES.map((a, i) => (
          <rect
            key={a}
            x="133.5"
            y="66.4"
            width="33"
            height="55"
            rx="4.4"
            fill={colors[i]}
            transform={`rotate(${a} 150 150)`}
            style={{ transition: "fill .6s var(--ease-cine)" }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Mot-symbole VIRALL (tracé du logo validé). */
export function Wordmark({ className, title = "VIRALL" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="300 98 612 112" className={className} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true}>
      <path d={WORDMARK_D} fill="currentColor" />
    </svg>
  );
}

/** Logo horizontal : bobine + mot-symbole, la carte d'Époques en couleur d'accent comme sur le logo principal. */
export function Logo({ className, accent = "#3557D4", label = "VIRALL" }: { className?: string; accent?: string; label?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.55em] ${className ?? ""}`} role="img" aria-label={label}>
      <Reel className="h-[1.55em] w-[1.55em]" bladeColors={[accent, "currentColor", "currentColor", "currentColor", "currentColor"]} strokeWidth={14} />
      <Wordmark className="h-[0.95em] w-auto" title="" />
    </span>
  );
}
