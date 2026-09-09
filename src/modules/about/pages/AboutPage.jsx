import { siteData } from "../../../core/data/siteData";

const values = [
  {
    title: "Practical choices",
    text: "We help customers pick equipment that fits their budget, workload, and desk — not the most expensive thing on the shelf.",
  },
  {
    title: "Checked before sale",
    text: "Used and refurbished machines are tested for dependable everyday performance before they're listed.",
  },
  {
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

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {values.map(({ title, text }) => (
          <article key={title} className="card-interactive p-6">
            <h2 className="t-card text-ink">{title}</h2>
            <p className="t-body mt-2.5 text-[0.9375rem]">{text}</p>
          </article>
        ))}
      </div>

      <div className="card mt-10 p-7">
        <h2 className="t-section text-ink">Find us</h2>
        <p className="t-body measure mt-3">{siteData.brand.address}</p>
        <p className="t-micro mt-2">{siteData.brand.hours}</p>
        <a
          href={siteData.brand.mapsHref}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary mt-5"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default AboutPage;
