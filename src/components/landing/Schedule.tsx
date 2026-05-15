import { useState } from "react";

const allDays = [
  {
    label: "Day 01",
    date: "May 13, 2026",
    items: [
      { time: "8:00 – 10:00 AM", title: "Registration & Welcome", desc: "Our team will be on hand to get you set up and ready for the days ahead." },
      { time: "10:00 – 11:00 AM", title: "Opening Ceremony" },
      { time: "12:00 – 2:00 PM",  title: "Networking Lunch" },
      { time: "2:00 – 2:30 PM",   title: "Keynote: CEO of Trial" },
      { time: "3:00 – 4:00 PM",   title: "Talk with Tech Lead" },
      { time: "4:00 – 6:00 PM",   title: "Q&A, Tea Break & Networking" },
      { time: "6:00 – 8:00 PM",   title: "Closing Remarks" },
    ],
  },
  {
    label: "Day 02",
    date: "May 14, 2026",
    items: [
      { time: "9:00 – 10:00 AM",  title: "Morning Briefing" },
      { time: "10:00 – 12:00 PM", title: "Panel: Future of African Tech" },
      { time: "12:00 – 1:30 PM",  title: "Networking Lunch" },
      { time: "1:30 – 3:00 PM",   title: "Startup Pitch Competitions" },
      { time: "3:00 – 4:00 PM",   title: "Workshop: AI & Society" },
      { time: "4:00 – 6:00 PM",   title: "Investor Roundtable" },
      { time: "6:00 – 8:00 PM",   title: "Gala Dinner" },
    ],
  },
  {
    label: "Day 03",
    date: "May 15, 2026",
    items: [
      { time: "9:00 – 10:00 AM",  title: "Recap & Morning Coffee" },
      { time: "10:00 – 11:30 AM", title: "Keynote: Digital Policy in Africa" },
      { time: "11:30 – 1:00 PM",  title: "Workshop: Fintech & Innovation" },
      { time: "1:00 – 2:00 PM",   title: "Networking Lunch" },
      { time: "2:00 – 4:00 PM",   title: "Demo Day: Startups Showcase" },
      { time: "4:00 – 5:00 PM",   title: "Awards Ceremony" },
      { time: "5:00 – 6:00 PM",   title: "Closing & Farewell" },
    ],
  },
];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const day = allDays[activeDay];

  return (
    <section className="bg-[#111111] py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* LABEL */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-yellow-400 shrink-0" />
          <p className="text-yellow-400 uppercase tracking-[0.2em] text-xs font-semibold">
            Schedule & Agenda
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* LEFT */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.08] tracking-tight">
              Three
              <br />
              Days of
              <br />
              Innovation
            </h2>

            <p className="text-gray-400 text-sm mt-7 leading-relaxed max-w-[260px]">
              Packed talks, workshops, pitch competitions, and networking with Africa's brightest minds.
            </p>

            <button className="mt-7 text-yellow-400 font-semibold flex items-center gap-2 hover:gap-4 transition-all text-sm">
              Download full agenda →
            </button>

            {/* IMAGE STACK */}
            <div className="relative mt-12 h-48 hidden sm:block">
              <div className="absolute left-0 top-0 bg-[#1C1C1C] border border-white/8 rounded-xl overflow-hidden w-40 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
                  className="h-24 w-full object-cover"
                  alt="Main stage"
                />
                <p className="text-white text-xs font-bold px-3 py-2.5">Main Stage</p>
              </div>
              <div className="absolute left-28 top-12 bg-[#1C1C1C] border border-white/8 rounded-xl overflow-hidden w-40 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
                  className="h-24 w-full object-cover"
                  alt="Demo zone"
                />
                <p className="text-white text-xs font-bold px-3 py-2.5">Demo Zone</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {/* DAY TABS */}
            <div className="flex gap-6 sm:gap-10 border-b border-white/8 pb-4 overflow-x-auto">
              {allDays.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setActiveDay(i)}
                  className={`text-left shrink-0 pb-4 -mb-4 border-b-2 transition-all ${
                    i === activeDay ? "border-yellow-400 opacity-100" : "border-transparent opacity-35 hover:opacity-55"
                  }`}
                >
                  <p className={`text-base font-black ${i === activeDay ? "text-white" : "text-gray-400"}`}>
                    {d.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${i === activeDay ? "text-yellow-400" : "text-gray-500"}`}>
                    {d.date}
                  </p>
                </button>
              ))}
            </div>

            {/* TIMELINE */}
            <div className="mt-6 space-y-0">
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] gap-4 sm:gap-8 py-5 border-b border-white/[0.05] group last:border-0"
                >
                  <p className="text-gray-500 text-xs font-medium pt-0.5 leading-snug tabular-nums">{item.time}</p>
                  <div>
                    <h3 className="text-white text-sm sm:text-base font-semibold group-hover:text-yellow-400 transition duration-200">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Schedule;