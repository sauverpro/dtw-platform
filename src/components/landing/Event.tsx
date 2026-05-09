const eventImage =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop";

const crowdImage =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop";

const previous1 =
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop";

const previous2 =
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop";

const previous3 =
  "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=1200&auto=format&fit=crop";

const previous4 =
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop";

const previous5 =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop";

const UpcomingEvents = () => {
  return (
    <section className="bg-black py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* SMALL TEXT */}
        <p className="text-gray-400 text-lg">
          Previous DTWS
        </p>

        {/* TITLE */}
        <h1 className="text-white text-6xl font-bold text-center mt-4">
          Upcoming Events Dtws
        </h1>

        {/* DESCRIPTION */}
        <p className="text-white mt-8 text-lg">
          Browse all events related to tech
        </p>

        {/* EVENT CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {/* CARD */}
          <div className="bg-[#050505] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:-translate-y-2 transition duration-500">

            {/* IMAGE */}
            <div className="relative">

              <img
                src={eventImage}
                className="h-52 w-full object-cover"
              />

              {/* BADGE */}
              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full">
                30 slots left
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-white text-xl font-bold">
                AI and MI event
              </h2>

              <p className="text-gray-400 mt-4 text-sm">
                📍 Marriott Hotel Kigali Rwanda
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                🏢 level 3 or 3rd floor
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                📅 June 10 09:00 am
              </p>

              {/* BUTTON */}
              <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
                Register
              </button>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-[#050505] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:-translate-y-2 transition duration-500">

            <div className="relative">

              <img
                src={crowdImage}
                className="h-52 w-full object-cover"
              />

              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full">
                30 slots left
              </div>

            </div>

            <div className="p-5">

              <h2 className="text-white text-xl font-bold">
                AI and MI event
              </h2>

              <p className="text-gray-400 mt-4 text-sm">
                📍 Marriott Hotel Kigali Rwanda
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                🏢 level 3 or 3rd floor
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                📅 June 10 09:00 am
              </p>

              <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
                Register
              </button>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-[#050505] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:-translate-y-2 transition duration-500">

            <div className="relative">

              <img
                src={crowdImage}
                className="h-52 w-full object-cover"
              />

              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full">
                30 slots left
              </div>

            </div>

            <div className="p-5">

              <h2 className="text-white text-xl font-bold">
                AI and MI event
              </h2>

              <p className="text-gray-400 mt-4 text-sm">
                📍 Marriott Hotel Kigali Rwanda
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                🏢 level 3 or 3rd floor
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                📅 June 10 09:00 am
              </p>

              <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
                Register
              </button>

            </div>

          </div>

          {/* CARD 4 */}
          <div className="bg-[#050505] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:-translate-y-2 transition duration-500">

            <div className="relative">

              <img
                src={crowdImage}
                className="h-52 w-full object-cover"
              />

              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full">
                30 slots left
              </div>

            </div>

            <div className="p-5">

              <h2 className="text-white text-xl font-bold">
                AI and MI event
              </h2>

              <p className="text-gray-400 mt-4 text-sm">
                📍 Marriott Hotel Kigali Rwanda
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                🏢 level 3 or 3rd floor
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                📅 June 10 09:00 am
              </p>

              <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
                Register
              </button>

            </div>

          </div>

        </div>

        {/* PREVIOUS EVENTS */}
        <h1 className="text-white text-6xl font-bold text-center mt-28">
          Previous in Dtws 2025
        </h1>

        {/* GALLERY */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16 items-end">

          <img
            src={previous1}
            className="rounded-2xl h-56 w-full object-cover hover:scale-105 transition"
          />

          <img
            src={previous2}
            className="rounded-2xl h-72 w-full object-cover hover:scale-105 transition"
          />

          <img
            src={previous3}
            className="rounded-2xl h-56 w-full object-cover hover:scale-105 transition"
          />

          <img
            src={previous4}
            className="rounded-2xl h-72 w-full object-cover hover:scale-105 transition"
          />

          <img
            src={previous5}
            className="rounded-2xl h-80 w-full object-cover hover:scale-105 transition"
          />

        </div>

      </div>

    </section>
  );
};

export default UpcomingEvents;