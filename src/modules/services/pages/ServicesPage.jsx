import { siteData } from "../../../core/data/siteData";
import { MessageCircle } from "lucide-react";

const serviceCards = [
  {
    title: "Laptops and desktops",
    text: "New, used, and refurbished machines for home, office, and everyday work. Each one is tested before it goes on the shelf.",
  },
  {
    title: "Accessories and peripherals",
    text: "Monitors, keyboards, mice, printers, CCTV equipment, and the parts that finish a setup.",
  },
  {
    title: "Repairs and diagnostics",
    text: "Troubleshooting and repair for laptops, desktops, and related equipment. Bring it in and we'll tell you what's wrong.",
  },
  {
    title: "Business equipment",
    text: "Printers, workstations, and hardware for shops, offices, and local businesses.",
  },
];

function ServicesPage() {
  return (
    <div className="section-shell py-12 sm:py-16">
      <h1 className="t-display text-ink">Services</h1>
      <p className="t-body measure mt-4">
        Hardware, upgrades, and repair support from a store in{" "}
        {siteData.brand.location}.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {serviceCards.map(({ title, text }) => (
          <article key={title} className="card-interactive p-6">
            <h2 className="t-card text-ink">{title}</h2>
            <p className="t-body mt-2.5 text-[0.9375rem]">{text}</p>
          </article>
        ))}
      </div>

      <div className="card mt-10 p-7">
        <h2 className="t-section text-ink">Need something specific?</h2>
        <p className="t-body measure mt-3">
          Tell us the budget and what the machine is for, and we&rsquo;ll say
          what we have that fits.
        </p>
        <a
          href={siteData.brand.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="btn-ok mt-5"
        >
          <MessageCircle size={17} />
          Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default ServicesPage;
