import { Link } from 'react-router-dom';
import {
  CubeIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  InformationCircleIcon,
  MegaphoneIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { SPONSOR_ADMIN_BASE } from '../../constants/routes';
import { useSite } from '../../store/SiteContext';
import { AdminHeader, PageWrapper } from './AdminUI';

const SECTIONS = [
  { label: 'Hero Section', href: `${SPONSOR_ADMIN_BASE}/hero`, desc: 'Background media, title, subtitle, stats, CTA buttons', Icon: HomeIcon, color: '#6366f1' },
  { label: 'Partners', href: `${SPONSOR_ADMIN_BASE}/partners`, desc: 'Scrolling partners strip logos', Icon: UserGroupIcon, color: '#0ea5e9' },
  { label: 'About', href: `${SPONSOR_ADMIN_BASE}/about`, desc: 'Event details, bullets, dates', Icon: InformationCircleIcon, color: '#10b981' },
  { label: 'Why Sponsor', href: `${SPONSOR_ADMIN_BASE}/why`, desc: 'Reason cards & impact stats', Icon: SparklesIcon, color: '#f59e0b' },
  { label: 'Packages', href: `${SPONSOR_ADMIN_BASE}/packages`, desc: 'Sponsorship tiers & pricing', Icon: CubeIcon, color: '#D4A017' },
  { label: 'CTA Section', href: `${SPONSOR_ADMIN_BASE}/cta`, desc: 'Call to action & contact info', Icon: MegaphoneIcon, color: '#ef4444' },
  { label: 'Footer', href: `${SPONSOR_ADMIN_BASE}/footer`, desc: 'Links, socials & copyright', Icon: DocumentTextIcon, color: '#8b5cf6' },
];

export default function AdminDashboard() {
  const { data, resetToDefault } = useSite();

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Manage all content on the DTW2026 website" />
      <PageWrapper>
        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { label: 'Hero Stats', value: data.hero.stats.length },
            { label: 'Partners', value: data.partners.length },
            { label: 'Packages', value: data.packages.length },
            { label: 'Why Items', value: data.why.items.length },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#D4A017', letterSpacing: '-1px' }}>{stat.value}</div>
              <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(240,238,234,0.40)', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(240,238,234,0.40)', marginBottom: '14px' }}>Edit Sections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '12px', marginBottom: '32px' }}>
          {SECTIONS.map(s => (
            <Link key={s.href} to={s.href} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px', padding: '20px', textDecoration: 'none',
              transition: 'border .2s, background .2s', display: 'block',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.background = 'rgba(212,160,23,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              <div style={{ marginBottom: '10px' }}>
                <s.Icon style={{ width: 24, height: 24, color: s.color }} aria-hidden />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0eeea', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '11px', color: 'rgba(240,238,234,0.40)' }}>{s.desc}</div>
            </Link>
          ))}
        </div>

        {/* Danger zone */}
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#f87171', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ExclamationTriangleIcon style={{ width: 16, height: 16, flexShrink: 0 }} aria-hidden />
            Advanced Settings
          </h3>
          <p style={{ fontSize: '11px', color: 'rgba(240,238,234,0.40)', marginBottom: '14px' }}>Reset all content to the original default values. This cannot be undone.</p>
          <button onClick={() => { if (confirm('Reset all content to defaults?')) resetToDefault(); }}
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.30)', color: '#f87171', padding: '8px 18px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase', transition: '.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
          >Reset to Defaults</button>
        </div>
      </PageWrapper>
    </>
  );
}
