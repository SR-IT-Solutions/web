import { useEffect } from "react";

export const SITE_URL = "https://sritsolutionz.com";
const SUFFIX = "SR IT Solutions";

export const fullPageTitle = (title) => (title ? `${title} | ${SUFFIX}` : SUFFIX);

// The build-time prerender sets a sink so the page's meta can be written into
// the static HTML; effects never run there.
let ssrSink = null;
export const setPageMetaSink = (sink) => {
  ssrSink = sink;
};

const setMeta = (selector, attr, name, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export function usePageMeta({ title, description, path, noindex = false }) {
  if (ssrSink) Object.assign(ssrSink, { title, description, path, noindex });

  useEffect(() => {
    const fullTitle = fullPageTitle(title);
    const url = `${SITE_URL}${path ?? window.location.pathname}`;

    document.title = fullTitle;

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMeta('meta[property="og:url"]', "property", "og:url", url);

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setMeta('meta[name="robots"]', "name", "robots", "noindex");
    else robots?.remove();

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, noindex]);
}
