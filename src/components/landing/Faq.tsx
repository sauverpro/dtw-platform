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
  {
    question: "Is the event open to international attendees?",
    answer:
      "Absolutely. DTW welcomes attendees from across Africa and the globe. We have participants from 20+ countries each year.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0A0A0A] py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-14">
          <div className="h-px w-8 bg-yellow-400 shrink-0" />
          <p className="text-yellow-400 uppercase tracking-[0.2em] text-xs font-semibold">FAQs</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-24 items-start">

          {/* LEFT */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight">
              Got
              <br />
              Questions?
              <br />
              <span className="text-yellow-400">We've got</span>
              <br />
              answers.
            </h2>

            <p className="text-gray-500 text-sm mt-7 leading-relaxed max-w-[240px]">
              Can't find what you're looking for? Reach out directly and our team will get back to you.
            </p>

            <a
              href="mailto:dtw@ictchamber.rw"
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-white border border-white/15 px-5 py-2.5 rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition duration-200"
            >
              Ask a question
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* decorative watermark */}
            <p className="text-[120px] font-black leading-none text-white/[0.03] mt-4 select-none -ml-2">
              FAQ
            </p>
          </div>

          {/* RIGHT — ACCORDION */}
          <div>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border-b transition duration-200 ${
                    isOpen ? "border-yellow-400/30" : "border-white/[0.07]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left gap-6 group"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-[11px] font-bold text-white/20 tabular-nums w-5 shrink-0 group-hover:text-yellow-400 transition">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={`text-sm font-semibold transition duration-200 ${isOpen ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                        {faq.question}
                      </p>
                    </div>

                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-yellow-400 border-yellow-400 text-black rotate-45"
                          : "border-white/15 text-white/30 group-hover:border-yellow-400/60 group-hover:text-yellow-400"
                      }`}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-48 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-500 text-sm leading-relaxed pl-10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Faq;