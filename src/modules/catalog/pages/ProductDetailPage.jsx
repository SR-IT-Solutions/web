import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Cpu,
  Gauge,
  MemoryStick,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { fetchCatalogFromGoogleSheet } from "../../../core/api/googleSheets";
import { siteData } from "../../../core/data/siteData";

const defaultOptions = {
  ram: ["8 GB", "16 GB", "32 GB", "64 GB"],
  storage: ["256 GB SSD", "512 GB SSD", "1 TB SSD", "2 TB SSD"],
  processor: ["Intel i5", "Intel i7", "AMD Ryzen 5", "AMD Ryzen 7"],
  condition: ["New", "Refurbished", "Used"],
};

const getProductDetails = (item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  summary: item.summary,
  tag: item.tag,
  price: item.price,
  image: item.image,
  description:
    item.summary ||
    "Built for performance, reliability, and everyday productivity.",
  highlights: [
    "Quality checked before dispatch",
    "Business-ready configuration",
    "Support available on request",
  ],
  specs: [
    { label: "Performance", value: "Business ready" },
    { label: "Warranty", value: "Available" },
    { label: "Delivery", value: "Fast support" },
  ],
  customization: {
    ram: defaultOptions.ram,
    storage: defaultOptions.storage,
    processor: defaultOptions.processor,
    condition: defaultOptions.condition,
  },
});

function ProductDetailPage() {
  const { productId } = useParams();
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConfig, setSelectedConfig] = useState({
    ram: "16 GB",
    storage: "512 GB SSD",
    processor: "Intel i5",
    condition: "New",
  });

  useEffect(() => {
    const loadCatalog = async () => {
      setLoading(true);
      const data = await fetchCatalogFromGoogleSheet();
      setCatalog(data);
      setLoading(false);
    };

    loadCatalog();
  }, []);

  const product = catalog.find((item) => item.id === productId) ?? null;

  if (loading) {
    return (
      <div className="section-shell py-16">
        <div className="h-96 animate-pulse rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-8" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-shell py-16">
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Product not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            The selected product is not available right now.
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            <ArrowLeft size={16} />
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  const details = getProductDetails(product);
  const formatPrice = (basePrice) => {
    if (!basePrice || basePrice === "Custom quote") {
      return "Custom quote";
    }

    return `${basePrice} + upgrades`;
  };

  const productEnquiryMessage = [
    "Hello SR IT SOLUTIONS, I would like to enquire about:",
    `Device: ${details.title}`,
    `Category: ${details.category}`,
    `Processor: ${selectedConfig.processor}`,
    `RAM: ${selectedConfig.ram}`,
    `Storage: ${selectedConfig.storage}`,
    `Condition: ${selectedConfig.condition}`,
    `Listed price: ${details.price}`,
  ].join("\n");
  const productEnquiryHref = `${siteData.brand.whatsappHref.split("?")[0]}?text=${encodeURIComponent(productEnquiryMessage)}`;

  return (
    <div className="section-shell py-8 sm:py-12 lg:py-16">
      <Link
        to="/catalog"
        className="mb-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-600 transition hover:text-brand-700"
      >
        <ArrowLeft size={16} />
        Back to catalog
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xs">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-slate-100">
            {details.image && (
              <img
                src={details.image}
                alt={details.title}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent" />
            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
              <span className="rounded-full bg-slate-900/85 backdrop-blur-xs px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-xs">
                {details.category}
              </span>
              <span className="rounded-full bg-brand-600 px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-xs">
                {details.tag}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              {details.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
              {details.description}
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-3 divide-x divide-slate-200/80 py-4 border-y border-slate-200/80">
              {details.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="px-2 sm:px-4 first:pl-0 last:pr-0 text-center sm:text-left"
                >
                  <div className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.14em] text-slate-500">
                    {spec.label}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm md:text-base font-bold text-slate-900">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Why customers choose this
              </h2>
              <ul className="mt-4 space-y-3">
                {details.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs uppercase font-semibold tracking-[0.2em] text-slate-500">
                Starting from
              </p>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-brand-600">
                {formatPrice(details.price)}
              </div>
            </div>
            <div className="rounded-2xl bg-brand-50 p-2.5 sm:p-3 text-brand-600">
              <ShieldCheck size={22} />
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {Object.entries(details.customization).map(([key, options]) => (
              <div key={key}>
                <div className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
                  {key === "ram" && <MemoryStick size={14} className="text-brand-600" />}
                  {key === "storage" && <Gauge size={14} className="text-brand-600" />}
                  {key === "processor" && <Cpu size={14} className="text-brand-600" />}
                  {key === "condition" && <ShieldCheck size={14} className="text-brand-600" />}
                  {key}
                </div>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSelectedConfig((current) => ({
                          ...current,
                          [key]: option,
                        }))
                      }
                      className={`rounded-xl border px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition ${
                        selectedConfig[key] === option
                          ? "border-brand-600 bg-brand-50 text-brand-700 font-semibold shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Selected configuration:</span>
              <span className="font-bold text-slate-900">
                {selectedConfig.ram} / {selectedConfig.storage}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Processor:</span>
              <span className="font-bold text-slate-900">
                {selectedConfig.processor}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Condition:</span>
              <span className="font-bold text-slate-900">
                {selectedConfig.condition}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>
                window.open(productEnquiryHref, "_blank", "noopener,noreferrer")
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-5 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:scale-[1.01]"
            >
              <MessageCircle size={18} />
              Enquire on WhatsApp
            </button>
            <Link
              to="/contact"
              className="rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-5 py-3 sm:py-3.5 text-center text-sm sm:text-base font-semibold text-slate-700 transition"
            >
              Request custom quote
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ProductDetailPage;
