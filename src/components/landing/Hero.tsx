import { useState, useEffect } from 'react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 26,
    hours: 10,
    minutes: 4,
    seconds: 0
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const events = [
    {
      id: 1,
      title: "Events",
      subtitle: "Live Talks & Workshops",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "DTW 2026",
      subtitle: "Digital Transformation Week",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "DBS",
      subtitle: "Digital Business Summit",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  // ─── PASTE YOUR YOUTUBE VIDEO ID HERE ───────────────────────────────────────
  // It's the part after "v=" in the URL, e.g. youtube.com/watch?v=XXXXXXXXXXX
  const youtubeVideoId = "YOUR_VIDEO_ID_HERE";
  // ────────────────────────────────────────────────────────────────────────────

  // YouTube embed params explained:
  // autoplay=1        → starts playing immediately
  // mute=1            → required for autoplay to work in browsers
  // loop=1            → loops forever
  // playlist=ID       → loop requires this to be the same video ID
  // controls=0        → hides the YouTube player controls
  // showinfo=0        → hides video title bar
  // rel=0             → disables related videos at end
  // modestbranding=1  → reduces YouTube logo visibility
  // iv_load_policy=3  → hides video annotations
  // disablekb=1       → disables keyboard shortcuts on the player
  // enablejsapi=1     → allows JS control if needed later
  const youtubeEmbedUrl =
    `https://www.youtube.com/embed/${youtubeVideoId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}` +
    `&controls=0&showinfo=0&rel=0&modestbranding=1` +
    `&iv_load_policy=3&disablekb=1&enablejsapi=1`;

  const formatTime = (num) => String(num).padStart(2, '0');

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % events.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* ── YOUTUBE VIDEO BACKGROUND ──────────────────────────────────────────
          The iframe is scaled to 200% width/height and offset by -50% so it
          always fills the section regardless of aspect ratio or screen size.
          pointer-events: none prevents any clicks from reaching the YouTube
          player UI underneath (which could pause/open YouTube on click).
      ────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={youtubeEmbedUrl}
          title="Hero background video"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            pointerEvents: 'none',   // blocks clicks from reaching YouTube UI
          }}
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">

            {/* LEFT SIDE - TITLE & CTA */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10 order-1">
              <div>
                <p className="text-white/60 text-xs sm:text-sm font-medium mb-3 sm:mb-4 tracking-widest">WELCOME TO</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-white tracking-tight">
                  DIGITAL
                  <br />
                  TRANSFORM
                  <br />
                  WEEK
                </h1>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 md:mt-6">2026</p>
              </div>

              <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
                Experience cutting-edge innovation, industry leaders, and transformative insights. Join us for a week that will reshape your digital future.
              </p>

              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-black font-bold text-base sm:text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 w-fit">
                Get Started
              </button>
            </div>

            {/* RIGHT SIDE - COUNTDOWN & SLIDER */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-2">

              {/* COUNTDOWN TIMER */}
              <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
                <h2 className="text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3 md:mb-4">Time Remaining</h2>

                <div className="grid grid-cols-4 gap-1 sm:gap-2">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Min' },
                    { value: timeLeft.seconds, label: 'Sec' }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="bg-white/5 rounded-lg p-1.5 sm:p-2 md:p-3 text-center">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-none">
                          {formatTime(item.value)}
                        </h1>
                        <p className="text-white/60 text-xs font-semibold mt-0.5 sm:mt-1">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD SLIDER */}
              <div className="relative">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden group" style={{ aspectRatio: '16/9' }}>
                  <div className="relative w-full h-full">
                    {events.map((event, idx) => (
                      <div
                        key={event.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          idx === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">{event.title}</h3>
                          <p className="text-white/80 text-xs sm:text-sm md:text-base">{event.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="text-white text-lg sm:text-xl">←</span>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="text-white text-lg sm:text-xl">→</span>
                  </button>
                </div>

                <div className="flex justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6">
                  {events.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-6 sm:w-8 bg-white'
                          : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;