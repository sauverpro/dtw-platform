import { useState } from 'react';
import PackageInterestModal from './PackageInterestModal';
import { useSite } from '../store/SiteContext';

export default function CtaSection() {
  const { data } = useSite();
  const { cta } = data;
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <section id="cta" style={{
      background: 'var(--dark2)', padding: 'clamp(52px,7vw,88px) clamp(22px,6vw,80px)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
      borderTop: '1px solid var(--db)',
    }}>
      <PackageInterestModal
        pkg={null}
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
      {/* Big background watermark */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(60px,12vw,160px)', fontWeight: 900, color: 'rgba(255,255,255,0.02)', letterSpacing: '-4px', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 0 }} aria-hidden>{cta.backgroundWatermark}</div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '620px', margin: '0 auto' }}>
        <div style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '22px', height: '1.5px', background: 'var(--gold)', flexShrink: 0, display: 'inline-block' }}></span>
          {cta.label}
          <span style={{ width: '22px', height: '1.5px', background: 'var(--gold)', flexShrink: 0, display: 'inline-block' }}></span>
        </div>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 900, lineHeight: 1.03, letterSpacing: '-1.5px', marginBottom: '14px', color: 'var(--dt)' }}>
          {cta.title} <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{cta.titleEmphasis}</em><br />With Us
        </h2>
        <p className="reveal" style={{ fontSize: '13px', color: 'var(--dt2)', lineHeight: 1.75, marginBottom: '32px' }}>{cta.subtitle}</p>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            type="button"
            className="btn-primary"
            style={{
              background: 'var(--gold)',
              color: '#0a0a0a',
              padding: '12px 26px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              transition: '.3s',
            }}
            onClick={() => setInquiryOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--gold2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--gold)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span>{cta.primaryCta}</span>
            <span>→</span>
          </button>
          <a href={cta.secondaryHref}
            style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '12px 26px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', textDecoration: 'none', transition: '.3s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            {cta.secondaryCta}
          </a>
        </div>
        <p style={{ fontSize: '10.5px', color: 'var(--dt3)', letterSpacing: '.4px' }}>
          Email:
          {' '}
          <a href={`mailto:${cta.contactEmail}`} style={{ color: 'var(--dt2)', textDecoration: 'none', borderBottom: '1px solid var(--db)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--dt2)'; e.currentTarget.style.borderColor = 'var(--db)'; }}
          >{cta.contactEmail}</a>
          &nbsp;·&nbsp;
          <a href={`tel:${cta.contactPhone.replace(/\s/g, '')}`} style={{ color: 'var(--dt2)', textDecoration: 'none', borderBottom: '1px solid var(--db)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--dt2)'; e.currentTarget.style.borderColor = 'var(--db)'; }}
          >{cta.contactPhone}</a>
        </p>
      </div>
    </section>
  );
}
