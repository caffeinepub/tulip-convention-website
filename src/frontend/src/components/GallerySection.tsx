import { X } from "lucide-react";
import { useState } from "react";
import { useHeadingReveal } from "../hooks/useHeadingReveal";

const galleryImages = [
  {
    src: "/assets/generated/gallery-wedding.dim_600x400.jpg",
    alt: "Wedding reception at Tulip Convention",
    label: "Weddings",
    wide: true,
  },
  {
    src: "/assets/generated/gallery-exterior.dim_600x400.jpg",
    alt: "Tulip Convention exterior",
    label: "Our Venue",
    wide: false,
  },
  {
    src: "/assets/generated/gallery-engagement.dim_600x400.jpg",
    alt: "Engagement ceremony setup",
    label: "Engagements",
    wide: false,
  },
  {
    src: "/assets/generated/gallery-birthday.dim_600x400.jpg",
    alt: "Birthday party decoration",
    label: "Birthdays",
    wide: false,
  },
  {
    src: "/assets/generated/gallery-corporate.dim_600x400.jpg",
    alt: "Corporate conference setup",
    label: "Corporate",
    wide: false,
  },
  {
    src: "/assets/generated/gallery-wedding.dim_600x400.jpg",
    alt: "Grand celebration hall",
    label: "Celebrations",
    wide: true,
  },
];

export function GallerySection() {
  const headingRef = useHeadingReveal<HTMLDivElement>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length,
    );
  const next = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % galleryImages.length,
    );

  return (
    <section
      id="gallery"
      className="py-24 md:py-32"
      style={{ backgroundColor: "oklch(0.17 0.08 12)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Animated heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-gold/90 mb-4">
            Visual Stories
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-tulip-cream">
            Our{" "}
            <span className="italic font-semibold text-tulip-gold text-glow-gold">
              Gallery
            </span>
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImages.map((img, i) => (
            <button
              type="button"
              key={`${img.src}-${i}`}
              className={`relative overflow-hidden group cursor-pointer focus:outline-none rounded-lg ${
                img.wide ? "col-span-2" : "col-span-1"
              } ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${img.label} photo`}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              {/* Deep plum overlay (no black) + gold tint on hover */}
              <div
                className="absolute inset-0 transition-colors duration-400"
                style={{
                  background: "oklch(0.15 0.06 10 / 0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.76 0.16 65 / 0.22)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "oklch(0.15 0.06 10 / 0.35)";
                }}
                aria-hidden="true"
              />
              {/* Label */}
              <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
                <span
                  className="font-display text-sm font-semibold tracking-widest uppercase text-tulip-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  style={{
                    textShadow:
                      "0 0 12px rgba(220,175,60,0.9), 0 0 24px rgba(220,175,60,0.4)",
                  }}
                >
                  {img.label}
                </span>
              </div>
              {/* Gold inset border ring on hover */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 2px oklch(0.76 0.16 65 / 0.8)",
                }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox — deep plum backdrop instead of black */}
      {lightboxIndex !== null && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 m-0 max-w-none max-h-none w-full h-full border-none"
          style={{ background: "oklch(0.12 0.05 10 / 0.95)" }}
          aria-label="Image lightbox"
          data-ocid="gallery.modal"
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-tulip-cream/80 hover:text-tulip-gold transition-colors p-2"
            onClick={closeLightbox}
            aria-label="Close lightbox"
            data-ocid="gallery.close_button"
          >
            <X size={26} />
          </button>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-tulip-cream/80 hover:text-tulip-gold transition-colors p-3 text-4xl leading-none"
            onClick={prev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-tulip-cream/80 hover:text-tulip-gold transition-colors p-3 text-4xl leading-none"
            onClick={next}
            aria-label="Next image"
          >
            ›
          </button>
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            style={{ boxShadow: "0 0 60px rgba(220,175,60,0.32)" }}
          />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-tulip-cream/75 text-xs font-body tracking-widest uppercase">
            {galleryImages[lightboxIndex].label} &middot; {lightboxIndex + 1} /{" "}
            {galleryImages.length}
          </p>
        </dialog>
      )}
    </section>
  );
}
