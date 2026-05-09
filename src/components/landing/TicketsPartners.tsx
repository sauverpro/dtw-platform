const partners = [
  { name: "RISA", src: "https://upload.wikimedia.org/wikipedia/commons/6/65/RISA_logo.png" },
  { name: "Digital Africa", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Digital_Africa_logo.png" },
  { name: "Access to Finance Rwanda", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Access_to_Finance_Rwanda_logo.png" },
  { name: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
];

const TicketsPartners = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* TICKET BANNER */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[380px] md:h-[460px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

          <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16">
            <div className="max-w-lg">

              <div className="flex items-center gap-3 mb-5">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  20% Off
                </span>
                <span className="text-white/70 text-xs sm:text-sm">Limited time offer</span>
              </div>

              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
                Get Your
                <br />
                Tickets
              </h1>

              <p className="text-white/70 text-sm md:text-base mt-5 leading-relaxed max-w-sm">
                Don't miss your chance to be part of unforgettable moments.
                Grab your tickets now and enjoy exclusive early-bird discounts.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <button className="bg-yellow-400 text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-yellow-300 transition text-sm">
                  View Events
                </button>
                <button className="bg-white/15 backdrop-blur-sm border border-white/20 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white/25 transition text-sm">
                  Book Now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* PARTNERS */}
        <div className="mt-16 md:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="text-yellow-500 uppercase tracking-[4px] text-xs md:text-sm font-semibold mb-3">Partners</p>
              <h2 className="text-4xl md:text-5xl font-black text-black">Our Partners</h2>
            </div>
            <button className="self-start sm:self-auto text-sm font-semibold text-gray-400 hover:text-black transition border border-gray-200 px-5 md:px-6 py-3 rounded-xl">
              Become a partner →
            </button>
          </div>

          {/* LOGO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-1">
            {partners.map((p) => (
              <div
                key={p.name}
                className="border border-gray-100 rounded-2xl flex items-center justify-center p-6 md:p-10 hover:border-yellow-400 transition duration-300 group"
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-8 md:h-12 object-contain grayscale group-hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TicketsPartners;