const Schedule = () => {
  const days = [
    { label: "Day 01", date: "May 13, 2026", active: true },
    { label: "Day 02", date: "May 14, 2026", active: false },
    { label: "Day 03", date: "May 15, 2026", active: false },
  ];

  const items = [
    { time: "8:00 – 10:00 AM", title: "Registration & Welcome", desc: "Our team will be available to assist you and ensure you're ready for the days ahead." },
    { time: "10:00 – 11:00 AM", title: "Opening Ceremony" },
    { time: "12:00 – 2:00 PM", title: "Networking Lunch" },
    { time: "2:00 – 2:30 PM", title: "Keynote: CEO of Trial" },
    { time: "3:00 – 4:00 PM", title: "Talk with Tech Lead" },
    { time: "4:00 – 6:00 PM", title: "Q&A, Tea Break & Networking" },
    { time: "6:00 – 8:00 PM", title: "Closing Remarks" },
  ];

  return (
    <section className="bg-[#111111] py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* SECTION LABEL */}
        <div className="flex items-center gap-5 mb-10">
          <div className="h-[2px] w-12 bg-yellow-400"></div>
          <p className="text-yellow-400 uppercase tracking-[5px] text-sm font-semibold">
            Schedule & Agenda
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-20">

          {/* LEFT */}
          <div>
            <h1 className="text-6xl font-black text-white leading-[1.05]">
              Three
              <br />
              Days of
              <br />
              Innovation
            </h1>

            <p className="text-gray-400 text-lg mt-10 leading-relaxed max-w-xs">
              Three packed days of talks, workshops, pitch competitions,
              and networking with Africa's brightest minds.
            </p>

            <button className="mt-10 text-yellow-400 font-semibold flex items-center gap-2 hover:gap-4 transition-all text-base">
              Download full agenda →
            </button>

            {/* FLOATING IMAGE STACK */}
            <div className="relative mt-16 h-56">
              <div className="absolute left-0 top-0 bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden w-48 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
                  className="h-32 w-full object-cover"
                />
                <p className="text-white text-sm font-bold px-4 py-3">Main Stage</p>
              </div>
              <div className="absolute left-36 top-16 bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden w-48 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
                  className="h-32 w-full object-cover"
                />
                <p className="text-white text-sm font-bold px-4 py-3">Demo Zone</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>

            {/* DAY TABS */}
            <div className="flex gap-10 border-b border-white/10 pb-4">
              {days.map((d) => (
                <button key={d.label} className={`text-left transition ${d.active ? "" : "opacity-40"}`}>
                  <p className={`text-xl font-black ${d.active ? "text-white" : "text-gray-400"}`}>{d.label}</p>
                  <p className={`text-sm mt-1 ${d.active ? "text-yellow-400" : "text-gray-500"}`}>{d.date}</p>
                  {d.active && <div className="mt-3 h-[3px] w-full bg-yellow-400 rounded-full"></div>}
                </button>
              ))}
            </div>

            {/* TIMELINE */}
            <div className="mt-10 space-y-0">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-[160px_1fr] gap-8 py-7 border-b border-white/5 group">
                  <p className="text-gray-500 text-sm font-medium pt-1">{item.time}</p>
                  <div>
                    <h2 className="text-white text-xl font-bold group-hover:text-yellow-400 transition">{item.title}</h2>
                    {item.desc && <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.desc}</p>}
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