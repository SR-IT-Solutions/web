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
      className="section-shell py-12 sm:py-16"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="rule-heading">
        <h2 id="faq-heading" className="t-section text-ink">
          Questions we get asked
        </h2>
      </div>
      <div className="mt-8 grid items-start gap-x-10 md:grid-cols-2">
        {faqColumns.map((column, columnIndex) => (
          <div key={columnIndex}>
            {column.map((faq) => (
              <details key={faq.question} className="border-b border-line py-4">
                <summary className="faq-summary pr-10 text-[15px] font-semibold text-ink transition hover:text-signal-600">
                  {faq.question}
                </summary>
                <p className="t-body measure mt-3 text-[0.9375rem]">
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
