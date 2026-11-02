import { ArrowRight, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { siteData } from "../../../core/data/siteData";
import { SITE_URL, usePageMeta } from "../../../core/hooks/usePageMeta";
import { useCatalog } from "../../catalog/useCatalog";
import CatalogCard from "../../catalog/pages/CatalogCard";
import FaqSection from "../../home/components/FaqSection";
import { NEARBY_AREAS } from "../data/servicePages";

const whatsappLink = (text) =>
  `${siteData.brand.whatsappHref.split("?")[0]}?text=${encodeURIComponent(text)}`;

const pageSchemas = (page) => [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: page.breadcrumb, item: `${SITE_URL}${page.path}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.heading,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url: `${SITE_URL}${page.path}`,
    provider: { "@id": `${SITE_URL}/#store` },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      ...NEARBY_AREAS.map((name) => ({ "@type": "Place", name: `${name}, Bengaluru` })),
    ],
  },
];

function LocalServicePage({ page }) {
  usePageMeta({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
  });
  const { catalog } = useCatalog();

  const stock = page.categories
    ? catalog.filter((item) => page.categories.includes(item.category))
    : [];
  const prices = stock.map((item) => item.priceValue).filter((value) => value != null);
  const lowestPrice = prices.length ? Math.min(...prices) : null;

  return (
    <div>
      {pageSchemas(page).map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="section-shell py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="t-micro">
          <Link to="/services" className="transition hover:text-signal-600">
            Services
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{page.breadcrumb}</span>
        </nav>
        <h1 className="t-display mt-3 text-ink">{page.heading}</h1>
        <p className="t-body measure mt-4">{page.intro}</p>
        {lowestPrice != null && (
          <p className="t-body mt-3 font-medium text-ink!">
            {stock.length} in stock, from ₹{lowestPrice.toLocaleString("en-IN")}.
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappLink(page.whatsappText)}
            target="_blank"
            rel="noreferrer"
            className="btn-ok"
          >
            <MessageCircle size={17} />
            Message us on WhatsApp
          </a>
          <a href={siteData.brand.phoneHref} className="btn-secondary">
            <PhoneCall size={17} className="text-signal-600" />
            Call {siteData.brand.phone}
          </a>
        </div>
      </section>

      {stock.length > 0 && (
        <section
          className="section-shell pb-12 sm:pb-16"
          aria-labelledby="page-stock-heading"
        >
          <div className="rule-heading flex flex-wrap items-end justify-between gap-4">
            <h2 id="page-stock-heading" className="t-section text-ink">
              {page.stockTitle}
            </h2>
            <Link
              to="/catalog/"
              className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-signal-600 transition hover:text-signal-700"
            >
              Full catalog
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stock.map((item) => (
              <CatalogCard key={item.id} item={item} viewMode="grid" />
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-line bg-surface">
        <div className="section-shell py-12 sm:py-16">
          <div className="rule-heading border-transparent pt-0">
            <h2 className="t-section text-ink">{page.offersTitle}</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.offers.map(({ title, text }) => (
              <article key={title} className="card p-6">
                <h3 className="t-card text-ink">{title}</h3>
                <p className="t-body mt-2 text-pretty text-[0.9375rem]">{text}</p>
              </article>
            ))}
          </div>

          {page.steps && (
            <>
              <h2 className="t-section mt-12 text-ink">{page.stepsTitle}</h2>
              <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {page.steps.map((step, index) => (
                  <li key={step} className="card flex flex-col p-6">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal-50 font-display text-[13px] font-bold tabular-nums text-signal-600">
                      {index + 1}
                    </span>
                    <p className="t-card mt-4 text-ink">{step}</p>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="card grid gap-6 p-7 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <h2 className="t-section text-ink">Visit the store in Arekere</h2>
            <p className="t-body mt-3 flex gap-2.5">
              <MapPin size={18} className="mt-1 shrink-0 text-signal-600" />
              <span>{siteData.brand.address}</span>
            </p>
            <p className="t-body mt-4">
              Close to {NEARBY_AREAS.slice(1).join(", ")}.
            </p>
            <a
              href={siteData.brand.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-sm border border-line">
            <iframe
              title="SR IT Solutions on Google Maps"
              src={siteData.brand.mapsEmbedHref}
              className="aspect-4/3 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <FaqSection faqs={page.faqs} title={`${page.breadcrumb}: common questions`} />

      <section className="section-shell pb-4">
        <h2 className="t-card text-ink">Also at the store</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {page.related.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="chip chip-quiet min-h-11 px-3.5 transition hover:border-signal-200 hover:text-signal-600"
              >
                {link.label}
                <ArrowRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default LocalServicePage;
