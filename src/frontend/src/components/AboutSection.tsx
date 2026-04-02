import { useHeadingReveal } from "../hooks/useHeadingReveal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const stats = [
  { number: "500+", label: "Events Hosted" },
  { number: "24/7", label: "Always Available" },
  { number: "4.5★", label: "Google Rating" },
  { number: "100%", label: "Satisfaction" },
];

export function AboutSection() {
  const headingRef = useHeadingReveal<HTMLDivElement>();
  const leftRef = useScrollAnimation<HTMLDivElement>();
  const rightRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.19 0.085 8)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Animated heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-gold/90 mb-3">
            Our Story
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-tulip-cream">
            About{" "}
            <span className="italic font-semibold text-tulip-gold text-glow-gold-strong">
              Tulip
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT — Quote + intro */}
          <div
            ref={leftRef}
            className="animate-slide-left"
            style={{ animationFillMode: "both" }}
          >
            <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl font-light italic text-tulip-cream leading-tight mb-8">
              &ldquo;Creating unforgettable
              <br />
              <span className="text-tulip-gold font-semibold text-glow-gold-strong">
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
            <div className="inline-flex items-center gap-3 border border-tulip-gold/40 rounded-full px-5 py-2.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((k) => (
                  <svg
                    key={k}
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="oklch(0.76 0.16 65)"
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
                      <stop offset="50%" stopColor="oklch(0.76 0.16 65)" />
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
          <div className="relative">
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.76 0.16 65 / 0.08) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div
              ref={rightRef}
              className="grid grid-cols-2 gap-px bg-tulip-gold/10 rounded-2xl overflow-hidden border border-tulip-gold/25"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center justify-center py-12 px-6 text-center animate-counter-up transition-all duration-300 hover:border-glow-gold"
                  style={{
                    backgroundColor: "oklch(0.24 0.095 6)",
                    animationDelay: `${i * 0.12}s`,
                    animationFillMode: "both",
                  }}
                  data-ocid={`about.item.${i + 1}`}
                >
                  <span className="font-display text-5xl md:text-6xl font-bold text-tulip-gold text-glow-gold-strong leading-none mb-2">
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
      </div>
    </section>
  );
}
