import {
  CATALOG_TABLE,
  getSupabaseClient,
  isSupabaseConfigured,
} from "./supabaseClient";

const CATALOG_CACHE_TTL = 5 * 60 * 1000;

let catalogCache = null;
let catalogCacheTimestamp = 0;
let catalogRequest = null;

const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((v) => String(v).trim()).filter(Boolean);
        }
      } catch {
      }
    }
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const parseFeatured = (value) => value === true;

const formatPrice = (value) => {
  if (value == null || value === "") return "Custom quote";
  const numeric = typeof value === "number" ? value : Number(String(value).trim());
  if (Number.isFinite(numeric)) {
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

const normalizeRow = (row) => {
  if (!row || typeof row !== "object") return null;

  const title = String(row.Title ?? "").trim();
  if (!title) return null;

  const category = String(row.Category ?? "").trim() || "General";
  const images = parseList(row["Image URL"]);

  return {
    id: String(row.id ?? slugify(`${category}-${title}`)),
    title,
    category,
    summary:
      String(row.Description ?? "").trim() ||
      "Tailored solution for your business.",
    tag: String(row.Tag ?? "").trim() || "Popular",
    price: formatPrice(row.Price),
    featured: parseFeatured(row.Featured),
    image: images[0] ?? "",
    images,
    supportedRams: parseList(row["Supported RAMs"]),
    supportedProcessors: parseList(row["Supported Processors"]),
    supportedStorage: parseList(row["Supported Storage"]),
  };
};

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
      .eq("is_active", true)
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
