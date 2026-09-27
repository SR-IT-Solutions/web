import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cloudinaryImage, cloudinarySrcSet } from "../../../core/utils/cloudinary";

const CARD_SIZES = "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw";

function specLine(item) {
  const parts = [
    item.supportedProcessors?.[0],
    item.supportedRams?.[0],
    item.supportedStorage?.[0],
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : item.category;
}

export function CatalogCard({ item, viewMode = "grid", compact = false }) {
  const spec = specLine(item);

  if (viewMode === "list") {
    return (
      <Link
        to={`/catalog/${item.id}`}
        className="card-interactive flex flex-col gap-4 overflow-hidden p-3 sm:flex-row sm:items-center sm:gap-5"
      >
        <div className="sheen h-44 shrink-0 overflow-hidden rounded-sm bg-paper sm:h-24 sm:w-32">
          {item.image && (
            <img
              src={cloudinaryImage(item.image, 320)}
              srcSet={cloudinarySrcSet(item.image, [320, 480, 640])}
              sizes="(min-width: 640px) 128px, 100vw"
              alt={item.title}
              className="zoom h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="t-card truncate text-ink" title={item.title}>
            {item.title}
          </h3>
          <p className="t-micro mt-1 line-clamp-2" title={spec}>
            {spec}
          </p>
          <p className="t-micro mt-1 line-clamp-1 text-slate-light">
            {item.summary}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center">
          <span className="price">{item.price}</span>
          {item.tag && <span className="chip chip-condition">{item.tag}</span>}
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/catalog/${item.id}`}
      className="card-interactive group flex h-full flex-col overflow-hidden"
    >
      <div className="sheen relative aspect-4/3 overflow-hidden bg-line-soft">
        {item.image && (
          <img
            src={cloudinaryImage(item.image, 640)}
            srcSet={cloudinarySrcSet(item.image, [320, 480, 640, 960])}
            sizes={CARD_SIZES}
            alt={item.title}
            className="zoom h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
        {item.tag && (
          <span
            className={`absolute top-2.5 left-2.5 z-10 max-w-[calc(100%-1.25rem)] truncate rounded-full border border-white/60 bg-white/92 px-2.5 py-1 text-[0.75rem] font-medium text-ink shadow-sm ${
              compact ? "max-sm:hidden" : ""
            }`}
          >
            {item.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3
          className="t-card line-clamp-2 min-h-[2.6em] text-ink"
          title={item.title}
        >
          {item.title}
        </h3>
        <p className="t-micro mt-1.5 line-clamp-1" title={spec}>
          {spec}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="price">{item.price}</span>
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-signal-50 text-signal-600 transition-colors duration-200 group-hover:bg-signal-600 group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CatalogCard;
