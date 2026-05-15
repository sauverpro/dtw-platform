import { Users, LayoutList, Mic2, Globe2 } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Industry leaders & innovators" },
  { icon: LayoutList, value: "50+", label: "Workshops, talks & panels" },
  { icon: Mic2, value: "$50K", label: "Startup pitch prize pool" },
  { icon: Globe2, value: "20+", label: "Countries represented" },
];

const AboutEvent = () => {
  return (
    <section className="bg-[#F9F8F6] py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* LABEL */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-yellow-400 shrink-0" />
          <p className="text-yellow-500 uppercase tracking-[0.2em] text-xs font-semibold">
            About the Event
          </p>
        </div>

        {/* HEADING + DESCRIPTION */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14">
          <h2 className="text-4xl sm:text-5xl font-black text-black leading-[1.08] tracking-tight">
            Digital
            <br />
            Transformation
            <br />
            Week 2026
          </h2>

          <div>
            <p className="text-gray-500 text-base leading-relaxed">
              Rwanda's most impactful technology event — convening government leaders,
              tech innovators, investors, and development partners to accelerate Rwanda's
              digital transformation agenda. Organized by the ICT Chamber under the
              Rwanda Private Sector Federation, in partnership with MINICT and RISA.
            </p>
            <button className="mt-7 bg-yellow-400 text-black font-bold px-7 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm">
              Become a Partner
            </button>
          </div>
        </div>

        {/* STATS — dark band */}
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={value}
                className={[
                  "group px-7 py-8 flex flex-col gap-4 transition duration-300 hover:bg-white/[0.04]",
                  i < 3 ? "md:border-r border-white/10" : "",
                  i < 2 ? "border-b md:border-b-0 border-white/10" : "",
                ].join(" ")}
              >
                <div className="w-9 h-9 bg-yellow-400/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-white" size={16} />
                </div>
                <div>
                  <p className="text-4xl font-black text-white leading-none">{value}</p>
                  <p className="text-gray-500 text-xs mt-2 leading-snug">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutEvent;