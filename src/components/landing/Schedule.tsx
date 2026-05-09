import { useState } from "react";

const allDays = [
  {
    label: "Day 01",
    date: "May 13, 2026",
    items: [
      { time: "8:00 – 10:00 AM", title: "Registration & Welcome", desc: "Our team will be available to assist you and ensure you're ready for the days ahead." },
      { time: "10:00 – 11:00 AM", title: "Opening Ceremony" },
      { time: "12:00 – 2:00 PM", title: "Networking Lunch" },
      { time: "2:00 – 2:30 PM", title: "Keynote: CEO of Trial" },
      { time: "3:00 – 4:00 PM", title: "Talk with Tech Lead" },
      { time: "4:00 – 6:00 PM", title: "Q&A, Tea Break & Networking" },
      { time: "6:00 – 8:00 PM", title: "Closing Remarks" },
    ],
  },
  {
    label: "Day 02",
    date: "May 14, 2026",
    items: [
      { time: "9:00 – 10:00 AM", title: "Morning Briefing" },
      { time: "10:00 – 12:00 PM", title: "Panel: Future of African Tech" },
      { time: "12:00 – 1:30 PM", title: "Networking Lunch" },
      { time: "1:30 – 3:00 PM", title: "Startup Pitch Competitions" },
      { time: "3:00 – 4:00 PM", title: "Workshop: AI & Society" },
      { time: "4:00 – 6:00 PM", title: "Investor Roundtable" },
      { time: "6:00 – 8:00 PM", title: "Gala Dinner" },
    ],
  },
  {
    label: "Day 03",
    date: "May 15, 2026",
    items: [
      { time: "9:00 – 10:00 AM", title: "Recap & Morning Coffee" },
      { time: "10:00 – 11:30 AM", title: "Keynote: Digital Policy in Africa" },
      { time: "11:30 – 1:00 PM", title: "Workshop: Fintech & Innovation" },
      { time: "1:00 – 2:00 PM", title: "Networking Lunch" },
      { time: "2:00 – 4:00 PM", title: "Demo Day: Startups Showcase" },
      { time: "4:00 – 5:00 PM", title: "Awards Ceremony" },
      { time: "5:00 – 6:00 PM", title: "Closing & Farewell" },
    ],
  },
];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const day = allDays[activeDay];

  return (
    <section className="bg-[#111111] py-16 md:py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* SECTION LABEL */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[2px] w-10 bg-yellow-400 shrink-0"></div>
          <p className="text-yellow-400 uppercase tracking-[4px] text-xs md:text-sm font-semibold">
            Schedule & Agenda
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05]">
              Three
              <br />
              Days of
              <br />
              Innovation
            </h1>

            <p className="text-gray-400 text-base md:text-lg mt-8 leading-relaxed max-w-xs">
              Three packed days of talks, workshops, pitch competitions,
              and networking with Africa's brightest minds.
            </p>

            <button className="mt-8 text-yellow-400 font-semibold flex items-center gap-2 hover:gap-4 transition-all text-sm md:text-base">
              Download full agenda →
            </button>

            {/* IMAGE STACK — hidden on small screens */}
            <div className="relative mt-14 h-52 hidden sm:block">
              <div className="absolute left-0 top-0 bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden w-44 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
                  className="h-28 w-full object-cover"
                />
                <p className="text-white text-sm font-bold px-4 py-3">Main Stage</p>
              </div>
              <div className="absolute left-32 top-14 bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden w-44 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
                  className="h-28 w-full object-cover"
                />
                <p className="text-white text-sm font-bold px-4 py-3">Demo Zone</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>

            {/* DAY TABS */}
            <div className="flex gap-4 sm:gap-8 border-b border-white/10 pb-4 overflow-x-auto">
              {allDays.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setActiveDay(i)}
                  className={`text-left shrink-0 transition-opacity ${i === activeDay ? "opacity-100" : "opacity-40 hover:opacity-60"}`}
                >
                  <p className={`text-base sm:text-xl font-black ${i === activeDay ? "text-white" : "text-gray-400"}`}>
                    {d.label}
                  </p>
                  <p className={`text-xs sm:text-sm mt-1 ${i === activeDay ? "text-yellow-400" : "text-gray-500"}`}>
                    {d.date}
                  </p>
                  {i === activeDay && (
                    <div className="mt-3 h-[3px] w-full bg-yellow-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* TIMELINE */}
            <div className="mt-8 space-y-0">
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[100px_1fr] sm:grid-cols-[150px_1fr] gap-4 sm:gap-8 py-5 md:py-7 border-b border-white/5 group"
                >
                  <p className="text-gray-500 text-xs sm:text-sm font-medium pt-1 leading-snug">{item.time}</p>
                  <div>
                    <h2 className="text-white text-base sm:text-xl font-bold group-hover:text-yellow-400 transition">
                      {item.title}
                    </h2>
                    {item.desc && (
                      <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">{item.desc}</p>
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