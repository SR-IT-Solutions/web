import { useEffect, useRef } from "react";

/**
 * Adds the `reveal` animation to children marked `data-reveal` the first
 * time they scroll into view. Elements start hidden only when the browser
 * supports IntersectionObserver and the visitor hasn't asked for reduced
 * motion — otherwise everything is visible from the start.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    targets.forEach((el) => el.classList.add("reveal-pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));

    // Safety net: anything still hidden after a moment is shown anyway, so
    // content can never be stranded invisible if the observer never fires
    // (print, screenshot tools, or a browser that mis-reports visibility).
    const failsafe = setTimeout(() => {
      targets.forEach((el) => el.classList.add("reveal-in"));
    }, 1600);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return ref;
}
