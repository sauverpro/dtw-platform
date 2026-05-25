import { useState, useEffect, useRef } from 'react';
import img1 from '../../assets/img1.jpg';
import img6 from '../../assets/img 6.jpg';
import img10 from '../../assets/img10.jpg';

// DTW 2026 opens 7 December 2026, 08:00 CAT (UTC+2)
const DTW_TARGET = new Date("2026-12-07T08:00:00+02:00");

function getTimeLeft() {
  const diff = Math.max(0, DTW_TARGET.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  /    60_000),
    seconds: Math.floor((diff %    60_000)  /     1_000),
  };
}

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const events = [
    {
      id: 1,
      title: "Events",
      subtitle: "Live Talks & Workshops",
      image: img10,
    },
    {
      id: 2,
      title: "DTW 2026",
      subtitle: "Digital Transformation Week",
      image: img6,
    },
    {
      id: 3,
      title: "DBS",
      subtitle: "Digital Business Summit",
      image: img1,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');
  const heroVideo = "https://res.cloudinary.com/dx90htl9t/video/upload/v1778337572/0509_pgmad3.mov";

  const handleVideoEnded = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    void videoRef.current.play();
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 md:px-8 pt-28 pb-16 min-h-screen flex items-center">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT */}
            <div className="space-y-7">
              <div>
                <p className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  Kigali, Rwanda · May 13–15, 2026
                </p>
                <h1 className="text-4xl sm:text-4xl lg:text-5xl font-black leading-[1.0] text-white tracking-tight">
                  DIGITAL
                  <br />
                  TRANSFORMATION
        
                  
                  <br />
                  <span className="text-yellow-400">WEEK</span>
                </h1>
              </div>

              <p className="text-white/60 text-sm md:text-base max-w-sm leading-relaxed">
                Africa's premier technology conference — convening leaders, innovators, and investors to accelerate Rwanda's digital future.
              </p>

              <div className="flex items-center gap-3">
                <button className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 transition-all duration-200">
                  Get your Seats
                </button>
                <button className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">

              {/* COUNTDOWN */}
              <div className="bg-white/8 backdrop-blur-xl rounded-lg border border-white/10 p-5">
                <p className="text-white/40 text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
                  Event Starts In
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Min' },
                    { value: timeLeft.seconds, label: 'Sec' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-2xl font-black text-white leading-none tabular-nums">
                        {formatTime(item.value)}
                      </p>
                      <p className="text-white/40 text-[10px] font-semibold mt-1.5 uppercase tracking-wider">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD SLIDER */}
              <div className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '16/9' }}>
                <div className="relative w-full h-full">
                  {events.map((event, idx) => (
                    <div
                      key={event.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        idx === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                        <h3 className="text-xl md:text-2xl font-black text-white">{event.title}</h3>
                        <p className="text-white/60 text-xs md:text-sm mt-1">{event.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <button
                  onClick={() => setCurrentSlide(p => (p - 1 + events.length) % events.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 text-white text-sm"
                >←</button>
                <button
                  onClick={() => setCurrentSlide(p => (p + 1) % events.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 text-white text-sm"
                >→</button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2">
                {events.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-6 bg-yellow-400' : 'w-1.5 bg-white/25 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;