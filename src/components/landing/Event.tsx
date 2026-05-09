import { useEffect, useRef, useState } from "react";

// ─── Images ──────────────────────────────────────────────
const eventImage    = "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop";
const crowdImage    = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop";
const investorImage = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341242/55044140974_3f47551b38_c_ub6clo.jpg";
const womenTech     = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop";
const p1 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341062/53965601226_ac4ca6ae72_c_hiee6v.jpg";
const p2 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341093/54032086233_bd26f3f49a_c_w57q97.jpg";
const p3 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341119/54364971907_eb1dddfef5_c_ocjwo9.jpg";
const p4 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341119/54364971907_eb1dddfef5_c_ocjwo9.jpg";
const p5 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341156/54539018387_32b6b1a890_c_xebpa7.jpg";
const e1 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341184/54729974302_047453f413_c_kazt05.jpg";
const e2 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341200/54859846054_0445f7e863_c_xzwqba.jpg";
const e3 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341218/54944226791_94f3f4de77_c_jnc2iw.jpg";
const e4 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341268/55240901925_3beb234c47_c_kurzxo.jpg";

// ─── Types ───────────────────────────────────────────────
type EventCardProps = {
  title: string;
  image: string;
  date: string;
  location: string;
  floor: string;
  slotsLeft: number;
};

type GalleryItem = { src: string; alt: string; h: number };

// ─── EventCard ───────────────────────────────────────────
function EventCard({ title, image, date, location, slotsLeft }: EventCardProps) {
  return (
    <div className="group relative cursor-pointer">

      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 brightness-75 group-hover:brightness-90"
        />
        <span className="absolute top-3 right-3 text-[10px] font-medium tracking-widest uppercase text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          {slotsLeft} left
        </span>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-gray-500 text-[10px] tracking-[.18em] uppercase mb-1">{date}</p>
          <h2 className="text-white text-sm sm:text-base font-medium leading-tight">{title}</h2>
          <p className="text-gray-600 text-[11px] mt-1 font-light">{location}</p>
        </div>

        <button
          aria-label={`Register for ${title}`}
          className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-yellow-400/60 group-hover:text-yellow-400 transition-all duration-300"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Rule */}
      <div className="mt-3 h-px bg-white/[0.06] group-hover:bg-yellow-400/20 transition-colors duration-300" />
    </div>
  );
}

