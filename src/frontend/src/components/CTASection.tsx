export function CTASection() {
  const handleEnquire = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: "oklch(0.40 0.14 8)" }}
    >
      {/* Gold radial glow – stronger */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.76 0.16 65 / 0.30) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle top & bottom lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.76 0.16 65 / 0.6), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.76 0.16 65 / 0.6), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-tulip-gold/90 mb-6">
          Let&apos;s Create Something Beautiful
        </p>
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-tulip-cream leading-tight mb-6">
          Ready to Create Your{" "}
          <span className="italic font-semibold gold-shimmer">
            Perfect Event?
          </span>
        </h2>
        <p className="font-body text-base md:text-lg text-tulip-cream/85 mb-12 max-w-xl mx-auto leading-relaxed">
          Talk to our team today &mdash; we&apos;ll make your vision a reality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleEnquire}
            className="px-12 py-5 font-body font-semibold text-sm tracking-[0.15em] uppercase bg-tulip-gold text-tulip-brown hover:bg-tulip-gold-dark rounded-sm shadow-gold glow-gold hover:-translate-y-0.5 transition-all duration-300"
            data-ocid="cta.primary_button"
          >
            Enquire Now
          </button>
          <a
            href="tel:+919949167731"
            className="px-12 py-5 font-body font-semibold text-sm tracking-[0.15em] uppercase border border-tulip-cream/50 text-tulip-cream hover:border-tulip-gold hover:text-tulip-gold rounded-sm backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            data-ocid="cta.secondary_button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.21 2 2 0 012.06 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
            </svg>
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
