import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useCatalog } from "../useCatelog";
import { siteData } from "../../../core/data/siteData";

const CONDITIONS = ["New", "Refurbished", "Used"];

const CONFIG_LABELS = {
  processor: "Processor",
  ram: "Memory",
  storage: "Storage",
  condition: "Condition",
};

function ProductDetailPage() {
  const { productId } = useParams();
  const { catalog, loading, error } = useCatalog();

  const [activeImage, setActiveImage] = useState(0);
  const [config, setConfig] = useState({
    processor: "",
    ram: "",
    storage: "",
    condition: "",
  });

  const product = catalog.find((item) => item.id === productId) ?? null;

  // Only offer options the shop actually recorded for this product.
  const options = {
    processor: product?.supportedProcessors ?? [],
    ram: product?.supportedRams ?? [],
    storage: product?.supportedStorage ?? [],
    condition: CONDITIONS,
  };

  // Keyed on the id, not the product object: `catalog.find()` returns a new
  // reference every render, which would re-fire this effect forever.
  useEffect(() => {
    const match = catalog.find((item) => item.id === productId);
    if (!match) return;
    setActiveImage(0);
    setConfig({
      processor: match.supportedProcessors?.[0] ?? "",
      ram: match.supportedRams?.[0] ?? "",
      storage: match.supportedStorage?.[0] ?? "",
      condition: CONDITIONS[0],
    });
  }, [productId, catalog]);

  if (loading) {
    return (
      <div className="section-shell py-16">
        <div className="card h-96 animate-pulse bg-line-soft" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section-shell py-20 text-center">
        <h1 className="t-section text-ink">Product not found</h1>
        <p className="t-body mx-auto mt-3 max-w-md">
          It may have been sold or removed from the catalog.
        </p>
        <Link to="/catalog" className="btn-primary mt-6">
          <ArrowLeft size={16} />
          Back to catalog
        </Link>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];

  const enquiry = [
    `Hello SR IT Solutions, I'd like to enquire about ${product.title}.`,
    config.processor && `Processor: ${config.processor}`,
    config.ram && `Memory: ${config.ram}`,
    config.storage && `Storage: ${config.storage}`,
    config.condition && `Condition: ${config.condition}`,
    `Listed price: ${product.price}`,
  ]
    .filter(Boolean)
    .join("\n");

  const enquiryHref = `${siteData.brand.whatsappHref.split("?")[0]}?text=${encodeURIComponent(enquiry)}`;

  return (
    <div className="section-shell py-10 sm:py-14">
      <Link
        to="/catalog"
        className="inline-flex items-center gap-1.5 text-[15px] font-medium text-signal-600 transition hover:text-signal-700"
      >
        <ArrowLeft size={16} />
        Catalog
      </Link>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="card aspect-[4/3] overflow-hidden bg-paper">
            {images[activeImage] && (
              <img
                src={images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {images.length > 1 && (
            <div className="hide-scrollbar mt-3 flex gap-2.5 overflow-x-auto">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-[8px] border-2 transition sm:h-20 sm:w-20 ${
                    index === activeImage
                      ? "border-signal-600"
                      : "border-line opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Image ${index + 1} of ${images.length}`}
                  aria-pressed={index === activeImage}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="t-micro">{product.category}</p>
          <h1 className="t-section mt-1.5 text-ink">{product.title}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="price !text-[1.5rem]">{product.price}</span>
            {product.tag && (
              <span className="chip chip-condition">{product.tag}</span>
            )}
          </div>

          <p className="t-body measure mt-5">{product.summary}</p>

          <div className="mt-8 space-y-6 border-t border-line pt-6">
            {Object.entries(options).map(([key, values]) => {
              if (!values.length) return null;
              return (
                <div key={key}>
                  <p className="t-micro text-ink">{CONFIG_LABELS[key]}</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {values.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setConfig((current) => ({ ...current, [key]: value }))
                        }
                        className={`chip min-h-9 px-3.5 transition ${
                          config[key] === value
                            ? "border border-signal-600 bg-signal-50 text-signal-700"
                            : "chip-quiet hover:border-slate-light"
                        }`}
                        aria-pressed={config[key] === value}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <a
              href={enquiryHref}
              target="_blank"
              rel="noreferrer"
              className="btn-ok w-full sm:w-auto"
            >
              <MessageCircle size={17} />
              Ask about this on WhatsApp
            </a>
            <p className="t-micro mt-3">
              Your selected configuration is included in the message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
