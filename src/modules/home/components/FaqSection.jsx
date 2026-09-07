const faqs = [
  {
    question: "Do you sell used and refurbished computers?",
    answer:
      "Yes. SR IT Solutions sells new, used, and refurbished laptops, desktops, mini PCs, monitors, printers, and computer accessories.",
  },
  {
    question: "Can I choose the RAM, storage, or processor?",
    answer:
      "Available configurations depend on the product. Open a product detail page to select the available RAM, storage, processor, and condition options before sending an enquiry.",
  },
  {
    question: "Can the RAM or storage be upgraded?",
    answer:
      "Some laptops and desktops support upgrades, while others have fixed components. The product listing or WhatsApp enquiry can confirm the maximum supported configuration for a specific device.",
  },
  {
    question: "Do you provide computer repair services?",
    answer:
      "Yes. The store provides computer repair and troubleshooting support for laptops, desktops, and related equipment.",
  },
  {
    question: "Can I check product availability before visiting?",
    answer:
      "Yes. Use the WhatsApp enquiry button on a product page or call 096207 77844 to confirm current stock and configuration.",
  },
  {
    question: "Where is SR IT Solutions located?",
    answer:
      "SR IT Solutions is located at 863, BTS Layout Main Road, Jai Maruthi Layout, Arekere, Bengaluru, Karnataka 560076.",
  },
];

function FaqSection() {
  const faqColumns = [
    faqs.filter((_, index) => index % 2 === 0),
    faqs.filter((_, index) => index % 2 === 1),
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <section
      className="section-shell pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 lg:pb-12"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mb-8 sm:mb-10 max-w-2xl">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="fluid-section-title mt-2 sm:mt-3 font-bold text-slate-900"
        >
          Common questions before you buy.
        </h2>
      </div>
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 items-start">
        {faqColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-3 sm:space-y-4">
            {column.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition duration-200 open:border-brand-300 open:shadow-sm"
              >
                <summary className="faq-summary cursor-pointer list-none pr-8 text-sm sm:text-base font-semibold text-slate-900 marker:hidden select-none hover:text-brand-600 transition">
                  {faq.question}
                </summary>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
