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

  const visible = [speakers[current], speakers[(current + 1) % speakers.length]];

  return (
    <section className="bg-[#F7F7F5] py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* LABEL */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-yellow-400 shrink-0" />
          <p className="text-yellow-500 uppercase tracking-[0.2em] text-xs font-semibold">Speakers</p>
        </div>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-black leading-[1.08] tracking-tight">
              World-class
              <br />
              Speakers
            </h2>
            <p className="text-gray-500 text-sm mt-6 leading-relaxed max-w-md">
              A lineup of leaders and innovators bringing knowledge, experience, and inspiration from across the continent and beyond.
            </p>
            <button className="mt-7 border border-black/20 text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-black hover:text-white transition duration-200 text-sm">
              View all speakers
            </button>
          </div>

          {/* RIGHT — CAROUSEL */}
          <div>
            <div className="flex gap-4 overflow-hidden">
              {visible.map((speaker, i) => (
                <div
                  key={speaker.name + i}
                  className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100/80 flex-1 transition-all duration-300 ${
                    i === 1 ? "mt-8" : ""
                  }`}
                >
                  <img src={speaker.img} alt={speaker.name} className="h-52 sm:h-64 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-sm font-bold text-black">{speaker.name}</p>
                    <p className="text-yellow-500 text-xs mt-0.5">{speaker.role}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{speaker.company}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-3 mt-6">
              <button onClick={prev} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:text-yellow-500 transition">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-yellow-400 hover:text-yellow-500 transition">
                <ChevronRight size={16} />
              </button>

              <div className="flex gap-1.5 ml-2">
                {speakers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current ? "w-5 h-1.5 bg-yellow-400" : "w-1.5 h-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="ml-auto text-gray-400 text-xs">
                {current + 1} / {speakers.length}
              </span>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-yellow-400 shrink-0" />
            <p className="text-yellow-500 uppercase tracking-[0.2em] text-xs font-semibold">Pricing</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight tracking-tight">
              Pick your<br />experience
            </h2>
            <div className="flex items-end">
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether attending as an individual or a corporate group, we have a package for you.
              </p>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 flex flex-col transition duration-300 ${
                  plan.featured
                    ? "bg-black text-white"
                    : "bg-white border border-gray-100 text-black hover:border-yellow-400/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className={`text-sm font-bold ${plan.featured ? "text-white" : "text-black"}`}>
                    {plan.name}
                  </p>
                  {plan.featured && (
                    <span className="bg-yellow-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <p className={`text-4xl font-black mt-4 tracking-tight ${plan.featured ? "text-white" : "text-black"}`}>
                  {plan.price}
                </p>
                <p className="text-xs mt-1.5 text-gray-400">{plan.note}</p>

                <div className="space-y-2.5 mt-6 flex-1">
                  {plan.features.map((f) => (
                    <p key={f} className={`text-xs flex items-center gap-2 ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>
                      <span className="text-yellow-400 font-bold text-sm">✓</span> {f}
                    </p>
                  ))}
                </div>

                <button
                  className={`mt-7 py-2.5 rounded-lg font-bold text-sm transition duration-200 ${
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