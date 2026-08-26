import { useState } from 'react';
import { CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import PackageInterestModal from './PackageInterestModal';
import { useSite } from '../store/SiteContext';

export default function Packages() {
  const { data } = useSite();
  const { packages } = data;
  const [interestPkg, setInterestPkg] = useState(null);

  return (
    <section id="packages" style={{ background: 'var(--off)', padding: 'clamp(52px,7vw,88px) clamp(22px,6vw,80px)', position: 'relative' }}>
      <PackageInterestModal
        pkg={interestPkg}
        open={Boolean(interestPkg)}
        onClose={() => setInterestPkg(null)}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>

        {/* Intro */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(36px,5vw,68px)', marginBottom: '48px', alignItems: 'center' }}>
          <div className="reveal-l">
            <div style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '22px', height: '1.5px', background: 'var(--gold)', flexShrink: 0, display: 'inline-block' }}></span>
              Sponsorship Tiers
            </div>
            <h2 style={{ fontSize: 'clamp(24px,3.4vw,44px)', fontWeight: 900, lineHeight: 1.07, letterSpacing: '-1px', color: 'var(--lt)' }}>
              Sponsorship<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Packages</em>
            </h2>
          </div>
          <div className="reveal-r">
            <p style={{ color: 'var(--lt)', fontSize: '14px', lineHeight: 1.75, fontWeight: 500, maxWidth: '42em' }}>
              Choose the level that aligns with your organisation's goals. All packages include exclusive benefits to maximise your presence at DTW2026. Contact us for customised options.
            </p>
          </div>
        </div>

        {/* Cards grid: 3×2 on large screens */}
        <div className="stagger grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-3">
          {packages.map(pkg => {
            const slotsLeft = Number(pkg.slots) || 0;
            return <div key={pkg.id} className={`pkg-card${pkg.featured ? ' feat' : ''}`}
              style={{ background: pkg.featured ? 'var(--dark)' : 'var(--white)', border: `1px solid ${pkg.featured ? 'rgba(255,255,255,0.10)' : 'var(--lb)'}`, padding: '24px 20px' }}
            >
              <div style={{
                display: 'inline-block',
                fontSize: '9.5px',
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '6px 11px',
                background: 'rgba(242, 233, 211, 0.38)',
                color: pkg.featured ? 'var(--gold)' : 'var(--lt)',
                border: `1px solid ${pkg.featured ? 'var(--gold)' : 'rgba(61, 57, 47, 0.2)'}`,
                borderRadius: '2px',
                marginBottom: '14px',
              }}>
                {pkg.badge}
              </div>
              <div style={{ fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 900, color: pkg.featured ? 'var(--dt)' : 'var(--lt)', letterSpacing: '-1px', lineHeight: 1, marginBottom: '3px' }}>
                {pkg.price}{' '}
                <span style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: pkg.featured ? 'var(--gold)' : 'var(--lt)',
                  letterSpacing: '0.04em',
                  opacity: pkg.featured ? 1 : 0.92,
                }}>{pkg.currency}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px',
                color: 'var(--gold)',
              }}>
                <UserGroupIcon style={{ width: 20, height: 20, flexShrink: 0 }} strokeWidth={2} aria-hidden />
                <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.02em' }}>
                  {slotsLeft}{' '}
                  {slotsLeft === 1 ? 'slot' : 'slots'} available
                </span>
              </div>
              <div style={{ height: '1px', background: pkg.featured ? 'rgba(255,255,255,0.09)' : 'var(--lb)', marginBottom: '16px' }}></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pkg.benefits.map((b, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '9px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: pkg.featured ? 'rgba(240,238,234,0.92)' : 'var(--lt)',
                    lineHeight: 1.5,
                  }}>
                    <CheckIcon style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2, color: 'var(--gold)' }} aria-hidden strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={slotsLeft <= 0}
                onClick={() => setInterestPkg(pkg)}
                style={{
                  marginTop: '20px',
                  width: '100%',
                  padding: '10px',
                  background: slotsLeft <= 0 ? 'color-mix(in srgb, var(--gold) 45%, transparent)' : 'var(--gold)',
                  border: '1px solid var(--gold)',
                  color: '#0a0a0a',
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '9.5px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  transition: '.3s',
                  textAlign: 'center',
                  display: 'block',
                  cursor: slotsLeft <= 0 ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (slotsLeft <= 0) return;
                  e.currentTarget.style.background = 'var(--gold2)';
                  e.currentTarget.style.borderColor = 'var(--gold2)';
                  e.currentTarget.style.color = '#0a0a0a';
                }}
                onMouseLeave={(e) => {
                  if (slotsLeft <= 0) return;
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.color = '#0a0a0a';
                }}
              >{slotsLeft > 0 ? pkg.ctaText : 'Sold Out'}</button>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
