import { useEffect, useRef } from "react";

// ─── Images ──────────────────────────────────────────────
const eventImage    = "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop";
const crowdImage    = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop";
const investorImage = "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=800&auto=format&fit=crop";
const womenTech     = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop";
const p1 = "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=800&auto=format&fit=crop";
const p2 = "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop";
const p3 = "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=800&auto=format&fit=crop";
const p4 = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop";
const p5 = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop";
const e1 = "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop";
const e2 = "https://images.unsplash.com/photo-1560523159-4a9692d222ef?q=80&w=800&auto=format&fit=crop";
const e3 = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop";
const e4 = "https://images.unsplash.com/photo-1559223607-b4d0555ae227?q=80&w=800&auto=format&fit=crop";

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

      {/* Image — full bleed, no border radius overkill */}
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 brightness-75 group-hover:brightness-90"
        />

        {/* Slots pill — top right, very subtle */}
        <span className="absolute top-3 right-3 text-[10px] font-medium tracking-widest uppercase text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          {slotsLeft} left
        </span>
      </div>

      {/* Content — below image, minimal */}
      <div className="mt-3 flex items-start justify-between gap-3">

        <div>
          <p className="text-gray-500 text-[10px] tracking-[.18em] uppercase mb-1">{date}</p>
          <h2 className="text-white text-base font-medium leading-tight">{title}</h2>
          <p className="text-gray-600 text-[11px] mt-1 font-light">{location}</p>
        </div>

        {/* Arrow — appears on hover */}
        <button
          aria-label={`Register for ${title}`}
          className="flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-yellow-400/60 group-hover:text-yellow-400 transition-all duration-300"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      {/* Bottom rule */}
      <div className="mt-3 h-px bg-white/[0.06] group-hover:bg-yellow-400/20 transition-colors duration-300" />

    </div>
  );
}

