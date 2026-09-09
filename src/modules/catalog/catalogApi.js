import {
  CATALOG_TABLE,
  getSupabaseClient,
  isSupabaseConfigured,
} from "./supabaseClient";

const CATALOG_CACHE_TTL = 5 * 60 * 1000;

let catalogCache = null;
let catalogCacheTimestamp = 0;
let catalogRequest = null;

/**
 * Accepts either a real Postgres array/jsonb column or a comma-separated
 * string, since the admin panel writes arrays but older rows may be text.
 */
const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") {
    const trimmed = value.trim();
    // A jsonb column read back as a string, e.g. '["8GB DDR4","16GB DDR4"]'.
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((v) => String(v).trim()).filter(Boolean);
        }
      } catch {
        // fall through to comma splitting
      }
    }
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

/** Handles booleans, "true"/"false" and the sheet-era "TRUE"/"FALSE". */
const parseFeatured = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().toLowerCase() === "true";
  return false;
};

/**
 * The admin panel stores Price as a number; the old sheet stored strings
 * like "From ₹18,000". Render a rupee amount when we get a number and pass
 * through any non-empty string unchanged.
 */
const formatPrice = (value) => {
  if (value == null || value === "") return "Custom quote";
  const numeric = typeof value === "number" ? value : Number(String(value).trim());
  if (Number.isFinite(numeric)) {
    // Show paise only when the price actually has them, so a round ₹18,000
    // stays clean while ₹18,000.50 isn't silently rounded up to ₹18,001.
    const hasPaise = !Number.isInteger(numeric);
    return `₹${numeric.toLocaleString("en-IN", {
      minimumFractionDigits: hasPaise ? 2 : 0,
      maximumFractionDigits: hasPaise ? 2 : 0,
    })}`;
  }
  return String(value).trim();
};

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Maps a raw `products` row into the shape the storefront components expect. */
const normalizeRow = (row) => {
  if (!row || typeof row !== "object") return null;

  const title = String(row.Title ?? "").trim();
  if (!title) return null;

  const category = String(row.Category ?? "").trim() || "General";
  const images = parseList(row["Image URL"]);

  return {
    // Route params are strings, so keep ids as strings for lookup by URL.
    id: String(row.id ?? slugify(`${category}-${title}`)),
    title,
    category,
    summary:
      String(row.Description ?? "").trim() ||
      "Tailored solution for your business.",
    tag: String(row.Tag ?? "").trim() || "Popular",
    price: formatPrice(row.Price),
    featured: parseFeatured(row.Featured),
    // Cards render a single `image`; the detail page can use the full list.
    image: images[0] ?? "",
    images,
    supportedRams: parseList(row["Supported RAMs"]),
    supportedProcessors: parseList(row["Supported Processors"]),
    supportedStorage: parseList(row["Supported Storage"]),
  };
};

/**
 * Fetches the catalog from Supabase, sharing one in-flight request and a
 * short-lived cache across the several components that call useCatalog().
 */
export async function fetchCatalog({ forceRefresh = false } = {}) {
  if (forceRefresh) {
    catalogCache = null;
    catalogCacheTimestamp = 0;
  }

  if (catalogCache && Date.now() - catalogCacheTimestamp < CATALOG_CACHE_TTL) {
    return catalogCache;
  }

  if (catalogRequest) return catalogRequest;

  catalogRequest = (async () => {
    const client = getSupabaseClient();

    if (!client) {
      throw new Error(
        "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
      );
    }

    const { data, error } = await client
      .from(CATALOG_TABLE)
      .select("*")
      .order("Title", { ascending: true });

    if (error) throw new Error(error.message || "Failed to load catalog.");

    const catalog = (data ?? []).map(normalizeRow).filter(Boolean);

    catalogCache = catalog;
    catalogCacheTimestamp = Date.now();
    return catalog;
  })();

  try {
    return await catalogRequest;
  } finally {
    catalogRequest = null;
  }
}

export { isSupabaseConfigured };
