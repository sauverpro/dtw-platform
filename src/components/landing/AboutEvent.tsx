import { Users, LayoutList, Mic2, Globe2 } from "lucide-react";

const AboutEvent = () => {
  return (
    <section className="bg-white py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto">

        {/* TOP LABEL */}
        <div className="flex items-center gap-5 mb-6">
          <div className="h-[2px] w-12 bg-yellow-400"></div>
          <p className="text-yellow-500 uppercase tracking-[5px] text-sm font-semibold">
            About the Event
          </p>
        </div>

        {/* HEADING + DESCRIPTION side by side */}
        <div className="grid lg:grid-cols-2 gap-16 items-end">

          <h1 className="text-6xl font-black text-black leading-[1.05]">
            Digital
            <br />
            Transformation
            <br />
            Week 2026
          </h1>

          <div>
            <p className="text-gray-500 text-lg leading-relaxed">
              Rwanda's most impactful technology event — convening government leaders,
              tech innovators, investors, and development partners to accelerate Rwanda's
              digital transformation agenda. Organized by the ICT Chamber under the
              Rwanda Private Sector Federation, in partnership with MINICT and RISA.
            </p>
            <button className="mt-8 bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition duration-300 text-base">
              Become a Partner
            </button>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-100 mt-20"></div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">

          {/* CARD 1 */}
          <div className="group border border-gray-100 rounded-2xl p-8 hover:border-yellow-400 hover:shadow-lg transition duration-400">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center mb-5">
              <Users className="text-yellow-500" size={20} />
            </div>
            <h2 className="text-4xl font-black text-black">500+</h2>
            <p className="text-gray-400 text-sm mt-2 leading-snug">Industry leaders & innovators</p>
          </div>

          {/* CARD 2 */}
          <div className="group border border-gray-100 rounded-2xl p-8 hover:border-yellow-400 hover:shadow-lg transition duration-400">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center mb-5">
              <LayoutList className="text-yellow-500" size={20} />
            </div>
            <h2 className="text-4xl font-black text-black">50+</h2>
            <p className="text-gray-400 text-sm mt-2 leading-snug">Workshops, talks & panels</p>
          </div>

          {/* CARD 3 */}
          <div className="group border border-gray-100 rounded-2xl p-8 hover:border-yellow-400 hover:shadow-lg transition duration-400">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center mb-5">
              <Mic2 className="text-yellow-500" size={20} />
            </div>
            <h2 className="text-4xl font-black text-black">$50K</h2>
            <p className="text-gray-400 text-sm mt-2 leading-snug">Startup pitch prize pool</p>
          </div>

          {/* CARD 4 */}
          <div className="group border border-gray-100 rounded-2xl p-8 hover:border-yellow-400 hover:shadow-lg transition duration-400">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center mb-5">
              <Globe2 className="text-yellow-500" size={20} />
            </div>
            <h2 className="text-4xl font-black text-black">20+</h2>
            <p className="text-gray-400 text-sm mt-2 leading-snug">Countries represented</p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutEvent;