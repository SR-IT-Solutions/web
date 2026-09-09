import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { siteData } from "../../../core/data/siteData";
import { useReveal } from "../../../core/hooks/useReveal";
import desktopsImg from "../../../assets/services/desktops.jpg";
import miniPcsImg from "../../../assets/services/mini-pcs.jpg";
import refurbishedImg from "../../../assets/services/refurbished.jpg";
import accessoriesImg from "../../../assets/services/accessories.jpg";

const serviceImages = {
  desktops: desktopsImg,
  "mini-pcs": miniPcsImg,
  refurbished: refurbishedImg,
  accessories: accessoriesImg,
};
import { useCatalog } from "../../catalog/useCatelog";
import FaqSection from "../components/FaqSection";
import ProductCarousel from "../../catalog/pages/ProductCarousel";

function HomePage() {
  const { catalog } = useCatalog();
  const revealRef = useReveal();

  // Categories that actually have stock, busiest first.
  const categories = [...new Set(catalog.map((item) => item.category))]
    .map((name) => ({
      name,
      count: catalog.filter((item) => item.category === name).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const lead = catalog.find((item) => item.image) ?? null;

  return (
    <div ref={revealRef}>
      <section className="hero-wash relative overflow-hidden border-b border-line">
        <div className="section-shell relative grid items-center gap-10 py-14 sm:py-18 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div>
            <p
              className="reveal inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[13px] font-medium text-white/70"
              style={{ "--i": 0 }}
            >
              <span className="pulse-dot" aria-hidden="true" />
              Open in {siteData.brand.location}
            </p>
            <h1 className="reveal t-display mt-5 text-white" style={{ "--i": 1 }}>
              Computers that are checked, priced fairly, and ready to work.
            </h1>
            <p className="reveal t-body measure mt-5 text-white/62!" style={{ "--i": 2 }}>
              {siteData.brand.tagline}. Walk in to our store, or message us and
              we&rsquo;ll tell you what&rsquo;s in stock today.
            </p>

            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ "--i": 3 }}>
              <Link to="/catalog" className="btn-primary">
                Browse the catalog
                <ArrowRight size={17} />
              </Link>
              <a
                href={siteData.brand.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-glass"
              >
                <MessageCircle size={17} />
                Ask about stock
              </a>
            </div>

            {categories.length > 1 && (
              <div className="reveal mt-9 border-t border-white/10 pt-5" style={{ "--i": 4 }}>
                <p className="t-micro text-white/45!">In the catalog right now</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        to="/catalog"
                        className="chip min-h-9 border border-white/14 bg-white/6 px-3 text-white/80 hover:border-white/30 hover:text-white"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* A real product, not a fabricated dashboard. */}
          {lead && (
            <Link
              to={`/catalog/${lead.id}`}
              className="card-interactive reveal block overflow-hidden border-white/12! bg-white/5! backdrop-blur-sm"
              style={{ "--i": 2 }}
            >
              <div className="sheen aspect-4/3 overflow-hidden bg-white p-6">
                <img
                  src={lead.image}
                  alt=""
                  className="zoom h-full w-full object-contain"
                />
              </div>
              <div className="flex items-end justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="text-[13px] text-white/45">In stock now</p>
                  <h2 className="t-card mt-1 text-white">{lead.title}</h2>
                </div>
                <span className="price shrink-0 text-[#ffb454]!">
                  {lead.price}
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <ProductCarousel />

      <section className="section-shell py-12 sm:py-16">
        <div className="rule-heading" data-reveal>
          <h2 className="t-section text-ink">What we sell and service</h2>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.services.map((service, index) => (
            <article
              key={service.title}
              data-reveal
              style={{ "--i": index }}
              className="card-interactive overflow-hidden"
            >
              <div className="sheen aspect-16/10 overflow-hidden bg-paper">
                <img
                  src={serviceImages[service.image]}
                  alt=""
                  className="zoom h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <h3 className="t-card text-ink">{service.title}</h3>
                <p className="t-body mt-2 text-pretty text-[0.9375rem]">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="section-shell py-12 sm:py-16">
          <div className="rule-heading border-transparent pt-0" data-reveal>
            <h2 className="t-section text-ink">How buying from us works</h2>
          </div>

          {/* Genuinely a sequence, so it is numbered. */}
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.process.map((step, index) => (
              <li
                key={step}
                data-reveal
                style={{ "--i": index }}
                className="card-interactive flex flex-col justify-between p-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal-50 font-display text-[13px] font-bold tabular-nums text-signal-600">
                  {index + 1}
                </span>
                <p className="t-card mt-4 text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}

export default HomePage;
