import { MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { siteData } from "../../../core/data/siteData";

function ContactPage() {
  return (
    <div className="section-shell py-10 sm:py-14 lg:py-18">
      <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Contact
        </p>
        <h1 className="fluid-page-title mt-2 sm:mt-3 font-black text-slate-900">
          Looking for the right computer setup? Let’s talk.
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl mx-auto">
          Visit our store in Arekere, give us a phone call, or send us a quick message on WhatsApp.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="space-y-6 lg:pr-6">
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500 font-bold">
                  Direct Phone
                </div>
                <a
                  href={siteData.brand.phoneHref}
                  className="mt-1 block text-base sm:text-lg font-black text-slate-900 hover:text-brand-600 transition"
                >
                  {siteData.brand.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500 font-bold">
                  WhatsApp Support
                </div>
                <div className="mt-1 text-base sm:text-lg font-bold text-slate-900">
                  <a
                    href={siteData.brand.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-600 transition inline-flex items-center gap-1.5"
                  >
                    Chat with our specialists
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500 font-bold">
                  Store Location
                </div>
                <a
                  href={siteData.brand.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block max-w-prose text-xs sm:text-sm font-medium leading-relaxed text-slate-700 hover:text-brand-600 transition"
                >
                  {siteData.brand.address}
                </a>
              </div>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-slate-500 font-medium">
              Store Hours: <span className="font-semibold text-slate-800">{siteData.brand.hours}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs">
            <iframe
              title="SR IT SOLUTIONS location on Google Maps"
              src={siteData.brand.mapsEmbedHref}
              className="h-52 w-full border-0 sm:h-56"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.open(siteData.brand.whatsappHref, "_blank", "noopener,noreferrer");
          }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-8 shadow-xs"
        >
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
                Name
              </span>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
                Phone or WhatsApp
              </span>
              <input
                type="text"
                placeholder="096207 77844"
                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
              />
            </label>
          </div>

          <label className="mt-4 sm:mt-5 block">
            <span className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
              Company / Setup Type
            </span>
            <input
              type="text"
              placeholder="e.g. Home office, small business, school..."
              className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
            />
          </label>

          <label className="mt-4 sm:mt-5 block">
            <span className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
              Equipment / Requirements
            </span>
            <textarea
              rows="4"
              placeholder="Tell us about the laptops, desktops, repairs, or accessories you need"
              className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:outline-none transition resize-y"
            />
          </label>

          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-500 px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-brand-500/20 transition w-full sm:w-auto hover:scale-[1.02]"
          >
            Send inquiry via WhatsApp
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
