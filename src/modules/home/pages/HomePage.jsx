import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { siteData } from "../../../core/data/siteData";
import { useReveal } from "../../../core/hooks/useReveal";
import { useCatalog } from "../../catalog/useCatelog";
import FaqSection from "../components/FaqSection";
import ProductCarousel from "../../catalog/pages/ProductCarousel";

function HomePage() {
  const { catalog } = useCatalog();
  const revealRef = useReveal();

  // Real counts from the live catalog — no invented figures.
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
        <div className="section-shell relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="reveal t-micro" style={{ "--i": 0 }}>
              <span className="inline-flex items-center gap-2">
                <span className="pulse-dot" aria-hidden="true" />
                Open in {siteData.brand.location}
              </span>
            </p>
            <h1 className="reveal t-display mt-4 text-ink" style={{ "--i": 1 }}>
              Computers that are checked, priced fairly, and ready to work.
            </h1>
            <p className="reveal t-body measure mt-5" style={{ "--i": 2 }}>
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
                className="btn-ok"
              >
                <MessageCircle size={17} />
                Ask about stock
              </a>
            </div>

            {categories.length > 0 && (
              <div className="reveal mt-10 border-t border-line pt-6" style={{ "--i": 4 }}>
                <p className="t-micro">In the catalog right now</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        to="/catalog"
                        className="chip chip-quiet transition hover:border-signal-200 hover:text-signal-600"
                      >
                        {category.name}
                        <span className="text-slate-light">
                          {category.count}
                        </span>
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
              className="card-interactive reveal block overflow-hidden"
              style={{ "--i": 2 }}
            >
              <div className="sheen aspect-[4/3] overflow-hidden bg-paper">
                <img
                  src={lead.image}
                  alt=""
                  className="zoom h-full w-full object-cover"
                />
              </div>
              <div className="flex items-end justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="t-micro">In stock now</p>
                  <h2 className="t-card mt-1 text-ink">{lead.title}</h2>
                </div>
                <span className="price shrink-0">{lead.price}</span>
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

        <div className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.services.map((service, index) => (
            <article key={service.title} data-reveal style={{ "--i": index }}>
              <h3 className="t-card text-ink">{service.title}</h3>
              <p className="t-body mt-2 text-[0.9375rem]">
                {service.description}
              </p>
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
                className="border-t border-line pt-4"
              >
                <span className="t-micro tabular-nums text-slate-light">
                  Step {index + 1}
                </span>
                <p className="t-card mt-1.5 text-ink">{step}</p>
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
