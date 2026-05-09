const TicketsPartners = () => {
  return (
    <section className="bg-[#F5F5F5] py-24 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* TICKET BANNER */}
        <div className="relative rounded-[40px] overflow-hidden h-[500px]">

          {/* IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center">

            <div className="px-12 max-w-2xl">

              {/* SMALL TEXT */}
              <p className="text-white text-2xl font-semibold">
                Special Offer
              </p>

              {/* TITLE */}
              <div className="flex items-center gap-4 mt-4">

                <h1 className="text-white text-7xl font-bold">
                  Tickets
                </h1>

                {/* DISCOUNT */}
                <div className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">
                  20% off
                </div>

              </div>

              {/* DESCRIPTION */}
              <p className="text-white/90 text-lg mt-8 leading-relaxed">
                Don’t miss your chance to be part of unforgettable moments.
                Grab your tickets now and enjoy exclusive discounts on our
                upcoming events.
              </p>

              {/* BUTTONS */}
              <div className="flex gap-6 mt-10">

                <button className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">

                  View Events

                </button>

                <button className="bg-white/30 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/40 transition">

                  Book Now

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* PARTNERS */}
        <div className="mt-24 text-center">

          {/* TITLE */}
          <h1 className="text-6xl font-bold text-black">
            Our Partners
          </h1>

          {/* LOGOS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-14 items-center mt-20">

            {/* LOGO 1 */}
            <div className="flex justify-center">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/65/RISA_logo.png"
                className="h-24 object-contain hover:scale-110 transition"
              />

            </div>

            {/* LOGO 2 */}
            <div className="flex justify-center">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Digital_Africa_logo.png"
                className="h-24 object-contain hover:scale-110 transition"
              />

            </div>

            {/* LOGO 3 */}
            <div className="flex justify-center">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Access_to_Finance_Rwanda_logo.png"
                className="h-24 object-contain hover:scale-110 transition"
              />

            </div>

            {/* LOGO 4 */}
            <div className="flex justify-center">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                className="h-24 object-contain hover:scale-110 transition"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default TicketsPartners;