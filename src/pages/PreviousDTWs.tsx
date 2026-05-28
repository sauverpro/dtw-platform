import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { events } from "../data/dtwEvents";
import { getYouTubeEmbedUrl } from "../lib/youtube";

// ── Year selector — handles any number of events ──────────────────────────
function YearTabs({ active, onChange }: { active: number; onChange: (i: number) => void }) {
  const VISIBLE = 5; // max tabs shown before scroll
  const overflow = events.length > VISIBLE;

  return (
    <div className="bg-black border-b border-white/[0.07] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex ${overflow ? "overflow-x-auto scrollbar-none" : ""}`}>
          {events.map((e, i) => (
            <button
              key={e.year}
              onClick={() => onChange(i)}
              className={`shrink-0 flex-1 min-w-[80px] py-4 px-4 text-left border-b-2 transition-all duration-200 ${
                i === active
                  ? "border-yellow-400"
                  : "border-transparent hover:border-white/15"
              }`}
            >
              <span className={`block text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5 ${i === active ? "text-yellow-400" : "text-white/30"}`}>
                {e.edition ? `Ed. ${e.edition}` : `#${i + 1}`}
              </span>
              <span className={`block text-sm font-black ${i === active ? "text-white" : "text-white/40"}`}>
                {e.year}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Better bento that actually works cleanly ──────────────────────────────
function GalleryGrid({ event }: { event: typeof events[0] }) {
  const navigate = useNavigate();
  const preview = event.gallery.slice(0, 5);
  const extra = event.gallery.length - 5;

  return (
    <div className="space-y-2">
      {/* Row 1: big left (2/3) + tall right (1/3) spanning 2 rows */}
      <div className="grid grid-cols-3 gap-2" style={{ height: 320 }}>
        {/* Big featured */}
        <div
          onClick={() => navigate(`/gallery/${event.year}`)}
          className="col-span-2 relative overflow-hidden rounded-xl cursor-pointer group"
        >
          <img src={preview[0].src} alt={preview[0].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-5">
            <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-yellow-400 bg-black/40 backdrop-blur-sm border border-yellow-400/25 px-2.5 py-1 rounded-full mb-2.5">
              {event.year} · Highlight
            </span>
            <p className="text-white font-bold text-base">{preview[0].caption}</p>
            <p className="text-white/50 text-xs mt-1 max-w-xs line-clamp-1">{preview[0].description}</p>
          </div>
          {/* hover arrow */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Right tall — spans 2 rows via CSS trick */}
        <div
          onClick={() => navigate(`/gallery/${event.year}`)}
          className="relative overflow-hidden rounded-xl cursor-pointer group row-span-1"
        >
          <img src={preview[1].src} alt={preview[1].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-xs font-semibold">{preview[1].caption}</p>
          </div>
        </div>
      </div>

      {/* Row 2: three equal tiles */}
      <div className="grid grid-cols-3 gap-2" style={{ height: 200 }}>
        {preview.slice(2, 5).map((img, i) => {
          const isLast = i === 2;
          const showOverlay = isLast && extra > 0;
          return (
            <div
              key={i}
              onClick={() => navigate(`/gallery/${event.year}`)}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
            >
              <img
                src={img.src}
                alt={img.caption}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${showOverlay ? "brightness-50" : ""}`}
              />
              {/* standard hover */}
              {!showOverlay && (
                <>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs font-semibold">{img.caption}</p>
                  </div>
                </>
              )}
              {/* "view all" overlay on last tile */}
              {showOverlay && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <p className="text-white text-3xl font-black">+{extra}</p>
                  <p className="text-yellow-400 text-xs font-semibold tracking-wide">View All Photos</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 pt-1">
        {event.gallery.map((img, i) => (
          <div
            key={i}
            onClick={() => navigate(`/gallery/${event.year}`)}
            className="flex-1 h-12 rounded-lg overflow-hidden cursor-pointer opacity-40 hover:opacity-80 transition duration-200 ring-1 ring-white/[0.05] hover:ring-yellow-400/30"
          >
            <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function PreviousDTWs() {
  const [activeYear, setActiveYear] = useState(0);
  const navigate = useNavigate();
  const active = events[activeYear];

  return (
    <div className="bg-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col justify-end px-6 pb-25 overflow-hidden">
        {events.map((e, i) => (
          <img
            key={e.year}
            src={e.image}
            alt={e.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activeYear ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

        {/* year pills — top right */}
        <div className="absolute top-28 right-6 sm:right-10 z-20 flex flex-col gap-2">
          {events.map((e, i) => (
            <button
              key={e.year}
              onClick={() => setActiveYear(i)}
              className={`text-right transition-all duration-200 ${i === activeYear ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
            >
              <span className={`block text-xs font-bold tracking-[0.15em] ${i === activeYear ? "text-yellow-400" : "text-white"}`}>{e.year}</span>
              {i === activeYear && <span className="block h-px bg-yellow-400 mt-0.5" />}
            </button>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Edition {active.edition} · {active.year}
            </p>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl md:text-[60px] font-black leading-[1.0] tracking-tight">
            Previous<br /><span className="text-yellow-400">DTWs</span>
          </h1>
          <p className="text-gray-400 text-sm mt-5 max-w-sm leading-relaxed">
            The previous editions of DTW brought together government institutions, innovators, startups, private sector players, development partners, academia, and technology communities to explore opportunities within Rwanda’s rapidly evolving digital landscape. 
          </p>
        </div>
      </section>

      {/* ── STICKY YEAR TABS ─────────────────────────────── */}
      <YearTabs active={activeYear} onChange={setActiveYear} />

      {/* ── EVENT DETAIL ─────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {events.map((event, i) => {
            const videoEmbedUrl = getYouTubeEmbedUrl(event.video);
            return (
            <div key={event.year} className={i === activeYear ? "block" : "hidden"}>
              <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

                {/* LEFT */}
                <div>
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-[420px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <p className="text-white/70 text-sm italic leading-relaxed max-w-xs">"{event.tagline}"</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden mt-3">
                    {event.stats.map((s) => (
                      <div key={s.label} className="bg-[#0A0A0A] px-4 py-5 text-center">
                        <p className="text-yellow-400 text-2xl font-black leading-none">{s.value}</p>
                        <p className="text-white/30 text-[10px] mt-1.5 uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT */}
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="h-px w-8 bg-yellow-400" />
                    <p className="text-yellow-400 text-[11px] font-semibold tracking-[0.2em] uppercase">{event.year} · Edition {event.edition}</p>
                  </div>
                  <h2 className="text-white text-3xl sm:text-4xl font-black leading-[1.08] tracking-tight">{event.title}</h2>
                  <p className="text-gray-400 text-sm mt-6 leading-relaxed">{event.description}</p>

                  {/* quote */}
                  <div className="mt-10 bg-[#141414] border border-white/[0.07] rounded-xl p-7 relative">
                    <div className="absolute -top-3 left-6 text-yellow-400 text-5xl font-black leading-none opacity-20 select-none">"</div>
                    <p className="text-white/70 text-sm leading-relaxed italic">{event.quote}</p>
                    <div className="flex items-center gap-3 mt-6">
                      <div className="w-8 h-8 rounded-full bg-yellow-400/15 flex items-center justify-center text-yellow-400 text-xs font-black">{event.author[0]}</div>
                      <div>
                        <p className="text-white text-sm font-semibold">{event.author}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{event.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* video */}
                  <div className="mt-8">
                    <p className="text-white/30 text-[10px] font-bold tracking-[0.18em] uppercase mb-3">Event Highlights</p>
                    <div className="rounded-xl overflow-hidden aspect-video bg-black">
                      {videoEmbedUrl ? (
                        <iframe
                          className="w-full h-full"
                          src={videoEmbedUrl}
                          title={`${event.title} highlights`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40 text-sm px-6 text-center">
                          Video unavailable — check the YouTube link in dtwEvents.ts
                        </div>
                      )}
                    </div>
                  </div>

                  {/* prev / next */}
                  <div className="flex items-center gap-3 mt-10">
                    <button onClick={() => setActiveYear((p) => Math.max(0, p - 1))} disabled={activeYear === 0} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-yellow-400/50 hover:text-yellow-400 transition disabled:opacity-20">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button onClick={() => setActiveYear((p) => Math.min(events.length - 1, p + 1))} disabled={activeYear === events.length - 1} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-yellow-400/50 hover:text-yellow-400 transition disabled:opacity-20">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <span className="text-white/20 text-xs tabular-nums ml-1">{activeYear + 1} / {events.length}</span>
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </section>

      {/* ── GALLERY SECTION ──────────────────────────────── */}
      <section className="bg-[#0A0A0A] pb-20 md:pb-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-yellow-400" />
                <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Photo Gallery</p>
              </div>
              <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                DTW <span className="text-yellow-400">{active.year}</span><br />in Pictures
              </h2>
              <p className="text-gray-500 text-sm mt-3 max-w-xs">
                {active.gallery.length} photos from {active.title}
              </p>
            </div>

            <button
              onClick={() => navigate(`/gallery/${active.year}`)}
              className="shrink-0 flex items-center gap-2.5 text-sm font-semibold text-white border border-white/15 px-5 py-2.5 rounded-lg hover:border-yellow-400/50 hover:text-yellow-400 transition duration-200 group"
            >
              Full Gallery
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Gallery grid — switches with active year */}
          {events.map((event, i) => (
            <div key={event.year} className={i === activeYear ? "block" : "hidden"}>
              <GalleryGrid event={event} />
            </div>
          ))}

        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="img6.jpg"
              alt="CTA"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/78" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 px-10 py-14">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-yellow-400" />
                  <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Coming Up</p>
                </div>
                <h2 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                  Be part of<br /><span className="text-yellow-400">DTW 2026</span>
                </h2>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-xs">
                  Join innovators, investors and digital leaders at Africa's most impactful technology conference.
                </p>
              </div>
              <div className="shrink-0 flex flex-col gap-3">
                <Link to="/register" className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm whitespace-nowrap">
                  Register for DTW 2026
                </Link>
                {/* <button className="border border-white/15 text-white font-medium px-8 py-3 rounded-lg hover:border-white/30 transition duration-200 text-sm whitespace-nowrap">
                  View Programme
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}