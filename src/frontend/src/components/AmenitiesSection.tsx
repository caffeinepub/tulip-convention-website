import { useHeadingReveal } from "../hooks/useHeadingReveal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const amenities = [
  { icon: "🏛", label: "Spacious Hall" },
  { icon: "🔊", label: "Sound System" },
  { icon: "❄️", label: "Air Conditioning" },
  { icon: "🍽", label: "Catering" },
  { icon: "🚗", label: "Ample Parking" },
  { icon: "🌸", label: "Decoration" },
  { icon: "🕐", label: "24/7 Open" },
  { icon: "📸", label: "Photo Spots" },
];

export function AmenitiesSection() {
  const headingRef = useHeadingReveal<HTMLDivElement>();
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="amenities" className="py-20 md:py-28 bg-cream">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Animated heading */}
        <div ref={headingRef} className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-rose mb-4">
            Everything You Need
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-tulip-gold">
            World-Class{" "}
            <span
              className="italic font-semibold text-glow-gold"
              style={{ color: "oklch(0.42 0.12 8)" }}
            >
              Amenities
            </span>
          </h2>
        </div>

        {/* Subtle radial glow behind pills */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none pulse-gold"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.76 0.16 65 / 0.06) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Pill badges */}
          <div
            ref={ref}
            className="flex flex-wrap justify-center gap-3 relative z-10"
          >
            {amenities.map((item, i) => (
              <div
                key={item.label}
                className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-tulip-gold/30 bg-white hover:border-tulip-gold hover:shadow-gold transition-all duration-300 cursor-default animate-counter-up"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  animationFillMode: "both",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.76 0.16 65 / 0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "oklch(0.76 0.16 65 / 0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                }}
                data-ocid={`amenities.item.${i + 1}`}
              >
                <span className="text-xl" role="img" aria-label={item.label}>
                  {item.icon}
                </span>
                <span className="font-body text-sm font-medium text-tulip-gold/85 group-hover:text-tulip-gold transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center font-display text-lg md:text-xl italic text-tulip-gold/60 mt-12">
          Everything in place so you can focus on the moments that matter.
        </p>
      </div>
    </section>
  );
}
