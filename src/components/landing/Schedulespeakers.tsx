import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Download } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────
const days = [
  {
    label: "Day 01",
    date: "Dec 7, 2026",
    theme: "Digital Innovation Forum",
    themeDesc:
      "Northern Province kicks off the provincial tour with a focus on AgriTech, Tourism Tech and SME growth — bringing innovation closer to communities.",
    location: "Northern Province",
    locationSub: "Province-Based Engagement",
    accentGlow: "rgba(250,204,21,0.08)",
    focusArea: "AgriTech, Tourism Tech & SME Growth",
    speakers: [
      { name: "To Be Announced", role: "AgriTech Innovator",   company: "Northern Province",  session: "Tech Demonstrations", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
      { name: "To Be Announced", role: "SME Growth Expert",    company: "Rwanda ICT Chamber", session: "Business Partnerships", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "Morning",    title: "Provincial Dialogue & Opening",           type: "keynote", desc: "Community engagement and digital transformation discussions." },
      { time: "Mid-Morning", title: "AgriTech & Tourism Tech Demonstrations", type: "talk",    desc: "Live tech demos showcasing innovations relevant to the province." },
      { time: "Afternoon",  title: "Youth Digital Jobs Sessions",             type: "panel",   desc: "Empowering youth with digital skills and employment pathways." },
      { time: "Late Afternoon", title: "Business Partnerships Forum",         type: "workshop", desc: "SME networking and partnership-building sessions." },
    ],
  },
  {
    label: "Day 02",
    date: "Dec 8, 2026",
    theme: "Digital Innovation Forum",
    themeDesc:
      "Southern Province spotlights EdTech, Creative Economy and SME growth — exploring how education and creativity fuel Rwanda's digital future.",
    location: "Southern Province",
    locationSub: "Province-Based Engagement",
    accentGlow: "rgba(96,165,250,0.07)",
    focusArea: "EdTech, Creative Economy & SME Growth",
    speakers: [
      { name: "To Be Announced", role: "EdTech Leader",         company: "Southern Province",  session: "Education Innovation", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
      { name: "To Be Announced", role: "Creative Economy Expert", company: "Rwanda ICT Chamber", session: "Creative Economy Panel", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "Morning",    title: "Provincial Dialogue & Opening",         type: "keynote", desc: "Community engagement focused on education and creative industries." },
      { time: "Mid-Morning", title: "EdTech Demonstrations",                type: "talk",    desc: "Showcasing digital tools transforming education in Rwanda." },
      { time: "Afternoon",  title: "Creative Economy Showcase",             type: "panel",   desc: "Celebrating digital creatives and their economic contribution." },
      { time: "Late Afternoon", title: "Youth Digital Jobs & SME Sessions", type: "workshop", desc: "Connecting SMEs with digital tools and employment opportunities." },
    ],
  },
  {
    label: "Day 03",
    date: "Dec 9, 2026",
    theme: "Digital Trade Forum",
    themeDesc:
      "Western Province focuses on Digital Trade and SME growth — unlocking cross-border commerce opportunities and local business digitization.",
    location: "Western Province",
    locationSub: "Province-Based Engagement",
    accentGlow: "rgba(52,211,153,0.07)",
    focusArea: "Digital Trade & SME Growth",
    speakers: [
      { name: "To Be Announced", role: "Digital Trade Expert",  company: "Western Province",   session: "Trade Forum Keynote",   img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop" },
      { name: "To Be Announced", role: "SME Digitization Lead", company: "Rwanda ICT Chamber", session: "SME Digitization Panel", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "Morning",    title: "Digital Trade Forum Opening",           type: "keynote", desc: "Dialogue on digital trade opportunities and cross-border commerce." },
      { time: "Mid-Morning", title: "SME Digitization Demonstrations",      type: "talk",    desc: "Tools and platforms enabling SME growth through digital adoption." },
      { time: "Afternoon",  title: "Youth Digital Jobs Sessions",           type: "panel",   desc: "Creating pathways to digital employment for Western Province youth." },
      { time: "Late Afternoon", title: "Business Partnerships Forum",       type: "workshop", desc: "Building trade and investment partnerships across the province." },
    ],
  },
  {
    label: "Day 04",
    date: "Dec 10, 2026",
    theme: "Smart Economy Forum",
    themeDesc:
      "Eastern Province explores Smart Agriculture, Logistics and SME Growth — connecting technology with the province's economic strengths.",
    location: "Eastern Province",
    locationSub: "Province-Based Engagement",
    accentGlow: "rgba(168,85,247,0.07)",
    focusArea: "Smart Agriculture, Logistics & SME Growth",
    speakers: [
      { name: "To Be Announced", role: "Smart Agriculture Expert", company: "Eastern Province",  session: "AgriTech Keynote",      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" },
      { name: "To Be Announced", role: "Logistics Tech Lead",      company: "Rwanda ICT Chamber", session: "Logistics Innovation",  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "Morning",    title: "Smart Economy Forum Opening",           type: "keynote", desc: "Exploring smart solutions for agriculture and logistics in Eastern Province." },
      { time: "Mid-Morning", title: "Smart Agriculture Tech Demonstrations", type: "talk",   desc: "Innovative AgriTech tools improving productivity and food security." },
      { time: "Afternoon",  title: "Logistics & Supply Chain Innovation",   type: "panel",   desc: "Digital solutions transforming logistics and trade corridors." },
      { time: "Late Afternoon", title: "Youth & SME Growth Sessions",       type: "workshop", desc: "Connecting youth and SMEs with digital tools and opportunities." },
    ],
  },
  {
    label: "Day 05",
    date: "Dec 11, 2026",
    theme: "Digital Business Summit",
    themeDesc:
      "The national summit in Kigali brings together stakeholders from across Rwanda and internationally to close the week with policy dialogue, exhibitions and business partnerships.",
    location: "Kigali",
    locationSub: "Kigali Convention Centre",
    accentGlow: "rgba(250,204,21,0.12)",
    focusArea: "National Summit, Exhibitions & Policy Dialogue",
    speakers: [
      { name: "To Be Announced", role: "Minister of ICT",      company: "Government of Rwanda", session: "Summit Keynote",         img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" },
      { name: "To Be Announced", role: "International Partner", company: "Development Partner",  session: "Investment Forum",       img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "Morning",    title: "Digital Business Summit Opening",       type: "keynote", desc: "National and international stakeholders convene in Kigali." },
      { time: "Mid-Morning", title: "Rwanda's Digital Economy — Showcase",  type: "talk",    desc: "Presenting innovations and achievements from the provincial tour." },
      { time: "Afternoon",  title: "Investment & Partnership Forum",        type: "panel",   desc: "Exploring investment opportunities and business partnerships." },
      { time: "Mid-Afternoon", title: "Policy Dialogue",                    type: "workshop", desc: "Discussing Rwanda's digital economy policy roadmap." },
      { time: "Evening",    title: "Exhibitions & Networking Gala",         type: "break",   desc: "Celebrating digital innovation with exhibitions and awards." },
    ],
  },
];

// ── Speaker card ──────────────────────────────────────────────────────────
type Speaker = (typeof days)[0]["speakers"][0];

function SpeakerCard({
  speaker, offset, animating, direction,
}: {
  speaker: Speaker; offset: number; animating: boolean; direction: "next" | "prev";
}) {
  const animClass = animating
    ? direction === "next" ? "anim-slide-right" : "anim-slide-left"
    : "";

  return (
    <div
      className={`rounded-xl overflow-hidden flex-1 bg-[#0F0F0F] border border-white/[0.07] ${offset === 1 ? "mt-7" : ""} ${animClass}`}
      style={{ animationDelay: offset === 1 ? "55ms" : "0ms" }}
    >
      <div className="relative overflow-hidden">
        <img src={speaker.img} alt={speaker.name} className="w-full h-48 sm:h-56 object-cover brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-white/80 bg-black/60 backdrop-blur-sm border border-white/[0.14] px-2.5 py-1 rounded-full">
          {speaker.session}
        </span>
      </div>
      <div className="px-4 py-4">
        <p className="text-white text-sm font-bold leading-snug">{speaker.name}</p>
        <p className="text-yellow-300 text-[11px] mt-0.5">{speaker.role}</p>
        <p className="text-white/65 text-[11px] mt-0.5">{speaker.company}</p>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function ScheduleSpeakers() {
  const [activeDay, setActiveDay] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const [speakerIdx, setSpeakerIdx] = useState(0);
  const [speakerAnim, setSpeakerAnim] = useState(false);
  const [speakerDir, setSpeakerDir] = useState<"next" | "prev">("next");
  const speakerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const day = days[activeDay];
  const visibleSpeakers = [
    day.speakers[speakerIdx % day.speakers.length],
    day.speakers[(speakerIdx + 1) % day.speakers.length],
  ];

  const switchDay = (idx: number) => {
    if (idx === activeDay || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveDay(idx);
      setSpeakerIdx(0);
      setTransitioning(false);
    }, 280);
  };

  const goSpeaker = (dir: "next" | "prev") => {
    if (speakerAnim) return;
    setSpeakerDir(dir);
    setSpeakerAnim(true);
    setSpeakerIdx((c) =>
      dir === "next" ? (c + 1) % day.speakers.length : (c - 1 + day.speakers.length) % day.speakers.length
    );
    speakerRef.current = setTimeout(() => setSpeakerAnim(false), 400);
  };

  useEffect(() => () => { if (speakerRef.current) clearTimeout(speakerRef.current); }, []);

  return (
    <>
      <style>{`
        @keyframes slideRight { from{opacity:0;transform:translateX(22px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes slideLeft  { from{opacity:0;transform:translateX(-22px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        .anim-slide-right { animation: slideRight .38s cubic-bezier(.22,1,.36,1) both }
        .anim-slide-left  { animation: slideLeft  .38s cubic-bezier(.22,1,.36,1) both }
        .anim-fade-up     { animation: fadeUp     .30s cubic-bezier(.22,1,.36,1) both }
        .anim-fade-in     { animation: fadeIn     .25s ease both }
      `}</style>

      <section
        className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* subtle radial glow that shifts with active day */}
        <div
          key={`glow-${activeDay}`}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-3xl pointer-events-none anim-fade-in"
          style={{ background: day.accentGlow }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* ── LABEL ──────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 uppercase tracking-[0.2em] text-xs font-semibold">
              Schedule & Speakers
            </p>
          </div>

          {/* ── HEADING + DAY PILLS ─────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight">
                Five Days of
                <br />
                <span className="text-yellow-400">Innovation</span>
              </h2>
              <p className="text-white/70 text-sm mt-4 leading-relaxed max-w-sm">
                Province-based engagements across Rwanda culminating in the Digital Business Summit in Kigali.
              </p>
            </div>

            {/* DAY PILLS */}
            <div className="flex gap-2">
              {days.map((d, i) => {
                const active = i === activeDay;
                return (
                  <button
                    key={d.label}
                    onClick={() => switchDay(i)}
                    className={`relative flex flex-col items-start px-5 py-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                      active
                        ? "border-yellow-400/50 bg-[#111]"
                        : "border-white/[0.12] bg-[#0F0F0F] hover:border-white/15"
                    }`}
                  >
                    {/* active left bar */}
                    <span className={`text-[10px] font-bold tracking-[0.18em] uppercase ${active ? "text-yellow-300" : "text-white/60"}`}>
                      {d.label}
                    </span>
                    <span className={`text-xs font-black mt-0.5 ${active ? "text-white" : "text-white/75"}`}>
                      {d.date.split(",")[0]}
                    </span>
                    <span className={`text-[10px] mt-1 font-medium truncate max-w-[110px] ${active ? "text-white/75" : "text-white/50"}`}>
                      {d.theme}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── THEME BANNER ───────────────────────────── */}
          <div
            key={`banner-${activeDay}`}
            className="anim-fade-up relative rounded-xl overflow-hidden mb-8 border border-white/[0.12] bg-[#0F0F0F]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-6 py-5">
              <div>
                <p className="text-white/65 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Day Theme</p>
                <h3 className="text-white text-xl font-black tracking-tight">{day.theme}</h3>
                <p className="text-white/70 text-xs mt-2 leading-relaxed max-w-lg">{day.themeDesc}</p>
              </div>
              <div className="shrink-0 flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-3">
                <MapPin size={12} className="text-yellow-400 shrink-0" />
                <div>
                  <p className="text-white text-xs font-semibold">{day.location}</p>
                  <p className="text-white/70 text-[10px] mt-0.5">{day.locationSub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── BODY GRID ──────────────────────────────── */}
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">

            {/* ─── SCHEDULE ──────────────────────────────── */}
            <div
              key={`sched-${activeDay}`}
              className={`anim-fade-up rounded-xl overflow-hidden border border-white/[0.12] bg-[#0B0B0B] flex flex-col ${transitioning ? "opacity-0" : ""} transition-opacity duration-200`}
            >
              {/* header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-yellow-400" />
                  <p className="text-white/70 text-[11px] font-bold tracking-[0.2em] uppercase">Programme</p>
                </div>
                <span className="text-white/60 text-[11px]">{day.schedule.length} sessions · {day.date}</span>
              </div>

              {/* rows */}
              <div className="flex-1 divide-y divide-white/[0.04]">
                {day.schedule.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="group grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-4 items-start px-6 py-4 hover:bg-white/[0.025] transition duration-150"
                    >
                      {/* time */}
                      <p className="text-white/65 text-[11px] tabular-nums leading-snug pt-0.5">{item.time}</p>

                      {/* title */}
                      <div>
                        <p className="text-white/70 text-sm font-semibold group-hover:text-white transition duration-150 leading-snug">
                          {item.title}
                        </p>
                        {(item as any).speaker && (
                          <p className="text-white/65 text-[11px] mt-1">
                            <span className="mr-1 text-white/50">↳</span>{(item as any).speaker}
                          </p>
                        )}
                        {(item as any).desc && (
                          <p className="text-white/60 text-[11px] mt-1 leading-relaxed">{(item as any).desc}</p>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── SPEAKERS ──────────────────────────────── */}
            <div
              key={`spk-${activeDay}`}
              className={`flex flex-col gap-4 anim-fade-up ${transitioning ? "opacity-0" : ""} transition-opacity duration-200`}
              style={{ animationDelay: "50ms" }}
            >

              {/* speaker carousel cards */}
              <div className="flex gap-3 overflow-hidden">
                {visibleSpeakers.map((speaker, i) => (
                  <SpeakerCard
                    key={`${speaker.name}-${activeDay}-${speakerIdx}-${i}`}
                    speaker={speaker}
                    offset={i}
                    animating={speakerAnim}
                    direction={speakerDir}
                  />
                ))}
              </div>

              {/* carousel controls */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => goSpeaker("prev")}
                  disabled={speakerAnim}
                  className="w-8 h-8 rounded-full border border-white/[0.14] flex items-center justify-center text-white/65 hover:border-yellow-400/50 hover:text-yellow-300 transition disabled:opacity-20"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => goSpeaker("next")}
                  disabled={speakerAnim}
                  className="w-8 h-8 rounded-full border border-white/[0.14] flex items-center justify-center text-white/65 hover:border-yellow-400/50 hover:text-yellow-300 transition disabled:opacity-20"
                >
                  <ChevronRight size={14} />
                </button>
                <div className="flex gap-1.5 ml-1">
                  {day.speakers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (i === speakerIdx || speakerAnim) return;
                        setSpeakerDir(i > speakerIdx ? "next" : "prev");
                        setSpeakerAnim(true);
                        setSpeakerIdx(i);
                        speakerRef.current = setTimeout(() => setSpeakerAnim(false), 400);
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        i === speakerIdx ? "w-5 h-1.5 bg-yellow-400" : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-auto text-white/60 text-[11px] tabular-nums">
                  {speakerIdx + 1}–{Math.min(speakerIdx + 2, day.speakers.length)} / {day.speakers.length}
                </span>
              </div>

              {/* all-speakers list */}
              <div className="rounded-xl border border-white/[0.12] bg-[#0B0B0B] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-5 bg-yellow-400" />
                    <p className="text-white/65 text-[10px] font-bold tracking-[0.2em] uppercase">
                      Day {activeDay + 1} Speakers
                    </p>
                  </div>
                  <button className="text-[10px] text-white/65 hover:text-yellow-300 transition font-semibold tracking-wide">
                    View All →
                  </button>
                </div>

                <div className="divide-y divide-white/[0.04]">
                  {day.speakers.map((s, i) => {
                    const active = i === speakerIdx;
                    return (
                      <button
                        key={s.name}
                        onClick={() => {
                          if (i === speakerIdx || speakerAnim) return;
                          setSpeakerDir(i > speakerIdx ? "next" : "prev");
                          setSpeakerAnim(true);
                          setSpeakerIdx(i);
                          speakerRef.current = setTimeout(() => setSpeakerAnim(false), 400);
                        }}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 transition duration-150 ${
                          active ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 transition ${active ? "ring-yellow-400/50" : "ring-white/[0.08]"}`}>
                          <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className={`text-xs font-semibold truncate transition ${active ? "text-yellow-400" : "text-white/80"}`}>
                            {s.name}
                          </p>
                          <p className="text-white/60 text-[10px] truncate mt-0.5">{s.session}</p>
                        </div>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* ── BOTTOM IMAGES ──────────────────────────── */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden h-40 border border-white/[0.12]">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover brightness-50"
                alt="Main stage"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 px-5 py-4">
                <p className="text-white/65 text-[10px] font-bold uppercase tracking-wider mb-0.5">Venue</p>
                <p className="text-white text-sm font-bold">Main Stage</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-40 border border-white/[0.12] flex items-center justify-center bg-[#0B0B0B]">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover brightness-25"
                alt="Demo zone"
              />
              <div className="absolute inset-0 bg-black/60" />
              <button className="relative z-10 flex items-center gap-2.5 bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-yellow-300 transition duration-200">
                <Download size={13} />
                Download Full Agenda
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
