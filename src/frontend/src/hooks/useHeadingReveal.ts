import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a heading wrapper.
 * When the element enters the viewport it animates in with a
 * fade-up + gold-shimmer reveal.
 */
export function useHeadingReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial hidden state
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "none";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Small delay so it fires after paint
            requestAnimationFrame(() => {
              el.style.transition =
                "opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
