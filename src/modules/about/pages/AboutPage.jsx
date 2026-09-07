import { Sparkles, Target, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Practical choices",
    text: "We help customers choose equipment that fits their budget, workload, and setup.",
  },
  {
    icon: Users,
    title: "Quality checked",
    text: "Used and refurbished devices are selected with dependable everyday performance in mind.",
  },
  {
    icon: Sparkles,
    title: "Repair support",
    text: "When equipment needs attention, our local store also offers computer repair support.",
  },
];

function AboutPage() {
  return (
    <div className="section-shell py-10 sm:py-14 lg:py-18">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            About us
          </p>
          <h1 className="fluid-page-title mt-2 sm:mt-3 font-black text-slate-900">
            Your local source for reliable computer equipment.
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600">
            SR IT Solutions is a computer store in Arekere, Bengaluru,
            specialising in refurbished and used laptops, desktops, computer
            accessories, and repair services.
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-brand-200/80 bg-linear-to-br from-brand-50/70 via-white to-slate-50 p-3.5 sm:p-6 lg:p-8 shadow-xs">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            {[
              { label: "Google rating", value: "4.7★" },
              { label: "Google reviews", value: "141+" },
              { label: "Systems sold", value: "500+" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white py-3.5 px-2 sm:py-5 sm:px-4 text-center shadow-xs"
              >
                <div className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 whitespace-nowrap leading-none">
                  {item.value}
                </div>
                <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs uppercase font-semibold tracking-[0.12em] text-slate-500 leading-tight">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:border-brand-300 hover:shadow-md transition duration-300"
          >
            <div className="mb-4 sm:mb-5 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon size={22} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;
