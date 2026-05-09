import { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is DTW?",
      answer:
        "DTW is Rwanda’s leading digital transformation and technology conference bringing together innovators, startups, investors and leaders.",
    },
    {
      question: "Do we eat what we wants?",
      answer:
        "Yes. Different food and beverage options will be available during the event experience.",
    },
    {
      question: "Why Do you always have tech?",
      answer:
        "Technology drives innovation, transformation and economic growth which is why DTW focuses on the future of tech.",
    },
    {
      question: "How do i reserve a sit?",
      answer:
        "You can reserve your seat by registering online through the event registration platform.",
    },
  ];

  return (
    <section className="bg-black py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* FAQ AREA */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>

            {/* SMALL TITLE */}
            <p className="text-gray-400 text-2xl">
              FAQS
            </p>

            {/* MAIN TITLE */}
            <h1 className="text-white text-5xl font-bold mt-12 leading-tight">
              Frequently Asked Question
            </h1>

            {/* QUESTION LINK */}
            <button className="flex items-center gap-4 text-[#F4B400] text-2xl mt-14 hover:gap-6 transition-all">

              I have a question →

            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden"
              >

                {/* QUESTION */}
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-8 py-7 text-left"
                >

                  <h2 className="text-2xl font-bold text-black">
                    {faq.question}
                  </h2>

                  <span className="text-4xl font-light">
                    {openIndex === index ? "−" : "+"}
                  </span>

                </button>

                {/* ANSWER */}
                {openIndex === index && (
                  <div className="px-8 pb-8">

                    <p className="text-gray-600 text-lg leading-relaxed">
                      {faq.answer}
                    </p>

                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

        {/* CTA SECTION */}
        <div className="bg-[#F3F3F3] rounded-[40px] mt-24 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* TEXT */}
          <h1 className="text-5xl font-bold text-black">
            Ready to join us?
          </h1>

          {/* BUTTON */}
          <button className="bg-yellow-400 text-black px-14 py-6 rounded-2xl text-3xl font-bold hover:scale-105 transition duration-500 shadow-xl">

            Contact Us

          </button>

        </div>

      </div>

    </section>
  );
};

export default Faq;