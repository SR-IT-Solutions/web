import { useState } from "react";
import { MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { siteData } from "../../../core/data/siteData";
import { usePageMeta } from "../../../core/hooks/usePageMeta";

const EMPTY = { name: "", contact: "", setup: "", requirements: "" };

function ContactPage() {
  usePageMeta({
    title: "Contact",
    description:
      "Visit or call SR IT Solutions in Arekere, Bengaluru for computer sales, repairs and enquiries. Phone, WhatsApp, and store address.",
    path: "/contact",
  });
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState(null);

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setStatus(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const contact = form.contact.trim();

    if (!name) {
      setStatus({
        type: "error",
        message: "Please add your name so we know who we're talking to.",
      });
      return;
    }

    if (!/^[0-9+\s-]{10,15}$/.test(contact)) {
      setStatus({
        type: "error",
        message: "Please add a phone number we can reach you on (10 digits).",
      });
      return;
    }

    const lines = [
      "Hello SR IT Solutions, I'd like to enquire.",
      `Name: ${name}`,
      `Contact: ${contact}`,
      form.setup.trim() && `Setup: ${form.setup.trim()}`,
      form.requirements.trim() && `Looking for: ${form.requirements.trim()}`,
    ].filter(Boolean);

    const base = siteData.brand.whatsappHref.split("?")[0];
    const opened = window.open(
      `${base}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );

    if (opened) {
      setStatus({ type: "ok", message: "Opening WhatsApp with your enquiry." });
    } else {
      setStatus({
        type: "error",
        message: `Your browser blocked the WhatsApp window. Call us on ${siteData.brand.phone} instead.`,
      });
    }
  };

  const field =
    "w-full rounded-sm border border-line bg-surface px-3.5 py-2.5 text-[15px] text-ink outline-none transition placeholder:text-slate-light focus:border-signal-500";

  return (
    <div className="section-shell py-12 sm:py-16">
      <h1 className="t-display text-ink">Contact</h1>
      <p className="t-body measure mt-4">
        Visit the store in {siteData.brand.location}, call, or send a message
        and we&rsquo;ll reply with what&rsquo;s in stock.
      </p>

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="card p-5 sm:p-7">
          <ul className="space-y-5">
            <li>
              <a
                href={siteData.brand.phoneHref}
                className="flex items-start gap-3 transition hover:text-signal-600"
              >
                <Phone size={18} className="mt-0.5 shrink-0 text-signal-600" />
                <span>
                  <span className="t-micro block">Phone</span>
                  <span className="t-card mt-0.5 block text-ink">
                    {siteData.brand.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={siteData.brand.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 transition hover:text-signal-600"
              >
                <MessageCircle size={18} className="mt-0.5 shrink-0 text-ok" />
                <span>
                  <span className="t-micro block">WhatsApp</span>
                  <span className="t-card mt-0.5 block text-ink">
                    Chat with the store
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={siteData.brand.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 transition hover:text-signal-600"
              >
                <MapPin size={18} className="mt-0.5 shrink-0 text-signal-600" />
                <span>
                  <span className="t-micro block">Store</span>
                  <span className="t-body mt-0.5 block text-[0.9375rem] text-ink">
                    {siteData.brand.address}
                  </span>
                </span>
              </a>
            </li>
          </ul>

          <p className="t-micro mt-6 border-t border-line pt-4">
            {siteData.brand.hours}
          </p>

          <div className="mt-6 overflow-hidden rounded-sm border border-line">
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

        <form onSubmit={handleSubmit} className="card p-5 sm:p-7">
          <h2 className="t-section text-ink">Send an enquiry</h2>
          <p className="t-body mt-2 text-[0.9375rem]">
            This opens WhatsApp with your details filled in.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="t-micro mb-1.5 block text-ink">Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                className={field}
                value={form.name}
                onChange={set("name")}
              />
            </label>
            <label className="block">
              <span className="t-micro mb-1.5 block text-ink">
                Phone or WhatsApp
              </span>
              <input
                type="tel"
                name="tel"
                autoComplete="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                className={field}
                value={form.contact}
                onChange={set("contact")}
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="t-micro mb-1.5 block text-ink">
              What&rsquo;s it for?
            </span>
            <input
              type="text"
              placeholder="Home office, small business, school"
              className={field}
              value={form.setup}
              onChange={set("setup")}
            />
          </label>

          <label className="mt-4 block">
            <span className="t-micro mb-1.5 block text-ink">
              What do you need?
            </span>
            <textarea
              rows="4"
              placeholder="The laptops, desktops, repairs, or accessories you're looking for"
              className={`${field} resize-y`}
              value={form.requirements}
              onChange={set("requirements")}
            />
          </label>

          <button type="submit" className="btn-ok mt-6 w-full sm:w-auto">
            <Send size={16} />
            Send on WhatsApp
          </button>

          <p
            role="status"
            aria-live="polite"
            className={`t-micro mt-3 ${status?.type === "error" ? "text-signal-600" : "text-ok"}`}
          >
            {status?.message ?? ""}
          </p>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