// ─── MasonryCarousel ─────────────────────────────────────
// Adapts column count & card width based on container width via ResizeObserver
function MasonryCarousel({ columns }: { columns: GalleryItem[][] }) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const trackRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const posRefs    = useRef<number[]>([]);
  const rafRef     = useRef<number>(0);

  // How many columns are actually visible (responsive)
  const [numCols, setNumCols] = useState(columns.length);
  const [colW, setColW]       = useState(200);

  const GAP   = 12;
  const SPEED = 0.4;
  const CONTAINER_H = 520;

  // Observe container width → derive column count & width
  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      let cols: number;
      if (w < 480)       cols = 2;
      else if (w < 768)  cols = 3;
      else if (w < 1024) cols = 4;
      else               cols = columns.length; // full 6 cols
      setNumCols(cols);
      // Card width fills available space evenly
      setColW(Math.floor((w - GAP * (cols - 1)) / cols));
    });
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [columns.length]);

  // Animation — re-initialise whenever numCols changes
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    posRefs.current = [];

    // Give DOM a tick to render before reading scrollHeight
    const id = setTimeout(() => {
      columns.slice(0, numCols).forEach((_, i) => {
        const track = trackRefs.current[i];
        if (!track) return;
        const setH = track.scrollHeight / 2;
        posRefs.current[i] = -(setH * (i / numCols));
      });

      const step = () => {
        columns.slice(0, numCols).forEach((_, i) => {
          const track = trackRefs.current[i];
          if (!track) return;
          const setH = track.scrollHeight / 2;
          posRefs.current[i] = (posRefs.current[i] ?? 0) - SPEED;
          if (posRefs.current[i] <= -setH) posRefs.current[i] += setH;
          track.style.transform = `translateY(${posRefs.current[i]}px)`;
        });
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    }, 50);

    return () => {
      clearTimeout(id);
      cancelAnimationFrame(rafRef.current);
    };
  }, [numCols, columns]);

  const visibleCols = columns.slice(0, numCols);

  return (
    <div ref={wrapRef} className="w-full">
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{ height: CONTAINER_H }}
      >
        {/* Fade top */}
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{ height: 80, background: "linear-gradient(to bottom, #080808, transparent)" }}
        />
        {/* Fade bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{ height: 80, background: "linear-gradient(to top, #080808, transparent)" }}
        />

        {/* Columns */}
        <div className="flex h-full" style={{ gap: GAP }}>
          {visibleCols.map((col, ci) => {
            const doubled = [...col, ...col];
            return (
              <div
                key={ci}
                className="flex-shrink-0 overflow-hidden"
                style={{ width: colW, height: CONTAINER_H }}
              >
                <div
                  ref={(el) => { trackRefs.current[ci] = el; }}
                  className="flex flex-col will-change-transform"
                  style={{ gap: GAP }}
                >
                  {doubled.map(({ src, alt, h }, idx) => (
                    <div
                      key={`${alt}-${idx}`}
                      className="flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl"
                      style={{ width: colW, height: h }}
                    >
                      <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover hover:scale-105 hover:brightness-110 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Gallery data ─────────────────────────────────────────
const col1: GalleryItem[] = [
  { src: p1, alt: "Talk on stage",    h: 180 },
  { src: e2, alt: "Crowd energy",     h: 130 },
  { src: p3, alt: "Panel discussion", h: 200 },
  { src: e4, alt: "Networking hall",  h: 150 },
  { src: p5, alt: "Keynote moment",   h: 170 },
];
const col2: GalleryItem[] = [
  { src: p2, alt: "Workshop session", h: 220 },
  { src: e1, alt: "Speaker closeup",  h: 140 },
  { src: p4, alt: "Expo floor",       h: 190 },
  { src: e3, alt: "Live demo",        h: 120 },
  { src: p1, alt: "Award ceremony",   h: 200 },
];
const col3: GalleryItem[] = [
  { src: e3, alt: "Breakout room",  h: 150 },
  { src: p5, alt: "Crowd shot",     h: 210 },
  { src: e2, alt: "Startup pitch",  h: 130 },
  { src: p2, alt: "Side event",     h: 180 },
  { src: e4, alt: "Cocktail hour",  h: 160 },
];
const col4: GalleryItem[] = [
  { src: p4, alt: "Main stage",    h: 200 },
  { src: e1, alt: "Press area",    h: 140 },
  { src: p3, alt: "Roundtable",    h: 170 },
  { src: e2, alt: "Entrance hall", h: 230 },
  { src: p1, alt: "Gala night",    h: 150 },
];
const col5: GalleryItem[] = [
  { src: e4, alt: "VC meetup",      h: 160 },
  { src: p5, alt: "Workshop close", h: 195 },
  { src: e3, alt: "Interview zone", h: 130 },
  { src: p4, alt: "Sponsor wall",   h: 210 },
  { src: e1, alt: "Closing party",  h: 155 },
];
const col6: GalleryItem[] = [
  { src: p2, alt: "Registration", h: 175 },
  { src: e2, alt: "Drone shot",   h: 220 },
  { src: p1, alt: "Green room",   h: 140 },
  { src: e4, alt: "Outdoor stage",h: 190 },
  { src: p3, alt: "Tech showcase",h: 130 },
];

const galleryColumns = [col1, col2, col3, col4, col5, col6];

// ─── Event data ───────────────────────────────────────────
const events: EventCardProps[] = [
  { title: "AI & Machine Learning", image: eventImage,    date: "June 10 · 09:00 AM", location: "Marriott Hotel, Kigali", floor: "Level 3 · 3rd Floor",  slotsLeft: 30 },
  { title: "Startup Summit",        image: crowdImage,    date: "June 11 · 10:00 AM", location: "Marriott Hotel, Kigali", floor: "Level 2 · Main Hall",   slotsLeft: 12 },
  { title: "Investor Day",          image: investorImage, date: "June 12 · 08:30 AM", location: "Marriott Hotel, Kigali", floor: "Level 4 · Boardroom",   slotsLeft: 50 },
  { title: "Women in Tech",         image: womenTech,     date: "June 13 · 11:00 AM", location: "Marriott Hotel, Kigali", floor: "Level 1 · Garden Hall", slotsLeft: 8  },
];

// ─── UpcomingEvents ───────────────────────────────────────
const UpcomingEvents = () => {
  return (
    <section className="bg-[#080808] py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <p className="text-yellow-400 text-[10px] sm:text-xs font-medium tracking-[.2em] uppercase">
          Upcoming · DTWS 2026
        </p>
        <h1
          className="text-white leading-[.95] mt-3"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 7vw, 80px)" }}
        >
          Don't Miss<br />
          What's <span className="text-yellow-400">Next</span>
        </h1>
        <p className="text-gray-500 mt-3 text-sm font-light">
          Browse all events at Africa's leading tech conference
        </p>

        {/* EVENT CARDS — 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-14">
          {events.map((e) => <EventCard key={e.title} {...e} />)}
        </div>

        {/* DIVIDER */}
        <div className="mt-16 sm:mt-20 h-px bg-white/[0.07]" />

        {/* HIGHLIGHTS HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mt-12 sm:mt-16 mb-8 sm:mb-10">
          <div>
            <p className="text-yellow-400 text-[10px] sm:text-xs font-medium tracking-[.2em] uppercase">
              Highlights
            </p>
            <h1
              className="text-white leading-[.95] mt-2 sm:mt-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 72px)" }}
            >
              DTWS <span className="text-yellow-400">2025</span>
            </h1>
          </div>
          <p className="text-gray-500 text-sm font-light sm:max-w-[200px] sm:text-right">
            Relive the moments that made last year unforgettable
          </p>
        </div>
      </div>

      {/* MASONRY CAROUSEL — full bleed with side padding */}
      <div className="px-4 sm:px-6">
        <MasonryCarousel columns={galleryColumns} />
      </div>
    </section>
  );
};

export default UpcomingEvents;