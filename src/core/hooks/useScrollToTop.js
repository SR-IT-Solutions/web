import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const positions = new Map();

export function useScrollToTop() {
  const { key, pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const save = () => positions.set(key, window.scrollY);
    window.addEventListener("click", save, { capture: true });
    window.addEventListener("popstate", save);
    return () => {
      window.removeEventListener("click", save, { capture: true });
      window.removeEventListener("popstate", save);
    };
  }, [key]);

  useEffect(() => {
    const target = navigationType === "POP" ? (positions.get(key) ?? 0) : 0;

    if (target === 0) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    let raf = 0;
    const deadline = performance.now() + 1000;
    const restore = () => {
      window.scrollTo({ top: target, left: 0, behavior: "instant" });
      const reached = Math.abs(window.scrollY - target) < 2;
      if (!reached && performance.now() < deadline) {
        raf = requestAnimationFrame(restore);
      }
    };
    raf = requestAnimationFrame(restore);
    return () => cancelAnimationFrame(raf);
  }, [key, pathname, navigationType]);
}
