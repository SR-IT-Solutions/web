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
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/90 backdrop-blur-xl shadow-xs">
        <div className="section-shell flex items-center justify-between py-3 sm:py-3.5">
          <NavLink to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img
              src="/logo.png"
              alt="SR IT Solutions Logo"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain group-hover:scale-105 transition"
            />
            <div>
              <div className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                SR IT Solutions
              </div>
              <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase font-semibold tracking-[0.2em] text-slate-500 leading-none">
                Computer Store
              </div>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `text-sm transition py-1 border-b-2 ${
                    isActive
                      ? "border-brand-600 text-brand-600 font-bold"
                      : "border-transparent text-slate-600 hover:text-slate-900 font-medium"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={siteData.brand.phoneHref}
              className="inline-flex h-9 w-9 sm:h-auto sm:w-auto items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-slate-50 p-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 shadow-xs"
              aria-label="Call SR IT Solutions"
            >
              <PhoneCall size={15} className="text-brand-600 shrink-0" />
              <span className="hidden sm:inline">Call Us</span>
            </a>
            <a
              href={siteData.brand.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={15} className="shrink-0" />
              <span className="hidden min-[380px]:inline">WhatsApp</span>
              <span className="min-[380px]:hidden">Chat</span>
            </a>
          </div>
        </div>
      </header>

      <nav
        className="mobile-bottom-nav md:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `mobile-bottom-nav-link ${isActive ? "is-active" : ""}`
            }
          >
            <Icon size={19} strokeWidth={2.2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
