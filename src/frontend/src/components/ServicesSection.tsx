import { useHeadingReveal } from "../hooks/useHeadingReveal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const services = [
  {
    icon: "💍",
    title: "Weddings & Receptions",
    line: "Your perfect day, beautifully orchestrated.",
  },
  {
    icon: "💫",
    title: "Engagements",
    line: "Begin your forever in elegant style.",
  },
  {
    icon: "🏢",
    title: "Corporate Events",
    line: "Professional setups for impactful gatherings.",
  },
  {
    icon: "🎂",
    title: "Birthday Parties",
    line: "Themed celebrations tailored to your vision.",
  },
  {
    icon: "🌹",
    title: "Anniversaries",
    line: "Milestones celebrated with warmth and grace.",
  },
  {
    icon: "🎉",
    title: "Social Gatherings",
    line: "Festive occasions for every community.",
  },
];

export function ServicesSection() {
  const headingRef = useHeadingReveal<HTMLDivElement>();
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="services" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Animated section heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-rose mb-4">
            What We Offer
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-light text-tulip-gold leading-tight">
            Events We <span className="italic font-semibold">Host</span>
          </h2>
        </div>

        {/* Service cards */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <article
              key={service.title}
              className="group relative bg-white border border-tulip-gold/20 rounded-xl p-8 hover:-translate-y-2 hover:border-tulip-gold/80 transition-all duration-300 cursor-default overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(220,175,60,0.06)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 40px rgba(220,175,60,0.3), 0 0 0 1.5px rgba(220,175,60,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px rgba(220,175,60,0.06)";
              }}
              data-ocid={`services.item.${i + 1}`}
            >
              {/* Gold left accent bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, oklch(0.76 0.16 65), transparent)",
                }}
                aria-hidden="true"
              />
              <div
                className="text-5xl mb-5 inline-block transition-all duration-300 group-hover:scale-110 group-hover:text-6xl"
                role="img"
                aria-label={service.title}
              >
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-tulip-gold mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="font-body text-sm text-tulip-gold/75 leading-relaxed">
                {service.line}
              </p>
              <div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at bottom right, oklch(0.76 0.16 65 / 0.12), transparent 70%)",
                }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
