import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useCatalog } from "../useCatalog";
import { CATEGORIES } from "../../../core/data/siteData";
import CatalogCard from "./CatalogCard";
import { usePageMeta } from "../../../core/hooks/usePageMeta";

function CatalogPage() {
  usePageMeta({
    title: "Catalog",
    description:
      "Browse refurbished and new laptops, desktops, mini PCs, workstations, printers, CCTV and accessories available at SR IT Solutions.",
    path: "/catalog",
  });
  const { catalog, loading, error } = useCatalog();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filterRowRef = useRef(null);
  const pendingScrollRef = useRef(false);

  const selectCategory = (name) => {
    if (name === selectedCategory) return;
    setSelectedCategory(name);
    pendingScrollRef.current = true;
  };

  const categories = useMemo(() => {
    const counts = catalog.reduce((acc, item) => {
      if (item.category) acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});

    const known = [...new Set([...CATEGORIES, ...Object.keys(counts)])];

    return [
      { name: "All", count: catalog.length },
      ...known.map((name) => ({ name, count: counts[name] ?? 0 })),
    ];
  }, [catalog]);

  useLayoutEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    const top = filterRowRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollBy({ top, left: 0, behavior: "instant" });
  }, [selectedCategory]);

  const filteredCatalog = useMemo(
    () =>
      selectedCategory === "All"
        ? catalog
        : catalog.filter((item) => item.category === selectedCategory),
    [catalog, selectedCategory],
  );

  return (
    <div className="section-shell py-12 sm:py-16">
      <h1 className="t-display text-ink">Catalog</h1>
      <p className="t-body measure mt-4">
        Every machine is checked before it goes on sale. Message us to confirm
        what&rsquo;s on the shelf today.
      </p>

      <div
        ref={filterRowRef}
        className="hide-scrollbar scroll-fade -mx-1 mt-10 flex items-center gap-2 overflow-x-auto border-y border-line px-1 py-4 pr-10 lg:pr-1 lg:mask-none"
      >
        {categories.map(({ name, count }) => (
          <button
            key={name}
            type="button"
            onClick={() => selectCategory(name)}
            disabled={count === 0}
            className={`chip min-h-11 shrink-0 px-3.5 ${
              selectedCategory === name
                ? "border border-signal-600 bg-signal-600 text-white"
                : count === 0
                  ? "chip-quiet cursor-not-allowed text-slate-light!"
                  : "chip-quiet hover:border-signal-200 hover:text-signal-600"
            }`}
            aria-pressed={selectedCategory === name}
            title={count === 0 ? `No ${name} in stock right now` : undefined}
          >
            {name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="card h-72 animate-pulse bg-line-soft"
              aria-hidden="true"
            />
          ))}
        </div>
      ) : error || filteredCatalog.length === 0 ? (
        <div className="mt-8 border-t border-line py-10 text-center sm:py-16">
          <p className="t-card text-ink">
            {error
              ? "The catalog didn't load"
              : catalog.length === 0
                ? "Nothing in the catalog yet"
                : "Nothing in this category"}
          </p>
          <p className="t-body mx-auto mt-2 max-w-md">
            {error
              ? "Refresh the page, or message us on WhatsApp and we'll tell you what's in stock."
              : catalog.length === 0
                ? "Products will appear here as soon as they're added."
                : "Pick another category to see more."}
          </p>
          {error && <p className="t-micro mt-3 text-slate-light">{error}</p>}
        </div>
      ) : (
        <>
          <p className="t-micro mt-6" role="status" aria-live="polite">
            {filteredCatalog.length}{" "}
            {filteredCatalog.length === 1 ? "product" : "products"}
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCatalog.map((item, index) => (
              <div key={item.id} className="reveal" style={{ "--i": index }}>
                <CatalogCard item={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CatalogPage;
