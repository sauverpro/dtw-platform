import { useEffect, useState } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeIcon,
  DocumentTextIcon,
  HomeIcon,
  InformationCircleIcon,
  MegaphoneIcon,
  SparklesIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { DTW_LOGO_COMPACT_URL, DTW_LOGO_URL } from '../../constants/branding';
import { SPONSOR_ADMIN_BASE, SPONSOR_BASE } from '../../constants/routes';
import { useSite } from '../../store/SiteContext';

const NAV = [
  { label: 'Dashboard', href: SPONSOR_ADMIN_BASE, Icon: Squares2X2Icon },
  { label: 'Hero Section', href: `${SPONSOR_ADMIN_BASE}/hero`, Icon: HomeIcon },
  { label: 'Partners', href: `${SPONSOR_ADMIN_BASE}/partners`, Icon: UserGroupIcon },
  { label: 'About', href: `${SPONSOR_ADMIN_BASE}/about`, Icon: InformationCircleIcon },
  { label: 'Why Sponsor', href: `${SPONSOR_ADMIN_BASE}/why`, Icon: SparklesIcon },
  { label: 'Packages', href: `${SPONSOR_ADMIN_BASE}/packages`, Icon: CubeIcon },
  { label: 'CTA', href: `${SPONSOR_ADMIN_BASE}/cta`, Icon: MegaphoneIcon },
  { label: 'Footer', href: `${SPONSOR_ADMIN_BASE}/footer`, Icon: DocumentTextIcon },
];

const SIDEBAR_AUTO_COLLAPSE_PX = 768;

function LoginScreen() {
  const { loginAdmin, apiOnline } = useSite();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginAdmin(email, password);
    } catch {
      setError('Login failed. Check credentials and backend status.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f0f0f', color: '#f0eeea', fontFamily: "'Montserrat', sans-serif" }}>
      <form onSubmit={submit} style={{ width: 'min(420px, 92vw)', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Admin Login</h1>
        <p style={{ color: 'rgba(240,238,234,0.65)', fontSize: 12 }}>{apiOnline ? 'Backend connected' : 'Backend offline: login unavailable'}</p>
        <label style={{ display: 'block', fontSize: 11, marginBottom: 6 }}>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', background: '#181818', color: '#fff' }} />
        <label style={{ display: 'block', fontSize: 11, marginBottom: 6 }}>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={{ width: '100%', marginBottom: 16, padding: 10, borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', background: '#181818', color: '#fff' }} />
        {error ? <p style={{ color: '#f87171', fontSize: 11 }}>{error}</p> : null}
        <button type="submit" disabled={!apiOnline} style={{ width: '100%', padding: 10, border: 'none', borderRadius: 4, background: '#D4A017', color: '#0a0a0a', fontWeight: 700, cursor: 'pointer' }}>Sign In</button>
      </form>
    </div>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const { adminToken, logoutAdmin } = useSite();
  const [notice, setNotice] = useState(null);
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= SIDEBAR_AUTO_COLLAPSE_PX : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${SIDEBAR_AUTO_COLLAPSE_PX}px)`);
    const onChange = () => setCollapsed(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onNotice = (e) => {
      setNotice(e.detail);
      window.clearTimeout(onNotice._timer);
      onNotice._timer = window.setTimeout(() => setNotice(null), 4000);
    };
    window.addEventListener('dtw-admin-notice', onNotice);
    return () => window.removeEventListener('dtw-admin-notice', onNotice);
  }, []);

  if (!adminToken) return <LoginScreen />;

  return (
    <div className="admin-shell" style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f', fontFamily: "'Montserrat', sans-serif", cursor: 'auto' }}>
      <aside style={{
        width: collapsed ? '60px' : '250px',
        background: '#0a0a0a',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', flexDirection: 'column',
        transition: 'width .3s',
        flexShrink: 0,
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{
          padding: collapsed ? '10px 6px' : '16px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: collapsed ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: collapsed ? 6 : 10,
        }}>
          <img
            src={collapsed ? DTW_LOGO_COMPACT_URL : DTW_LOGO_URL}
            alt="Digital Transformation Week 2026"
            width={collapsed ? 36 : 140}
            height={collapsed ? 36 : 48}
            style={{
              height: collapsed ? 36 : 48,
              width: collapsed ? 36 : 'auto',
              maxWidth: collapsed ? 36 : 'min(220px, 100%)',
              objectFit: 'contain',
              objectPosition: 'center',
              flexShrink: 0,
              display: 'block',
            }}
          />
          <button type="button" className="admin-sidebar-collapse-btn" onClick={() => setCollapsed(v => !v)} style={{ marginLeft: collapsed ? 0 : 'auto', background: 'none', border: 'none', color: 'rgba(240,238,234,0.34)', cursor: 'pointer', flexShrink: 0, padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? <ChevronRightIcon style={{ width: 18, height: 18 }} /> : <ChevronLeftIcon style={{ width: 18, height: 18 }} />}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
          {NAV.map(item => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: collapsed ? '10px 14px' : '10px 12px', borderRadius: '6px', textDecoration: 'none', background: active ? '#FFB300' : 'transparent', color: active ? '#0a0a0a' : 'rgba(240,238,234,0.60)', fontSize: '11px', fontWeight: active ? 700 : 500, letterSpacing: '.5px', transition: '.2s' }}>
                <item.Icon style={{ width: 18, height: 18, flexShrink: 0 }} aria-hidden />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'grid', gap: 8 }}>
          <Link to={SPONSOR_BASE} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', textDecoration: 'none', color: 'rgba(240,238,234,0.40)', fontSize: '11px', fontWeight: 500, letterSpacing: '.5px', border: '1px solid rgba(255,255,255,0.07)', transition: '.2s' }}>
            <ArrowTopRightOnSquareIcon style={{ width: 18, height: 18, flexShrink: 0 }} aria-hidden />
            {!collapsed && 'View Site'}
          </Link>
          {!collapsed ? <button type="button" onClick={logoutAdmin} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(240,238,234,0.72)', borderRadius: 6, padding: '9px 12px', fontSize: 11, cursor: 'pointer' }}>Logout</button> : null}
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        {notice ? (
          <div style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 400,
            maxWidth: 'min(480px, 90vw)',
            background: notice.tone === 'success' ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)',
            color: '#f0eeea',
            border: `1px solid ${notice.tone === 'success' ? 'rgba(74,222,128,0.45)' : 'rgba(248,113,113,0.45)'}`,
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 12,
            backdropFilter: 'blur(8px)',
          }}>{notice.message}</div>
        ) : null}
        <Outlet />
      </div>
    </div>
  );
}
