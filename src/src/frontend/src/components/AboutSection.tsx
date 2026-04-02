import { useScrollAnimation } from "../hooks/useScrollAnimation";

const stats = [
  { number: "500+", label: "Events Hosted" },
  { number: "24/7", label: "Always Available" },
  { number: "4.5★", label: "Google Rating" },
  { number: "100%", label: "Satisfaction" },
];

export function AboutSection() {
  const leftRef = useScrollAnimation<HTMLDivElement>();
  const rightRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.22 0.08 10)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT — Quote + intro */}
          <div
            ref={leftRef}
            className="animate-slide-left"
            style={{ animationFillMode: "both" }}
          >
            <p className="font-body text-xs tracking-[0.25em] uppercase text-tulip-gold opacity-90 mb-6">
              Our Story
            </p>
            <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl font-light italic text-tulip-cream leading-tight mb-8">
              &ldquo;Creating unforgettable
              <br />
              <span className="text-tulip-gold font-semibold">
                celebrations
              </span>
              <br />
              since 2020.&rdquo;
            </blockquote>

            <p className="font-body text-base text-tulip-cream/90 leading-relaxed mb-8 max-w-md">
              Tulip Convention &amp; Banquet brings elegance and warmth to every
              occasion — from intimate family milestones to grand corporate
              gatherings.
            </p>

            {/* Google rating badge */}
            <div className="inline-flex items-center gap-3 border border-tulip-gold/30 rounded-full px-5 py-2.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((k) => (
                  <svg
                    key={k}
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="oklch(0.73 0.1 70)"
                    aria-hidden="true"
                  >
                    <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.35l-3.71 2.2.71-4.13L2 5.5l4.15-.75z" />
                  </svg>
                ))}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="half-about">
                      <stop offset="50%" stopColor="oklch(0.73 0.1 70)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.35l-3.71 2.2.71-4.13L2 5.5l4.15-.75z"
                    fill="url(#half-about)"
                  />
                </svg>
              </div>
              <span className="font-body text-sm text-tulip-cream/90">
                4.5 ⭐ on Google &middot; 21 Reviews
              </span>
            </div>
          </div>

          {/* RIGHT — Stats grid */}
          <div
            ref={rightRef}
            className="grid grid-cols-2 gap-px bg-tulip-gold/10 rounded-2xl overflow-hidden border border-tulip-gold/20"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-12 px-6 text-center animate-counter-up"
                style={{
                  backgroundColor: "oklch(0.27 0.09 8)",
                  animationDelay: `${i * 0.12}s`,
                  animationFillMode: "both",
                }}
                data-ocid={`about.item.${i + 1}`}
              >
                <span className="font-display text-4xl md:text-5xl font-semibold text-tulip-gold text-glow-gold leading-none mb-2">
                  {stat.number}
                </span>
                <span className="font-body text-xs tracking-[0.18em] uppercase text-tulip-cream/75 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
