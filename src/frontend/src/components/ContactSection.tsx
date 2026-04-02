import { useState } from "react";
import { createActorWithConfig } from "../config";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Google Apps Script Web App URL for Google Sheets integration
const GOOGLE_SHEETS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbycpKPlSDSC4EoSjZNLwwZebI6HIxeMH0w-8T0WVGtvyQ_LEiXGLQW6OlmfUCcfeFg1/exec";

const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Corporate Event / Conference",
  "Birthday Party",
  "Anniversary Celebration",
  "Social Gathering / Festival",
  "Other",
];

interface FormState {
  name: string;
  phone: string;
  eventType: string;
  guests: string;
  eventDate: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  eventType: "",
  guests: "",
  eventDate: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

// Send enquiry data to Google Sheets via fetch with no-cors (POST).
function sendToGoogleSheets(data: FormState): void {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("phone", data.phone);
  formData.append("eventType", data.eventType);
  formData.append("guests", data.guests);
  formData.append("eventDate", data.eventDate);
  formData.append(
    "timestamp",
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  );

  fetch(GOOGLE_SHEETS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  }).catch(() => {
    // Fire-and-forget
  });
}

// Save enquiry to localStorage as a backup
function saveToLocalStorage(data: FormState): void {
  try {
    const existing = localStorage.getItem("tulip_enquiries_local");
    const enquiries: Array<FormState & { timestamp: string }> = existing
      ? JSON.parse(existing)
      : [];
    enquiries.push({
      ...data,
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    });
    localStorage.setItem("tulip_enquiries_local", JSON.stringify(enquiries));
  } catch {
    // Silently ignore localStorage errors
  }
}

export function ContactSection() {
  const ref = useScrollAnimation<HTMLDivElement>();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.eventType) newErrors.eventType = "Please select an event type";
    if (!form.guests.trim()) {
      newErrors.guests = "Number of guests is required";
    } else if (Number.isNaN(Number(form.guests)) || Number(form.guests) < 1) {
      newErrors.guests = "Please enter a valid number of guests";
    }
    if (!form.eventDate) newErrors.eventDate = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus("idle");

    sendToGoogleSheets(form);

    const submittedForm = { ...form };

    try {
      const actor = await createActorWithConfig();
      await actor.submitEnquiry(
        submittedForm.name,
        submittedForm.phone,
        submittedForm.eventType,
        BigInt(Number.parseInt(submittedForm.guests, 10)),
        submittedForm.eventDate,
      );
    } catch (err) {
      console.error("[ContactSection] submitEnquiry failed (backend):", err);
      saveToLocalStorage(submittedForm);
    }

    setStatus("success");
    setForm(EMPTY_FORM);
    setSubmitting(false);
  };

  const inputBase =
    "w-full px-4 py-3.5 rounded-lg border text-sm font-body focus:outline-none transition-all duration-200 bg-white text-foreground placeholder:text-foreground/35";
  const inputClass = (field: keyof FormState) =>
    `${inputBase} ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200"
        : "border-border hover:border-tulip-gold/50 focus:border-tulip-gold focus:ring-2 focus:ring-tulip-gold/30"
    }`;

  return (
    <section id="contact" className="py-24 md:py-32 bg-cream">
      <div className="max-w-2xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.28em] uppercase text-tulip-rose mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-tulip-mauve">
            Book Your <span className="italic font-semibold">Event</span>
          </h2>
          <p className="font-body text-sm text-foreground/55 mt-4">
            Fill in the details below and we&apos;ll get back to you within 24
            hours.
          </p>
        </div>

        {/* Form card */}
        <div
          ref={ref}
          className="bg-white rounded-2xl border-t-2 border border-tulip-gold/40 shadow-gold p-8 md:p-10"
          style={{ borderTopColor: "oklch(0.76 0.16 65 / 0.5)" }}
        >
          {status === "success" && (
            <div
              className="mb-8 p-5 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
              data-ocid="contact.success_state"
              role="alert"
            >
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <p className="font-body font-semibold text-green-800">
                  Enquiry Submitted!
                </p>
                <p className="font-body text-green-700 text-sm mt-1">
                  Thank you! We&apos;ll contact you within 24 hours to confirm
                  your booking.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="block font-body text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2"
              >
                Full Name <span className="text-tulip-rose">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={inputClass("name")}
                data-ocid="contact.input"
                aria-required="true"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="text-red-600 text-xs mt-1.5 font-body font-medium"
                  data-ocid="contact.error_state"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="contact-phone"
                className="block font-body text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2"
              >
                Phone Number <span className="text-tulip-rose">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="tel"
                autoComplete="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={inputClass("phone")}
                data-ocid="contact.input"
                aria-required="true"
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p
                  id="phone-error"
                  className="text-red-600 text-xs mt-1.5 font-body font-medium"
                  data-ocid="contact.error_state"
                  role="alert"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <label
                htmlFor="contact-event-type"
                className="block font-body text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2"
              >
                Event Type <span className="text-tulip-rose">*</span>
              </label>
              <select
                id="contact-event-type"
                value={form.eventType}
                onChange={(e) => handleChange("eventType", e.target.value)}
                className={inputClass("eventType")}
                data-ocid="contact.select"
                aria-required="true"
              >
                <option value="">Select event type</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.eventType && (
                <p
                  className="text-red-600 text-xs mt-1.5 font-body font-medium"
                  data-ocid="contact.error_state"
                  role="alert"
                >
                  {errors.eventType}
                </p>
              )}
            </div>

            {/* Guests + Date side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-guests"
                  className="block font-body text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2"
                >
                  Guests <span className="text-tulip-rose">*</span>
                </label>
                <input
                  id="contact-guests"
                  type="number"
                  min="1"
                  placeholder="No. of guests"
                  value={form.guests}
                  onChange={(e) => handleChange("guests", e.target.value)}
                  className={inputClass("guests")}
                  data-ocid="contact.input"
                  aria-required="true"
                  aria-describedby={errors.guests ? "guests-error" : undefined}
                />
                {errors.guests && (
                  <p
                    id="guests-error"
                    className="text-red-600 text-xs mt-1.5 font-body font-medium"
                    data-ocid="contact.error_state"
                    role="alert"
                  >
                    {errors.guests}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="contact-date"
                  className="block font-body text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2"
                >
                  Event Date <span className="text-tulip-rose">*</span>
                </label>
                <input
                  id="contact-date"
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => handleChange("eventDate", e.target.value)}
                  className={inputClass("eventDate")}
                  data-ocid="contact.input"
                  aria-required="true"
                />
                {errors.eventDate && (
                  <p
                    className="text-red-600 text-xs mt-1.5 font-body font-medium"
                    data-ocid="contact.error_state"
                    role="alert"
                  >
                    {errors.eventDate}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-lg font-body font-semibold text-sm tracking-[0.14em] uppercase bg-tulip-gold text-tulip-brown hover:bg-tulip-gold-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 glow-gold hover:-translate-y-0.5 mt-2"
              data-ocid="contact.submit_button"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting…
                </span>
              ) : (
                "Send Enquiry"
              )}
            </button>
          </form>

          {/* Contact info strip */}
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+919949167731"
              className="flex items-center gap-2 font-body text-sm text-foreground/60 hover:text-tulip-mauve transition-colors"
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
              +91-9949167731
            </a>
            <span className="text-border hidden sm:block">·</span>
            <span className="flex items-center gap-2 font-body text-sm text-foreground/60">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Hanamkonda, Telangana 506001
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
