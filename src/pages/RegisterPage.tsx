import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { REGISTRATION_EVENTS } from "../constants/registrationEvents";
import { submitRegistration } from "../lib/submitRegistration";

type FormState = {
  name: string;
  email: string;
  organization: string;
  position: string;
  country: string;
  events: string[];
};

const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition placeholder:text-gray-400";

const labelClass =
  "block text-gray-500 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2";

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    organization: "",
    position: "",
    country: "",
    events: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set =
    (k: keyof Omit<FormState, "events">) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const toggleEvent = (event: string) => {
    setForm((p) => ({
      ...p,
      events: p.events.includes(event)
        ? p.events.filter((e) => e !== event)
        : [...p.events, event],
    }));
  };

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.organization.trim() &&
    form.position.trim() &&
    form.country.trim() &&
    form.events.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitRegistration({
        name: form.name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim(),
        position: form.position.trim(),
        country: form.country.trim(),
        events: form.events,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar variant="light" />

      <section className="relative pt-36 pb-12 px-6 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/80 via-white to-gray-50 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">
              Event Registration
            </p>
          </div>

          <h1 className="text-gray-900 text-4xl sm:text-5xl font-black leading-none tracking-tight">
            Register for
            <br />
            <span className="text-yellow-500">DTW 2026</span>
          </h1>
          <p className="text-gray-600 text-base mt-6 leading-relaxed max-w-lg">
            Reserve your place at the forums and summits you want to attend. Our team will
            confirm your registration by email.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8 bg-yellow-400" />
                  <p className="text-yellow-600 text-xs font-semibold tracking-[0.2em] uppercase">
                    Your Details
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Names <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Full name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@organization.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Organization <span className="text-yellow-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.organization}
                        onChange={set("organization")}
                        placeholder="Company or institution"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Position <span className="text-yellow-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.position}
                        onChange={set("position")}
                        placeholder="Your role"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Country <span className="text-yellow-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={set("country")}
                      placeholder="Rwanda"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      I am interested in attending <span className="text-yellow-500">*</span>
                    </label>
                    <p className="text-gray-400 text-xs mb-3">
                      Select one or more events
                    </p>
                    <div className="space-y-2">
                      {REGISTRATION_EVENTS.map((event) => {
                        const checked = form.events.includes(event);
                        return (
                          <label
                            key={event}
                            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition duration-200 ${
                              checked
                                ? "border-yellow-400 bg-yellow-50"
                                : "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleEvent(event)}
                              className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-yellow-400 shrink-0"
                            />
                            <span
                              className={`text-sm leading-snug ${
                                checked ? "text-gray-900 font-medium" : "text-gray-700"
                              }`}
                            >
                              {event}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit || submitting}
                    className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed mt-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Submit Registration
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center leading-relaxed">
                    You will receive a confirmation email once your registration is processed.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-14 h-14 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M4 11l5 5 9-9"
                      stroke="#CA8A04"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-gray-900 text-xl font-black tracking-tight">
                  Registration Submitted
                </h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed max-w-md">
                  Thank you, <span className="text-gray-900 font-semibold">{form.name}</span>.
                  We&apos;ll confirm your interest in{" "}
                  <span className="text-yellow-600 font-semibold">{form.events.length}</span>{" "}
                  {form.events.length === 1 ? "event" : "events"} at{" "}
                  <span className="text-yellow-600 font-semibold">{form.email}</span>.
                </p>
                <ul className="mt-6 text-left w-full max-w-sm space-y-2">
                  {form.events.map((e) => (
                    <li
                      key={e}
                      className="text-gray-700 text-xs px-4 py-2 rounded-lg bg-gray-50 border border-gray-200"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError(null);
                    setForm({
                      name: "",
                      email: "",
                      organization: "",
                      position: "",
                      country: "",
                      events: [],
                    });
                  }}
                  className="mt-8 text-sm font-semibold text-gray-500 hover:text-gray-900 transition border border-gray-200 px-5 py-2.5 rounded-lg hover:border-gray-300 bg-white"
                >
                  Register for another event
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
