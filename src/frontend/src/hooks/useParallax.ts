import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to the parallax background element.
 * The element will shift vertically as the user scrolls,
 * creating a depth effect.
 *
 * @param speed  0 = no movement, 0.4 = moderate, 1 = full scroll speed
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.4,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          el.style.transform = `translateY(${scrollY * speed}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}
