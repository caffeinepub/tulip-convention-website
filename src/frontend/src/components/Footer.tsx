import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Amenities", href: "#amenities" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="text-tulip-gold"
      style={{ backgroundColor: "oklch(0.15 0.07 10)" }}
    >
      {/* Decorative top line */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.76 0.16 65 / 0.6), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="text-xl"
                style={{ filter: "drop-shadow(0 0 8px rgba(220,175,60,0.8))" }}
              >
                🌷
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-bold text-tulip-gold tracking-[0.35em] text-glow-gold">
                  TULIP
                </span>
                <span className="font-body text-[9px] text-tulip-gold/65 tracking-[0.2em] uppercase">
                  Convention &amp; Banquet
                </span>
              </div>
            </div>
            <p className="font-accent text-lg text-tulip-gold/80 mb-5">
              Your Dream Event Starts Here
            </p>
            <div className="flex gap-2.5">
              <button
                type="button"
                aria-label="Facebook"
                className="p-2 rounded-sm border border-tulip-gold/25 text-tulip-gold/70 hover:border-tulip-gold hover:text-tulip-gold hover:shadow-gold transition-all duration-300"
                data-ocid="footer.link"
              >
                <SiFacebook size={14} />
              </button>
              <button
                type="button"
                aria-label="Instagram"
                className="p-2 rounded-sm border border-tulip-gold/25 text-tulip-gold/70 hover:border-tulip-gold hover:text-tulip-gold hover:shadow-gold transition-all duration-300"
                data-ocid="footer.link"
              >
                <SiInstagram size={14} />
              </button>
              <button
                type="button"
                aria-label="YouTube"
                className="p-2 rounded-sm border border-tulip-gold/25 text-tulip-gold/70 hover:border-tulip-gold hover:text-tulip-gold hover:shadow-gold transition-all duration-300"
                data-ocid="footer.link"
              >
                <SiYoutube size={14} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.25em] uppercase text-tulip-gold/85 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="font-body text-sm text-tulip-gold/75 hover:text-tulip-gold transition-colors text-left"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.25em] uppercase text-tulip-gold/85 mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+919949167731"
                className="flex items-center gap-2 font-body text-sm text-tulip-gold/75 hover:text-tulip-gold transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.21 2 2 0 012.06 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
                </svg>
                +91-9949167731
              </a>
              <p className="flex items-start gap-2 font-body text-sm text-tulip-gold/70">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Hanamkonda, Telangana 506001
              </p>
              <p className="flex items-center gap-2 font-body text-sm text-tulip-gold/70">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Open 24 hours, 7 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "oklch(0.76 0.16 65 / 0.18)" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <p className="font-body text-xs text-tulip-gold/60">
              © {year} Tulip Convention and Banquet.
            </p>
            <a
              href="?page=admin"
              className="font-body text-xs text-tulip-gold/35 hover:text-tulip-gold/65 transition-opacity"
              data-ocid="footer.link"
            >
              Admin
            </a>
          </div>
          <p className="font-body text-xs text-tulip-gold/50">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tulip-gold/75 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
