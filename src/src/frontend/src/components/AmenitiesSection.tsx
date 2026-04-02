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
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="amenities" className="py-20 md:py-28 bg-cream">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-rose mb-4">
            Everything You Need
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-tulip-mauve">
            World-Class <span className="italic font-semibold">Amenities</span>
          </h2>
        </div>

        {/* Pill badges */}
        <div ref={ref} className="flex flex-wrap justify-center gap-3">
          {amenities.map((item, i) => (
            <div
              key={item.label}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-tulip-gold/30 bg-white hover:border-tulip-gold hover:bg-tulip-gold/8 hover:shadow-gold transition-all duration-250 cursor-default animate-counter-up"
              style={{
                animationDelay: `${i * 0.08}s`,
                animationFillMode: "both",
              }}
              data-ocid={`amenities.item.${i + 1}`}
            >
              <span className="text-xl" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <span className="font-body text-sm font-medium text-foreground/75 group-hover:text-tulip-mauve transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Punchy tagline */}
        <p className="text-center font-display text-lg md:text-xl italic text-tulip-mauve/60 mt-12">
          Everything in place so you can focus on the moments that matter.
        </p>
      </div>
    </section>
  );
}
