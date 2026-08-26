import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { API_BASE_URL } from '../constants/api';
import { useSite } from '../store/SiteContext';
import PackageTierSelect from './PackageTierSelect';

const inputBorder = 'rgba(15,15,15,0.14)';

const initialForm = () => ({
  organizationName: '',
  contactPerson: '',
  email: '',
  phone: '',
  message: '',
});

/** Pass `pkg` when opened from one package card (locked); omit/`null` for CTA global flow (dynamic package picker). */
export default function PackageInterestModal({ pkg: lockedPkg = null, open, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const { data, syncRemoteContent } = useSite();
  const packages = Array.isArray(data.packages) ? data.packages : [];
  const packageIdsKey = useMemo(() => packages.map((p) => String(p.id)).join('|'), [packages]);

  const [chosenPackageId, setChosenPackageId] = useState('');
  const [form, setForm] = useState(initialForm);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);

  const pickPackageMode = !lockedPkg && open;

  const effectivePkg = useMemo(() => {
    if (lockedPkg) {
      const liveMatch = packages.find((p) => String(p.id) === String(lockedPkg.id));
      return liveMatch ?? lockedPkg;
    }
    const match = packages.find((p) => String(p.id) === String(chosenPackageId));
    return match ?? packages[0] ?? null;
  }, [lockedPkg, chosenPackageId, packages]);

  const lockedPkgIdStr = lockedPkg != null ? String(lockedPkg.id ?? '') : null;

  useLayoutEffect(() => {
    if (!open || lockedPkgIdStr != null || packages.length === 0) return;
    if (!packages.some((p) => String(p.id) === String(chosenPackageId))) {
      setChosenPackageId(String(packages[0].id ?? ''));
    }
  }, [open, lockedPkgIdStr, packages, chosenPackageId]);

  useEffect(() => {
    if (!open) return undefined;
    setForm(initialForm());
    setSubmitError('');
    setDone(false);
    setChosenPackageId(
      lockedPkgIdStr != null
        ? lockedPkgIdStr
        : packages[0]
          ? String(packages[0].id ?? '')
          : ''
    );

    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarW = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

    requestAnimationFrame(() => {
      const el = dialogRef.current?.querySelector(
        '#pkg-interest-select, input.pkg-modal-input, textarea.pkg-modal-input'
      );
      el?.focus();
    });

    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lockedPkgIdStr, packageIdsKey, onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!effectivePkg || busy || done) return;
    setSubmitError('');
    setBusy(true);

    const body = {
      organizationName: form.organizationName.trim(),
      contactPerson: form.contactPerson.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim() || undefined,
      packageId: String(effectivePkg.id ?? ''),
      packageBadge: effectivePkg.badge,
      packagePrice: String(effectivePkg.price ?? ''),
      packageCurrency: effectivePkg.currency,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/package-inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        const d = payload?.details;
        const formMsgs = Array.isArray(d?.formErrors) ? d.formErrors.filter(Boolean).join(' ') : '';
        const fieldMsgs =
          d?.fieldErrors && typeof d.fieldErrors === 'object'
            ? Object.entries(d.fieldErrors)
                .flatMap(([k, v]) => (Array.isArray(v) ? v.map((msg) => `${k}: ${msg}`) : []))
                .join(' ')
            : '';
        const msg =
          [formMsgs, fieldMsgs].filter(Boolean).join(' - ') ||
          payload?.error ||
          payload?.message ||
          `Request failed (${res.status})`;
        setSubmitError(msg || 'Something went wrong. Please try again.');
        setBusy(false);
        return;
      }

      if (payload?.content) {
        syncRemoteContent(payload.content, payload.version);
      }

      setDone(true);
      setBusy(false);
    } catch (err) {
      const blockedByCors =
        typeof window !== 'undefined' &&
        API_BASE_URL.startsWith('http') &&
        !API_BASE_URL.includes(window.location.hostname);
      const fallback = blockedByCors
        ? 'Request blocked before reaching the server. Please check backend CORS settings and redeploy the API.'
        : 'Network error - check your connection or try again later.';
      setSubmitError(err instanceof Error && err.message ? err.message : fallback);
      setBusy(false);
    }
  }

  if (!open) return null;

  const noPackagesConfigured = packages.length === 0;
  const packageSlots = Number(effectivePkg?.slots) || 0;
  const canSubmitForm = Boolean(effectivePkg) && !noPackagesConfigured && packageSlots > 0;

  return (
    <div
      ref={dialogRef}
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        padding: 'clamp(16px, 5vw, 32px)',
        background: 'rgba(0,0,0,0.62)',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby={titleId}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: 'min(900px, calc(100dvh - 32px))',
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--white)',
          border: '1px solid var(--lb)',
          borderRadius: '6px',
          boxShadow: '0 28px 80px rgba(0,0,0,0.18)',
          animation: 'fadeUp .28s ease',
          touchAction: 'auto',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '22px 22px 14px',
            borderBottom: '1px solid var(--lb2)',
            flexShrink: 0,
          }}
        >
          <div style={{ flex: '1', minWidth: 0 }}>
            <p
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '8px',
              }}
            >
              {pickPackageMode ? 'Secure your sponsorship' : 'Package interest'}
            </p>
            <h2
              id={titleId}
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--lt)',
                letterSpacing: '-0.5px',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {effectivePkg ? (
                <>
                  {effectivePkg.badge}{' '}
                  <span
                    style={{
                      color: 'var(--lt1)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      fontFeatureSettings: '"tnum"',
                    }}
                  >
                    ({effectivePkg.price} {effectivePkg.currency})
                  </span>
                </>
              ) : (
                <>Sponsorship package</>
              )}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              flexShrink: 0,
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--off)',
              border: `1px solid ${inputBorder}`,
              borderRadius: '4px',
              color: 'var(--lt)',
              cursor: 'pointer',
              transition: '.2s',
            }}
          >
            <XMarkIcon style={{ width: 20, height: 20 }} strokeWidth={2} />
          </button>
        </header>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            padding: '22px',
            paddingTop: done ? '32px' : '20px',
          }}
        >
          {noPackagesConfigured && !lockedPkg ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--lt)', marginBottom: '10px' }}>
                No sponsorship packages available yet.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--lt2)', lineHeight: 1.6 }}>
                Please check back soon or reach out using the contact details on this page.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  marginTop: '22px',
                  width: '100%',
                  padding: '12px',
                  background: 'var(--gold)',
                  border: '1px solid var(--gold)',
                  color: '#0a0a0a',
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                Close
              </button>
            </div>
          ) : done && effectivePkg ? (
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'color-mix(in srgb, var(--gold) 15%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--gold) 35%, transparent)',
                  color: 'var(--gold)',
                  margin: '0 auto 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                }}
              >
                ✓
              </div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--lt)', marginBottom: '10px' }}>
                Thank you
              </p>
              <p style={{ fontSize: '13px', color: 'var(--lt2)', lineHeight: 1.65 }}>
                We&apos;ve received your request for <strong style={{ color: 'var(--gold)' }}>{effectivePkg.badge}</strong>.
                Our team will contact you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  marginTop: '26px',
                  width: '100%',
                  padding: '12px',
                  background: 'var(--gold)',
                  border: '1px solid var(--gold)',
                  color: '#0a0a0a',
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {pickPackageMode && packages.length > 0 ? (
                <div className="pkg-modal-float pkg-modal-float--select">
                  <PackageTierSelect
                    triggerId="pkg-interest-select"
                    packages={packages}
                    value={chosenPackageId}
                    onChange={(idStr) => setChosenPackageId(idStr)}
                    disabled={!canSubmitForm}
                  />
                  <label className="pkg-modal-label" htmlFor="pkg-interest-select">Sponsorship package</label>
                </div>
              ) : null}
              <div className="pkg-modal-float">
                <input
                  id="org-name"
                  className="pkg-modal-input"
                  name="organizationName"
                  required
                  autoComplete="organization"
                  placeholder=" "
                  value={form.organizationName}
                  onChange={(e) => setForm((f) => ({ ...f, organizationName: e.target.value }))}
                  disabled={!canSubmitForm}
                />
                <label className="pkg-modal-label" htmlFor="org-name">Organization name</label>
              </div>
              <div className="pkg-modal-float">
                <input
                  id="contact-person"
                  className="pkg-modal-input"
                  name="contactPerson"
                  required
                  autoComplete="name"
                  placeholder=" "
                  value={form.contactPerson}
                  onChange={(e) => setForm((f) => ({ ...f, contactPerson: e.target.value }))}
                  disabled={!canSubmitForm}
                />
                <label className="pkg-modal-label" htmlFor="contact-person">Contact person</label>
              </div>
              <div className="pkg-modal-float">
                <input
                  id="email"
                  className="pkg-modal-input"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder=" "
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  disabled={!canSubmitForm}
                />
                <label className="pkg-modal-label" htmlFor="email">Email</label>
              </div>
              <div className="pkg-modal-float">
                <input
                  id="phone"
                  className="pkg-modal-input"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder=" "
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  disabled={!canSubmitForm}
                />
                <label className="pkg-modal-label" htmlFor="phone">Phone</label>
              </div>
              <div className="pkg-modal-float" style={{ marginBottom: 18 }}>
                <textarea
                  id="msg"
                  className="pkg-modal-input pkg-modal-textarea"
                  name="message"
                  rows={6}
                  placeholder=" "
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  disabled={!canSubmitForm}
                />
                <label className="pkg-modal-label" htmlFor="msg">Additional message - optional</label>
              </div>
              {submitError ? (
                <p role="alert" style={{ fontSize: '12px', color: '#f87171', marginBottom: '14px', lineHeight: 1.45 }}>
                  {submitError}
                </p>
              ) : null}
              {!submitError && effectivePkg && !canSubmitForm ? (
                <p role="status" style={{ fontSize: '12px', color: '#b45309', marginBottom: '14px', lineHeight: 1.45 }}>
                  This package currently has no available slots.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={busy || !canSubmitForm}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: busy || !canSubmitForm ? 'color-mix(in srgb, var(--gold) 45%, transparent)' : 'var(--gold)',
                  border: '1px solid var(--gold)',
                  color: '#0a0a0a',
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: busy || !canSubmitForm ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                }}
              >
                {busy
                  ? 'Sending...'
                  : `Submit - ${effectivePkg?.ctaText ?? data.cta?.primaryCta ?? 'Get started'}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
