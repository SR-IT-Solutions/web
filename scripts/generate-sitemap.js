import { PostgrestClient } from "@supabase/postgrest-js";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SITE_URL = "https://sritsolutionz.com";
const CATALOG_TABLE = "products";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/catalog", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "yearly", priority: "0.5" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
];

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function fetchProductIds() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[sitemap] Supabase env vars missing — static routes only.");
    return [];
  }

  try {
    const client = new PostgrestClient(`${url}/rest/v1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    const { data, error } = await client
      .from(CATALOG_TABLE)
      .select("*")
      .eq("is_active", true);

    if (error) throw new Error(error.message);

    return (data ?? [])
      .map((row) => {
        const title = String(row?.Title ?? "").trim();
        if (!title) return null;
        const category = String(row?.Category ?? "").trim() || "General";
        return String(row?.id ?? slugify(`${category}-${title}`));
      })
      .filter(Boolean);
  } catch (err) {
    console.warn(`[sitemap] Catalog fetch failed (${err.message}) — static routes only.`);
    return [];
  }
}

const xmlEscape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildSitemap(productIds, lastmod) {
  const entries = [
    ...STATIC_ROUTES.map((route) => ({
      loc: `${SITE_URL}${route.path}`,
      changefreq: route.changefreq,
      priority: route.priority,
    })),
    ...productIds.map((id) => ({
      loc: `${SITE_URL}/catalog/${encodeURIComponent(id)}`,
      changefreq: "weekly",
      priority: "0.7",
    })),
  ];

  const urls = entries
    .map(
      ({ loc, changefreq, priority }) =>
        `  <url>\n` +
        `    <loc>${xmlEscape(loc)}</loc>\n` +
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

const productIds = await fetchProductIds();
const lastmod = new Date().toISOString().split("T")[0];
const outPath = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/sitemap.xml");

await writeFile(outPath, buildSitemap(productIds, lastmod), "utf8");

console.log(
  `[sitemap] Wrote ${STATIC_ROUTES.length} static + ${productIds.length} product URLs to dist/sitemap.xml`,
);
