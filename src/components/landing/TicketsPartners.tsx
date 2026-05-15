const partners = [
  { name: "RISA", src: "https://upload.wikimedia.org/wikipedia/commons/6/65/RISA_logo.png" },
  { name: "Digital Africa", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Digital_Africa_logo.png" },
  { name: "Access to Finance Rwanda", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Access_to_Finance_Rwanda_logo.png" },
  { name: "Mastercard", src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
];

const TicketsPartners = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* TICKET BANNER */}
        <div className="relative rounded-2xl overflow-hidden h-[340px] md:h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Conference crowd"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex items-center px-8 sm:px-12 md:px-14">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  20% Off
                </span>
                <span className="text-white/60 text-xs">Limited time offer</span>
              </div>

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

        {/* PARTNERS */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-yellow-400 shrink-0" />
                <p className="text-yellow-500 uppercase tracking-[0.2em] text-xs font-semibold">Partners</p>
              </div>
              <h2 className="text-4xl font-black text-black tracking-tight">Our Partners</h2>
            </div>
            <button className="self-start sm:self-auto text-sm font-medium text-gray-400 hover:text-black transition border border-gray-200 px-5 py-2.5 rounded-lg">
              Become a partner →
            </button>
          </div>

          {/* LOGO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {partners.map((p) => (
              <div
                key={p.name}
                className="border border-gray-100 rounded-xl flex items-center justify-center p-7 md:p-9 hover:border-yellow-400/50 transition duration-300 group"
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-8 md:h-10 object-contain grayscale group-hover:grayscale-0 transition duration-300"
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