import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { events as dtwEvents } from "../../data/dtwEvents";

// ─── Images ──────────────────────────────────────────────
const eventImage    = "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779716264/55044332450_e82cfa26fd_o_tvxql1.jpg";
const crowdImage    = "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779717447/55044284276_4b82cb6800_k_sc3bbu.jpg";
const investorImage = "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779717149/55044201863_04b9e1fa39_k_tu7rh7.jpg";
const womenTech     = "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779716263/55044242463_b7cb6cde6f_o_ewimr7.jpg";
// const p1 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341062/53965601226_ac4ca6ae72_c_hiee6v.jpg";
// const p2 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341093/54032086233_bd26f3f49a_c_w57q97.jpg";
// const p3 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341119/54364971907_eb1dddfef5_c_ocjwo9.jpg";
// const p4 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341119/54364971907_eb1dddfef5_c_ocjwo9.jpg";
// const p5 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341156/54539018387_32b6b1a890_c_xebpa7.jpg";
// const e1 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341184/54729974302_047453f413_c_kazt05.jpg";
// const e2 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341200/54859846054_0445f7e863_c_xzwqba.jpg";
// const e3 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341218/54944226791_94f3f4de77_c_jnc2iw.jpg";
// const e4 = "https://res.cloudinary.com/dx90htl9t/image/upload/v1778341268/55240901925_3beb234c47_c_kurzxo.jpg";

type EventCardProps = {
  title: string;
  image: string;
  date: string;
  location: string;
  floor: string;
};

type GalleryItem = { src: string; alt: string; h: number };

const MASONRY_HEIGHTS = [170, 120, 190, 140, 160, 210, 130, 180, 115, 150, 200, 220, 145, 165];

function createGalleryColumns(totalCols = 6): GalleryItem[][] {
  const dtw2025 = dtwEvents.find((event) => event.year === "2025");
  const uniqueGallery = Array.from(
    new Map((dtw2025?.gallery ?? []).map((item) => [item.src, item])).values(),
  );

  const columns: GalleryItem[][] = Array.from({ length: totalCols }, () => []);

  uniqueGallery.forEach((item, idx) => {
    const col = idx % totalCols;
    columns[col].push({
      src: item.src,
      alt: item.caption || `DTW 2025 highlight ${idx + 1}`,
      h: MASONRY_HEIGHTS[idx % MASONRY_HEIGHTS.length],
    });
  });

  return columns.filter((col) => col.length > 0);
}

// ─── EventCard ───────────────────────────────────────────
function EventCard({ title, image, date, location }: EventCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-70 group-hover:brightness-85"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-gray-500 text-[10px] tracking-[0.15em] uppercase mb-1">{date}</p>
          <h3 className="text-white text-sm font-semibold leading-snug">{title}</h3>
          <p className="text-gray-600 text-[11px] mt-0.5">{location}</p>
        </div>

        <Link
          to="/register"
          aria-label={`Register for ${title}`}
          className="flex-shrink-0 mt-1 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-yellow-400/50 group-hover:text-yellow-400 transition-all duration-300"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <div className="mt-3 h-px bg-white/[0.05] group-hover:bg-yellow-400/15 transition-colors duration-300" />
    </div>
  );
}

// ─── MasonryCarousel ─────────────────────────────────────
function MasonryCarousel({ columns }: { columns: GalleryItem[][] }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRefs   = useRef<number[]>([]);
  const rafRef    = useRef<number>(0);

  const [numCols, setNumCols] = useState(columns.length);
  const [colW, setColW]       = useState(200);

  const GAP   = 10;
  const SPEED = 0.35;
  const CONTAINER_H = 480;

  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const cols = w < 480 ? 2 : w < 768 ? 3 : w < 1024 ? 4 : columns.length;
      setNumCols(cols);
      setColW(Math.floor((w - GAP * (cols - 1)) / cols));
    });
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [columns.length]);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    posRefs.current = [];

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

    return () => { clearTimeout(id); cancelAnimationFrame(rafRef.current); };
  }, [numCols, columns]);

  const visibleCols = columns.slice(0, numCols);

  return (
    <div ref={wrapRef} className="w-full">
      <div className="relative overflow-hidden rounded-xl" style={{ height: CONTAINER_H }}>
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none" style={{ height: 60, background: "linear-gradient(to bottom, #080808, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: 60, background: "linear-gradient(to top, #080808, transparent)" }} />

        <div className="flex h-full" style={{ gap: GAP }}>
          {visibleCols.map((col, ci) => {
            const doubled = [...col, ...col];
            return (
              <div key={ci} className="flex-shrink-0 overflow-hidden" style={{ width: colW, height: CONTAINER_H }}>
                <div ref={(el) => { trackRefs.current[ci] = el; }} className="flex flex-col will-change-transform" style={{ gap: GAP }}>
                  {doubled.map(({ src, alt, h }, idx) => (
                    <div key={`${alt}-${idx}`} className="flex-shrink-0 overflow-hidden rounded-lg" style={{ width: colW, height: h }}>
                      <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
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
const galleryColumns = createGalleryColumns(6);

const events: EventCardProps[] = [
  { title: "AI & Machine Learning", image: eventImage,    date: "June 10 · 09:00 AM", location: "Marriott Hotel, Kigali", floor: "Level 3 · 3rd Floor",  },
  { title: "Startup Summit",        image: crowdImage,    date: "June 11 · 10:00 AM", location: "Marriott Hotel, Kigali", floor: "Level 2 · Main Hall",   },
  { title: "Investor Day",          image: investorImage, date: "June 12 · 08:30 AM", location: "Marriott Hotel, Kigali", floor: "Level 4 · Boardroom",   },
  { title: "Women in Tech",         image: womenTech,     date: "June 13 · 11:00 AM", location: "Marriott Hotel, Kigali", floor: "Level 1 · Garden Hall", },
];

// ─── UpcomingEvents ───────────────────────────────────────
const UpcomingEvents = () => {
  return (
    <section className="bg-[#080808] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-yellow-400 shrink-0" />
          <p className="text-yellow-400 text-[11px] font-semibold tracking-[0.2em] uppercase">
            Upcoming · DTW 2026
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
            Don't Miss<br />
            What's <span className="text-yellow-400">Next</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[200px]">
            Browse all events at Africa's leading tech conference
          </p>
        </div>

        {/* EVENT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {events.map((e) => <EventCard key={e.title} {...e} />)}
        </div>

        {/* DIVIDER */}
        <div className="mt-16 h-px bg-white/[0.06]" />

        {/* HIGHLIGHTS HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-14 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-yellow-400 shrink-0" />
              <p className="text-yellow-400 text-[11px] font-semibold tracking-[0.2em] uppercase">Highlights</p>
            </div>
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              DTW <span className="text-yellow-400">2025</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm sm:max-w-[200px] sm:text-right">
             
          </p>
        </div>
      </div>

      {/* MASONRY CAROUSEL */}
      <div className="px-6">
        <MasonryCarousel columns={galleryColumns} />
      </div>
    </section>
  );
};

export default UpcomingEvents;