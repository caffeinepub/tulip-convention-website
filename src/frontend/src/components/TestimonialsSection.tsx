import { useCallback, useEffect, useRef, useState } from "react";
import { useHeadingReveal } from "../hooks/useHeadingReveal";

const reviews = [
  {
    name: "Priya Reddy",
    event: "Wedding Reception",
    text: "Absolutely beautiful. The décor was exquisite and the staff incredibly attentive. Guests couldn't stop complimenting the venue.",
    rating: 5,
  },
  {
    name: "Venkatesh Sharma",
    event: "Corporate Conference",
    text: "Outstanding for our annual conference. Professional AV setup, spacious, excellent catering. Will definitely book again.",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    event: "Birthday Celebration",
    text: "Celebrated my mother's 60th birthday here. Stunning decoration and delicious food — a truly memorable evening.",
    rating: 4,
  },
  {
    name: "Ravi Kumar Naik",
    event: "Engagement Ceremony",
    text: "Beautiful venue for our engagement. The flower arrangements were perfect and pricing was great. Family was very impressed!",
    rating: 5,
  },
];

const dotKeys = ["dot-0", "dot-1", "dot-2", "dot-3"];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((k) => (
        <svg
          key={k}
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill={
            k <= rating ? "oklch(0.75 0.20 30)" : "oklch(0.75 0.20 30 / 0.18)"
          }
          style={
            k <= rating
              ? { filter: "drop-shadow(0 0 5px oklch(0.75 0.20 30 / 0.8))" }
              : {}
          }
          aria-hidden="true"
        >
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.35l-3.71 2.2.71-4.13L2 5.5l4.15-.75z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const headingRef = useHeadingReveal<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState<"prev" | "next" | null>(
    null,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % reviews.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length);
    startTimer();
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % reviews.length);
    startTimer();
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    startTimer();
  };

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
  ];

  const arrowGlow = "0 0 12px oklch(0.76 0.16 65 / 0.5)";

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.22 0.10 10)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Animated heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-gold/90 mb-4">
            Real Experiences
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-tulip-cream">
            What Guests{" "}
            <span className="italic font-semibold text-tulip-gold text-glow-gold">
              Say
            </span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleReviews.map((review, i) => (
              <article
                key={`${review.name}-${currentIndex}-${i}`}
                className="animate-fade-in-scale border rounded-2xl p-8 flex flex-col"
                style={{
                  backgroundColor: "oklch(0.28 0.11 8)",
                  borderColor: "oklch(0.76 0.18 20 / 0.45)",
                  animationFillMode: "both",
                  animationDelay: `${i * 0.1}s`,
                }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div
                  className="font-display text-8xl leading-none mb-4"
                  style={{
                    color: "oklch(0.82 0.18 68)",
                    textShadow:
                      "0 0 16px oklch(0.82 0.18 68 / 0.8), 0 0 36px oklch(0.76 0.16 65 / 0.5), 0 0 60px oklch(0.40 0.12 8 / 0.3)",
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <p className="font-display text-lg italic text-tulip-cream leading-relaxed flex-1">
                  {review.text}
                </p>
                <div
                  className="mt-8 pt-6 border-t"
                  style={{ borderColor: "oklch(0.76 0.16 65 / 0.35)" }}
                >
                  <StarDisplay rating={review.rating} />
                  <div className="mt-3">
                    <div
                      className="font-body font-semibold text-sm tracking-wide"
                      style={{ color: "oklch(0.82 0.18 68)" }}
                    >
                      {review.name}
                    </div>
                    <div className="font-body text-xs text-tulip-cream/80 mt-1 tracking-wider uppercase">
                      {review.event}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => setHoveredArrow("prev")}
              onMouseLeave={() => setHoveredArrow(null)}
              className="w-10 h-10 rounded-full border border-tulip-gold/40 text-tulip-gold hover:bg-tulip-gold hover:text-tulip-brown transition-all duration-200 flex items-center justify-center text-lg"
              style={{
                boxShadow: hoveredArrow === "prev" ? arrowGlow : "none",
              }}
              aria-label="Previous testimonial"
              data-ocid="testimonials.pagination_prev"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  type="button"
                  key={dotKeys[i]}
                  onClick={() => {
                    setCurrentIndex(i);
                    startTimer();
                  }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === currentIndex ? "24px" : "6px",
                    height: "6px",
                    backgroundColor:
                      i === currentIndex
                        ? "oklch(0.76 0.16 65)"
                        : "oklch(0.72 0.18 12 / 0.4)",
                    boxShadow:
                      i === currentIndex
                        ? "0 0 8px oklch(0.76 0.16 65 / 0.8)"
                        : "none",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => setHoveredArrow("next")}
              onMouseLeave={() => setHoveredArrow(null)}
              className="w-10 h-10 rounded-full border border-tulip-gold/40 text-tulip-gold hover:bg-tulip-gold hover:text-tulip-brown transition-all duration-200 flex items-center justify-center text-lg"
              style={{
                boxShadow: hoveredArrow === "next" ? arrowGlow : "none",
              }}
              aria-label="Next testimonial"
              data-ocid="testimonials.pagination_next"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
