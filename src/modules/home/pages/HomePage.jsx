import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  Layers3,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { siteData } from "../../../core/data/siteData";
import FaqSection from "../components/FaqSection";
import ProductCarousel from "../components/ProductCarousel";

const iconMap = {
  Laptop: Layers3,
  ShieldCheck: BadgeCheck,
  Database: Headphones,
  ChartNoAxesCombined: Rocket,
};

function HomePage() {
  return (
    <div>
      <section className="home-hero relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.22),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_40%,#020617_100%)]">
        <div className="section-shell relative grid items-center gap-10 py-12 sm:py-16 md:py-20 lg:py-24 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full border border-brand-500/40 bg-brand-500/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              Computer hardware & tech essentials
            </div>
            <h1 className="fluid-hero-title max-w-xl font-black tracking-tight text-white">
              New, used, and refurbished computer solutions for every setup.
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300">
              SR IT Solutions helps homes, offices, and businesses find the
              right desktops, mini PCs, accessories, and reliable tech products
              at the right value.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-500 px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:scale-[1.02]"
              >
                Explore catalog
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/15 px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white transition hover:border-brand-400/60"
              >
                Book a consult
              </Link>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {siteData.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4 backdrop-blur-xs"
                >
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs uppercase font-semibold tracking-[0.16em] text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-2xl shadow-brand-500/10">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-red-500/20 blur-3xl pointer-events-none" />

              <div className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-slate-950 p-4 sm:p-5">
                <div className="mb-4 sm:mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">
                      Store Snapshot
                    </p>
                    <p className="mt-1 text-lg sm:text-xl font-bold text-white">
                      Computer essentials
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                    +28.4%
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-3.5">
                  {[
                    {
                      label: "Used & refurbished",
                      value: "Stock",
                      tone: "bg-brand-500/20 text-brand-200",
                    },
                    {
                      label: "Laptop & desktop repair",
                      value: "Available",
                      tone: "bg-sky-500/20 text-sky-200",
                    },
                    {
                      label: "Accessories & equipment",
                      value: "In store",
                      tone: "bg-emerald-500/20 text-emerald-200",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-slate-200 font-medium">
                          {item.label}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.tone}`}
                        >
                          {item.value}
                        </span>
                      </div>
                      <div className="h-1.5 sm:h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-3/4 rounded-full bg-linear-to-r from-brand-500 to-rose-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductCarousel />

      <section className="section-shell pt-6 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="mb-7 sm:mb-9 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            What we do
          </p>
          <h2 className="fluid-section-title mt-2 sm:mt-2.5 font-bold text-slate-900">
            Technology solutions that fit real business needs.
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.services.map((service) => {
            const Icon = iconMap[service.icon] || Layers3;
            return (
              <article
                key={service.title}
                className="group rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
              >
                <div className="mb-4 sm:mb-5 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 group-hover:scale-105 transition">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/70 py-10 sm:py-14">
        <div className="section-shell">
          <div className="mb-7 sm:mb-9 text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
              Our process
            </p>
            <h2 className="fluid-section-title mt-2 sm:mt-3 font-bold text-slate-900">
              Simple, clear, and built around your goals.
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.process.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  0{index + 1}
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}

export default HomePage;
