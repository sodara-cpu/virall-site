import { imageInfo } from "@/content/images";
import { t, type Locale } from "@/content/i18n";
import { asset } from "@/lib/paths";

type Props = {
  id: string;
  lang: Locale;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Affiche la mention IA en légende (par défaut : oui si l'image est générée). */
  caption?: boolean;
  captionClassName?: string;
  fill?: boolean;
  /** Mention IA courte, pour les petites images. */
  shortCaption?: boolean;
};

/** Image responsive AVIF/WebP avec mention IA conforme à la charte. */
export function Picture({ id, lang, sizes = "100vw", className = "", imgClassName = "", priority, caption, captionClassName = "", fill, shortCaption }: Props) {
  const info = imageInfo(id);
  if (!info) return <div className={`bg-encre-2 ${className}`} aria-hidden />;
  const src = (w: number, ext: string) => asset(`/img/${id}-${w}.${ext}`);
  const set = (ext: string) => info.widths.map((w) => `${src(w, ext)} ${w}w`).join(", ");
  const largest = info.widths[info.widths.length - 1];
  const d = t(lang).common;
  const label = shortCaption
    ? info.reconstitution ? d.aiShortReconstitution : d.aiShort
    : info.reconstitution ? d.aiReconstitution : info.conceptual ? d.aiConceptual : d.aiImage;
  const showCaption = caption ?? info.ai;
  return (
    <figure className={`${fill ? "absolute inset-0" : "relative"} ${className}`}>
      <picture>
        <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
        <img
          src={src(largest, "webp")}
          width={info.w}
          height={info.h}
          alt={info.alt[lang]}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          className={`${fill ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full"} ${imgClassName}`}
          style={{ objectPosition: info.focal, backgroundImage: `url(${info.blur})`, backgroundSize: "cover" }}
        />
      </picture>
      {showCaption && info.ai ? (
        <figcaption
          className={`pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-encre/55 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-blanc/85 backdrop-blur-sm ${captionClassName}`}
        >
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
