import { Link } from "react-router-dom";
import { Users, LayoutList, Mic2, Globe2 } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Industry leaders & innovators" },
  { icon: LayoutList, value: "50+", label: "Workshops, talks & panels" },
  { icon: Mic2, value: "$50K", label: "Startup pitch prize pool" },
  { icon: Globe2, value: "20+", label: "Countries represented" },
];

const AboutEvent = () => {
  return (
    <section className="bg-[#F9F8F6] py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — label + title */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-yellow-400 shrink-0" />
              <p className="text-yellow-500 uppercase tracking-[0.2em] text-xs font-semibold">
                About the Event
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black leading-[1.08] tracking-tight">
              Digital
              <br />
              Transformation
              <br />
              <span className="text-yellow-500">Week</span>
            </h2>
          </div>

          {/* Right — copy */}
          <div className="lg:col-span-7 lg:pt-1">
            <div className="space-y-5 text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl lg:max-w-none">
              <p>
                The Digital Transformation Week is an annual weeklong event initiated from the
                collaboration of the Ministry of ICT and Innovation (MINICT), RISA, and the Rwanda
                ICT Chamber. The DTW is designed to highlight and accelerate the adoption of digital
                technologies across all sectors in Rwanda — engaging stakeholders, showcasing local
                innovations, and exploring opportunities digital transformation brings to Rwanda&apos;s
                economy and society.
              </p>
              <p>
                Aligning innovations with national priorities, the DTW underscores the commitment to
                positioning Rwanda as a regional hub for digital innovation. It brings together tech
                entrepreneurs, regulators, development partners, and the general public for an annual
                celebration of progress and a call to action for continued collaboration in building
                a digitally inclusive future.
              </p>
              <p>
                From the standpoint of Rwanda&apos;s private tech sector, the DTW fosters a vibrant
                ecosystem that nurtures startups, supports established corporations, and attracts global
                investment in ICT. The week promotes local digital products through exhibitions, public–private
                partnerships, investor connections, and accelerated consumption of Made in Rwanda digital
                products at home and beyond.
              </p>
            </div>
            <Link
              to="/partners"
              className="inline-block mt-8 bg-yellow-400 text-black font-bold px-7 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm"
            >
              Become a Partner
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 md:mt-20 bg-black rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={value}
                className={[
                  "group px-6 md:px-7 py-8 flex flex-col gap-4 transition duration-300 hover:bg-white/[0.04]",
                  i < 3 ? "md:border-r border-white/10" : "",
                  i < 2 ? "border-b md:border-b-0 border-white/10" : "",
                ].join(" ")}
              >
                <div className="w-9 h-9 bg-yellow-400/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-yellow-400" size={16} />
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-black text-white leading-none">{value}</p>
                  <p className="text-gray-500 text-xs mt-2 leading-snug">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEvent;
