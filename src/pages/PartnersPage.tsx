import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const partnerCategories = [
  {
    category: "Organizing Partners",
    logos: [
      { name: "RISA",        src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965851/logo_nv79th.png" },
      { name: "ICT Chamber", src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1778836285/logo_1945919583_1_lwuwo3.png" },
      { name: "MINICT",      src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965853/MINICT-1_q6fqym.png" },
      { name: "RDB",         src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965853/rdb1_lhq4aq.png" },
    ],
  },
  {
    category: "Strategic Partners",
    logos: [
      { name: "MTN",           src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965853/mtn-vector-logo-free-download-11574079006iyxmpcd4fu_rti3ix.png" },
      { name: "Airtel",        src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965851/Airtel-logo_yyw7ow.png" },
      { name: "Mastercard",    src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965852/MClogo-c823e495c5cf455c89ddfb0e17fc7978_urh23c.jpg" },
      { name: "Digital Africa",src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965852/cropped-cropped-DA_Logo_HG-1_lts2nq.png" },
    ],
  },
  {
    category: "Innovation Partners",
    logos: [
      { name: "KLab",        src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965851/logo_1_yyxnzy.png" },
      { name: "BK TechHouse",src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965852/bk_techouse_logo_ktmxg4.jpg" },
      { name: "FabLab",      src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965851/Fab_Lab_logo.svg__tw2kbx.png" },
      { name: "Norrsken",    src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965853/norrsken-foundation-521688_jefdl5.png", imgClass: "max-h-20" },
    ],
  },
  {
    category: "Media Partners",
    logos: [
      { name: "KT Radio",      src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965852/KT-Radio-logo-black-1_xgyjuc.png" },
      { name: "The New Times", src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965852/logo_dwdsqy.webp" },
      { name: "RBA",           src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965853/rba_logo_oubv4w.jpg", imgClass: "max-h-20" },
      { name: "IGIHE",         src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779965851/IGIHE-copy-720x405_gjsisv.webp" },
    ],
  },
];

const benefits = [
  {
    title: "Brand Visibility",
    description: "Reach thousands of innovators, investors and business leaders across Africa.",
    icon: "◈",
  },
  {
    title: "Networking",
    description: "Connect directly with startups, policymakers, and enterprise decision-makers.",
    icon: "◎",
  },
  {
    title: "Media Exposure",
    description: "Gain visibility through national and international media coverage.",
    icon: "◉",
  },
  {
    title: "Lead Generation",
    description: "Showcase your products and services to a qualified, high-intent audience.",
    icon: "◐",
  },
];

const stats = [
  { number: "20K+", label: "Attendees" },
  { number: "50+",  label: "Speakers"  },
  { number: "30+",  label: "Countries" },
  { number: "100+", label: "Partners"  },
];

const testimonials = [
  {
    quote: "DTW connected us with incredible innovation opportunities and helped us reach Africa's growing digital ecosystem.",
    name: "MTN Rwanda",
    role: "Strategic Partner",
  },
  {
    quote: "Partnering with DTW gave us direct access to Rwanda's most ambitious founders and decision-makers.",
    name: "Digital Africa",
    role: "Innovation Partner",
  },
  {
    quote: "The exposure and conversations we had at DTW 2025 drove real business outcomes for our team.",
    name: "Mastercard",
    role: "Strategic Partner",
  },
];

const PartnersPage = () => {
  const [catIdx, setCatIdx] = useState(0);
  const prev = () => setCatIdx((i) => (i - 1 + partnerCategories.length) % partnerCategories.length);
  const next = () => setCatIdx((i) => (i + 1) % partnerCategories.length);
  const active = partnerCategories[catIdx];

  return (
    <div className="bg-[#080808] overflow-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end px-6 pb-20 pt-40">
        <img
          src="https://res.cloudinary.com/dc6iwekzx/image/upload/v1779716247/55044485734_af5bbe1d46_o_n4eacp.jpg"
          alt="Partners Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
              DTW2026 · Partnerships
            </p>
          </div>

          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.0] tracking-tight max-w-3xl">
            Building
            <br />
            Rwanda's Digital
            <br />
            <span className="text-yellow-400">Future Together</span>
          </h1>

          <p className="text-gray-400 text-base mt-7 max-w-md leading-relaxed">
            Partner with Digital Transformation Week 2026 and connect with innovators, startups, investors and government leaders shaping Africa's digital future.
          </p>

          <div className="flex flex-wrap gap-3 mt-9">
            <Link to="/contact" className="inline-flex items-center justify-center bg-yellow-400 text-black font-bold px-7 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────── */}
      <section className="bg-yellow-400 px-6 py-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 px-6 flex flex-col gap-1 ${i < 3 ? "md:border-r border-yellow-500/30" : ""} ${i < 2 ? "border-b md:border-b-0 border-yellow-500/30" : ""}`}
              >
                <p className="text-black text-4xl font-black leading-none tracking-tight">{s.number}</p>
                <p className="text-black/60 text-xs font-semibold tracking-[0.15em] uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER CATEGORIES CAROUSEL ───────────────────── */}
      <section className="bg-[#F9F8F6] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase">Our Ecosystem</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight tracking-tight">
              Partner<br />Categories
            </h2>
            <p className="text-gray-400 text-sm max-w-[200px]">
              Trusted by Rwanda's leading institutions and global brands.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative flex items-center gap-4">
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="shrink-0 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:border-yellow-400 hover:text-yellow-500 transition duration-200 bg-white"
              aria-label="Previous category"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Card */}
            <div className="flex-1 bg-white rounded-2xl p-8 md:p-10 border border-gray-100 min-h-[260px]">
              {/* Category label + dots */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-yellow-500">
                  {active.category}
                </p>
                <div className="flex gap-1.5">
                  {partnerCategories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCatIdx(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === catIdx ? "w-5 h-1.5 bg-yellow-400" : "w-1.5 h-1.5 bg-black/15 hover:bg-black/30"
                      }`}
                      aria-label={partnerCategories[i].category}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {active.logos.map((logo, j) => (
                  <div
                    key={j}
                    className="bg-[#F9F8F6] rounded-xl flex items-center justify-center p-5 hover:bg-yellow-50 transition duration-200 border border-transparent hover:border-yellow-400/20 min-h-[96px]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={`w-auto max-w-full object-contain ${logo.imgClass ?? "max-h-12"}`}
                    />
                  </div>
                ))}
              </div>

              {/* counter */}
              <p className="text-right text-[11px] text-gray-400 mt-6 tabular-nums">
                {catIdx + 1} / {partnerCategories.length}
              </p>
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="shrink-0 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:border-yellow-400 hover:text-yellow-500 transition duration-200 bg-white"
              aria-label="Next category"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────── */}
      <section className="bg-[#080808] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Why Partner</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              Partnership<br />Benefits
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="group bg-[#111] border border-white/[0.07] rounded-xl p-7 hover:border-yellow-400/30 hover:bg-[#141414] transition duration-300"
              >
                <span className="text-2xl text-yellow-400/40 group-hover:text-yellow-400 transition duration-300 block mb-5">
                  {b.icon}
                </span>
                <h3 className="text-white text-base font-bold">{b.title}</h3>
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase">Testimonials</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight tracking-tight">
              What Partners<br />Say
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-7 border border-gray-100">
                <div className="text-yellow-400 text-2xl mb-5 leading-none">"</div>
                <p className="text-gray-600 text-sm leading-relaxed">{t.quote}</p>
                <div className="mt-7 pt-5 border-t border-gray-100">
                  <p className="text-black text-sm font-bold">{t.name}</p>
                  <p className="text-yellow-500 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORSHIP CTA */}
      <section className="bg-[#080808] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Sponsorship</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              Explore Our<br />Sponsorship Offer
            </h2>
            <p className="text-gray-400 text-sm max-w-[300px]">
              Discover sponsorship opportunities and choose the best fit for your organization.
            </p>
          </div>

          <div className="mt-9">
            <a
              href="https://dtw-smoky.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-yellow-400 text-black font-bold px-7 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm"
            >
              Sponsor Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dc6iwekzx/image/upload/v1779716658/55044076813_12631b4e56_k_gdsqiz.jpg"
          alt="Partner CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/82" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Get Involved</p>
            <div className="h-px w-8 bg-yellow-400" />
          </div>

          <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
            Ready to Partner
            <br />
            with <span className="text-yellow-400">DTW2026</span>?
          </h2>

          <p className="text-gray-400 text-sm mt-6 leading-relaxed max-w-sm mx-auto">
            Join the organizations building Africa's digital future. Limited partner slots available.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <Link to="/contact" className="inline-flex items-center justify-center bg-yellow-400 text-black font-bold px-7 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm">
              Become a Partner
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-white/15 text-white font-medium px-7 py-3 rounded-lg hover:border-white/30 transition duration-200 text-sm"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnersPage;

