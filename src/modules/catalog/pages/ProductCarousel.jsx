import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCatalog } from "../useCatelog";
import CatalogCard from "./CatalogCard";

function ProductCarousel() {
  const carouselRef = useRef(null);
  const { catalog, loading, error } = useCatalog();

  const products = catalog.slice(0, 8);

  const scrollCarousel = (direction) => {
    carouselRef.current?.scrollBy({
      left: direction * carouselRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  if (!loading && (error || products.length === 0)) return null;

  return (
    <section
      className="section-shell py-12 sm:py-16"
      aria-labelledby="stock-heading"
    >
      <div className="rule-heading flex flex-wrap items-end justify-between gap-4">
        <h2 id="stock-heading" className="t-section text-ink">
          Currently in stock
        </h2>

        <div className={`flex items-center gap-2 ${products.length > 3 ? "" : "sm:[&>button]:hidden"}`}>
          <Link
            to="/catalog"
            className="hidden text-[15px] font-medium text-signal-600 transition hover:text-signal-700 sm:inline-flex sm:items-center sm:gap-1.5"
          >
            See all
            <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-slate transition hover:border-slate-light hover:text-ink sm:inline-flex"
            aria-label="Scroll to previous products"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-slate transition hover:border-slate-light hover:text-ink sm:inline-flex"
            aria-label="Scroll to next products"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className={`mt-8 pb-2 ${
          products.length > 3
            ? "hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto"
            : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="card h-72 min-w-[78vw] animate-pulse bg-line-soft sm:min-w-[260px] lg:min-w-[calc((100%-3rem)/4)]"
                aria-hidden="true"
              />
            ))
          : products.map((product, index) => (
              <div
                key={product.id}
                className={`reveal flex flex-col ${
                  products.length > 3
                    ? "w-[78vw] shrink-0 snap-start sm:w-[280px] lg:w-[calc((100%-3.75rem)/4)]"
                    : ""
                }`}
                style={{ "--i": index }}
              >
                <CatalogCard item={product} viewMode="grid" />
              </div>
            ))}
      </div>

      <Link
        to="/catalog"
        className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-signal-600 sm:hidden"
      >
        See all products
        <ArrowRight size={15} />
      </Link>
    </section>
  );
}

export default ProductCarousel;
