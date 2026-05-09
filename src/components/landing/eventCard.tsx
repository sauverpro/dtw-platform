const eventImage =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop";

const crowdImage =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop";

const investorImage =
  "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=1200&auto=format&fit=crop";

const womenTechImage =
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop";

const previous1 =
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop";

const previous2 =
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop";

const previous3 =
  "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=1200&auto=format&fit=crop";

const previous4 =
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop";

const previous5 =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop";

// ─── Types ───────────────────────────────────────────────
type EventCardProps = {
  title: string;
  image: string;
  date: string;
  location: string;
  floor: string;
  slotsLeft: number;
};

// ─── EventCard (inline) ──────────────────────────────────
function EventCard({ title, image, date, location, floor, slotsLeft }: EventCardProps) {
  return (
    <div className="group bg-[#0F0F0F] border border-white/[0.07] rounded-[20px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 hover:border-yellow-400/25 cursor-pointer">

      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
        />
        <div className="absolute top-3.5 left-3.5 bg-yellow-400 text-black text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
          {slotsLeft} slots left
        </div>
      </div>

      <div className="p-5">
        <p className="text-yellow-400 text-[11px] font-medium tracking-[.15em] uppercase mb-2">
          {date}
        </p>
        <h2
          className="text-white text-2xl leading-none tracking-wide"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h2>
        <div className="mt-2.5 flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-light">{location}</span>
          <span className="text-xs text-gray-500 font-light">{floor}</span>
        </div>
        <button className="mt-5 border border-yellow-400/50 text-yellow-400 text-[11px] font-medium tracking-[.1em] uppercase px-5 py-2.5 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-200">
          Register →
        </button>
      </div>

    </div>
  );
}

// ─── UpcomingEvents ──────────────────────────────────────
const events: EventCardProps[] = [
  {
    title: "AI & Machine Learning",
    image: eventImage,
    date: "June 10 · 09:00 AM",
    location: "Marriott Hotel, Kigali",
    floor: "Level 3 · 3rd Floor",
    slotsLeft: 30,
  },
  {
    title: "Startup Summit",
    image: crowdImage,
    date: "June 11 · 10:00 AM",
    location: "Marriott Hotel, Kigali",
    floor: "Level 2 · Main Hall",
    slotsLeft: 12,
  },
  {
    title: "Investor Day",
    image: investorImage,
    date: "June 12 · 08:30 AM",
    location: "Marriott Hotel, Kigali",
    floor: "Level 4 · Boardroom",
    slotsLeft: 50,
  },
  {
    title: "Women in Tech",
    image: womenTechImage,
    date: "June 13 · 11:00 AM",
    location: "Marriott Hotel, Kigali",
    floor: "Level 1 · Garden Hall",
    slotsLeft: 8,
  },
];

const galleryImages = [
  { src: previous1, height: "h-48", alt: "DTWS 2025 highlight 1" },
  { src: previous2, height: "h-64", alt: "DTWS 2025 highlight 2" },
  { src: previous3, height: "h-48", alt: "DTWS 2025 highlight 3" },
  { src: previous4, height: "h-64", alt: "DTWS 2025 highlight 4" },
  { src: previous5, height: "h-72", alt: "DTWS 2025 highlight 5" },
];

const UpcomingEvents = () => {
  return (
    <section className="bg-[#080808] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
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

        {/* ── EVENT CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>

        {/* ── DIVIDER ── */}
        <hr className="border-none border-t border-white/[0.07] mt-20" />

        {/* ── PREVIOUS SECTION ── */}
        <div className="flex items-end justify-between flex-wrap gap-4 mt-18 mt-16">
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

        {/* ── GALLERY ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-8 items-end">
          {galleryImages.map(({ src, height, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className={`${height} w-full object-cover rounded-2xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03] hover:brightness-110`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;