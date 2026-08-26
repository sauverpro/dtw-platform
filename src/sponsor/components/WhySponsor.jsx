import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  EyeIcon,
  GlobeAltIcon,
  HeartIcon,
  ShieldCheckIcon,
  StarIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useSite } from '../store/SiteContext';

/** Maps CMS `iconType` strings to Heroicons (outline). */
const ICON_COMPONENTS = {
  eye: EyeIcon,
  users: UserGroupIcon,
  globe: GlobeAltIcon,
  message: ChatBubbleLeftRightIcon,
  dollar: CurrencyDollarIcon,
  heart: HeartIcon,
  star: StarIcon,
  zap: BoltIcon,
  shield: ShieldCheckIcon,
  award: TrophyIcon,
};

export default function WhySponsor() {
  const { data } = useSite();
  const { why } = data;

  return (
    <section id="why" style={{ background: 'var(--off)', padding: 'clamp(52px,7vw,88px) clamp(22px,6vw,80px)', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,var(--lb) 40%,transparent)' }}></div>
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '52px' }}>
          <div>
            <div style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '22px', height: '1.5px', background: 'var(--gold)', flexShrink: 0, display: 'inline-block' }}></span>
              Why Partner With Us
            </div>
            <h2 style={{ fontSize: 'clamp(24px,3.4vw,44px)', fontWeight: 900, lineHeight: 1.07, letterSpacing: '-1px', color: 'var(--lt)', margin: 0 }}>
              Why Sponsor<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>DTW2026</em>
            </h2>
          </div>
          <p style={{ color: 'var(--lt2)', fontSize: '13px', lineHeight: 1.78, margin: '0 auto 40px', maxWidth: '680px', padding: '0 8px', textAlign: 'center' }}>
            {why.description}
          </p>
        </div>

        {/* Cards grid — floating elevated style */}
        <div
          className="why-cards stagger"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}
        >
          {why.items.map((item) => {
            const Icon = ICON_COMPONENTS[item.iconType] ?? StarIcon;
            return (
              <div
                key={item.id}
                className="why-item"
                style={{
                  background: 'var(--white)',
                  borderRadius: '6px',
                  padding: '28px 26px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'transform .25s, box-shadow .25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';
                }}
              >
                {/* Ghost number */}
                <span style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '42px', fontWeight: 900, color: 'rgba(0,0,0,0.035)', lineHeight: 1, userSelect: 'none' }}>{item.number}</span>

                {/* Icon */}
                <div style={{
                  width: '42px', height: '42px', borderRadius: '4px',
                  background: 'var(--gold-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <Icon style={{ width: 18, height: 18, color: 'var(--gold)' }} aria-hidden />
                </div>

                <h3 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: 'var(--lt)' }}>{item.title}</h3>
                <p style={{ fontSize: '11.5px', color: 'var(--lt2)', lineHeight: 1.65, margin: 0 }}>{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div
          className="stagger"
          style={{ marginTop: '36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '20px' }}
        >
          {why.stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: 'var(--white)',
                borderRadius: '6px',
                padding: '26px 18px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform .25s, box-shadow .25s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';
              }}
            >
              <strong style={{ display: 'block', fontSize: 'clamp(26px,3.2vw,44px)', fontWeight: 900, color: 'var(--lt)', lineHeight: 1, letterSpacing: '-1.5px', marginBottom: '6px' }}>{stat.value}</strong>
              <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--lt3)' }}>{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}