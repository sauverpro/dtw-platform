import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const speakers = [
  {
    name: "Ariane Pintest",
    role: "Chief AI Officer",
    company: "TechCorp Africa",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "John Baptiste",
    role: "Chief AI Officer",
    company: "InnovateLab",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Amara Diallo",
    role: "VP of Engineering",
    company: "Kigali Tech Hub",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Samuel Osei",
    role: "Founder & CEO",
    company: "Pangea Ventures",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
];

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

const Speakers = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + speakers.length) % speakers.length);
  const next = () => setCurrent((c) => (c + 1) % speakers.length);

  // Show 2 cards at a time (wrapping)
  const visible = [speakers[current], speakers[(current + 1) % speakers.length]];

  return (
    <section className="bg-[#F7F7F5] py-16 md:py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* SECTION LABEL */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[2px] w-10 bg-yellow-400 shrink-0"></div>
          <p className="text-yellow-500 uppercase tracking-[4px] text-xs md:text-sm font-semibold">
            Speakers
          </p>
        </div>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-[1.05]">
              World-class
              <br />
              Speakers
            </h1>
            <p className="text-gray-500 text-base md:text-lg mt-7 leading-relaxed max-w-lg">
              We host a lineup of leaders and innovators who bring a wealth of knowledge,
              experience, and inspiration from across the continent and beyond.
            </p>
            <button className="mt-7 border border-black text-black font-bold px-7 py-3 rounded-xl hover:bg-black hover:text-white transition duration-300 text-sm">
              View all speakers
            </button>
          </div>

          {/* RIGHT — CAROUSEL */}
          <div>
            {/* CARDS */}
            <div className="flex gap-4 sm:gap-6 overflow-hidden">
              {visible.map((speaker, i) => (
                <div
                  key={speaker.name + i}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-1 transition-all duration-300 ${
                    i === 1 ? "mt-8 sm:mt-12" : ""
                  }`}
                >
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    className="h-56 sm:h-72 w-full object-cover"
                  />
                  <div className="p-4 md:p-5">
                    <h2 className="text-sm md:text-base font-bold text-black">{speaker.name}</h2>
                    <p className="text-yellow-500 text-xs md:text-sm mt-1">{speaker.role}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{speaker.company}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-4 mt-8">
              {/* PREV / NEXT */}
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:text-yellow-500 transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:text-yellow-500 transition"
              >
                <ChevronRight size={18} />
              </button>

              {/* DOTS */}
              <div className="flex gap-2 ml-2">
                {speakers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current ? "w-6 h-2 bg-yellow-400" : "w-2 h-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="ml-auto text-gray-400 text-sm">
                {current + 1} / {speakers.length}
              </span>
            </div>
          </div>

        </div>

        {/* PRICING SECTION */}
        <div className="mt-20 md:mt-28">

          {/* HEADING */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-yellow-500 uppercase tracking-[4px] text-xs md:text-sm font-semibold mb-4">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-black text-black leading-tight">
                Pick your
                <br />
                experience
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                Our event offers a variety of options to accommodate different needs.
                Whether attending as an individual or a corporate group, we have a package for you.
              </p>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 md:p-8 flex flex-col transition duration-300 ${
                  plan.featured
                    ? "bg-black text-white"
                    : "bg-white border border-gray-100 text-black hover:border-yellow-400"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h2 className={`text-lg md:text-xl font-bold ${plan.featured ? "text-white" : "text-black"}`}>
                    {plan.name}
                  </h2>
                  {plan.featured && (
                    <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <p className={`text-4xl md:text-5xl font-black mt-4 ${plan.featured ? "text-white" : "text-black"}`}>
                  {plan.price}
                </p>
                <p className="text-sm mt-2 text-gray-400">{plan.note}</p>

                <div className="space-y-3 mt-7 flex-1">
                  {plan.features.map((f) => (
                    <p
                      key={f}
                      className={`text-sm flex items-center gap-2 ${plan.featured ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <span className="text-yellow-400 font-bold">✓</span> {f}
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