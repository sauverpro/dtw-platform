import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock, Send, ChevronDown } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Kigali Convention Centre",
    sub: "KG 2 Roundabout, Kigali, Rwanda",
  },
  {
    icon: Mail,
    label: "Email",
    value: "dtw@ictchamber.rw",
    sub: "We respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+250 793 902 451 | +250 784 499 094 ",
    sub: "Mon – Fri, 8:00 AM – 6:00 PM",
  },
  {
    icon: Clock,
    label: "Event Dates",
    value: "May 13 – 15, 2026",
    sub: "Kigali, Rwanda",
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Partnership & Sponsorship",
  "Speaker Nomination",
  "Media & Press",
  "Tickets & Registration",
  "Volunteer",
  "Other",
];

const faqs = [
  {
    q: "When is the early bird deadline?",
    a: "Early bird tickets are available until April 30, 2026. After that, standard pricing applies.",
  },
  {
    q: "Where is the event held?",
    a: "DTW 2026 takes place at the Kigali Convention Centre, KG 2 Roundabout, Kigali, Rwanda.",
  },
  {
    q: "How do I become a sponsor?",
    a: "Fill in the contact form selecting 'Partnership & Sponsorship' and our partnerships team will send you the full deck within 48 hours.",
  },
  {
    q: "Can I nominate a speaker?",
    a: "Yes. Select 'Speaker Nomination' in the form and include the speaker's name, bio, and proposed topic.",
  },
];

