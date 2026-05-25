import { MapPin, Briefcase, Lightbulb, TrendingUp } from "lucide-react";

const aims = [
  {
    icon: MapPin,
    text: "Promote inclusive digital transformation across Rwanda",
  },
  {
    icon: Briefcase,
    text: "Drive digital jobs, entrepreneurship, and SME digitization",
  },
  {
    icon: Lightbulb,
    text: "Strengthen local innovation ecosystems and collaboration by showcasing grassroots digital innovations and fostering partnerships",
  },
  {
    icon: TrendingUp,
    text: "Explore sustainable digital business and investment opportunities that position Rwanda as a leading hub for inclusive digital transformation",
  },
];

const DTW2026Section = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-yellow-400 shrink-0" />
          <p className="text-yellow-500 uppercase tracking-[0.2em] text-xs font-semibold">
            DTW 2026
          </p>
        </div>

        {/* Theme banner */}
        <div className="relative rounded-2xl overflow-hidden bg-black mb-14 md:mb-20">
          <div className="relative z-10 px-8 md:px-14 py-10 md:py-14 max-w-3xl">
            <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Theme
            </p>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight">
              "Inclusive Digital Transformation for a{" "}
              <span className="text-yellow-400">
                Sustainable Digital Economy
              </span>
              "
            </h2>
          </div>
        </div>

        {/* Body copy + aims grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Copy */}
          <div className="lg:col-span-7 space-y-5 text-gray-600 text-sm md:text-base leading-relaxed">
            <p>
              The DTW 2026 brings together government institutions, district leaders, tech
              entrepreneurs, innovators, ICT sector regulators, development partners, private
              sector players, youth, SMEs, academia, and the general public through a series of
              provincial dialogues, exhibitions, innovation showcases, business networking
              sessions, workshops, and community engagements — dedicated to decentralizing digital
              opportunities and accelerating digital job creation across Rwanda.
            </p>
            <p>
              Building on the success of the 2025 edition — which focused on strengthening
              Rwanda's technology communities including HealthTech, EdTech, FinTech, AI,
              Cybersecurity, AgriTech, and Digital Creatives — the DTW 2026 shifts focus toward
              taking innovation, digital skills, technology-enabled jobs, and business
              opportunities closer to communities across all provinces of Rwanda.
            </p>
            <p>
              The DTW 2026 will start on{" "}
              <span className="text-black font-semibold">7 December 2026</span> with a series of
              province-based engagements and culminate in the{" "}
              <span className="text-black font-semibold">Digital Business Summit on 11 December 2026</span>{" "}
              in Kigali — bringing together national and international stakeholders to discuss
              Rwanda's digital economy growth, showcase local innovations, explore investment and
              partnership opportunities, and strengthen collaboration between districts,
              innovators, businesses, and development partners.
            </p>
          </div>

          {/* Why section */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">
              Why Be Part of DTW 2026
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Exploring the opportunities that inclusive digital transformation brings to Rwanda's
              economy and communities, the DTW 2026 aims to:
            </p>
            <ul className="space-y-4">
              {aims.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-yellow-400/10 flex items-center justify-center mt-0.5">
                    <Icon size={15} className="text-yellow-500" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5-day programme table */}
        <div className="mt-14 md:mt-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black mb-6">Programme Overview</p>
          <div className="rounded-2xl overflow-hidden border border-black/[0.07]">
            {/* table header */}
            <div className="hidden sm:grid grid-cols-[90px_130px_1fr_1fr] bg-black text-white text-[10px] font-bold uppercase tracking-[0.18em] px-6 py-3 gap-4">
              <span>Date</span>
              <span>Location</span>
              <span>Focus Stroke Area</span>
              <span>Key Activities</span>
            </div>
            {[
              {
                date: "7 Dec",
                day: "Monday",
                location: "Northern Province",
                forum: "Digital Innovation Forum",
                focus: "AgriTech, Tourism Tech & SME Growth",
                activities: "Discussions, tech demos, youth digital jobs & business partnerships",
                highlight: false,
              },
              {
                date: "8 Dec",
                day: "Tuesday",
                location: "Southern Province",
                forum: "Digital Innovation Forum",
                focus: "EdTech, Creative Economy & SME Growth",
                activities: "Discussions, tech demos, youth digital jobs & business partnerships",
                highlight: false,
              },
              {
                date: "9 Dec",
                day: "Wednesday",
                location: "Western Province",
                forum: "Digital Trade Forum",
                focus: "Digital Trade & SME Growth",
                activities: "Discussions, tech demos, youth digital jobs & business partnerships",
                highlight: false,
              },
              {
                date: "10 Dec",
                day: "Thursday",
                location: "Eastern Province",
                forum: "Smart Economy Forum",
                focus: "Smart Agriculture, Logistics & SME Growth",
                activities: "Discussions, tech demos, youth digital jobs & business partnerships",
                highlight: false,
              },
              {
                date: "11 Dec",
                day: "Friday",
                location: "Kigali",
                forum: "Digital Business Summit",
                focus: "National summit & policy dialogue",
                activities: "Exhibitions, business partnerships, investment forums, policy dialogue",
                highlight: true,
              },
            ].map((row) => (
              <div
                key={row.date}
                className={`grid grid-cols-1 sm:grid-cols-[90px_130px_1fr_1fr] gap-2 sm:gap-4 px-6 py-5 border-t border-black/[0.06] ${
                  row.highlight ? "bg-black text-white" : "bg-white text-black transition duration-200 hover:bg-yellow-400/[0.03]"
                }`}
              >
                <div>
                  <span className={`inline-block text-xs font-black ${row.highlight ? "text-yellow-400" : "text-black"}`}>
                    {row.date}
                  </span>
                  <span className={`block text-[10px] ${row.highlight ? "text-white/40" : "text-gray-400"}`}>2026</span>
                  <span className={`block text-[10px] font-semibold mt-0.5 ${row.highlight ? "text-white/50" : "text-gray-500"}`}>{row.day}</span>
                </div>
                <p className={`text-sm font-semibold ${row.highlight ? "text-white" : "text-black"}`}>{row.location}</p>
                <div>
                  <p className={`text-sm font-semibold leading-snug ${row.highlight ? "text-white" : "text-black"}`}>{row.forum}</p>
                  <p className={`text-xs mt-1 ${row.highlight ? "text-yellow-400" : "text-yellow-600"}`}>{row.focus}</p>
                </div>
                <p className={`text-xs leading-relaxed ${row.highlight ? "text-white/85" : "text-gray-700"}`}>{row.activities}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DTW2026Section;
