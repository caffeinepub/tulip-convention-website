import { AboutSection } from "./components/AboutSection";
import { AdminPage } from "./components/AdminPage";
import { AmenitiesSection } from "./components/AmenitiesSection";
import { CTASection } from "./components/CTASection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

export default function App() {
  const isAdminPage = window.location.search.includes("page=admin");

  if (isAdminPage) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <AmenitiesSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />

      {/* Call Floating Button - Left */}
      <a
        href="tel:+919949167731"
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl hover:scale-110 transition-transform duration-200"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.18 45), oklch(0.70 0.22 55))",
          boxShadow:
            "0 0 18px 4px oklch(0.70 0.22 55 / 0.55), 0 4px 16px oklch(0.30 0.08 310 / 0.45)",
          animation: "callPulse 2s ease-in-out infinite",
        }}
        title="Call us"
      >
        <span className="sr-only">Call Us</span>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="26"
          height="26"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C9.39 21 3 14.61 3 7c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>

      {/* WhatsApp Floating Button - Right */}
      <a
        href="https://wa.me/919949167731"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform duration-200"
        style={{
          boxShadow:
            "0 0 18px 4px #25D36688, 0 4px 16px oklch(0.30 0.08 310 / 0.45)",
        }}
        data-ocid="whatsapp.button"
      >
        <span className="sr-only">Chat on WhatsApp</span>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="28"
          height="28"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style>{`
        @keyframes callPulse {
          0%, 100% { box-shadow: 0 0 18px 4px oklch(0.70 0.22 55 / 0.55), 0 4px 16px oklch(0.30 0.08 310 / 0.45); }
          50% { box-shadow: 0 0 28px 10px oklch(0.70 0.22 55 / 0.75), 0 4px 20px oklch(0.30 0.08 310 / 0.55); }
        }
      `}</style>
    </div>
  );
}
