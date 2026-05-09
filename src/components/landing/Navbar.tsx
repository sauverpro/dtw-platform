const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">

        {/* LOGO */}
        <h1 className="text-black font-bold text-2xl">
          DTW
        </h1>

        {/* MENU */}
        <ul className="hidden md:flex gap-10 text-black font-medium">

          <li className="cursor-pointer hover:text-yellow-500">
            Home
          </li>

          <li className="cursor-pointer hover:text-yellow-500">
            About
          </li>

          <li className="cursor-pointer hover:text-yellow-500">
            FAQs
          </li>

          <li className="cursor-pointer hover:text-yellow-500">
            Contact
          </li>

        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <button className="text-black font-medium">
            Sign up
          </button>

          <button className="bg-[#E9E5D8] px-5 py-3 rounded-full text-sm font-medium hover:bg-yellow-400 transition">
            Become a partner →
          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;