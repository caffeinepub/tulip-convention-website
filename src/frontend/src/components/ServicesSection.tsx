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
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="services" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-rose mb-4">
            What We Offer
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-tulip-mauve leading-tight">
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
              className="group relative bg-white border border-tulip-gold/20 rounded-xl p-8 hover:-translate-y-1.5 hover:border-tulip-gold/60 hover:shadow-gold transition-all duration-300 cursor-default overflow-hidden"
              data-ocid={`services.item.${i + 1}`}
            >
              {/* Gold left accent bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, oklch(0.73 0.1 70), transparent)",
                }}
                aria-hidden="true"
              />

              <div
                className="text-5xl mb-5 inline-block transition-transform duration-300 group-hover:scale-110"
                role="img"
                aria-label={service.title}
              >
                {service.icon}
              </div>

              <h3 className="font-display text-xl font-semibold text-tulip-mauve mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="font-body text-sm text-foreground/60 leading-relaxed">
                {service.line}
              </p>

              {/* Corner decoration */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at bottom right, oklch(0.73 0.1 70 / 0.1), transparent 70%)",
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
