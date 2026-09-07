import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { siteData } from "../data/siteData";
import logoImg from "../assets/logo.png";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90">
      <div className="section-shell grid gap-8 py-8 sm:py-10 md:grid-cols-3 lg:gap-12">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img
              src={logoImg}
              alt="SR IT Solutions Logo"
              className="h-10 w-10 object-contain"
            />
            <div>
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                SR IT Solutions
              </div>
              <div className="text-[10px] uppercase font-semibold tracking-[0.2em] text-slate-500">
                Computer Store
              </div>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            Refurbished and used laptops, desktops, accessories, and computer
            repair services in Arekere, Bengaluru.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li>
              <Link
                to="/services"
                className="hover:text-brand-600 transition inline-block py-0.5"
              >
                Services & Repairs
              </Link>
            </li>
            <li>
              <Link
                to="/catalog"
                className="hover:text-brand-600 transition inline-block py-0.5"
              >
                Product Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-brand-600 transition inline-block py-0.5"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-brand-600 transition inline-block py-0.5"
              >
                Contact & Store Location
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>
              <a
                className="flex items-center gap-2.5 hover:text-brand-600 transition"
                href={siteData.brand.phoneHref}
              >
                <Phone size={16} className="text-brand-600 shrink-0" />
                <span className="font-medium text-slate-800">
                  {siteData.brand.phone}
                </span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-2.5 hover:text-brand-600 transition"
                href={siteData.brand.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle
                  size={16}
                  className="text-emerald-600 shrink-0"
                />
                <span>Chat on WhatsApp</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-start gap-2.5 hover:text-brand-600 transition"
                href={siteData.brand.mapsHref}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={16} className="mt-1 shrink-0 text-brand-600" />
                <span className="leading-relaxed">
                  {siteData.brand.address}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200/80 py-5 pb-20 md:pb-5 text-center text-xs sm:text-sm text-slate-500">
        © {new Date().getFullYear()} SR IT Solutions. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
