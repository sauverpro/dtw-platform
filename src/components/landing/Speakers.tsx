const Speakers = () => {
  return (
    <section className="bg-[#F5F5F5] py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto bg-[#EFEFEF] rounded-[40px] p-10 md:p-16">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>

            {/* SMALL TITLE */}
            <p className="text-gray-400 text-2xl">
              Speakers
            </p>

            {/* MAIN TITLE */}
            <h1 className="text-6xl font-bold text-black mt-8 leading-tight">
              SPEAKERS
            </h1>

            {/* SUBTITLE */}
            <h2 className="text-5xl font-bold text-black mt-10 leading-tight">
              We invite Amazing speakers
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-700 text-2xl mt-10 leading-relaxed">
              At our event, we are thrilled to host a lineup of amazing speakers
              who are leaders and innovators in their fields.
              These distinguished individuals bring a wealth of knowledge,
              experience, and inspiration to our audience.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center gap-10">

            {/* SPEAKER 1 */}
            <div className="relative">

              <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden w-64">

                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                  className="h-80 w-full object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold text-black">
                    Ariane Pintest
                  </h2>

                  <p className="text-blue-500 mt-2">
                    Chief AI Officer
                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <button className="absolute bottom-6 right-4 bg-white shadow-xl px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">

                Profile

              </button>

            </div>

            {/* SPEAKER 2 */}
            <div className="relative mt-10">

              <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden w-64">

                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
                  className="h-80 w-full object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold text-black">
                    John Baptiste
                  </h2>

                  <p className="text-blue-500 mt-2">
                    Chief AI Officer
                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <button className="absolute bottom-6 right-4 bg-white shadow-xl px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition">

                Profile

              </button>

            </div>

          </div>

        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-10">

          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>

          <div className="w-3 h-3 rounded-full bg-gray-300"></div>

          <div className="w-3 h-3 rounded-full bg-gray-300"></div>

        </div>

        {/* PRICING SECTION */}
        <div className="bg-[#DCDCDC] rounded-[40px] mt-20 p-10 md:p-16">

          {/* TOP */}
          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT */}
            <div>

              <p className="text-black text-2xl font-semibold">
                Pricing
              </p>

              <h1 className="text-5xl font-bold text-black mt-6">
                Comprehensive Pricing Options
              </h1>

            </div>

            {/* RIGHT */}
            <div>

              <p className="text-gray-600 text-2xl leading-relaxed">
                Our event offers a variety of pricing options to accommodate
                different needs and budgets. Whether you're attending as an
                individual, a student, or a corporate group, we have a package
                designed for you.
              </p>

            </div>

          </div>

          {/* PRICING CARDS */}
          <div className="grid md:grid-cols-3 gap-10 mt-20">

            {/* CARD 1 */}
            <div className="bg-white rounded-[30px] shadow-xl p-10 hover:-translate-y-2 transition duration-500">

              <h2 className="text-4xl font-bold text-black">
                Early Bird
              </h2>

              <h1 className="text-6xl font-bold text-black mt-4">
                $150
              </h1>

              <p className="text-gray-500 mt-4">
                Save more by registering early.
              </p>

              <div className="space-y-5 mt-10 text-xl">

                <p>✔ Enjoy full access</p>

                <p>✔ Network with speakers</p>

                <p>✔ Affordable option</p>

              </div>

              <button className="mt-12 bg-[#EAEAEA] px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition">

                Register

              </button>

            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-[30px] shadow-xl p-10 hover:-translate-y-2 transition duration-500">

              <h2 className="text-4xl font-bold text-black">
                Standard
              </h2>

              <h1 className="text-6xl font-bold text-black mt-4">
                $149
              </h1>

              <p className="text-gray-500 mt-4">
                Save more by registering early.
              </p>

              <div className="space-y-5 mt-10 text-xl">

                <p>✔ All sessions and workshops</p>

                <p>✔ Event recordings</p>

                <p>✔ Breakout sessions</p>

              </div>

              <button className="mt-12 bg-[#EAEAEA] px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition">

                Register

              </button>

            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-[30px] shadow-xl p-10 hover:-translate-y-2 transition duration-500">

              <h2 className="text-4xl font-bold text-black">
                Priority
              </h2>

              <h1 className="text-6xl font-bold text-black mt-4">
                $200
              </h1>

              <p className="text-gray-500 mt-4">
                Save more by registering early.
              </p>

              <div className="space-y-5 mt-10 text-xl">

                <p>✔ VIP lounge access</p>

                <p>✔ Priority seating</p>

                <p>✔ Meet-and-greet with speakers</p>

              </div>

              <button className="mt-12 bg-[#EAEAEA] px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition">

                Register

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Speakers;