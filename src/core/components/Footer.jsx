import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Phone, Tag } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { siteData } from "../data/siteData";
import logoImg from "../../assets/logo.png";

const quickLinks = [
  { to: "/catalog", label: "Product catalog" },
  { to: "/services", label: "Services & repairs" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact & store location" },
];

const channels = [
  {
    href: siteData.brand.instagramHref,
    label: "Instagram",
    icon: SiInstagram,
  },
  {
    href: siteData.brand.facebookHref,
    label: "Facebook Marketplace",
    icon: SiFacebook,
  },
  { href: siteData.brand.olxHref, label: "OLX", icon: Tag },
];

function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_1.1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img
              src={logoImg}
              alt=""
              width="44"
              height="44"
              className="h-11 w-11 shrink-0 object-contain"
            />
            <span className="leading-none">
              <span className="block font-display text-base font-bold tracking-tight text-ink">
                SR IT Solutions
              </span>
              <span className="mt-1 block text-[11px] text-slate">
                Arekere, Bengaluru
              </span>
            </span>
          </div>
          <p className="t-body measure">
            Refurbished and used laptops, desktops, accessories, and computer
            repair services.
          </p>
          <p className="t-micro mt-4">GST {siteData.brand.gstNo}</p>
        </div>

        <div>
          <h2 className="font-display text-[15px] font-semibold text-ink">
            Browse
          </h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-[15px] text-slate transition hover:text-signal-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-[15px] font-semibold text-ink">
            Visit or get in touch
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                className="flex items-center gap-2.5 text-[15px] text-slate transition hover:text-signal-600"
                href={siteData.brand.phoneHref}
              >
                <Phone size={16} className="shrink-0 text-signal-600" />
                <span className="font-medium text-ink">
                  {siteData.brand.phone}
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2.5 text-[15px] text-slate transition hover:text-signal-600"
                href={siteData.brand.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} className="shrink-0 text-ok" />
                <span>Chat on WhatsApp</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate transition hover:text-signal-600"
                href={siteData.brand.mapsHref}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={16} className="mt-1 shrink-0 text-signal-600" />
                <span>{siteData.brand.address}</span>
              </a>
            </li>
          </ul>

          <h2 className="mt-7 font-display text-[15px] font-semibold text-ink">
            Also selling on
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {channels.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="chip chip-quiet transition hover:border-signal-200 hover:text-signal-600"
                >
                  <Icon size={13} className="shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft py-5 pb-24 text-center text-[13px] text-slate md:pb-5">
        © {new Date().getFullYear()} SR IT Solutions
      </div>
    </footer>
  );
}

export default Footer;
