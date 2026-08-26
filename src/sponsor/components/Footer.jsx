import { ICT_CHAMBER_LOGO_URL } from '../constants/branding';
import { useSite } from '../store/SiteContext';

export default function Footer() {
  const { data } = useSite();
  const { footer } = data;
  const heartIdx = footer.madeIn.indexOf('♥');
  const chamberHighlight = 'ICT Chamber Rwanda';
  const chamberIdx = footer.copyright.indexOf(chamberHighlight);

  const handleAnchor = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer style={{ background: 'var(--dark3)', borderTop: '1px solid var(--db)', padding: 'clamp(36px,4vw,52px) clamp(22px,6vw,80px) 26px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 'clamp(24px,4vw,52px)', marginBottom: '36px' }}>

        {/* Brand */}
        <div style={{ minWidth: '200px' }}>
          <img
            src={ICT_CHAMBER_LOGO_URL}
            alt="Digital Transformation Week 2026"
            width={260}
            height={86}
            style={{
              maxHeight: '86px',
              width: 'auto',
              maxWidth: 'min(260px, 72%)',
              objectFit: 'contain',
              objectPosition: 'left top',
              display: 'block',
              marginBottom: '10px',
            }}
          />
          <p style={{ fontSize: '11.5px', color: 'var(--dt3)', lineHeight: 1.7, margin: '10px 0 18px', maxWidth: '250px' }}>{footer.tagline}</p>
          <div style={{ display: 'flex', gap: '7px' }}>
            {footer.socials.map((s, i) => (
              <a key={i} href={s.href}
                style={{ width: '30px', height: '30px', border: '1px solid var(--db2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', textDecoration: 'none', color: 'var(--dt3)', transition: '.3s', borderRadius: '2px' }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--dt3)'; e.target.style.color = 'var(--dt)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--db2)'; e.target.style.color = 'var(--dt3)'; }}
              >{s.label}</a>
            ))}
          </div>
        </div>

        {/* Columns */}
        {footer.columns.map((col, ci) => (
          <div key={ci}>
            <h4 style={{ fontSize: '9.5px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--dt)', marginBottom: '14px' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {col.links.map((link, li) => (
                <li key={li}>
                  <a href={link.href} onClick={e => handleAnchor(e, link.href)}
                    style={{ fontSize: '11.5px', color: 'var(--dt3)', textDecoration: 'none', transition: 'color .3s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--dt)'}
                    onMouseLeave={e => e.target.style.color = 'var(--dt3)'}
                  >{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--db)', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ fontSize: '9.5px', color: 'var(--dt3)', letterSpacing: '.8px' }}>
          {chamberIdx === -1 ? (
            footer.copyright
          ) : (
            <>
              {footer.copyright.slice(0, chamberIdx)}
              <span style={{ color: 'var(--gold)' }}>{chamberHighlight}</span>
              {footer.copyright.slice(chamberIdx + chamberHighlight.length)}
            </>
          )}
        </p>
        <p style={{ fontSize: '9.5px', color: 'var(--dt3)', letterSpacing: '.8px' }}>
          {heartIdx === -1 ? (
            footer.madeIn
          ) : (
            <>
              {footer.madeIn.slice(0, heartIdx)}
              <span style={{ color: 'var(--gold)' }}>♥</span>
              {footer.madeIn.slice(heartIdx + 1)}
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
