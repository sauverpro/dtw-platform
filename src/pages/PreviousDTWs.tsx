import { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const events = [
  {
    year: "2023",
    edition: "01",
    title: "Digital Transformation Week 2023",
    tagline: "Where Rwanda's digital journey began.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1400&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "DTW 2023 accelerated Rwanda's digital economy through innovation, youth empowerment and entrepreneurship — bringing together the country's brightest minds for three transformative days.",
    stats: [
      { value: "10K+", label: "Attendees" },
      { value: "30+",  label: "Speakers"  },
      { value: "12",   label: "Countries" },
      { value: "3",    label: "Days"      },
    ],
    quote: "DTW 2023 became one of Rwanda's most impactful innovation events.",
    author: "Jean Claude",
    role: "Startup Founder",
  },
  {
    year: "2024",
    edition: "02",
    title: "Digital Transformation Week 2024",
    tagline: "AI, fintech and smart cities take centre stage.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "DTW 2024 deepened Africa's technology ecosystem with groundbreaking sessions on AI, fintech, cybersecurity and smart city innovation — drawing international attention to Kigali's growing tech scene.",
    stats: [
      { value: "15K+", label: "Attendees" },
      { value: "50+",  label: "Speakers"  },
      { value: "18",   label: "Countries" },
      { value: "3",    label: "Days"      },
    ],
    quote: "The quality of networking and innovation opportunities was truly exceptional.",
    author: "Aline Uwase",
    role: "Innovation Expert",
  },
  {
    year: "2025",
    edition: "03",
    title: "Digital Transformation Week 2025",
    tagline: "Rwanda as Africa's definitive digital hub.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "DTW 2025 cemented Kigali's position as Africa's leading technology conference destination — with record attendance, a landmark startup pitch competition and a packed programme of AI-focused sessions.",
    stats: [
      { value: "20K+", label: "Attendees" },
      { value: "60+",  label: "Speakers"  },
      { value: "20+",  label: "Countries" },
      { value: "3",    label: "Days"      },
    ],
    quote: "DTW 2025 connected innovators and entrepreneurs from across Africa like never before.",
    author: "Patrick Mugisha",
    role: "Tech Entrepreneur",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop",  span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",  span: "" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",  span: "" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",  span: "" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",  span: "" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",     span: "col-span-2" },
];

export default function PreviousDTWs() {
  const [activeYear, setActiveYear] = useState(0);
  const active = events[activeYear];

  return (
    <div className="bg-white">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col justify-end px-6 pb-16 overflow-hidden">
        {/* background shifts with active event */}
        {events.map((e, i) => (
          <img
            key={e.year}
            src={e.image}
            alt={e.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activeYear ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

        {/* floating year selector — top right */}
        <div className="absolute top-28 right-6 sm:right-10 z-20 flex flex-col gap-2">
          {events.map((e, i) => (
            <button
              key={e.year}
              onClick={() => setActiveYear(i)}
              className={`text-right transition-all duration-200 ${i === activeYear ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
            >
              <span className={`block text-xs font-bold tracking-[0.15em] ${i === activeYear ? "text-yellow-400" : "text-white"}`}>
                {e.year}
              </span>
              {i === activeYear && (
                <span className="block h-px bg-yellow-400 mt-0.5 w-full" />
              )}
            </button>
          ))}
        </div>

        {/* hero text */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Edition {active.edition} · {active.year}
            </p>
          </div>

          <h1 className="text-white text-5xl sm:text-6xl md:text-[72px] font-black leading-[1.0] tracking-tight max-w-2xl">
            Previous
            <br />
            <span className="text-yellow-400">DTWs</span>
          </h1>

          <p className="text-gray-400 text-sm mt-5 max-w-sm leading-relaxed">
            Three years of innovation, impact and transformation — shaping Rwanda's digital future one edition at a time.
          </p>

          {/* scroll hint */}
          <div className="flex items-center gap-3 mt-10">
            <div className="w-px h-10 bg-white/20" />
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE NAVIGATION ───────────────────────────── */}
      <section className="bg-black border-b border-white/[0.07] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex">
            {events.map((e, i) => (
              <button
                key={e.year}
                onClick={() => setActiveYear(i)}
                className={`flex-1 py-4 text-left px-5 border-b-2 transition-all duration-200 ${
                  i === activeYear
                    ? "border-yellow-400"
                    : "border-transparent hover:border-white/20"
                }`}
              >
                <span className={`block text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5 ${i === activeYear ? "text-yellow-400" : "text-white/30"}`}>
                  Edition {e.edition}
                </span>
                <span className={`block text-sm font-black ${i === activeYear ? "text-white" : "text-white/40"}`}>
                  {e.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT DETAIL ──────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {events.map((event, i) => (
            <div
              key={event.year}
              className={`transition-all duration-500 ${i === activeYear ? "block" : "hidden"}`}
            >
              <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

                {/* LEFT — IMAGE + STATS */}
                <div>
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[480px] object-cover"
                    />
                    {/* dark gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* tagline overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <p className="text-white/80 text-sm italic leading-relaxed max-w-xs">
                        "{event.tagline}"
                      </p>
                    </div>
                  </div>

                  {/* STATS GRID */}
                  <div className="grid grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden mt-3">
                    {event.stats.map((s) => (
                      <div key={s.label} className="bg-[#0A0A0A] px-4 py-5 text-center">
                        <p className="text-yellow-400 text-2xl font-black leading-none">{s.value}</p>
                        <p className="text-white/30 text-[10px] mt-1.5 uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — CONTENT */}
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="h-px w-8 bg-yellow-400" />
                    <p className="text-yellow-400 text-[11px] font-semibold tracking-[0.2em] uppercase">
                      {event.year} · Edition {event.edition}
                    </p>
                  </div>

                  <h2 className="text-white text-3xl sm:text-4xl font-black leading-[1.08] tracking-tight">
                    {event.title}
                  </h2>

                  <p className="text-gray-400 text-sm mt-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* QUOTE CARD */}
                  <div className="mt-10 relative">
                    <div className="absolute -top-3 left-5 text-yellow-400 text-5xl font-black leading-none opacity-30 select-none">"</div>
                    <div className="bg-[#141414] border border-white/[0.07] rounded-xl p-7 pt-8">
                      <p className="text-white/70 text-sm leading-relaxed italic">
                        {event.quote}
                      </p>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-8 h-8 rounded-full bg-yellow-400/15 flex items-center justify-center text-yellow-400 text-xs font-black">
                          {event.author[0]}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{event.author}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{event.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VIDEO */}
                  <div className="mt-8">
                    <p className="text-white/30 text-[10px] font-bold tracking-[0.18em] uppercase mb-3">Event Highlights</p>
                    <div className="rounded-xl overflow-hidden aspect-video bg-black">
                      <iframe
                        className="w-full h-full"
                        src={event.video}
                        title={event.title}
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* NAVIGATION */}
                  <div className="flex items-center gap-4 mt-10">
                    <button
                      onClick={() => setActiveYear((p) => Math.max(0, p - 1))}
                      disabled={activeYear === 0}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-yellow-400/50 hover:text-yellow-400 transition disabled:opacity-20"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button
                      onClick={() => setActiveYear((p) => Math.min(events.length - 1, p + 1))}
                      disabled={activeYear === events.length - 1}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-yellow-400/50 hover:text-yellow-400 transition disabled:opacity-20"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <span className="text-white/20 text-xs tabular-nums ml-1">
                      {activeYear + 1} / {events.length}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] pb-20 md:pb-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Photo Gallery</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              Three Years,
              <br />
              Countless Moments
            </h2>
            <p className="text-gray-500 text-sm max-w-[180px]">Selected highlights from DTW 2023 – 2025</p>
          </div>

          {/* masonry-style fixed grid */}
          <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[520px]">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={`DTW highlight ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            {/* background image */}
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop"
              alt="CTA"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />

            {/* content */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 px-10 py-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-yellow-400" />
                  <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Coming Up</p>
                </div>
                <h2 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                  Be part of
                  <br />
                  <span className="text-yellow-400">DTW 2026</span>
                </h2>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-xs">
                  Join innovators, investors and digital leaders at Africa's most impactful technology conference.
                </p>
              </div>

              <div className="shrink-0 flex flex-col gap-3">
                <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm whitespace-nowrap">
                  Register for DTW 2026
                </button>
                <button className="border border-white/15 text-white font-medium px-8 py-3 rounded-lg hover:border-white/30 transition duration-200 text-sm whitespace-nowrap">
                  View Programme
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