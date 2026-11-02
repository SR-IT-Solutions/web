import { siteData } from "../../../core/data/siteData";

const { phone, address } = siteData.brand;

export const NEARBY_AREAS = [
  "Arekere",
  "Hulimavu",
  "Bannerghatta Road",
  "BTM Layout",
  "JP Nagar",
  "Bilekahalli",
  "Bommanahalli",
  "Begur",
  "Gottigere",
  "HSR Layout",
];

export const servicePages = [
  {
    path: "/laptop-repair",
    breadcrumb: "Laptop repair",
    serviceType: "Laptop and computer repair",
    metaTitle: "Laptop & Computer Repair in Arekere, Bengaluru",
    metaDescription:
      "Laptop and desktop repair, troubleshooting and RAM or SSD upgrades at SR IT Solutions on BTS Layout Main Road, Arekere, Bengaluru. Walk in or WhatsApp us the problem first.",
    heading: "Laptop and computer repair in Arekere, Bengaluru",
    intro:
      "Bring in a laptop or desktop that isn’t working right and we’ll tell you what’s wrong. The same store that sells tested used and refurbished machines also repairs them, so the advice you get is about fixing the machine you have.",
    whatsappText:
      "Hello SR IT Solutions, I need a laptop or computer repaired. The problem is: ",
    offersTitle: "What we help with",
    offers: [
      {
        title: "Troubleshooting and diagnostics",
        text: "Laptops and desktops that won’t start, misbehave, or have stopped doing their job. We find the fault first.",
      },
      {
        title: "Laptop repair",
        text: "Repair support for everyday laptops used at home, for study, and at work.",
      },
      {
        title: "Desktop and mini PC repair",
        text: "Towers, assembled CPUs, branded desktops, and compact mini PCs.",
      },
      {
        title: "RAM and storage upgrades",
        text: "Many laptops and desktops can take more RAM or a faster SSD. We’ll confirm what your model supports.",
      },
      {
        title: "Related equipment",
        text: "Monitors, printers, and the peripherals that make up a working setup.",
      },
    ],
    stepsTitle: "How a repair works",
    steps: [
      "Message us the problem on WhatsApp, or walk in",
      "We check the machine at the store",
      "We tell you what’s wrong and what fixing it involves",
      "Collect it from the store in Arekere",
    ],
    faqs: [
      {
        question: "Where can I get my laptop repaired near Arekere?",
        answer: `SR IT Solutions repairs laptops and desktops at its store at ${address}. Call or WhatsApp ${phone} before you visit.`,
      },
      {
        question: "Do you repair desktops and mini PCs as well as laptops?",
        answer:
          "Yes. The store handles troubleshooting and repair for laptops, desktops, mini PCs, and related equipment such as monitors and printers.",
      },
      {
        question: "Can you upgrade the RAM or SSD in my laptop?",
        answer:
          "Some laptops and desktops support RAM and storage upgrades, while others have fixed components. Send the model on WhatsApp and we’ll confirm what yours supports.",
      },
      {
        question: "Can I describe the problem before bringing the laptop in?",
        answer: `Yes. WhatsApp or call ${phone} with the model and what’s going wrong, and we’ll tell you whether to bring it in.`,
      },
      {
        question: "What if the repair isn’t worth it?",
        answer:
          "We’ll say so. The store also sells tested used and refurbished laptops and desktops, so you can compare a repair with a replacement in one visit.",
      },
    ],
    related: [
      { to: "/refurbished-laptops", label: "Refurbished laptops in stock" },
      { to: "/used-desktops", label: "Desktops and mini PCs in stock" },
    ],
  },
  {
    path: "/refurbished-laptops",
    breadcrumb: "Refurbished laptops",
    serviceType: "Refurbished and used laptop sales",
    metaTitle: "Refurbished & Used Laptops in Bengaluru",
    metaDescription:
      "Tested refurbished and used laptops at SR IT Solutions, Arekere, Bengaluru. See current stock and prices, choose RAM and storage, and confirm availability on WhatsApp.",
    heading: "Refurbished and used laptops in Arekere, Bengaluru",
    intro:
      "Every used and refurbished laptop is tested for dependable everyday performance before it’s listed. Below is what’s in the catalog right now, with prices. Message us to confirm it’s still on the shelf before you visit.",
    whatsappText:
      "Hello SR IT Solutions, I’m looking for a refurbished laptop. My budget and use: ",
    categories: ["Laptop"],
    stockTitle: "Laptops in stock",
    offersTitle: "Why buy a laptop from the store",
    offers: [
      {
        title: "Checked before sale",
        text: "Used and refurbished machines are tested before they go on sale.",
      },
      {
        title: "Pick the configuration",
        text: "Where a model offers options, choose the RAM, storage, and processor on the product page before you enquire.",
      },
      {
        title: "Fits the budget",
        text: "Tell us what the laptop is for and how much you want to spend. We’ll suggest what fits, not the most expensive thing on the shelf.",
      },
      {
        title: "Repairs from the same store",
        text: "If the laptop needs attention later, bring it back to the store that sold it.",
      },
    ],
    faqs: [
      {
        question: "Are your refurbished laptops tested?",
        answer:
          "Yes. Used and refurbished laptops are tested for dependable everyday performance before they are listed for sale.",
      },
      {
        question: "Do you sell new laptops too?",
        answer:
          "Yes. SR IT Solutions sells new, used, and refurbished laptops, along with desktops, mini PCs, monitors, and accessories.",
      },
      {
        question: "Can I choose the RAM, storage, or processor?",
        answer:
          "It depends on the model. Open a product page to see the RAM, storage, processor, and condition options available before sending an enquiry.",
      },
      {
        question: "How do I check a laptop is in stock before visiting?",
        answer: `Use the WhatsApp button on the product page, or call ${phone}, and we’ll confirm the stock and configuration.`,
      },
      {
        question: "Where is the store?",
        answer: `The store is at ${address}.`,
      },
    ],
    related: [
      { to: "/catalog/", label: "Full catalog" },
      { to: "/laptop-repair", label: "Laptop repair" },
    ],
  },
  {
    path: "/used-desktops",
    breadcrumb: "Desktops and mini PCs",
    serviceType: "Used and refurbished desktop, mini PC and workstation sales",
    metaTitle: "Used Desktops, Mini PCs & Workstations in Bengaluru",
    metaDescription:
      "Used and refurbished desktops, mini PCs, workstations and monitors for homes, offices and shops. Tested before sale at SR IT Solutions, Arekere, Bengaluru.",
    heading: "Used desktops, mini PCs and workstations in Bengaluru",
    intro:
      "Used, refurbished, and business-ready desktops for home, office, and everyday work, plus compact mini PCs and workstations. Each machine is tested before it goes on the shelf at our store in Arekere.",
    whatsappText:
      "Hello SR IT Solutions, I’m looking for a desktop or mini PC. What I need it for: ",
    categories: ["Computers", "Mini PCs", "Workstation", "Monitor"],
    stockTitle: "Desktops, mini PCs and monitors in stock",
    offersTitle: "What we supply",
    offers: [
      {
        title: "Desktop computers",
        text: "Assembled and branded desktops for home, study, and office work.",
      },
      {
        title: "Mini PCs",
        text: "Compact setups for offices, home users, digital signage, and space-saving desks.",
      },
      {
        title: "Workstations",
        text: "More capable machines for heavier workloads.",
      },
      {
        title: "Monitors and accessories",
        text: "Monitors, keyboards, mice, and the parts that finish a setup.",
      },
      {
        title: "Business equipment",
        text: "Printers, workstations, and hardware for shops, offices, and local businesses.",
      },
    ],
    faqs: [
      {
        question: "What is a mini PC good for?",
        answer:
          "Mini PCs suit offices, home users, digital signage, and desks with little space. They do everyday work in a much smaller box than a tower.",
      },
      {
        question: "Can I buy several desktops for an office or shop?",
        answer: `Yes. The store supplies workstations and hardware for shops, offices, and local businesses. WhatsApp or call ${phone} with the quantity and what the machines are for.`,
      },
      {
        question: "Can I get a monitor, keyboard, and mouse with the desktop?",
        answer:
          "Yes. The store sells monitors, keyboards, mice, printers, and other accessories, so you can pick up a complete setup.",
      },
      {
        question: "Are used desktops tested before sale?",
        answer:
          "Yes. Used and refurbished desktops are tested for dependable everyday performance before they are listed.",
      },
      {
        question: "Where is the store?",
        answer: `The store is at ${address}.`,
      },
    ],
    related: [
      { to: "/catalog/", label: "Full catalog" },
      { to: "/laptop-repair", label: "Computer repair" },
    ],
  },
];
