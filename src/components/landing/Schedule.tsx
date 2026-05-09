const Schedule = () => {
  return (
    <section className="bg-[#F5F5F5] py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto bg-[#ECECEC] rounded-[40px] p-12">

        <div className="grid lg:grid-cols-2 gap-20">

          {/* LEFT SIDE */}
          <div>

            {/* SMALL TITLE */}
            <p className="text-[#F4B183] uppercase tracking-[4px] text-lg">
              Schedule
            </p>

            {/* MAIN TITLE */}
            <h1 className="text-6xl font-bold text-black mt-8 leading-tight">
              SCHEDULE
              <br />
              AND AGENDA
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-700 text-3xl mt-10 leading-relaxed">
              Löremipsumkontravis.
              <br />
              Hovis.Proläserinat.
              <br />
              Monolaviselektroosmos.
              <br />
              Kasetrer.
            </p>

            {/* LEARN MORE */}
            <button className="mt-14 flex items-center gap-4 text-[#F4B183] text-2xl font-semibold hover:gap-6 transition-all">

              Learn More →

            </button>

            {/* FLOATING CARDS */}
            <div className="relative mt-20">

              {/* CARD 1 */}
              <div className="bg-white rounded-3xl p-4 shadow-2xl w-64">

                <h2 className="text-2xl font-bold text-black mb-4">
                  Events
                </h2>

                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop"
                  className="rounded-2xl h-36 w-full object-cover"
                />

              </div>

              {/* CARD 2 */}
              <div className="absolute left-28 top-24 bg-white rounded-3xl p-4 shadow-2xl w-64">

                <h2 className="text-2xl font-bold text-black mb-4">
                  DBS
                </h2>

                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
                  className="rounded-2xl h-36 w-full object-cover"
                />

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            {/* DAYS */}
            <div className="flex justify-between">

              {/* DAY 1 */}
              <div>

                <h2 className="text-4xl font-bold text-black">
                  Day 01
                </h2>

                <p className="text-gray-500 text-3xl mt-3">
                  May 13,2026
                </p>

              </div>

              {/* DAY 2 */}
              <div>

                <h2 className="text-4xl font-bold text-gray-500">
                  Day 02
                </h2>

                <p className="text-gray-400 text-3xl mt-3">
                  May 14,2026
                </p>

              </div>

              {/* DAY 3 */}
              <div>

                <h2 className="text-4xl font-bold text-gray-500">
                  Day 03
                </h2>

                <p className="text-gray-400 text-3xl mt-3">
                  May 15,2026
                </p>

              </div>

            </div>

            {/* LINE */}
            <div className="relative mt-10 h-[2px] bg-gray-400">

              <div className="absolute left-0 top-0 h-[4px] w-40 bg-yellow-400 rounded-full"></div>

            </div>

            {/* TIMELINE */}
            <div className="mt-16 space-y-10">

              {/* ITEM */}
              <div className="grid grid-cols-[180px_1fr] gap-10">

                <h2 className="text-gray-500 text-4xl font-bold">
                  8AM-10AM
                </h2>

                <div>

                  <h1 className="text-4xl font-bold text-black">
                    Registration
                  </h1>

                  <p className="text-gray-500 mt-4 leading-relaxed">
                    Our team will be available to assist you with any questions and ensure you are ready for the exciting days ahead.
                  </p>

                </div>

              </div>

              {/* ITEM */}
              <div className="grid grid-cols-[180px_1fr] gap-10">

                <h2 className="text-gray-500 text-4xl font-bold">
                  10AM-11AM
                </h2>

                <h1 className="text-4xl font-bold text-black">
                  Welcoming the Guest
                </h1>

              </div>

              {/* ITEM */}
              <div className="grid grid-cols-[180px_1fr] gap-10">

                <h2 className="text-gray-500 text-4xl font-bold">
                  12PM-14PM
                </h2>

                <h1 className="text-4xl font-bold text-black">
                  Networking and Lunch
                </h1>

              </div>

              {/* ITEM */}
              <div className="grid grid-cols-[180px_1fr] gap-10">

                <h2 className="text-gray-500 text-4xl font-bold">
                  14PM-14:30PM
                </h2>

                <h1 className="text-4xl font-bold text-black">
                  Talk from CEO of Trial
                </h1>

              </div>

              {/* ITEM */}
              <div className="grid grid-cols-[180px_1fr] gap-10">

                <h2 className="text-gray-500 text-4xl font-bold">
                  15PM-16PM
                </h2>

                <h1 className="text-4xl font-bold text-black">
                  Talk with Tech Lead
                </h1>

              </div>

              {/* ITEM */}
              <div className="grid grid-cols-[180px_1fr] gap-10">

                <h2 className="text-gray-500 text-4xl font-bold">
                  16PM-18PM
                </h2>

                <h1 className="text-4xl font-bold text-black">
                  QAs, Tea break and Networking
                </h1>

              </div>

              {/* ITEM */}
              <div className="grid grid-cols-[180px_1fr] gap-10">

                <h2 className="text-gray-500 text-4xl font-bold">
                  18PM-20PM
                </h2>

                <h1 className="text-4xl font-bold text-black">
                  Closing and Remarks
                </h1>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Schedule;