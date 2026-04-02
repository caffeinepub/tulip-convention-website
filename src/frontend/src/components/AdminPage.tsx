import {
  ArrowLeft,
  Calendar,
  Inbox,
  Loader2,
  LogOut,
  MessageCircle,
  Phone,
  RefreshCw,
  User,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createActorWithConfig } from "../config";

interface Enquiry {
  name: string;
  phone: string;
  eventType: string;
  guests: bigint;
  eventDate: string;
  timestamp: bigint;
}

const ADMIN_PIN = "tulip2024";

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildWhatsAppUrl(enquiry: Enquiry): string {
  const submitted = formatTimestamp(enquiry.timestamp);
  const text = `New Enquiry from Tulip Convention:\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nEvent Type: ${enquiry.eventType}\nGuests: ${enquiry.guests}\nEvent Date: ${enquiry.eventDate}\nSubmitted: ${submitted}`;
  return `https://wa.me/919949167731?text=${encodeURIComponent(text)}`;
}

function EnquiryCard({ enquiry, index }: { enquiry: Enquiry; index: number }) {
  const submitted = formatTimestamp(enquiry.timestamp);

  return (
    <div
      className="bg-card rounded-2xl border border-tulip-gold/20 card-glow p-5 flex flex-col gap-4 hover:border-tulip-gold/40 transition-all duration-300"
      data-ocid={`admin.item.${index}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tulip-mauve/10 flex items-center justify-center flex-shrink-0">
            <User size={18} className="text-tulip-mauve" />
          </div>
          <div>
            <p className="font-display font-bold text-tulip-mauve text-base leading-tight">
              {enquiry.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{submitted}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tulip-gold/10 text-tulip-gold border border-tulip-gold/20 whitespace-nowrap">
          {enquiry.eventType}
        </span>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Phone size={13} className="text-tulip-gold flex-shrink-0" />
          <span className="text-sm text-foreground">{enquiry.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={13} className="text-tulip-gold flex-shrink-0" />
          <span className="text-sm text-foreground">
            {enquiry.eventDate || "—"}
          </span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <Users size={13} className="text-tulip-gold flex-shrink-0" />
          <span className="text-sm text-foreground">
            {String(enquiry.guests)} guests
          </span>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={buildWhatsAppUrl(enquiry)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20c25c] transition-all duration-200 shadow-md hover:shadow-lg glow-green"
        data-ocid={`admin.button.${index}`}
      >
        <MessageCircle size={16} />
        Send to WhatsApp
      </a>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      onLogin();
    } else {
      setError("Incorrect PIN. Please try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.73 0.1 70) 0%, transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.44 0.088 12) 0%, transparent 50%)",
          }}
        />
      </div>

      <div
        className={`relative w-full max-w-sm bg-card rounded-3xl border border-tulip-gold/20 card-glow p-8 text-center transition-transform ${
          shaking ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
        style={{
          boxShadow:
            "0 8px 48px rgba(200,163,90,0.25), 0 2px 8px rgba(0,0,0,0.08)",
        }}
        data-ocid="admin.panel"
      >
        {/* Logo / Branding */}
        <div className="mb-6">
          <div
            className="text-5xl mb-3"
            style={{ filter: "drop-shadow(0 0 12px rgba(200,163,90,0.8))" }}
          >
            🌷
          </div>
          <h1 className="font-display text-2xl font-bold text-tulip-mauve text-glow-gold">
            Tulip Convention
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Admin Portal</p>
        </div>

        {/* PIN input */}
        <div className="space-y-4">
          <div className="text-left">
            <label
              htmlFor="admin-pin"
              className="block text-xs font-medium text-foreground mb-1.5 uppercase tracking-wider"
            >
              Access PIN
            </label>
            <input
              id="admin-pin"
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-tulip-gold/50 focus:border-tulip-gold/40 transition-all placeholder:text-muted-foreground"
              data-ocid="admin.input"
              autoComplete="current-password"
            />
            {error && (
              <p
                className="text-red-500 text-xs mt-1.5"
                role="alert"
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 rounded-xl font-display font-semibold text-base tracking-wide bg-tulip-gold text-tulip-brown hover:bg-tulip-gold-dark disabled:opacity-60 transition-all duration-200 shadow-gold glow-gold"
            data-ocid="admin.submit_button"
          >
            Login
          </button>
        </div>

        {/* Back link */}
        <div className="mt-6 pt-5 border-t border-border">
          <a
            href="./"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-tulip-mauve transition-colors"
            data-ocid="admin.link"
          >
            <ArrowLeft size={12} />
            Back to website
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const actor = await createActorWithConfig();
      const results = await (actor as any).getAllEnquiries();
      const sorted = [...results].sort((a: Enquiry, b: Enquiry) =>
        Number(b.timestamp - a.timestamp),
      );
      setEnquiries(sorted);
    } catch (e) {
      setError("Failed to load enquiries. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b border-tulip-gold/20 navbar-glow"
        style={{ backgroundColor: "oklch(0.33 0.075 12)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: back + branding */}
          <div className="flex items-center gap-4">
            <a
              href="./"
              className="flex items-center gap-1.5 text-tulip-cream/60 hover:text-tulip-gold transition-colors text-sm"
              data-ocid="admin.link"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Website</span>
            </a>
            <div className="flex items-center gap-2">
              <span
                className="text-xl"
                style={{ filter: "drop-shadow(0 0 6px rgba(200,163,90,0.7))" }}
              >
                🌷
              </span>
              <span className="font-display font-bold text-tulip-gold text-glow-gold text-base">
                Admin Dashboard
              </span>
            </div>
          </div>

          {/* Right: refresh + logout */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchEnquiries}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-tulip-cream/70 hover:text-tulip-gold hover:bg-white/10 transition-all text-sm"
              data-ocid="admin.secondary_button"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-tulip-cream/70 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
              data-ocid="admin.delete_button"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats bar */}
        {!loading && !error && (
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-xl border border-tulip-gold/20 card-glow">
              <Inbox size={16} className="text-tulip-gold" />
              <span className="font-display font-bold text-tulip-mauve text-lg">
                {enquiries.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Total Enquiries
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-xl border border-tulip-gold/20 card-glow">
              <Users size={16} className="text-tulip-gold" />
              <span className="text-sm text-muted-foreground">
                All visible below
              </span>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="admin.loading_state"
          >
            <Loader2 size={36} className="text-tulip-gold animate-spin" />
            <p className="text-muted-foreground font-body">
              Loading enquiries…
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="admin.error_state"
            role="alert"
          >
            <p className="text-red-500 font-body">{error}</p>
            <button
              type="button"
              onClick={fetchEnquiries}
              className="px-5 py-2.5 rounded-xl bg-tulip-gold text-tulip-brown font-semibold text-sm hover:bg-tulip-gold-dark transition-all"
              data-ocid="admin.secondary_button"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && enquiries.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-3"
            data-ocid="admin.empty_state"
          >
            <span className="text-5xl">📭</span>
            <p className="font-display text-xl font-semibold text-tulip-mauve">
              No enquiries yet
            </p>
            <p className="text-sm text-muted-foreground">
              Enquiries from the contact form will appear here.
            </p>
          </div>
        )}

        {/* Enquiry grid */}
        {!loading && !error && enquiries.length > 0 && (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-ocid="admin.list"
          >
            {enquiries.map((enquiry, i) => (
              <EnquiryCard
                key={`${enquiry.timestamp}-${enquiry.phone}`}
                enquiry={enquiry}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  );
}
