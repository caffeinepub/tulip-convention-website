import { useCallback, useEffect, useRef } from "react";
import { useParallax } from "../hooks/useParallax";

const petalPositions = [
  {
    left: "5%",
    bottom: "10%",
    delay: "0s",
    duration: "6.2s",
    size: 18,
    id: "p1",
  },
  {
    left: "13%",
    bottom: "20%",
    delay: "1.4s",
    duration: "7.5s",
    size: 12,
    id: "p2",
  },
  {
    left: "20%",
    bottom: "8%",
    delay: "0.7s",
    duration: "5.8s",
    size: 22,
    id: "p3",
  },
  {
    left: "28%",
    bottom: "25%",
    delay: "2.3s",
    duration: "8.0s",
    size: 14,
    id: "p4",
  },
  {
    left: "36%",
    bottom: "5%",
    delay: "0.3s",
    duration: "6.6s",
    size: 20,
    id: "p5",
  },
  {
    left: "44%",
    bottom: "18%",
    delay: "1.9s",
    duration: "7.1s",
    size: 10,
    id: "p6",
  },
  {
    left: "52%",
    bottom: "12%",
    delay: "3.2s",
    duration: "5.5s",
    size: 26,
    id: "p7",
  },
  {
    left: "60%",
    bottom: "22%",
    delay: "0.5s",
    duration: "7.8s",
    size: 16,
    id: "p8",
  },
  {
    left: "67%",
    bottom: "7%",
    delay: "2.8s",
    duration: "6.3s",
    size: 24,
    id: "p9",
  },
  {
    left: "74%",
    bottom: "28%",
    delay: "1.1s",
    duration: "5.9s",
    size: 13,
    id: "p10",
  },
  {
    left: "81%",
    bottom: "14%",
    delay: "3.6s",
    duration: "7.2s",
    size: 20,
    id: "p11",
  },
  {
    left: "88%",
    bottom: "20%",
    delay: "0.9s",
    duration: "6.7s",
    size: 17,
    id: "p12",
  },
  {
    left: "93%",
    bottom: "8%",
    delay: "2.0s",
    duration: "5.4s",
    size: 28,
    id: "p13",
  },
  {
    left: "10%",
    bottom: "35%",
    delay: "4.1s",
    duration: "8.2s",
    size: 11,
    id: "p14",
  },
  {
    left: "48%",
    bottom: "32%",
    delay: "1.6s",
    duration: "6.9s",
    size: 15,
    id: "p15",
  },
  {
    left: "76%",
    bottom: "38%",
    delay: "2.9s",
    duration: "7.4s",
    size: 9,
    id: "p16",
  },
];

function TulipFlower({ size }: { size: number }) {
  const w = size;
  const h = size * 1.75;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 40 70"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <line
        x1="20"
        y1="65"
        x2="20"
        y2="38"
        stroke="oklch(0.55 0.15 145)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 20 52 C 10 50 4 44 6 38 C 8 42 14 46 20 46"
        fill="oklch(0.52 0.14 140)"
        opacity="0.85"
      />
      <path
        d="M 20 50 C 30 47 36 41 34 35 C 32 39 26 44 20 45"
        fill="oklch(0.52 0.14 140)"
        opacity="0.85"
      />
      <ellipse
        cx="14"
        cy="26"
        rx="5"
        ry="13"
        transform="rotate(-18 14 26)"
        fill="oklch(0.62 0.25 355)"
        opacity="0.75"
      />
      <ellipse
        cx="26"
        cy="26"
        rx="5"
        ry="13"
        transform="rotate(18 26 26)"
        fill="oklch(0.62 0.25 355)"
        opacity="0.75"
      />
      <ellipse
        cx="20"
        cy="22"
        rx="5"
        ry="14"
        fill="oklch(0.68 0.22 350)"
        opacity="0.8"
      />
      <ellipse
        cx="13"
        cy="31"
        rx="6"
        ry="12"
        transform="rotate(-28 13 31)"
        fill="oklch(0.72 0.18 345)"
        opacity="0.9"
      />
      <ellipse
        cx="27"
        cy="31"
        rx="6"
        ry="12"
        transform="rotate(28 27 31)"
        fill="oklch(0.72 0.18 345)"
        opacity="0.9"
      />
      <ellipse
        cx="20"
        cy="32"
        rx="7"
        ry="13"
        fill="oklch(0.76 0.20 342)"
        opacity="0.95"
      />
    </svg>
  );
}

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  // Parallax: background moves at 40% of scroll speed
  const bgParallaxRef = useParallax<HTMLDivElement>(0.38);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      const t = setTimeout(() => {
        el.style.transition =
          "opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 120);
      return () => clearTimeout(t);
    }
  }, []);

  const handleEnquire = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleExplore = useCallback(() => {
    const el = document.getElementById("gallery");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background image layer */}
      <div
        ref={bgParallaxRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // Slightly taller than container so parallax shift doesn't expose edges
          top: "-8%",
          bottom: "-8%",
        }}
        aria-hidden="true"
      />

      {/* Deep plum/magenta gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(45,8,35,0.90) 0%, rgba(80,15,55,0.55) 45%, rgba(45,8,35,0.94) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Soft radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,60,130,0.18) 0%, rgba(210,100,160,0.10) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Floating tulip flowers */}
      {petalPositions.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none animate-float-petal"
          style={{
            left: p.left,
            bottom: p.bottom,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.75,
            filter:
              "drop-shadow(0 0 8px rgba(220,80,150,0.7)) drop-shadow(0 0 3px rgba(255,140,200,0.4))",
          }}
          aria-hidden="true"
        >
          <TulipFlower size={p.size} />
        </div>
      ))}

      {/* Decorative top-line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(220,175,60,0.65) 40%, rgba(220,175,60,0.65) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Headline radial glow ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 50% 42%, rgba(220,175,60,0.10) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Location tag */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="h-px w-8 bg-tulip-gold opacity-70" />
          <span className="text-tulip-gold font-body text-xs tracking-[0.28em] uppercase opacity-95">
            Hanamkonda, Telangana
          </span>
          <div className="h-px w-8 bg-tulip-gold opacity-70" />
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light text-tulip-cream leading-[0.92] tracking-wide mb-6 text-glow-cream">
          Tulip
          <br />
          <span className="gold-shimmer font-semibold italic text-glow-gold-strong">
            Convention
          </span>
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest">
            &amp; Banquet
          </span>
        </h1>

        {/* Divider line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div
            className="h-px w-16 md:w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.76 0.16 65))",
            }}
          />
          <span className="text-tulip-gold opacity-90" aria-hidden="true">
            ✦
          </span>
          <div
            className="h-px w-16 md:w-24"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.76 0.16 65), transparent)",
            }}
          />
        </div>

        {/* Sub-headline */}
        <p className="text-3xl md:text-4xl font-accent text-tulip-gold text-glow-gold mb-12 tracking-wide">
          Your Dream Event Starts Here
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleEnquire}
            className="group px-10 py-4 font-body font-semibold text-sm tracking-[0.18em] uppercase bg-tulip-gold text-tulip-brown hover:bg-tulip-gold-dark transition-all duration-300 rounded-sm shadow-gold glow-gold hover:-translate-y-0.5"
            style={{
              boxShadow:
                "0 0 24px rgba(220,175,60,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            data-ocid="hero.primary_button"
          >
            Book Your Event
          </button>
          <button
            type="button"
            onClick={handleExplore}
            className="px-10 py-4 font-body font-semibold text-sm tracking-[0.18em] uppercase border border-tulip-cream/50 text-tulip-cream hover:border-tulip-gold hover:text-tulip-gold transition-all duration-300 rounded-sm backdrop-blur-sm hover:-translate-y-0.5"
            data-ocid="hero.secondary_button"
          >
            Explore Venue
          </button>
        </div>

        {/* Bottom location badge */}
        <div className="mt-16 inline-flex items-center gap-2 text-xs text-tulip-cream/65 font-body tracking-wider">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          2-6-968, KLN Reddy Colony Rd, Hanamkonda
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        className="absolute bottom-8 left-1/2"
        style={{ animation: "chevronBounce 2.2s ease-in-out infinite" }}
        aria-hidden="true"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="oklch(0.76 0.16 65)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Scroll down"
          style={{ filter: "drop-shadow(0 0 8px rgba(220,175,60,0.85))" }}
        >
          <title>Scroll down</title>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
