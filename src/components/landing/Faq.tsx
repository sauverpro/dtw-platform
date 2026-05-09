import { useState } from "react";

const faqs = [
  {
    question: "What is DTW?",
    answer:
      "DTW is Rwanda's leading digital transformation and technology conference bringing together innovators, startups, investors and leaders from across the continent.",
  },
  {
    question: "Will food & drinks be available?",
    answer:
      "Yes. A variety of food and beverage options will be available throughout the event, including a dedicated networking lunch on each day.",
  },
  {
    question: "Why the focus on technology?",
    answer:
      "Technology drives innovation, transformation and economic growth — which is why DTW focuses on the future of tech to position Rwanda as Africa's digital hub.",
  },
  {
    question: "How do I reserve a seat?",
    answer:
      "You can reserve your seat by registering online through the event registration platform. Early bird tickets sell out fast.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0E0E0E] py-28 px-6">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">

        {/* FAQ AREA */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-5 mb-8">
              <div className="h-[2px] w-12 bg-yellow-400"></div>
              <p className="text-yellow-400 uppercase tracking-[5px] text-sm font-semibold">FAQs</p>
            </div>

            <h1 className="text-white text-5xl font-black leading-tight">
              Frequently
              <br />
              Asked
              <br />
              Questions
            </h1>

            <p className="text-gray-500 text-base mt-8 leading-relaxed max-w-xs">
              Still have questions? We're happy to help you before the event.
            </p>

            <button className="flex items-center gap-2 text-yellow-400 text-base font-semibold mt-8 hover:gap-4 transition-all">
              Ask a question →
            </button>
          </div>

          {/* RIGHT — ACCORDION */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden border transition duration-300 ${
                  openIndex === index
                    ? "border-yellow-400/40 bg-[#1A1A1A]"
                    : "border-white/5 bg-[#161616]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-7 py-6 text-left"
                >
                  <h2 className={`text-base font-bold transition ${openIndex === index ? "text-white" : "text-gray-300"}`}>
                    {faq.question}
                  </h2>
                  <span className={`text-2xl font-light ml-6 transition ${openIndex === index ? "text-yellow-400" : "text-gray-600"}`}>
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-7 pb-6">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

       
      </div>

    </section>
  );
};

export default Faq;