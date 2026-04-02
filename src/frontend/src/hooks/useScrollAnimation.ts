import { useEffect, useRef } from "react";

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            entry.target.classList.remove("section-hidden");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold },
    );

    el.classList.add("section-hidden");
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
