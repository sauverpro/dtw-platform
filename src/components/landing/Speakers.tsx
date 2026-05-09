const Speakers = () => {
  const pricingPlans = [
    {
      name: "Early Bird",
      price: "$150",
      note: "Save more by registering early.",
      features: ["Full event access", "Network with speakers", "Most affordable option"],
    },
    {
      name: "Standard",
      price: "$149",
      note: "Access every session and more.",
      features: ["All sessions & workshops", "Event recordings", "Breakout sessions"],
    },
    {
      name: "Priority",
      price: "$200",
      note: "The premium experience.",
      features: ["VIP lounge access", "Priority seating", "Meet & greet with speakers"],
      featured: true,
    },
  ];

  return (
    <section className="bg-[#F7F7F5] py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* SECTION LABEL */}
        <div className="flex items-center gap-5 mb-10">
          <div className="h-[2px] w-12 bg-yellow-400"></div>
          <p className="text-yellow-500 uppercase tracking-[5px] text-sm font-semibold">
            Speakers
          </p>
        </div>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-6xl font-black text-black leading-[1.05]">
              World-class
              <br />
              Speakers
            </h1>
            <p className="text-gray-500 text-lg mt-8 leading-relaxed max-w-lg">
              We host a lineup of leaders and innovators who bring wealth of knowledge,
              experience, and inspiration from across the continent and beyond.
            </p>
            <button className="mt-8 border border-black text-black font-bold px-8 py-3 rounded-xl hover:bg-black hover:text-white transition duration-300 text-sm">
              View all speakers
            </button>
          </div>

          {/* RIGHT — SPEAKER CARDS */}
          <div className="flex justify-center gap-6">

            {/* CARD 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-56">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
                className="h-72 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-base font-bold text-black">Ariane Pintest</h2>
                <p className="text-yellow-500 text-sm mt-1">Chief AI Officer</p>
              </div>
            </div>

            {/* CARD 2 — offset */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-56 mt-12">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
                className="h-72 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-base font-bold text-black">John Baptiste</h2>
                <p className="text-yellow-500 text-sm mt-1">Chief AI Officer</p>
              </div>
            </div>

          </div>

        </div>

        {/* DOTS */}
        <div className="flex gap-2 mt-10">
          <div className="w-6 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        {/* PRICING SECTION */}
        <div className="mt-24">

          {/* HEADING */}
          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            <div>
              <p className="text-yellow-500 uppercase tracking-[5px] text-sm font-semibold mb-4">Pricing</p>
              <h2 className="text-5xl font-black text-black leading-tight">
                Pick your
                <br />
                experience
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-gray-500 text-lg leading-relaxed">
                Our event offers a variety of options to accommodate different needs.
                Whether attending as an individual or a corporate group, we have a package for you.
              </p>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col transition duration-300 ${
                  plan.featured
                    ? "bg-black text-white"
                    : "bg-white border border-gray-100 text-black hover:border-yellow-400"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h2 className={`text-xl font-bold ${plan.featured ? "text-white" : "text-black"}`}>{plan.name}</h2>
                  {plan.featured && (
                    <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <p className={`text-5xl font-black mt-4 ${plan.featured ? "text-white" : "text-black"}`}>{plan.price}</p>
                <p className={`text-sm mt-2 ${plan.featured ? "text-gray-400" : "text-gray-400"}`}>{plan.note}</p>

                <div className="space-y-3 mt-8 flex-1">
                  {plan.features.map((f) => (
                    <p key={f} className={`text-sm flex items-center gap-2 ${plan.featured ? "text-gray-300" : "text-gray-600"}`}>
                      <span className="text-yellow-400">✓</span> {f}
                    </p>
                  ))}
                </div>

                <button
                  className={`mt-8 py-3 rounded-xl font-bold text-sm transition duration-300 ${
                    plan.featured
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "bg-gray-100 text-black hover:bg-yellow-400"
                  }`}
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};

export default Speakers;