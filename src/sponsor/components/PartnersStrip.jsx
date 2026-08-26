import { useSite } from '../store/SiteContext';

export default function PartnersStrip() {
  const { data } = useSite();
  const { partners } = data;
  const doubled = [...partners, ...partners];

  return (
    <div style={{ borderTop: '1px solid var(--lb)', borderBottom: '1px solid var(--lb)', background: 'var(--white)', padding: '14px clamp(22px,6vw,80px)', display: 'flex', alignItems: 'center', gap: '36px', overflow: 'hidden' }}>
      <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--lt3)', whiteSpace: 'nowrap', flexShrink: 0 }}>Official Partners</span>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div className="partners-logos">
          {doubled.map((p, i) => (
            <span key={i} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--lt3)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .3s', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--lt)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--lt3)'}
            >
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--lt3)', flexShrink: 0 }}></span>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
