import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Filter, Grid2X2, List, Search } from "lucide-react";
import { fetchCatalogFromGoogleSheet } from "../../../core/api/googleSheets";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Desktop Computers",
  "Mini PCs",
  "Refurbished",
  "Accessories",
  "Peripherals",
  "Power Solutions",
];

function CatalogCard({ item, viewMode }) {
  if (viewMode === "list") {
    return (
      <Link
        to={`/catalog/${item.id}`}
        className="group flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm sm:flex-row sm:items-center"
      >
        <div className="relative h-44 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 sm:h-28 sm:w-44">
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              {item.category}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              {item.tag}
            </span>
          </div>
          <h3 className="mt-2 text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600">
            {item.summary}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
          <span className="text-base sm:text-lg font-bold text-brand-600">
            {item.price}
          </span>
          <ArrowUpRight
            size={18}
            className="text-slate-400 group-hover:text-brand-600 sm:ml-auto sm:mt-2 transition"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/catalog/${item.id}`}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent" />
        <div className="absolute inset-x-3.5 top-3.5 flex items-start justify-between gap-2">
          {/* <span className="rounded-full bg-slate-900/85 backdrop-blur-xs px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-xs">
            {item.category}
          </span> */}
          {/* <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-xs">
            {item.tag}
          </span> */}
        </div>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition line-clamp-1">
            {item.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
            {item.summary}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <span className="text-base sm:text-lg font-bold text-brand-600">
            {item.price}
          </span>
          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition group-hover:bg-brand-50 group-hover:text-brand-600">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}

function CatalogPage() {
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatalog = async () => {
      setLoading(true);
      const data = await fetchCatalogFromGoogleSheet();
      setCatalog(data);
      setLoading(false);
    };

    loadCatalog();
  }, []);

  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        [item.title, item.summary, item.category]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [catalog, search, selectedCategory]);

  const featuredItems = filteredCatalog
    .filter((item) => item.featured)
    .slice(0, 3);

  return (
    <div className="catalog-page section-shell py-10 sm:py-14 lg:py-18">
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Catalog
          </p>
          <h1 className="catalog-display mt-2 max-w-4xl font-extrabold text-slate-900">
            Computer products, accessories and refurbished deals.
          </h1>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xs md:mb-10 md:flex-row md:items-center md:justify-between">
        {/* <div className="flex min-h-11 flex-1 items-center gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 sm:gap-3 sm:px-4 sm:py-2.5 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition">
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, processors, categories..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div> */}

        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 sm:flex-wrap sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
          {/* <Filter
            size={15}
            className="shrink-0 text-slate-400 hidden sm:inline"
          /> */}
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`min-h-9 sm:min-h-10 shrink-0 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-brand-600 text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex w-full shrink-0 items-center rounded-full border border-slate-200 bg-slate-100/80 p-1 sm:w-auto">
          {[
            { label: "Grid", value: "grid", icon: Grid2X2 },
            { label: "List", value: "list", icon: List },
          ].map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setViewMode(value)}
              className={`inline-flex min-h-8 sm:min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold transition sm:flex-none ${
                viewMode === value
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-label={`${label} catalog view`}
              aria-pressed={viewMode === value}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {featuredItems.length > 0 && (
        <div
          className={
            viewMode === "grid"
              ? "mb-8 sm:mb-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "mb-8 sm:mb-10 space-y-4"
          }
        >
          {featuredItems.map((item) =>
            viewMode === "list" ? (
              <CatalogCard key={item.id} item={item} viewMode="list" />
            ) : (
              <Link
                key={item.id}
                to={`/catalog/${item.id}`}
                className="rounded-2xl sm:rounded-3xl border border-brand-200/80 bg-linear-to-br from-brand-50/60 via-white to-slate-50 p-5 sm:p-6 shadow-xs hover:border-brand-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3 inline-flex rounded-full bg-brand-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">
                    {item.tag}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between pt-2 border-t border-brand-100">
                  <span className="text-base sm:text-lg font-bold text-brand-600">
                    {item.price}
                  </span>
                  <ArrowUpRight size={18} className="text-brand-600" />
                </div>
              </Link>
            ),
          )}
        </div>
      )}

      {loading ? (
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      ) : filteredCatalog.length === 0 ? (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No catalog items match your search yet.
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }
        >
          {filteredCatalog.map((item) => (
            <CatalogCard key={item.id} item={item} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
