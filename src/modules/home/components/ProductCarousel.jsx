import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchCatalogFromGoogleSheet } from "../../../core/api/googleSheets";

function ProductCarousel() {
  const carouselRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const catalog = await fetchCatalogFromGoogleSheet();
      setProducts(catalog.slice(0, 8));
    };

    loadProducts();
  }, []);

  const scrollCarousel = (direction) => {
    carouselRef.current?.scrollBy({
      left: direction * carouselRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-shell pt-10 sm:pt-14 lg:pt-16 pb-2 sm:pb-4" aria-labelledby="products-heading">
      <div className="mb-5 sm:mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Featured stock
          </p>
          <h2
            id="products-heading"
            className="fluid-section-title mt-1.5 font-bold text-slate-900"
          >
            Ready for your next setup.
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/catalog"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 transition mr-2"
          >
            Browse all products <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            className="hidden sm:inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
            aria-label="Show previous products"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            className="hidden sm:inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
            aria-label="Show next products"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 -mx-1 px-1"
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/catalog/${product.id}`}
            className="group min-w-[82vw] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[calc((100%-3rem)/4)] snap-start overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-md flex flex-col"
          >
            <div className="relative h-44 overflow-hidden bg-slate-100">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <span className="absolute left-3.5 top-3.5 rounded-full bg-slate-900/85 backdrop-blur-xs px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-xs">
                {product.category}
              </span>
            </div>
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition line-clamp-1">
                    {product.title}
                  </h3>
                  <ArrowUpRight
                    size={17}
                    className="mt-0.5 shrink-0 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {product.summary}
                </p>
              </div>
              <div className="mt-4 text-base sm:text-lg font-bold text-brand-600">
                {product.price}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-2.5 sm:hidden">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition"
        >
          Browse all products <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export default ProductCarousel;
