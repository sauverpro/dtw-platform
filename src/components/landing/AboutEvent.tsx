const AboutEvent = () => {
  return (
    <section className="bg-[#F5F5F5] py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto text-center">

        {/* TOP TITLE */}
        <div className="flex items-center justify-center gap-6">

          <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>

          <h2 className="text-4xl font-bold text-[#111111]">
            About the Event
          </h2>

          <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>

        </div>

        {/* MAIN TITLE */}
        <h1 className="text-6xl font-bold text-black mt-10">
          Digital Transformation Week 2026
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mt-8 max-w-4xl mx-auto leading-relaxed text-lg">
          Digital Transformation Week (DTW) 2026 is Rwanda's most impactful technology event,
          convening government leaders, tech innovators, investors, and development partners
          to accelerate Rwanda's digital transformation agenda. Organized by the ICT Chamber
          under the Rwanda Private Sector Federation, in partnership with MINICT and RISA,
          DTW2026 will showcase Rwanda's growing position as a continental technology hub.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-10 mt-20">

          {/* CARD 1 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:-translate-y-2 transition duration-500">

            <div className="flex items-center gap-6">

              <div className="text-5xl">
                👥
              </div>

              <div className="text-left">

                <h2 className="text-3xl font-bold text-black">
                  500+ Attendees
                </h2>

                <p className="text-gray-500 mt-2">
                  Industry leaders and innovators
                </p>

              </div>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:-translate-y-2 transition duration-500">

            <div className="flex items-center gap-6">

              <div className="text-5xl">
                📋
              </div>

              <div className="text-left">

                <h2 className="text-3xl font-bold text-black">
                  50+ Sessions
                </h2>

                <p className="text-gray-500 mt-2">
                  Workshops, talks, and panels
                </p>

              </div>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:-translate-y-2 transition duration-500">

            <div className="flex items-center gap-6">

              <div className="text-5xl">
                🎤
              </div>

              <div className="text-left">

                <h2 className="text-3xl font-bold text-black">
                  Startup Pitch
                </h2>

                <p className="text-gray-500 mt-2">
                  Compete for $50K in prizes
                </p>

              </div>

            </div>

          </div>

          {/* CARD 4 */}
          <div className="bg-white rounded-3xl p-10 shadow-xl hover:-translate-y-2 transition duration-500">

            <div className="flex items-center gap-6">

              <div className="text-5xl">
                🌍
              </div>

              <div className="text-left">

                <h2 className="text-3xl font-bold text-black">
                  Global Speakers
                </h2>

                <p className="text-gray-500 mt-2">
                  Experts from 20+ countries
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <button className="mt-20 bg-yellow-400 text-black text-2xl font-bold px-14 py-6 rounded-3xl shadow-xl hover:scale-105 transition duration-500">

          Become a Partner

        </button>

      </div>

    </section>
  );
};

export default AboutEvent;