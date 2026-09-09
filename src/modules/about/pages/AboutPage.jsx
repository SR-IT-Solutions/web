import { ShieldCheck, Wrench, Target } from "lucide-react";
import { siteData } from "../../../core/data/siteData";

const values = [
  {
    icon: Target,
    title: "Practical choices",
    text: "We help customers pick equipment that fits their budget, workload, and desk — not the most expensive thing on the shelf.",
  },
  {
    icon: ShieldCheck,
    title: "Checked before sale",
    text: "Used and refurbished machines are tested for dependable everyday performance before they're listed.",
  },
  {
    icon: Wrench,
    title: "Repair support",
    text: "When equipment needs attention, the same store that sold it can also fix it.",
  },
];

function AboutPage() {
  return (
    <div className="section-shell py-12 sm:py-16">
      <h1 className="t-display text-ink">About the store</h1>
      <p className="t-body measure mt-4">
        SR IT Solutions is a computer store in {siteData.brand.location},
        specialising in refurbished and used laptops, desktops, computer
        accessories, and repair services.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {values.map(({ icon: Icon, title, text }) => (
          <article key={title} className="card-interactive p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal-50 text-signal-600">
              <Icon size={17} />
            </span>
            <h2 className="t-card mt-4 text-ink">{title}</h2>
            <p className="t-body mt-2 text-pretty text-[0.9375rem]">{text}</p>
          </article>
        ))}
      </div>

      <div className="card mt-10 grid gap-6 p-7 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <h2 className="t-section text-ink">Find us</h2>
          <p className="t-body mt-3">{siteData.brand.address}</p>
          <p className="t-micro mt-2">{siteData.brand.hours}</p>
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
    </div>
  );
}

export default AboutPage;
