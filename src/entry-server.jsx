import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import { fetchCatalog, primeCatalogCache } from "./modules/catalog/catalogApi";
import { setPageMetaSink } from "./core/hooks/usePageMeta";

export { fetchCatalog };

// Renders one route to static HTML for scripts/prerender.js and returns the
// meta the page set through usePageMeta.
export function render(url, catalog) {
  primeCatalogCache(catalog);
  const meta = {};
  setPageMetaSink(meta);
  try {
    const html = renderToString(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
    );
    return { html, meta };
  } finally {
    setPageMetaSink(null);
  }
}
