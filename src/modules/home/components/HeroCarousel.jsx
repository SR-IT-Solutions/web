import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";

const ROTATE_MS = 5000;

function HeroCarousel({ products }) {
  const [rawIndex, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const count = products.length;
  const index = count ? rawIndex % count : 0;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (next) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused || stopped || reduced) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % count),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [count, paused, stopped, reduced]);

  const touchStart = useRef(null);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? index + 1 : index - 1);
    }
  };

  if (count === 0) return null;

  return (
    <div
      className="reveal self-center"
      style={{ "--i": 2 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {products.map((product, i) => (
          <Link
            key={product.id}
            to={`/catalog/${product.id}`}
            aria-hidden={i === index ? undefined : true}
            tabIndex={i === index ? undefined : -1}
            style={{ gridArea: "1 / 1" }}
            className={`card-interactive block overflow-hidden border-white/12! bg-white/5! backdrop-blur-sm transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="sheen aspect-4/3 overflow-hidden bg-white p-4 sm:aspect-16/11 sm:p-6">
              <img
                src={product.image}
                alt={product.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="zoom h-full w-full object-contain"
              />
            </div>
            <div className="flex items-end justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="text-[13px] text-white/45">In stock now</p>
                <p className="t-card mt-1 truncate text-white">
                  {product.title}
                </p>
              </div>
              <span className="price shrink-0 text-[#ffb454]!">
                {product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous product"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/16 text-white/70 transition hover:border-white/35 hover:text-white"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => setStopped((s) => !s)}
            aria-label={
              stopped ? "Resume automatic rotation" : "Pause automatic rotation"
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/16 text-white/70 transition hover:border-white/35 hover:text-white"
          >
            {stopped ? <Play size={15} /> : <Pause size={15} />}
          </button>

          <div className="flex items-center gap-2">
            {products.map((product, i) => (
              <button
                key={product.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${product.title}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-11 items-center px-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-white/80"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next product"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/16 text-white/70 transition hover:border-white/35 hover:text-white"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;
