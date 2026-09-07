import { Laptop, Monitor, Printer, Wrench } from "lucide-react";

const serviceCards = [
  {
    icon: Laptop,
    title: "Laptop & Desktop Sales",
    text: "New, used, and refurbished laptops and desktops for home, office, and everyday use.",
  },
  {
    icon: Monitor,
    title: "Computer Accessories",
    text: "Monitors, keyboards, mice, printers, CCTV equipment, and other computer essentials.",
  },
  {
    icon: Wrench,
    title: "Computer Repair",
    text: "Practical repair and troubleshooting support for laptops, desktops, and related equipment.",
  },
  {
    icon: Printer,
    title: "Business Equipment",
    text: "Reliable printers, workstations, and equipment for shops, offices, and local businesses.",
  },
];

function ServicesPage() {
  return (
    <div className="section-shell py-10 sm:py-14 lg:py-18">
      <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Services
        </p>
        <h1 className="fluid-page-title mt-2 sm:mt-3 font-black text-slate-900">
          Computers, accessories, and repair support for everyday needs.
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
          From hardware upgrades and repair diagnostics to complete workplace workstation setups, we provide end-to-end IT hardware support.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-8 sm:pt-12 border-t border-slate-200/80">
        {serviceCards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 group-hover:scale-105 group-hover:bg-brand-100 transition">
              <Icon size={22} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
