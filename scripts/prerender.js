// Writes a static HTML file for every route plus dist/sitemap.xml.
//
// GitHub Pages only serves real files, so without this every route except "/"
// answers with 404.html and an HTTP 404 — which Google drops from the index.
// Static routes become <route>.html (served at /route with no redirect); the
// catalog lives at /catalog/ because its product pages share that folder.
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const SITE_URL = "https://sritsolutionz.com";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SSR_ENTRY = resolve(ROOT, "dist-ssr/entry-server.js");

const STATIC_ROUTES = [
  { path: "/", file: "index.html", changefreq: "weekly", priority: "1.0" },
  { path: "/services", file: "services.html", changefreq: "monthly", priority: "0.8" },
  { path: "/laptop-repair", file: "laptop-repair.html", changefreq: "monthly", priority: "0.8" },
  { path: "/refurbished-laptops", file: "refurbished-laptops.html", changefreq: "daily", priority: "0.9" },
  { path: "/used-desktops", file: "used-desktops.html", changefreq: "daily", priority: "0.8" },
  { path: "/catalog/", file: "catalog/index.html", changefreq: "daily", priority: "0.9" },
  { path: "/about", file: "about.html", changefreq: "yearly", priority: "0.5" },
  { path: "/contact", file: "contact.html", changefreq: "yearly", priority: "0.6" },
];

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const xmlEscape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const setTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`[prerender] Template is missing ${pattern}`);
  return html.replace(pattern, replacement);
};

const setMetaContent = (html, key, value) =>
  setTag(
    html,
    new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`),
    `$1${escapeAttr(value)}$2`,
  );

function productSchemas(product, url) {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Catalog", item: `${SITE_URL}/catalog/` },
        { "@type": "ListItem", position: 3, name: product.title, item: url },
      ],
    },
  ];

  // Google only accepts a Product result with an offer, so skip it for
  // "Custom quote" items.
  if (product.priceValue != null) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.summary,
      category: product.category,
      image: product.images.length ? product.images : undefined,
      url,
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "INR",
        price: product.priceValue,
        availability: "https://schema.org/InStock",
        seller: { "@type": "ComputerStore", "@id": `${SITE_URL}/#store`, name: "SR IT Solutions", url: `${SITE_URL}/` },
      },
    });
  }

  return schemas;
}

function buildPage(template, { html, meta }, { path, product }) {
  const url = `${SITE_URL}${path}`;
  const title = meta.title ? `${meta.title} | SR IT Solutions` : "SR IT Solutions";

  let page = template;
  page = setTag(page, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`);
  page = setTag(
    page,
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${escapeAttr(url)}$2`,
  );
  page = setMetaContent(page, "og:url", url);
  page = setMetaContent(page, "og:title", title);
  page = setMetaContent(page, "twitter:title", title);
  if (meta.description) {
    page = setMetaContent(page, "description", meta.description);
    page = setMetaContent(page, "og:description", meta.description);
    page = setMetaContent(page, "twitter:description", meta.description);
  }

  if (product) {
    if (product.image) {
      page = setMetaContent(page, "og:image", product.image);
      page = setMetaContent(page, "twitter:image", product.image);
      page = page.replace(/\s*<meta property="og:image:(?:width|height)"[^>]*>/g, "");
      page = setMetaContent(page, "og:image:alt", product.title);
    }
    page = setTag(
      page,
      /<\/head>/,
      `  ${productSchemas(product, url).map(jsonLd).join("\n    ")}\n  </head>`,
    );
  }

  return setTag(page, /<div id="root"><\/div>/, `<div id="root">${html}</div>`);
}

function buildSitemap(paths, lastmod) {
  const urls = paths
    .map(
      ({ path, changefreq, priority }) =>
        `  <url>\n` +
        `    <loc>${xmlEscape(`${SITE_URL}${path}`)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${changefreq}</changefreq>\n` +
        `    <priority>${priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`
  );
}

const { render, fetchCatalog } = await import(pathToFileURL(SSR_ENTRY).href);
const template = await readFile(resolve(DIST, "index.html"), "utf8");

let catalog = [];
try {
  catalog = await fetchCatalog();
} catch (err) {
  console.warn(`[prerender] Catalog fetch failed (${err.message}) — static routes only.`);
}

const products = catalog.filter((item) => /^[A-Za-z0-9-]+$/.test(item.id));
const pages = [
  ...STATIC_ROUTES,
  ...products.map((product) => ({
    path: `/catalog/${product.id}`,
    file: `catalog/${product.id}.html`,
    changefreq: "weekly",
    priority: "0.7",
    product,
  })),
];

for (const route of pages) {
  const rendered = render(route.path, catalog);
  const out = resolve(DIST, route.file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buildPage(template, rendered, route), "utf8");
}

const lastmod = new Date().toISOString().split("T")[0];
await writeFile(resolve(DIST, "sitemap.xml"), buildSitemap(pages, lastmod), "utf8");
await rm(resolve(ROOT, "dist-ssr"), { recursive: true, force: true });

console.log(
  `[prerender] Wrote ${STATIC_ROUTES.length} static + ${products.length} product pages and dist/sitemap.xml`,
);
