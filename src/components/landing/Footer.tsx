import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin } from "lucide-react";

const SocialIconX = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialIconLinkedIn = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SocialIconInstagram = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881.001 1.44 1.44 0 012.881-.001z" />
  </svg>
);

const Footer = () => {
  const quickLinks: { label: string; to?: string }[] = [
    { label: "Home", to: "/" },
    { label: "About" },
    { label: "Schedule" },
    { label: "Speakers" },
    { label: "Tickets" },
    { label: "Contact", to: "/contact" },
  ];
  const socials: { href: string; label: string; Icon: typeof SocialIconX }[] = [
    { href: "#", label: "X", Icon: SocialIconX },
    { href: "#", label: "LinkedIn", Icon: SocialIconLinkedIn },
    { href: "#", label: "Instagram", Icon: SocialIconInstagram },
  ];

  return (
    <footer className="bg-[#0E0E0E] border-t border-white/[0.04] pt-16 px-6 pb-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-yellow-400 text-2xl font-black tracking-tight">
              DTW<span className="text-white">2026</span>
            </h2>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-xs">
              Africa's leading technology and innovation conference — connecting startups,
              leaders, and investors to shape the continent's digital future.
            </p>

            <div className="flex items-center gap-2 mt-5 text-gray-500 text-xs">
              <MapPin size={12} className="text-yellow-400 shrink-0" />
              Kigali Convention Centre, Rwanda
            </div>
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
              <Mail size={12} className="text-yellow-400 shrink-0" />
              dtw@ictchamber.rw
            </div>

            <div className="flex gap-2 mt-7">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-gray-500 hover:border-yellow-400/50 hover:text-yellow-400 transition duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => {
                const className =
                  "text-gray-500 text-sm hover:text-yellow-400 cursor-pointer transition duration-200 flex items-center gap-1.5 group";
                const inner = (
                  <>
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                      <ArrowRight size={11} />
                    </span>
                    {label}
                  </>
                );
                return (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className={className}>
                        {inner}
                      </Link>
                    ) : (
                      <a href="#" className={className}>
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* EVENT INFO */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Event Dates</p>
            <div className="space-y-3">
              {["Day 01 — May 13", "Day 02 — May 14", "Day 03 — May 15"].map((d) => (
                <p key={d} className="text-gray-500 text-sm">{d}</p>
              ))}
            </div>

            <div className="mt-7 bg-yellow-400/8 border border-yellow-400/15 rounded-lg px-4 py-3.5">
              <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider mb-1">Early bird ends</p>
              <p className="text-white text-sm font-semibold">April 30, 2026</p>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Stay Updated</p>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              Get the latest news, speaker announcements, and event updates straight to your inbox.
            </p>
            <div className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-yellow-400/40 transition placeholder:text-gray-600"
              />
              <button className="w-full bg-yellow-400 text-black py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-300 transition duration-200">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/[0.04] mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-600 text-xs">
          <p>© 2026 DTW Conference. All rights reserved.</p>
          <div className="flex gap-5">
            <a className="hover:text-gray-400 cursor-pointer transition">Privacy Policy</a>
            <a className="hover:text-gray-400 cursor-pointer transition">Terms of Service</a>
            <a className="hover:text-gray-400 cursor-pointer transition">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;