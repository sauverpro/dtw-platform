import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const awards = [
  {
    title: "FinTech Excellence Award",
    description: "Recognizes outstanding FinTech companies driving financial innovation and inclusion through technology.",
    tag: "Finance",
  },
  {
    title: "Digital Startup Award",
    description: "Celebrating emerging startups transforming Rwanda's digital ecosystem with bold ideas.",
    tag: "Startups",
  },
  {
    title: "AI Innovation Award",
    description: "Awarded to organizations creating impactful AI solutions across Africa.",
    tag: "Artificial Intelligence",
  },
  {
    title: "Smart City Award",
    description: "Recognizing smart infrastructure and urban technology innovation in African cities.",
    tag: "Urban Tech",
  },
  {
    title: "Cybersecurity Leadership",
    description: "Honoring excellence in cybersecurity innovation and digital safety practices.",
    tag: "Security",
  },
  {
    title: "Digital Impact Award",
    description: "Celebrates organizations creating meaningful digital transformation in communities.",
    tag: "Impact",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
];

const DBSPage = () => {
  return (
    <div className="bg-[#080808] overflow-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end px-6 pb-20 pt-40">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop"
          alt="DBS Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Digital Business Awards · Rwanda 2026
            </p>
          </div>

          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.0] tracking-tight max-w-3xl">
            Celebrating<br />Digital<br />
            <span className="text-yellow-400">Excellence</span>
          </h1>

          <p className="text-gray-400 text-base mt-7 max-w-md leading-relaxed">
            Recognizing the innovators, startups, enterprises and leaders
            transforming industries through technology across Africa.
          </p>

          <div className="flex flex-wrap gap-3 mt-9">
            <button className="bg-yellow-400 text-black font-bold px-7 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm">
              Nominate Now
            </button>
            <button className="border border-white/15 text-white font-medium px-7 py-3 rounded-lg hover:border-white/30 transition duration-200 text-sm">
              View Categories
            </button>
          </div>
        </div>
      </section>

      {/* ── AWARDS GRID ──────────────────────────────────── */}
      <section className="bg-[#080808] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Award Categories</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              2026 Award<br />Categories
            </h2>
            <p className="text-gray-500 text-sm max-w-[220px]">
              Submit your nomination for any of our six award categories.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#111] hover:border-yellow-400/30 transition duration-300"
              >
                {/* number watermark */}
                <span className="absolute top-5 right-6 text-[64px] font-black leading-none text-white/[0.04] select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="p-7 flex flex-col h-full min-h-[220px] justify-between relative z-10">
                  <div>
                    <span className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase text-yellow-400/70 bg-yellow-400/8 border border-yellow-400/15 px-2.5 py-1 rounded-full mb-5">
                      {award.tag}
                    </span>
                    <h3 className="text-white text-lg font-bold leading-snug">
                      {award.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  <button className="mt-7 self-start flex items-center gap-2 text-xs font-semibold text-white/40 group-hover:text-yellow-400 transition duration-200">
                    Nominate
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT DBS ─────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-yellow-400" />
              <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase">About DBS</p>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-black leading-[1.08] tracking-tight">
              Recognizing
              <br />
              Digital
              <br />
              Excellence
            </h2>

            <p className="text-gray-500 text-base mt-7 leading-relaxed">
              The Digital Business Awards Rwanda celebrates innovators, startups,
              enterprises and leaders transforming industries through technology
              and innovation.
            </p>

            <p className="text-gray-500 text-base mt-4 leading-relaxed">
              DBS connects businesses, investors and innovators while recognizing
              impactful digital solutions shaping Africa's future.
            </p>

            <a
              href="https://dtw-smoky.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center bg-yellow-400 text-black font-bold px-7 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm"
            >
              Become a Sponsor
            </a>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop"
              alt="DBS Event"
              className="rounded-2xl h-[520px] w-full object-cover"
            />
            {/* floating stat pill */}
            <div className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
              <p className="text-yellow-400 text-2xl font-black leading-none">6</p>
              <p className="text-white/50 text-xs mt-1">Award Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <section className="bg-[#080808] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">Event Gallery</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              Moments from<br />DBS
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl ${i === 0 || i === 3 ? "aspect-[4/3]" : "aspect-square"}`}
              >
                <img
                  src={src}
                  alt={`DBS moment ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DBI TRUST SEAL CTA ────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop"
          alt="DBI Trust Seal"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">DBI Trust Seal</p>
            <div className="h-px w-8 bg-yellow-400" />
          </div>

          <h2 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
            Apply for the
            <br />
            <span className="text-yellow-400">DBI Trust Seal</span>
          </h2>

          <p className="text-gray-400 text-sm mt-6 leading-relaxed max-w-sm mx-auto">
            Demonstrate your commitment to digital excellence and earn recognition across Africa's growing tech ecosystem.
          </p>

          <button className="mt-9 bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:bg-yellow-300 transition duration-200 text-sm">
            Apply Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DBSPage;
