import { NavLink } from "react-router-dom";
import {
  House,
  Info,
  Laptop,
  MessageCircle,
  Package,
  PhoneCall,
} from "lucide-react";
import { siteData } from "../data/siteData";
import logoImg from "../../assets/logo.png";

const navItems = [
  { label: "Home", to: "/", icon: House },
  { label: "Catalog", to: "/catalog", icon: Package },
  { label: "Services", to: "/services", icon: Laptop },
  { label: "About", to: "/about", icon: Info },
  { label: "Contact", to: "/contact", icon: MessageCircle },
];

function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between gap-4 py-3">
          <NavLink to="/" className="flex min-w-0 items-center gap-2.5">
            <img
              src={logoImg}
              alt=""
              width="40"
              height="40"
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <span className="min-w-0 leading-none">
              <span className="block font-display text-[15px] font-bold tracking-tight text-ink sm:text-base">
                SR IT Solutions
              </span>
              <span className="mt-1 block text-[11px] text-slate">
                Arekere, Bengaluru
              </span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-4 md:flex lg:gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `border-b-2 py-1 text-[15px] transition ${
                    isActive
                      ? "border-signal-600 font-semibold text-signal-600"
                      : "border-transparent font-medium text-slate hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={siteData.brand.phoneHref}
              className="btn-secondary !min-h-0 !px-3 !py-2 !text-sm"
              aria-label="Call SR IT Solutions"
            >
              <PhoneCall size={15} className="shrink-0 text-signal-600" />
              <span className="hidden sm:inline">Call</span>
            </a>
            <a
              href={siteData.brand.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn-ok !min-h-0 !px-3 !py-2 !text-sm"
            >
              <MessageCircle size={15} className="shrink-0" />
              <span className="hidden min-[380px]:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <nav className="mobile-bottom-nav md:hidden" aria-label="Mobile navigation">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `mobile-bottom-nav-link ${isActive ? "is-active" : ""}`
            }
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
