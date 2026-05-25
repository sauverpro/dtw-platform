const organizers = [
  { name: "MINICT",      src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779714063/MINICT-1_lqfvda.png" },
  { name: "RISA",        src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1779714062/logo_wwqlfr.png" },
  { name: "ICT Chamber", src: "https://res.cloudinary.com/dc6iwekzx/image/upload/v1778836285/logo_1945919583_1_lwuwo3.png" },
];

const TicketsPartners = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* TICKET BANNER */}
        <div className="relative rounded-2xl overflow-hidden h-[340px] md:h-[420px]">
          <img
            src="https://res.cloudinary.com/dc6iwekzx/image/upload/v1779717447/55044284276_4b82cb6800_k_sc3bbu.jpg"
            className="w-full h-full object-cover"
            alt="Conference crowd"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex items-center px-8 sm:px-12 md:px-14">
            <div className="max-w-md">

              <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                Get Your<br />Tickets
              </h2>

              <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
                Don't miss your chance to be part of unforgettable moments. Grab your tickets now and enjoy exclusive early-bird discounts.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <button className="bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-lg hover:bg-yellow-300 transition text-sm">
                  View Events
                </button>
                <button className="bg-white/12 backdrop-blur-sm border border-white/20 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-white/20 transition text-sm">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ORGANIZERS */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-yellow-400 shrink-0" />
            <p className="text-yellow-500 uppercase tracking-[0.2em] text-xs font-semibold">Organizers</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-10">
            Organized By
          </h2>

          {/* LOGO GRID — 3 equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {organizers.map((o) => (
              <div
                key={o.name}
                className="border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-4 py-10 px-8 hover:border-yellow-400/50 hover:shadow-sm transition duration-300 group"
              >
                {o.src ? (
                  <img
                    src={o.src}
                    alt={o.name}
                    className="h-12 md:h-14 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                  />
                ) : (
                  /* Placeholder shown until logo is provided */
                  <div className="h-12 w-40 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-semibold tracking-wide">{o.name}</span>
                  </div>
                )}
                <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase group-hover:text-yellow-500 transition duration-300">
                  {o.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TicketsPartners;