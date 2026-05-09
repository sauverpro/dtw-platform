import { Users, LayoutList, Mic2, Globe2 } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Industry leaders & innovators" },
  { icon: LayoutList, value: "50+", label: "Workshops, talks & panels" },
  { icon: Mic2, value: "$50K", label: "Startup pitch prize pool" },
  { icon: Globe2, value: "20+", label: "Countries represented" },
];

const AboutEvent = () => {
  return (
    <section className="bg-white py-16 md:py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* TOP LABEL */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-10 bg-yellow-400 shrink-0"></div>
          <p className="text-yellow-500 uppercase tracking-[4px] text-xs md:text-sm font-semibold">
            About the Event
          </p>
        </div>

        {/* HEADING + DESCRIPTION */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-[1.05]">
            Digital
            <br />
            Transformation
            <br />
            Week 2026
          </h1>

          <div>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Rwanda's most impactful technology event — convening government leaders,
              tech innovators, investors, and development partners to accelerate Rwanda's
              digital transformation agenda. Organized by the ICT Chamber under the
              Rwanda Private Sector Federation, in partnership with MINICT and RISA.
            </p>
            <button className="mt-7 bg-yellow-400 text-black font-bold px-8 py-3 md:py-4 rounded-xl hover:bg-yellow-300 transition duration-300 text-sm md:text-base">
              Become a Partner
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-100 mt-14 md:mt-20"></div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={value}
              className="group border border-gray-100 rounded-2xl p-5 md:p-8 hover:border-yellow-400 hover:shadow-md transition duration-300"
            >
              <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="text-yellow-500" size={17} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-black">{value}</h2>
              <p className="text-gray-400 text-xs md:text-sm mt-2 leading-snug">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutEvent;