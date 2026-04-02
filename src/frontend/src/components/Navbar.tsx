import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-glow" : ""
      }`}
      style={{
        backgroundColor: scrolled
          ? "oklch(0.16 0.07 10 / 0.98)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 sm:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => handleNavClick("#home")}
            aria-label="Go to top"
            data-ocid="nav.link"
          >
            <span
              className="text-xl"
              aria-hidden="true"
              style={{ filter: "drop-shadow(0 0 8px rgba(220,175,60,0.85))" }}
            >
              🌷
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-bold text-tulip-gold tracking-[0.35em] text-glow-gold">
                TULIP
              </span>
              <span className="font-body text-[9px] text-tulip-cream/70 tracking-[0.22em] uppercase">
                Convention &amp; Banquet
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-2 font-body text-xs tracking-[0.1em] uppercase font-medium rounded transition-colors relative group ${
                    activeSection === link.href.slice(1)
                      ? "text-tulip-gold text-glow-gold"
                      : "text-tulip-cream/85 hover:text-tulip-cream"
                  }`}
                  data-ocid="nav.link"
                  aria-current={
                    activeSection === link.href.slice(1) ? "page" : undefined
                  }
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-tulip-gold rounded-full transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? "w-4/5"
                        : "w-0 group-hover:w-3/5"
                    }`}
                    style={{
                      boxShadow:
                        activeSection === link.href.slice(1)
                          ? "0 0 10px rgba(220,175,60,0.9)"
                          : "none",
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="hidden lg:block px-5 py-2.5 rounded-sm font-body font-semibold text-xs tracking-[0.12em] uppercase bg-tulip-gold text-tulip-brown hover:bg-tulip-gold-dark transition-colors glow-gold"
            data-ocid="nav.primary_button"
          >
            Book Now
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-tulip-cream hover:text-tulip-gold transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            data-ocid="nav.toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            backgroundColor: "oklch(0.16 0.07 10 / 0.98)",
            borderColor: "oklch(0.76 0.16 65 / 0.25)",
            backdropFilter: "blur(14px)",
          }}
        >
          <ul className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left px-3 py-3 rounded font-body text-sm font-medium tracking-wide transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-tulip-gold text-glow-gold"
                      : "text-tulip-cream/85 hover:text-tulip-cream"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="block w-full text-center px-5 py-3 rounded-sm bg-tulip-gold text-tulip-brown font-body font-semibold text-sm tracking-wider uppercase glow-gold"
                data-ocid="nav.primary_button"
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
