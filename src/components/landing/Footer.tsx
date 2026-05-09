const Footer = () => {
    return (
      <footer className="bg-black border-t border-white/10 py-20 px-6">
  
        {/* MAIN CONTAINER */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-14">
  
          {/* LEFT SIDE */}
          <div>
  
            {/* LOGO */}
            <h1 className="text-yellow-400 text-4xl font-bold">
              DTW2026
            </h1>
  
            {/* DESCRIPTION */}
            <p className="text-gray-400 mt-6 leading-relaxed">
              Africa’s leading technology and innovation conference connecting startups, leaders and investors.
            </p>
  
          </div>
  
          {/* MIDDLE */}
          <div>
  
            <h2 className="text-white text-2xl font-bold mb-6">
              Quick Links
            </h2>
  
            <ul className="space-y-4 text-gray-400">
  
              <li className="hover:text-yellow-400 cursor-pointer transition">
                Home
              </li>
  
              <li className="hover:text-yellow-400 cursor-pointer transition">
                About
              </li>
  
              <li className="hover:text-yellow-400 cursor-pointer transition">
                Events
              </li>
  
              <li className="hover:text-yellow-400 cursor-pointer transition">
                Contact
              </li>
  
            </ul>
  
          </div>
  
          {/* RIGHT SIDE */}
          <div>
  
            <h2 className="text-white text-2xl font-bold mb-6">
              Newsletter
            </h2>
  
            {/* INPUT */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/10 rounded-full px-5 py-4 text-white outline-none"
            />
  
            {/* BUTTON */}
            <button className="w-full mt-4 bg-yellow-400 text-black py-4 rounded-full font-semibold hover:scale-105 transition">
              Subscribe
            </button>
  
          </div>
  
        </div>
  
        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500">
  
          ©️ 2026 DTW Conference. All rights reserved.
  
        </div>
  
      </footer>
    );
  };
  
  export default Footer;