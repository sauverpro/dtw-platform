import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { events } from "../data/dtwEvents";

// ── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { src: string; caption: string; description: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const img = images[current];

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // keyboard nav
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      tabIndex={0}
      onKeyDown={handleKey}
      autoFocus
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07] shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-yellow-400" />
          <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
            {current + 1} / {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition"
        >
          <X size={14} />
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16">
        <img
          key={current}
          src={img.src}
          alt={img.caption}
          className="max-h-full max-w-full object-contain select-none"
          style={{ animation: "fadeIn 0.25s ease" }}
        />

        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-4 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-yellow-400/50 hover:text-yellow-400 transition"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-4 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-yellow-400/50 hover:text-yellow-400 transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Caption bar */}
      <div className="px-8 py-5 border-t border-white/[0.07] shrink-0">
        <p className="text-white font-semibold text-sm">{img.caption}</p>
        <p className="text-gray-500 text-xs mt-1.5 leading-relaxed max-w-2xl">{img.description}</p>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 px-6 pb-4 overflow-x-auto scrollbar-none shrink-0">
        {images.map((i, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`shrink-0 w-14 h-10 rounded-md overflow-hidden transition-all duration-200 ring-1 ${
              idx === current ? "ring-yellow-400 opacity-100" : "ring-white/10 opacity-40 hover:opacity-70"
            }`}
          >
            <img src={i.src} alt={i.caption} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

// ── Filter tags derived from captions ─────────────────────────────────────
const ALL = "All";

// ── Main page ──────────────────────────────────────────────────────────────
export default function EventGalleryPage() {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  const event = events.find((e) => e.year === year);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState(ALL);
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 text-sm">Event not found</p>
          <button onClick={() => navigate("/previous-dtws")} className="mt-4 text-yellow-400 text-sm font-semibold hover:underline">
            ← Back to Previous DTWs
          </button>
        </div>
      </div>
    );
  }

  // Build unique filter tags from captions (split on space, take first word)
  const tags = [ALL, ...Array.from(new Set(event.gallery.map((g) => g.caption.split(" ")[0])))];
  const filtered = filter === ALL ? event.gallery : event.gallery.filter((g) => g.caption.startsWith(filter));

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />

      {/* ── HERO HEADER ────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* blurred bg */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-15"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/80" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* back */}
          <button
            onClick={() => navigate("/previous-dtws")}
            className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-medium transition mb-10 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Previous DTWs
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Edition {event.edition} · {event.year}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-white text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">
                {event.title}
                <br />
                <span className="text-yellow-400">Gallery</span>
              </h1>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-md">
                {event.description}
              </p>
            </div>

            {/* stats */}
            <div className="flex gap-6 shrink-0">
              {event.stats.map((s) => (
                <div key={s.label} className="text-right">
                  <p className="text-yellow-400 text-xl font-black leading-none">{s.value}</p>
                  <p className="text-white/30 text-[10px] mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* photo count pill */}
          <div className="mt-8 inline-flex items-center gap-2 bg-white/5 border border-white/[0.07] rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="text-white/50 text-xs font-medium">{event.gallery.length} photos</span>
          </div>
        </div>
      </section>

      {/* ── CONTROLS BAR ────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06] px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          {/* filter tags */}
          <div className="flex items-center gap-2 shrink-0">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`text-[11px] font-semibold px-3.5 py-1.5 rounded-full transition duration-200 whitespace-nowrap ${
                  filter === tag
                    ? "bg-yellow-400 text-black"
                    : "text-white/40 border border-white/10 hover:border-white/25 hover:text-white/70"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* layout toggle */}
          <div className="flex items-center gap-1 shrink-0 border border-white/10 rounded-lg p-1">
            {(["grid", "masonry"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition duration-200 capitalize ${
                  layout === l ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GALLERY GRID ─────────────────────────────────── */}
      <section className="px-6 py-10 pb-24">
        <div className="max-w-7xl mx-auto">

          {filtered.length === 0 && (
            <p className="text-white/30 text-sm text-center py-20">No photos in this category.</p>
          )}

          {layout === "grid" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((img, i) => {
                // every 7th image is featured (larger)
                const featured = i % 7 === 0;
                return (
                  <div
                    key={i}
                    onClick={() => setLightboxIndex(event.gallery.indexOf(img))}
                    className={`group relative overflow-hidden rounded-xl cursor-pointer ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
                    style={{ aspectRatio: featured ? "1.2 / 1" : "1 / 1" }}
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />

                    {/* hover info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-white text-xs font-bold">{img.caption}</p>
                      <p className="text-white/50 text-[10px] mt-1 line-clamp-2 leading-relaxed">{img.description}</p>
                    </div>

                    {/* expand icon */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 9l8-8M9 1H5M9 1v4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {layout === "masonry" && (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {filtered.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(event.gallery.indexOf(img))}
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-3"
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ height: `${180 + (i % 3) * 60}px` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-xs font-bold">{img.caption}</p>
                    <p className="text-white/50 text-[10px] mt-1 line-clamp-2">{img.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Caption list below grid */}
          <div className="mt-12 border-t border-white/[0.06] pt-10">
            <p className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">All Captions</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filtered.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(event.gallery.indexOf(img))}
                  className="text-left group flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition duration-200"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold group-hover:text-white transition">{img.caption}</p>
                    <p className="text-white/20 text-[10px] mt-0.5 leading-snug line-clamp-2">{img.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER EDITIONS ──────────────────────────────── */}
      {events.filter((e) => e.year !== year).length > 0 && (
        <section className="bg-[#080808] border-t border-white/[0.06] px-6 py-14">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-yellow-400" />
              <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Other Editions</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events
                .filter((e) => e.year !== year)
                .map((e) => (
                  <button
                    key={e.year}
                    onClick={() => navigate(`/gallery/${e.year}`)}
                    className="group relative overflow-hidden rounded-xl text-left"
                  >
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105 brightness-60 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <p className="text-yellow-400 text-[10px] font-bold tracking-[0.15em] uppercase mb-1">Edition {e.edition}</p>
                      <p className="text-white text-sm font-bold">{e.year} Gallery</p>
                      <p className="text-white/40 text-xs mt-0.5">{e.gallery.length} photos</p>
                    </div>
                    <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={event.gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
