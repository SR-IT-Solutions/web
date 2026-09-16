import { useEffect, useRef } from "react";

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
