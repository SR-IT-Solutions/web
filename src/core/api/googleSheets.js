import { fallbackCatalog } from "../data/siteData";

export const GOOGLE_SHEET_CONFIG = {
  spreadsheetId: "1kqNTN1FzWoCquO221V8WfKlkCwMJdMU68P5eQTrHjU4",
  gid: "0",
  sheetName: "Catalog",
};

const CATALOG_CACHE_TTL = 5 * 60 * 1000;
let catalogCache = null;
let catalogCacheTimestamp = 0;
let catalogRequest = null;

const toValue = (cell) => {
  if (!cell) return "";
  if (typeof cell === "string") return cell;
  if (typeof cell === "number" || typeof cell === "boolean")
    return String(cell);
  if ("v" in cell) return cell.v ?? "";
  if ("f" in cell) return cell.f;
  return "";
};

const parseGoogleSheetResponse = (rawText) => {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  const extracted = trimmed
    .replace(/^.*?\(/s, "")
    .replace(/\);?\s*$/, "")
    .trim();

  const payload = JSON.parse(extracted);
  const rows = payload?.table?.rows ?? [];
  const rawRows = rows.map((row) => (row.c ?? []).map((cell) => toValue(cell)));
  const headers = rawRows[0]?.map((value) => String(value).trim()) ?? [];
  const hasCatalogHeaders = headers.some(
    (header) => header === "Title" || header === "Product Name",
  );

  if (hasCatalogHeaders) {
    return rawRows
      .slice(1)
      .map((values) =>
        Object.fromEntries(
          headers.map((header, index) => [header, values[index] ?? ""]),
        ),
      );
  }

  return rawRows.map((values) => {
    const cleaned = values.filter((value) => value !== "");

    if (!cleaned.length) {
      return {};
    }

    const title = String(cleaned[0] ?? "").trim();
    const category = String(cleaned[1] ?? "").trim();

    let trailing = [...cleaned.slice(2)];
    let featured = "";

    const featureIndex = trailing.findIndex(
      (value) =>
        value === "TRUE" ||
        value === "FALSE" ||
        value === true ||
        value === false,
    );

    if (featureIndex >= 0) {
      featured = trailing.splice(featureIndex, 1)[0] ?? "";
    }

    let price = "";
    let tag = "";

    if (trailing.length > 0) {
      price = String(trailing[trailing.length - 1] ?? "").trim();
      trailing = trailing.slice(0, -1);
    }

    if (trailing.length > 0) {
      tag = String(trailing[trailing.length - 1] ?? "").trim();
      trailing = trailing.slice(0, -1);
    }

    const description = trailing.join(" ").replace(/\s+/g, " ").trim();

    return {
      Title: title,
      Category: category,
      Description: description,
      Tag: tag,
      Price: price,
      Featured: featured,
      "Image URL": "",
    };
  });
};

const normalizeRow = (row) => {
  const title =
    row.Title ||
    row.title ||
    row["Product Name"] ||
    row["Service Name"] ||
    "Untitled service";
  const category =
    row.Category || row.category || row["Service Type"] || "General";
  const summary =
    row.Description ||
    row.description ||
    row["Brief description"] ||
    "Tailored solution for your business.";
  const tag =
    row.Tag || row.tag || row["Badge"] || row["Highlight"] || "Popular";
  const price =
    row.Price ||
    row.price ||
    row["Starting at"] ||
    row["Package"] ||
    "Custom quote";
  const featured =
    row.Featured === "TRUE" ||
    row.featured === "true" ||
    row.featured === true ||
    row.Featured === true;
  const image = row.Image || row.image || row["Image URL"] || "";

  return {
    id: String(
      row.id ||
        row.ID ||
        `${category}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ),
    title: String(title),
    category: String(category),
    summary: String(summary),
    tag: String(tag),
    price: String(price),
    featured,
    image: String(image),
  };
};

export async function fetchCatalogFromGoogleSheet({
  spreadsheetId = GOOGLE_SHEET_CONFIG.spreadsheetId,
  gid = GOOGLE_SHEET_CONFIG.gid,
} = {}) {
  if (!spreadsheetId || spreadsheetId.includes("YOUR_")) {
    return fallbackCatalog;
  }

  if (catalogCache && Date.now() - catalogCacheTimestamp < CATALOG_CACHE_TTL) {
    return catalogCache;
  }

  if (catalogRequest) {
    return catalogRequest;
  }

  catalogRequest = (async () => {
    try {
      const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
      const response = await fetch(sheetUrl, { cache: "no-store" });

      if (!response.ok) {
        return catalogCache || fallbackCatalog;
      }

      const rawText = await response.text();
      const rows = parseGoogleSheetResponse(rawText);

      if (!rows.length) {
        return catalogCache || fallbackCatalog;
      }

      const catalog = rows.map(normalizeRow).filter((item) => item.title);
      catalogCache = catalog;
      catalogCacheTimestamp = Date.now();
      return catalog;
    } catch (error) {
      console.error("Google Sheet fetch failed:", error);
      return catalogCache || fallbackCatalog;
    } finally {
      catalogRequest = null;
    }
  })();

  return catalogRequest;
}
