import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Download } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────
const days = [
  {
    label: "Day 01",
    date: "May 13, 2026",
    theme: "Innovation & Foundations",
    themeDesc:
      "Setting the stage for Rwanda's digital decade — opening keynotes, ecosystem overviews, and the conversations that frame everything that follows.",
    location: "Main Hall · Level 1",
    locationSub: "Kigali Convention Centre",
    accentGlow: "rgba(250,204,21,0.08)",
    speakers: [
      { name: "Ariane Pintest",  role: "Chief AI Officer",     company: "TechCorp Africa",  session: "Opening Keynote",      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
      { name: "John Baptiste",   role: "Director of Policy",   company: "MINICT Rwanda",    session: "Digital Rwanda Vision", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
      { name: "Amara Diallo",    role: "VP of Engineering",    company: "Kigali Tech Hub",  session: "Ecosystem Panel",      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" },
      { name: "Samuel Osei",     role: "Founder & CEO",        company: "Pangea Ventures",  session: "Startup Landscape",    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "8:00 – 10:00 AM",  title: "Registration & Welcome",           type: "info",     desc: "Our team will be on hand to get you set up for the days ahead." },
      { time: "10:00 – 11:00 AM", title: "Opening Ceremony",                  type: "keynote"   },
      { time: "11:00 – 12:00 PM", title: "Keynote: Digital Rwanda Vision",    type: "keynote",  speaker: "John Baptiste"  },
      { time: "12:00 – 2:00 PM",  title: "Networking Lunch",                  type: "break"     },
      { time: "2:00 – 3:00 PM",   title: "Talk: Africa's AI Frontier",        type: "talk",     speaker: "Ariane Pintest" },
      { time: "3:00 – 4:00 PM",   title: "Panel: Building the Ecosystem",     type: "panel",    speaker: "Amara Diallo"   },
      { time: "4:00 – 5:00 PM",   title: "Startup Landscape Overview",        type: "talk",     speaker: "Samuel Osei"    },
      { time: "5:00 – 6:00 PM",   title: "Q&A & Evening Networking",          type: "break"     },
    ],
  },
  {
    label: "Day 02",
    date: "May 14, 2026",
    theme: "Investment & Startups",
    themeDesc:
      "Where capital meets innovation — investor roundtables, live pitch competitions, and deep-dives into fintech and venture building across Africa.",
    location: "Startup Arena · Level 2",
    locationSub: "Kigali Convention Centre",
    accentGlow: "rgba(96,165,250,0.07)",
    speakers: [
      { name: "Fatima Al-Rashid", role: "Managing Partner",    company: "Savanna Capital",       session: "Investor Keynote",   img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
      { name: "David Mensah",     role: "CEO & Co-founder",    company: "PayStack Africa",        session: "Fintech Deep Dive",  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
      { name: "Priya Sharma",     role: "Head of Ventures",    company: "Google for Startups",    session: "Startup Workshop",   img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
      { name: "Kwame Asante",     role: "Angel Investor",      company: "Accra Angels",           session: "Pitch Jury",         img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "9:00 – 10:00 AM",  title: "Morning Briefing & Coffee",           type: "break"                             },
      { time: "10:00 – 11:00 AM", title: "Investor Keynote",                     type: "keynote", speaker: "Fatima Al-Rashid" },
      { time: "11:00 – 12:00 PM", title: "Fintech Deep Dive",                    type: "talk",    speaker: "David Mensah"    },
      { time: "12:00 – 1:30 PM",  title: "Networking Lunch",                     type: "break"                             },
      { time: "1:30 – 3:00 PM",   title: "Startup Pitch Competition — Round 1",  type: "panel"                             },
      { time: "3:00 – 4:00 PM",   title: "Workshop: Building for Scale",         type: "workshop", speaker: "Priya Sharma"  },
      { time: "4:00 – 6:00 PM",   title: "Investor Roundtable",                  type: "panel",   speaker: "Kwame Asante"   },
      { time: "7:00 – 10:00 PM",  title: "Gala Dinner",                          type: "break"                             },
    ],
  },
  {
    label: "Day 03",
    date: "May 15, 2026",
    theme: "Policy & Future Tech",
    themeDesc:
      "Closing with purpose — digital policy, AI governance, awards, and the vision for a connected, innovative Africa over the next decade.",
    location: "Policy Forum · Level 3",
    locationSub: "Kigali Convention Centre",
    accentGlow: "rgba(52,211,153,0.07)",
    speakers: [
      { name: "Minister Claudine", role: "Minister of ICT",    company: "Government of Rwanda", session: "Policy Keynote",      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop" },
      { name: "Tendai Murisa",     role: "Executive Director", company: "TRUST Africa",         session: "Digital Governance",  img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
      { name: "Aisha Conteh",      role: "AI Policy Lead",     company: "African Union",         session: "AI Governance Panel", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
      { name: "Nnamdi Okonkwo",    role: "CTO",                company: "Andela",                session: "Future of Work",      img: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600&auto=format&fit=crop" },
    ],
    schedule: [
      { time: "9:00 – 10:00 AM",  title: "Recap & Morning Coffee",                type: "break"                               },
      { time: "10:00 – 11:00 AM", title: "Policy Keynote: Digital Africa 2030",    type: "keynote",  speaker: "Minister Claudine" },
      { time: "11:00 – 12:00 PM", title: "Talk: Digital Governance",               type: "talk",     speaker: "Tendai Murisa"     },
      { time: "12:00 – 1:00 PM",  title: "Networking Lunch",                       type: "break"                               },
      { time: "1:00 – 2:30 PM",   title: "Panel: AI Governance in Africa",         type: "panel",    speaker: "Aisha Conteh"      },
      { time: "2:30 – 3:30 PM",   title: "Demo Day: Startups Showcase",            type: "workshop"                            },
      { time: "3:30 – 4:30 PM",   title: "Future of Work & Tech Talent",           type: "talk",     speaker: "Nnamdi Okonkwo"    },
      { time: "4:30 – 6:00 PM",   title: "Awards Ceremony & Closing",              type: "keynote"                             },
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
                Three Days of
                <br />
                <span className="text-yellow-400">Innovation</span>
              </h2>
              <p className="text-white/70 text-sm mt-4 leading-relaxed max-w-sm">
                Each day has a unique theme, dedicated speakers, and a curated programme.
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

              {/* footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.05]">
                <button className="flex items-center gap-2 text-yellow-300 hover:text-yellow-300 text-xs font-semibold transition group">
                  <Download size={12} />
                  <span className="group-hover:underline underline-offset-2">Download agenda</span>
                </button>
                <div />
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