type FormState = {
  name: string;
  email: string;
  organisation: string;
  type: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    organisation: "",
    type: inquiryTypes[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [typeOpen, setTypeOpen] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Get in Touch
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="text-white text-4xl sm:text-5xl font-black leading-[1.0] tracking-tight">
                Let's Talk
                <br />
                <span className="text-yellow-400">DTW 2026</span>
              </h1>
              <p className="text-gray-300 text-base mt-6 leading-relaxed max-w-md">
                Whether you're interested in partnering, speaking, attending, or just want to learn more — our team is ready to help.
              </p>
            </div>

            {/* info pills */}
            <div className="grid grid-cols-2 gap-3">
              {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                <div
                  key={label}
                  className="bg-[#111] border border-white/[0.07] rounded-xl p-5 hover:border-yellow-400/25 transition duration-300 group"
                >
                  <div className="w-8 h-8 bg-yellow-400/8 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-400/15 transition">
                    <Icon size={14} className="text-yellow-400" />
                  </div>
                  <p className="text-white/30 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">{label}</p>
                  <p className="text-white text-sm font-semibold">{value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-8">

          {/* ── FORM ─────────────────────────────────────── */}
          <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-8 md:p-10">

            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8 bg-yellow-400" />
                  <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Send a Message</p>
                </div>

                <div className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                        Full Name <span className="text-yellow-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jane Doe"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-yellow-400/50 transition placeholder:text-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-white/40 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                        Email <span className="text-yellow-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jane@company.com"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-yellow-400/50 transition placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  {/* Organisation */}
                  <div>
                    <label className="block text-white/40 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                      Organisation
                    </label>
                    <input
                      type="text"
                      value={form.organisation}
                      onChange={set("organisation")}
                      placeholder="Company or institution"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-yellow-400/50 transition placeholder:text-white/20"
                    />
                  </div>

                  {/* Inquiry type — custom dropdown */}
                  <div className="relative">
                    <label className="block text-white/40 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                      Inquiry Type
                    </label>
                    <button
                      type="button"
                      onClick={() => setTypeOpen((o) => !o)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-left text-sm text-white flex items-center justify-between focus:border-yellow-400/50 transition"
                    >
                      <span>{form.type}</span>
                      <ChevronDown
                        size={14}
                        className={`text-white/30 transition-transform duration-200 ${typeOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {typeOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#1A1A1A] border border-white/[0.08] rounded-xl overflow-hidden z-20 shadow-2xl">
                        {inquiryTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => { setForm((p) => ({ ...p, type: t })); setTypeOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm transition duration-150 ${
                              form.type === t
                                ? "bg-yellow-400/10 text-yellow-400"
                                : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/40 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
                      Message <span className="text-yellow-400">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us how we can help…"
                      rows={5}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-yellow-400/50 transition placeholder:text-white/20 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email || !form.message}
                    className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  >
                    <Send size={14} />
                    Send Message
                  </button>

                  <p className="text-white/20 text-xs text-center leading-relaxed">
                    We'll respond within 24 business hours.
                  </p>
                </div>
              </>
            ) : (
              /* ── SUCCESS STATE ── */
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/25 flex items-center justify-center mb-6">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5 9-9" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-black tracking-tight">Message Sent</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
                  Thanks, <span className="text-white font-semibold">{form.name}</span>. We'll get back to you at{" "}
                  <span className="text-yellow-400">{form.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organisation: "", type: inquiryTypes[0], message: "" }); }}
                  className="mt-8 text-sm font-semibold text-white/40 hover:text-white transition border border-white/10 px-5 py-2.5 rounded-lg hover:border-white/25"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Map embed */}
            <div className="bg-[#111] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps?q=Rwanda+ICT+Chamber,+Kigali,+Rwanda&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rwanda ICT Chamber"
                />
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">Rwanda ICT Chamber</p>
                  <p className="text-gray-500 text-xs mt-0.5">Kigali, Rwanda</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Rwanda+ICT+Chamber,+Kigali,+Rwanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-yellow-400 border border-yellow-400/25 px-3 py-1.5 rounded-lg hover:bg-yellow-400/10 transition"
                >
                  Directions →
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Follow DTW 2026</p>
              <div className="space-y-3">
                {[
                  { platform: "X (Twitter)", handle: "@DTW_Rwanda", color: "bg-white/5", href: "#" },
                  { platform: "LinkedIn",    handle: "DTW Rwanda",  color: "bg-white/5", href: "#" },
                  { platform: "Instagram",   handle: "@dtw_rwanda", color: "bg-white/5", href: "#" },
                ].map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-yellow-400/25 hover:bg-white/[0.06] transition duration-200 group"
                  >
                    <div>
                      <p className="text-white text-xs font-semibold">{s.platform}</p>
                      <p className="text-gray-600 text-[11px] mt-0.5">{s.handle}</p>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/20 group-hover:text-yellow-400 transition">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ mini accordion */}
            <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-yellow-400" />
                <p className="text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase">Quick Answers</p>
              </div>

              <div>
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={`border-b transition duration-200 ${isOpen ? "border-yellow-400/25" : "border-white/[0.05]"} last:border-0`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
                      >
                        <p className={`text-xs font-semibold transition ${isOpen ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                          {faq.q}
                        </p>
                        <span
                          className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? "bg-yellow-400 border-yellow-400 text-black rotate-45"
                              : "border-white/15 text-white/25"
                          }`}
                        >
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-4" : "max-h-0"}`}>
                        <p className="text-gray-500 text-xs leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────── */}
      <section className="bg-[#080808] border-t border-white/[0.05] px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-4">
              {[
                { v: "May 13–15", l: "Event Dates" },
                { v: "Kigali, RW", l: "Location" },
                { v: "500+", l: "Expected Attendees" },
                { v: "20+", l: "Countries" },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className={`px-8 py-7 ${i < 3 ? "md:border-r border-white/[0.06]" : ""} ${i < 2 ? "border-b md:border-b-0 border-white/[0.06]" : ""}`}
                >
                  <p className="text-yellow-400 text-2xl font-black leading-none">{s.v}</p>
                  <p className="text-white/30 text-xs mt-2 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="px-8 py-7 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Ready to be part of Africa's most impactful digital conference?
              </p>
              <div className="flex gap-3 shrink-0">
                <Link
                  to="/register"
                  className="bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-lg hover:bg-yellow-300 transition text-sm"
                >
                  Register Now
                </Link>
                <button className="border border-white/15 text-white font-medium px-6 py-2.5 rounded-lg hover:border-white/30 transition text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
