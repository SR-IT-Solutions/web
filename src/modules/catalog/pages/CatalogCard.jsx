import { Link } from "react-router-dom";

/**
 * Condenses the configuration arrays into the one line a buyer scans:
 * processor · RAM · storage. Falls back to the category when a product
 * has no configuration recorded yet.
 */
function specLine(item) {
  const parts = [
    item.supportedProcessors?.[0],
    item.supportedRams?.[0],
    item.supportedStorage?.[0],
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : item.category;
}

export function CatalogCard({ item, viewMode = "grid" }) {
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
              src={item.image}
              alt=""
              className="zoom h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="t-card text-ink">{item.title}</h3>
          <p className="t-micro mt-1">{spec}</p>
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
      className="card-interactive flex flex-col overflow-hidden"
    >
      <div className="sheen aspect-4/3 overflow-hidden bg-paper">
        {item.image && (
          <img
            src={item.image}
            alt=""
            className="zoom h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="t-card text-ink">{item.title}</h3>
        <p className="t-micro mt-1.5">{spec}</p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line-soft pt-3.5">
          <span className="price">{item.price}</span>
          {item.tag && <span className="chip chip-condition">{item.tag}</span>}
        </div>
      </div>
    </Link>
  );
}

export default CatalogCard;
