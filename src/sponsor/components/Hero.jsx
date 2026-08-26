import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_SITE_IMAGE } from '../constants/mediaDefaults';
import { useSite } from '../store/SiteContext';

export default function Hero() {
  const { data } = useSite();
  const { hero } = data;
  const heroBg = hero.backgroundImage?.trim() || DEFAULT_SITE_IMAGE;
  const isVideoBg = /\.(mp4|mov|webm|ogg)(\?|#|$)/i.test(heroBg);
  const videoSources = useMemo(() => {
    if (!isVideoBg) return [];
    const cloudinaryMov = /\/video\/upload\/([^/]+\/)?[^/]+\.mov(\?|#|$)/i.test(heroBg);
    if (cloudinaryMov && !/\/video\/upload\/f_mp4\//i.test(heroBg)) {
      return [
        heroBg.replace('/video/upload/', '/video/upload/f_mp4/'),
        heroBg,
      ];
    }
    return [heroBg];
  }, [heroBg, isVideoBg]);
  const [videoIdx, setVideoIdx] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    setVideoIdx(0);
  }, [heroBg]);

  // Parallax on hero-yr
  useEffect(() => {
    const onScroll = () => {
      const yr = document.querySelector('.hero-yr');
      if (yr) yr.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.4,
      vx: (Math.random() - 0.5) * 0.06,
      vy: Math.random() * -0.08 - 0.04,
      o: Math.random() * 0.35 + 0.12,
    }));

    let animId;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx / W * 100;
        p.y += p.vy / H * 100;
        if (p.y < -0.01) p.y = 1.01;
        if (p.x < -0.01) p.x = 1.01;
        if (p.x > 1.01) p.x = -0.01;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" style={{ minHeight: '82vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Media */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#000', overflow: 'hidden' }}>
        {isVideoBg ? (
          <video
            className="hero-media-video"
            key={`${heroBg}-${videoIdx}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onError={() => {
              setVideoIdx((idx) => (idx < videoSources.length - 1 ? idx + 1 : idx));
            }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src={videoSources[videoIdx]}
          />
        ) : (
          <div className="hero-media-img" style={{ backgroundImage: `url(${JSON.stringify(heroBg)})` }} />
        )}
        <canvas ref={canvasRef} id="hero-canvas" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', width: '100%', height: '100%' }}></canvas>
      </div>

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right,rgba(5,5,5,0.88) 0%,rgba(5,5,5,0.62) 55%,rgba(5,5,5,0.35) 100%)' }}></div>

      <div className="hero-grid-lines"></div>

      {/* Big 2026 text */}
      <div className="hero-yr" style={{ position: 'absolute', right: '-30px', bottom: '-10px', zIndex: 2, fontSize: 'clamp(90px,14vw,200px)', fontWeight: 900, color: 'rgba(255,255,255,0.025)', lineHeight: 1, letterSpacing: '-5px', userSelect: 'none', pointerEvents: 'none' }}>2026</div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, padding: 'clamp(60px,8vw,90px) clamp(22px,6vw,80px) 56px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <div className="hero-badge">{hero.badge}</div>

        <h1 className="hero-title-anim" style={{ fontSize: 'clamp(30px,5vw,64px)', fontWeight: 900, lineHeight: 1.03, letterSpacing: '-1.5px', marginBottom: '16px', color: '#fff', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>
          {hero.titleLine1}<br />
          <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>{hero.titleLine2}</em><br />
          <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.85)', color: 'transparent' }}>{hero.titleLine3}</span>
        </h1>

        <p className="hero-sub-anim" style={{ fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 400, color: 'rgba(255,255,255,0.68)', maxWidth: '480px', lineHeight: 1.75, marginBottom: '32px' }}>
          {hero.subtitle}
        </p>

        <div className="hero-act-anim" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <a href="#packages" onClick={e => handleAnchor(e, '#packages')} className="btn-primary"
            style={{ background: 'var(--gold)', color: '#0a0a0a', padding: '12px 26px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', border: 'none', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px', transition: '.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold2)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          ><span>{hero.ctaPrimary}</span><span>→</span></a>

          <a href="#about" onClick={e => handleAnchor(e, '#about')}
            style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '12px 26px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', textDecoration: 'none', transition: '.3s' }}
            onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.55)'; e.target.style.background = 'rgba(255,255,255,0.10)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
          >{hero.ctaSecondary}</a>
        </div>

        <div className="hero-stats-anim" style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginTop: '40px', border: '1px solid rgba(255,255,255,0.08)', width: 'fit-content' }}>
          {hero.stats.map((stat, i) => (
            <div key={i} style={{ padding: '14px 28px', borderRight: i < hero.stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <strong style={{ display: 'block', fontSize: 'clamp(18px,2.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stat.value}</strong>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)' }}></div>
    </section>
  );
}
