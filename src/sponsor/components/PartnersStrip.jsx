import { useSite } from '../store/SiteContext';

/**
 * Official Partners ticker on the sponsorship landing page.
 * Renders the same partners list managed in Admin → Partners; logos
 * (logoUrl) are what visitors see. Name is alt text, and a text fallback
 * only when a partner has no logo yet.
 */
export default function PartnersStrip() {
  const { data } = useSite();
  const { partners } = data;
  const doubled = [...partners, ...partners];

  return (
    <div
      style={{
        borderTop: '1px solid var(--lb)',
        borderBottom: '1px solid var(--lb)',
        background: 'var(--white)',
        padding: '18px clamp(22px,6vw,80px)',
        display: 'flex',
        alignItems: 'center',
        gap: '36px',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontSize: '8.5px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--lt3)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Official Partners
      </span>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div className="partners-logos" style={{ gap: '48px', alignItems: 'center' }}>
          {doubled.map((p, i) => {
            const logo = typeof p.logoUrl === 'string' ? p.logoUrl.trim() : '';
            return (
              <span
                key={`${p.id}-${i}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px',
                  opacity: 0.85,
                  transition: 'opacity .3s',
                  cursor: 'default',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85'; }}
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={p.name || 'Partner'}
                    title={p.name || undefined}
                    style={{
                      height: '36px',
                      width: 'auto',
                      maxWidth: '140px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--lt3)',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--lt3)', flexShrink: 0 }} />
                    {p.name}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
