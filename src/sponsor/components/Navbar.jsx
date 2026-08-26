import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ICT_CHAMBER_LOGO_URL } from '../constants/branding';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        {['#about','#why','#packages','#cta'].map((href, i) => (
          <a key={i} href={href}
            onClick={(e) => handleAnchor(e, href)}
            style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-1px', color: 'var(--dt)', textDecoration: 'none', transition: '.3s' }}
            onMouseEnter={e => { e.target.style.color = 'var(--gold)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--dt)'; }}
          >
            {['About','Why Sponsor','Packages','Contact'][i]}
          </a>
        ))}
      </div>

      <nav id="navbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1002,
        height: '62px',
        display: 'flex', alignItems: 'center',         justifyContent: 'space-between',
        transition: 'background .4s, border .4s',
        background: scrolled ? 'rgba(10,10,10,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--db)' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, zIndex: 1 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', lineHeight: 0 }}>
            <img src={ICT_CHAMBER_LOGO_URL} alt="Digital Transformation Week 2026" width={180} height={56} style={{ height: 'clamp(40px, 7vh, 52px)', width: 'auto', maxWidth: 'min(220px, 48vw)', objectFit: 'contain', display: 'block' }} />
          </a>
        </div>
        <ul className="nav-links-desktop nav-links-centered" style={{ margin: 0, padding: 0 }}>
          {[['About','#about'],['Why Sponsor','#why'],['Packages','#packages'],['Contact','#cta']].map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={e => handleAnchor(e, href)}
                style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.60)', fontSize: '10.5px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color .3s' }}
                onMouseEnter={e => { e.target.style.color = '#fff'; }}
                onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.60)'; }}
              >{label}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, zIndex: 1 }}>
          <a href="#packages" onClick={e => handleAnchor(e, '#packages')} className="nav-sponsor-desktop"
            style={{ background: 'var(--gold)', color: '#0a0a0a', padding: '8px 18px', borderRadius: '2px', fontSize: '10.5px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', transition: '.3s' }}
            onMouseEnter={e => { e.target.style.background = 'var(--gold2)'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'none'; }}
          >Become a Sponsor</a>
          <button type="button"
            className="nav-menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? (
              <XMarkIcon style={{ width: 26, height: 26 }} aria-hidden strokeWidth={2} />
            ) : (
              <Bars3Icon style={{ width: 26, height: 26 }} aria-hidden strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
