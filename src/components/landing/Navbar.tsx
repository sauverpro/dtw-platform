import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const SPONSOR_URL = "https://dtw-smoky.vercel.app/";

const links = [
  { label: "Home", to: "/" },
  { label: "Partners", to: "/partners" },
  { label: "DBS", to: "/dbs" },
  { label: "Previous DTWs", to: "/previous-dtws" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3 md:py-4"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">

        {/* LOGO */}
        <h1 className={`font-black text-xl md:text-2xl tracking-tight transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
          DTW<span className="text-yellow-400">2026</span>
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <li
              key={link.label}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-yellow-500 transition-colors duration-200 ${
                    isActive
                      ? "text-yellow-400"
                      : scrolled
                        ? "text-gray-700"
                        : "text-white/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE — DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={SPONSOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black px-5 py-2.5 rounded-md text-sm font-bold hover:bg-yellow-300 transition duration-300"
          >
            Sponsor Us
          </a>
        </div>

        {/* MOBILE: Get Tickets + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-xs font-bold">
            Tickets
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors ${scrolled ? "text-black" : "text-white"}`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-5 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `block text-sm font-medium cursor-pointer hover:text-yellow-500 transition py-2.5 border-b border-gray-50 last:border-0 ${
                  isActive ? "text-yellow-500" : "text-gray-700"
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="text-sm font-medium text-gray-500 text-left py-1">Sign in</button>
            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl text-sm font-bold w-full">
              Get Tickets →
            </button>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
