const TicketsPartners = () => {
  const partners = [
    {
      name: "RISA",
      src: "https://upload.wikimedia.org/wikipedia/commons/6/65/RISA_logo.png",
    },
    {
      name: "Digital Africa",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Digital_Africa_logo.png",
    },
    {
      name: "Access to Finance Rwanda",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Access_to_Finance_Rwanda_logo.png",
    },
    {
      name: "Mastercard",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* TICKET BANNER */}
        <div className="relative rounded-3xl overflow-hidden h-[460px]">

          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center px-12 md:px-16">
            <div className="max-w-lg">

              <div className="flex items-center gap-3 mb-6">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  20% Off
                </span>
                <span className="text-white/70 text-sm">Limited time offer</span>
              </div>

              <h1 className="text-white text-6xl font-black leading-tight">
                Get Your
                <br />
                Tickets
              </h1>

              <p className="text-white/70 text-base mt-6 leading-relaxed">
                Don't miss your chance to be part of unforgettable moments.
                Grab your tickets now and enjoy exclusive early-bird discounts.
              </p>

              <div className="flex gap-4 mt-10">
                <button className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition text-sm">
                  View Events
                </button>
                <button className="bg-white/15 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/25 transition text-sm">
                  Book Now
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* PARTNERS */}
        <div className="mt-24">

          <div className="flex items-center justify-between mb-14">
            <div>
              <p className="text-yellow-500 uppercase tracking-[5px] text-sm font-semibold mb-3">Partners</p>
              <h2 className="text-5xl font-black text-black">Our Partners</h2>
            </div>
            <button className="text-sm font-semibold text-gray-400 hover:text-black transition border border-gray-200 px-6 py-3 rounded-xl">
              Become a partner →
            </button>
          </div>

          {/* LOGO ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {partners.map((p) => (
              <div
                key={p.name}
                className="border border-gray-100 rounded-2xl flex items-center justify-center p-10 hover:border-yellow-400 transition duration-300 group"
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-12 object-contain grayscale group-hover:grayscale-0 transition duration-300"
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