import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = ["Home", "About", "Schedule", "Speakers", "FAQs", "Contact"];

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
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8">

        {/* LOGO */}
        <h1 className={`font-black text-2xl tracking-tight transition-colors duration-300 ${scrolled ? "text-black" : "text-white"}`}>
          DTW<span className="text-yellow-400">2026</span>
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li
              key={link}
              className={`text-sm font-medium cursor-pointer hover:text-yellow-500 transition-colors duration-200 ${
                scrolled ? "text-gray-700" : "text-white/80"
              }`}
            >
              {link}
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className={`text-sm font-medium transition-colors duration-200 ${
              scrolled ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white"
            }`}
          >
            Sign in
          </button>
          <button className="bg-yellow-400 text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-300 transition duration-300">
            Get Tickets →
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${scrolled ? "text-black" : "text-white"}`}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-8 py-6 space-y-4">
          {links.map((link) => (
            <p
              key={link}
              className="text-gray-700 text-sm font-medium cursor-pointer hover:text-yellow-500 transition"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </p>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <button className="text-sm font-medium text-gray-600 text-left">Sign in</button>
            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl text-sm font-bold">
              Get Tickets →
            </button>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;