import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { DTW_LOGO_URL, DTW_LOGO_SCROLLED_URL } from "../../constants/brand";

const SPONSOR_URL = "https://dtw-smoky.vercel.app/";

const links = [
  { label: "Home", to: "/" },
  { label: "Partners", to: "/partners" },
  { label: "DBS", to: "/dbs" },
  { label: "Previous DTWs", to: "/previous-dtws" },
  { label: "Contact", to: "/contact" },
];

type NavbarProps = {
  /** Use on light-background pages so links stay readable at the top */
  variant?: "dark" | "light";
};

const Navbar = ({ variant = "dark" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLight = variant === "light";
  const solidNav = scrolled || isLight;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        solidNav
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3 md:py-4"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">

        {/* LOGO */}
        <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <img
            src={scrolled ? DTW_LOGO_SCROLLED_URL : DTW_LOGO_URL}
            alt="Digital Transformation Week 2026"
            className="h-9 md:h-11 w-auto transition-opacity duration-300"
          />
        </Link>

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
                      ? "text-yellow-500"
                      : solidNav
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
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/register"
            className={`px-5 py-2.5 rounded-md text-sm font-bold border transition duration-300 ${
              solidNav
                ? "border-gray-200 text-gray-800 hover:border-yellow-400 hover:text-yellow-600"
                : "border-white/30 text-white hover:border-yellow-400 hover:text-yellow-400"
            }`}
          >
            Register
          </Link>
          <a
            href={SPONSOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black px-5 py-2.5 rounded-md text-sm font-bold hover:bg-yellow-300 transition duration-300"
          >
            Sponsor Us
          </a>
        </div>

        {/* MOBILE: Register + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-xs font-bold"
          >
            Register
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors ${solidNav ? "text-black" : "text-white"}`}
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
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="bg-yellow-400 text-black px-5 py-3 rounded-xl text-sm font-bold w-full text-center"
            >
              Register →
            </Link>
            <a
              href={SPONSOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="border border-gray-200 text-gray-800 px-5 py-3 rounded-xl text-sm font-bold w-full text-center hover:border-yellow-400 transition"
            >
              Sponsor Us
            </a>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