// ─── MasonryCarousel ─────────────────────────────────────
// Renders N columns as independent vertical strips, all scrolling upward
// at the same speed but each starting at a different offset so cards
// are never horizontally aligned — pure Pinterest masonry feel.
function MasonryCarousel({ columns }: { columns: GalleryItem[][] }) {
  const NUM_COLS = columns.length;
  const COL_W = 200;
  const GAP = 12;
  const SPEED = 0.4; // px per frame at 60fps → ~24px/s

  // One ref per column
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRefs   = useRef<number[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    // Stagger starting positions: col 0 starts at 0, col 1 at 1/3 height, col 2 at 2/3 …
    columns.forEach((_, i) => {
      const track = trackRefs.current[i];
      if (!track) return;
      const setH = track.scrollHeight / 2;
      posRefs.current[i] = -(setH * (i / NUM_COLS));
    });

    const step = () => {
      columns.forEach((_, i) => {
        const track = trackRefs.current[i];
        if (!track) return;
        const setH = track.scrollHeight / 2;
        posRefs.current[i] -= SPEED;
        if (posRefs.current[i] <= -setH) posRefs.current[i] += setH;
        track.style.transform = `translateY(${posRefs.current[i]}px)`;
      });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Container height = fixed viewport window for the carousel
  const CONTAINER_H = 520;

  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{ height: CONTAINER_H }}
    >
      {/* Fade masks top & bottom */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{ height: 80, background: "linear-gradient(to bottom, #080808, transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{ height: 80, background: "linear-gradient(to top, #080808, transparent)" }}
      />

      {/* Column tracks */}
      <div className="flex" style={{ gap: GAP }}>
        {columns.map((col, ci) => {
          const doubled = [...col, ...col];
          return (
            <div
              key={ci}
              className="flex-shrink-0 overflow-hidden"
              style={{ width: COL_W, height: CONTAINER_H }}
            >
              <div
                ref={(el) => { trackRefs.current[ci] = el; }}
                className="flex flex-col will-change-transform"
                style={{ gap: GAP }}
              >
                {doubled.map(({ src, alt, h }, idx) => (
                  <div
                    key={`${alt}-${idx}`}
                    className="flex-shrink-0 overflow-hidden rounded-2xl"
                    style={{ width: COL_W, height: h }}
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
  );
}

// ─── Gallery columns (Pinterest masonry — varied heights per card) ──
const col1: GalleryItem[] = [
  { src: p1,  alt: "Talk on stage",    h: 180 },
  { src: e2,  alt: "Crowd energy",     h: 130 },
  { src: p3,  alt: "Panel discussion", h: 200 },
  { src: e4,  alt: "Networking hall",  h: 150 },
  { src: p5,  alt: "Keynote moment",   h: 170 },
];
const col2: GalleryItem[] = [
  { src: p2,  alt: "Workshop session", h: 220 },
  { src: e1,  alt: "Speaker closeup",  h: 140 },
  { src: p4,  alt: "Expo floor",       h: 190 },
  { src: e3,  alt: "Live demo",        h: 120 },
  { src: p1,  alt: "Award ceremony",   h: 200 },
];
const col3: GalleryItem[] = [
  { src: e3,  alt: "Breakout room",    h: 150 },
  { src: p5,  alt: "Crowd shot",       h: 210 },
  { src: e2,  alt: "Startup pitch",    h: 130 },
  { src: p2,  alt: "Side event",       h: 180 },
  { src: e4,  alt: "Cocktail hour",    h: 160 },
];
const col4: GalleryItem[] = [
  { src: p4,  alt: "Main stage",       h: 200 },
  { src: e1,  alt: "Press area",       h: 140 },
  { src: p3,  alt: "Roundtable",       h: 170 },
  { src: e2,  alt: "Entrance hall",    h: 230 },
  { src: p1,  alt: "Gala night",       h: 150 },
];
const col5: GalleryItem[] = [
  { src: e4,  alt: "VC meetup",        h: 160 },
  { src: p5,  alt: "Workshop close",   h: 195 },
  { src: e3,  alt: "Interview zone",   h: 130 },
  { src: p4,  alt: "Sponsor wall",     h: 210 },
  { src: e1,  alt: "Closing party",    h: 155 },
];
const col6: GalleryItem[] = [
  { src: p2,  alt: "Registration",     h: 175 },
  { src: e2,  alt: "Drone shot",       h: 220 },
  { src: p1,  alt: "Green room",       h: 140 },
  { src: e4,  alt: "Outdoor stage",    h: 190 },
  { src: p3,  alt: "Tech showcase",    h: 130 },
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
    <section className="bg-[#080808] py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <p className="text-yellow-400 text-xs font-medium tracking-[.2em] uppercase">
          Upcoming · DTWS 2026
        </p>
        <h1
          className="text-white leading-[.95] mt-3"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 7vw, 80px)" }}
        >
          Don't Miss<br />
          What's <span className="text-yellow-400">Next</span>
        </h1>
        <p className="text-gray-500 mt-3 text-sm font-light">
          Browse all events at Africa's leading tech conference
        </p>

        {/* EVENT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {events.map((e) => <EventCard key={e.title} {...e} />)}
        </div>

        {/* DIVIDER */}
        <hr className="border-none border-t border-white/[0.07] mt-20" />

        {/* PREVIOUS SECTION HEADER */}
        <div className="flex items-end justify-between flex-wrap gap-4 mt-16 mb-10">
          <div>
            <p className="text-yellow-400 text-xs font-medium tracking-[.2em] uppercase">
              Highlights
            </p>
            <h1
              className="text-white leading-[.95] mt-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 72px)" }}
            >
              DTWS <span className="text-yellow-400">2025</span>
            </h1>
          </div>
          <p className="text-gray-500 text-sm font-light max-w-[200px] text-right">
            Relive the moments that made last year unforgettable
          </p>
        </div>
      </div>

      {/* MASONRY CAROUSEL — full bleed */}
      <div className="px-6">
        <MasonryCarousel columns={galleryColumns} />
      </div>

    </section>
  );
};

export default UpcomingEvents;