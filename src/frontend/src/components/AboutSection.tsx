import { useHeadingReveal } from "../hooks/useHeadingReveal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const stats = [
  {
    number: "500+",
    label: "Events Hosted",
    icon: "🎉",
    desc: "Grand weddings to intimate celebrations",
  },
  {
    number: "24/7",
    label: "Always Available",
    icon: "🕐",
    desc: "Round-the-clock support for your event",
  },
  {
    number: "4.5★",
    label: "Google Rating",
    icon: "⭐",
    desc: "Loved by 21+ verified guests on Google",
  },
  {
    number: "100%",
    label: "Satisfaction",
    icon: "✨",
    desc: "Every event crafted to perfection",
  },
];

export function AboutSection() {
  const headingRef = useHeadingReveal<HTMLDivElement>();
  const imageRef = useScrollAnimation<HTMLDivElement>();
  const textRef = useScrollAnimation<HTMLDivElement>();
  const statsRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.19 0.085 8)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Animated heading */}
        <div ref={headingRef} className="text-center mb-16">
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

        {/* Image + Text row */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Venue image */}
          <div
            ref={imageRef}
            className="animate-slide-left relative rounded-2xl overflow-hidden"
            style={{
              animationFillMode: "both",
              boxShadow:
                "0 0 40px oklch(0.76 0.16 65 / 0.18), 0 8px 40px oklch(0.16 0.07 10 / 0.6)",
            }}
          >
            {/* Gold border glow frame */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-10"
              style={{
                border: "1px solid oklch(0.76 0.16 65 / 0.35)",
                boxShadow: "inset 0 0 32px oklch(0.76 0.16 65 / 0.07)",
              }}
              aria-hidden="true"
            />
            <img
              src="/assets/generated/gallery-exterior.dim_600x400.jpg"
              alt="Tulip Convention & Banquet venue exterior"
              className="w-full h-72 lg:h-96 object-cover"
            />
            {/* Subtle gradient overlay on image */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, oklch(0.16 0.07 10 / 0.65) 100%)",
              }}
              aria-hidden="true"
            />
            {/* Floating label */}
            <div className="absolute bottom-4 left-4 z-20">
              <span
                className="font-body text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "oklch(0.16 0.07 10 / 0.75)",
                  border: "1px solid oklch(0.76 0.16 65 / 0.4)",
                  color: "oklch(0.76 0.16 65)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Hanamkonda, Telangana
              </span>
            </div>
          </div>

          {/* Text content */}
          <div
            ref={textRef}
            className="animate-slide-right"
            style={{ animationFillMode: "both" }}
          >
            <blockquote className="font-display text-3xl sm:text-4xl font-light italic text-tulip-cream leading-tight mb-6">
              &ldquo;Creating unforgettable
              <br />
              <span className="text-tulip-gold font-semibold text-glow-gold-strong">
                celebrations
              </span>
              <br />
              since 2020.&rdquo;
            </blockquote>

            <p className="font-body text-base gold-shimmer text-glow-gold-strong leading-relaxed mb-8">
              Tulip Convention &amp; Banquet brings elegance and warmth to every
              occasion — from intimate family milestones to grand corporate
              gatherings. Our dedicated team ensures every detail is crafted
              with care and precision.
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
        </div>

        {/* Card-based stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative rounded-xl overflow-hidden animate-counter-up"
              style={{
                animationDelay: `${i * 0.12}s`,
                animationFillMode: "both",
                backgroundColor: "oklch(0.24 0.095 6)",
                border: "1px solid oklch(0.76 0.16 65 / 0.2)",
                boxShadow: "0 4px 24px oklch(0.16 0.07 10 / 0.5)",
              }}
              data-ocid={`about.item.${i + 1}`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.76 0.16 65 / 0.12) 0%, transparent 70%)",
                  boxShadow: "inset 0 0 0 1px oklch(0.76 0.16 65 / 0.4)",
                }}
                aria-hidden="true"
              />
              {/* Top gold accent line */}
              <div
                className="h-0.5 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.76 0.16 65 / 0.7), transparent)",
                }}
                aria-hidden="true"
              />
              <div className="px-6 py-6 flex items-center gap-5">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: "oklch(0.76 0.16 65 / 0.12)",
                    border: "1px solid oklch(0.76 0.16 65 / 0.25)",
                  }}
                  aria-hidden="true"
                >
                  {stat.icon}
                </div>
                {/* Text */}
                <div className="min-w-0">
                  <div className="font-display text-3xl font-bold text-tulip-gold text-glow-gold-strong leading-none mb-0.5">
                    {stat.number}
                  </div>
                  <div className="font-body text-xs tracking-[0.16em] uppercase text-tulip-cream font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="font-body text-[11px] text-tulip-cream/55 leading-snug">
                    {stat.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
