import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL as API_BASE } from '../constants/api';
import { DEFAULT_SITE_IMAGE } from '../constants/mediaDefaults';
import { defaultData } from './defaultData';

const SiteContext = createContext(null);

const STORAGE_KEY = 'dtw2026_site_data';
const TOKEN_KEY = 'dtw2026_admin_token';

function slotsFromLegacy(pkg) {
  const n = pkg?.slots;
  if (typeof n === 'number' && Number.isFinite(n)) return Math.max(0, Math.round(n));
  if (typeof n === 'string' && n.trim() !== '') {
    const p = parseInt(n, 10);
    if (Number.isFinite(p)) return Math.max(0, p);
  }
  const m = String(pkg?.tier ?? '').match(/(\d+)/);
  return m ? Math.max(0, parseInt(m[1], 10)) : 0;
}

/**
 * Stored packages are authoritative. Previously we re-injected every default
 * whose id was missing from storage, which made "delete package" in the admin
 * appear to fail after save/reload.
 */
function mergePackages(storedList, defs) {
  if (!Array.isArray(storedList)) return defs;
  const defsById = new Map(defs.map((d) => [d.id, d]));
  return storedList.map((p) => {
    const def = defsById.get(p.id);
    const { tier: _drop, ...rest } = p;
    return {
      ...(def || {}),
      ...rest,
      slots: slotsFromLegacy(p),
      benefits: Array.isArray(rest.benefits) ? rest.benefits : (def?.benefits ?? []),
    };
  });
}

function resolveSiteImageUrl(raw) {
  if (typeof raw !== 'string') return DEFAULT_SITE_IMAGE;
  const s = raw.trim();
  if (s === '' || s === '/site-default.jpg') return DEFAULT_SITE_IMAGE;
  if (s === 'https://www.kigalicity.gov.rw/fileadmin/user_upload/Kigali_city/Background_Images/kigali-arena.jpeg') {
    return DEFAULT_SITE_IMAGE;
  }
  return s;
}

function mergeStoredWithDefaults(parsed) {
  const hero = { ...defaultData.hero, ...parsed.hero };
  const about = { ...defaultData.about, ...parsed.about };
  return {
    ...defaultData,
    ...parsed,
    hero: {
      ...hero,
      backgroundImage: resolveSiteImageUrl(hero.backgroundImage),
    },
    about: {
      ...about,
      visualImage: resolveSiteImageUrl(about.visualImage),
    },
    why: { ...defaultData.why, ...parsed.why },
    cta: { ...defaultData.cta, ...parsed.cta },
    footer: { ...defaultData.footer, ...parsed.footer },
    packages: mergePackages(parsed.packages, defaultData.packages),
    partners: normalizePartners(parsed.partners),
  };
}

function normalizePartners(list) {
  if (!Array.isArray(list)) return defaultData.partners;
  return list.map((p) => ({
    id: String(p?.id ?? Date.now()),
    name: String(p?.name ?? '').trim() || 'Partner',
    logoUrl: typeof p?.logoUrl === 'string' ? p.logoUrl : '',
  }));
}

function normalizeSiteData(raw) {
  return mergeStoredWithDefaults(raw ?? {});
}

async function apiFetch(path, options = {}) {
  const { headers: optionHeaders, ...rest } = options;
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(optionHeaders || {}),
    },
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload?.error || 'API_ERROR');
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

export function SiteProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return normalizeSiteData(JSON.parse(stored));
    } catch {
      // ignore
    }
    return normalizeSiteData(defaultData);
  });
  const [version, setVersion] = useState(1);
  const [loading, setLoading] = useState(true);
  const [apiOnline, setApiOnline] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (adminToken) localStorage.setItem(TOKEN_KEY, adminToken);
    else localStorage.removeItem(TOKEN_KEY);
  }, [adminToken]);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const payload = await apiFetch('/site-content');
        if (!alive) return;
        setData(normalizeSiteData(payload.content));
        setVersion(payload.version);
        setApiOnline(true);
      } catch {
        if (!alive) return;
        setApiOnline(false);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  const syncRemoteContent = (content, nextVersion) => {
    setData(normalizeSiteData(content));
    if (typeof nextVersion === 'number' && Number.isFinite(nextVersion)) {
      setVersion(nextVersion);
    }
  };

  const updateSection = async (section, value) => {
    const previous = data;
    const next = normalizeSiteData({ ...data, [section]: value });

    if (!apiOnline) {
      setData(next);
      return { persisted: false, reason: 'API_OFFLINE' };
    }
    if (!adminToken) {
      const err = new Error('UNAUTHORIZED');
      err.status = 401;
      throw err;
    }

    try {
      const payload = await apiFetch(`/site-content/${section}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ value, version }),
      });
      setData(normalizeSiteData(payload.content));
      setVersion(payload.version);
      return { persisted: true, version: payload.version };
    } catch (err) {
      if (err?.status === 409) {
        const latest = await apiFetch('/site-content');
        setData(normalizeSiteData(latest.content));
        setVersion(latest.version);
      } else {
        setData(previous);
      }
      throw err;
    }
  };

  const loginAdmin = async (email, password) => {
    const payload = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAdminToken(payload.token);
    return payload.admin;
  };

  const logoutAdmin = () => {
    setAdminToken('');
  };

  const resetToDefault = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({
    data,
    updateSection,
    resetToDefault,
    syncRemoteContent,
    version,
    loading,
    apiOnline,
    adminToken,
    loginAdmin,
    logoutAdmin,
  }), [data, version, loading, apiOnline, adminToken]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
