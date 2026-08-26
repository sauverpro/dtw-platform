import { useEffect, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { emitAdminNotice } from '../../utils/adminNotice';

/** ~2.5 MB max for image uploads (Cloudinary or local data URL fallback). */
const IMAGE_UPLOAD_BYTES_MAX = 2_500_000;

export function AdminHeader({ title, subtitle, onSave, saved }) {
  return (
    <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a' }}>
      <div>
        <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#f0eeea', margin: 0, letterSpacing: '-0.5px' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '11px', color: 'rgba(240,238,234,0.40)', margin: '4px 0 0', letterSpacing: '.3px' }}>{subtitle}</p>}
      </div>
      {onSave && (
        <button type="button" onClick={onSave} style={{
          background: saved ? 'rgba(34,197,94,0.15)' : '#D4A017',
          color: saved ? '#4ade80' : '#0a0a0a',
          border: saved ? '1px solid rgba(34,197,94,0.30)' : 'none',
          padding: '10px 22px', borderRadius: '4px',
          fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase',
          cursor: 'pointer', transition: '.3s',
          display: 'inline-flex', alignItems: 'center', gap: '6px',
        }}>
          {saved ? (
            <>
              <CheckIcon style={{ width: 14, height: 14 }} aria-hidden />
              Saved
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      )}
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(240,238,234,0.60)', marginBottom: '6px' }}>{label}</label>
      {hint && <p style={{ fontSize: '10px', color: 'rgba(240,238,234,0.30)', marginBottom: '6px' }}>{hint}</p>}
      {children}
    </div>
  );
}

const selectTriggerStyle = {
  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '4px', padding: '10px 12px',
  fontSize: '12px', fontFamily: "'Montserrat',sans-serif",
  outline: 'none', transition: 'border .2s',
  cursor: 'pointer', color: '#f0eeea',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', textAlign: 'left',
};

/** Dark dropdown listbox (native OS select menus stay light on some setups). */
export function AdminSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDocMouseDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: 'relative', width: '100%' }}>
      <button type="button" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((x) => !x)}
        style={selectTriggerStyle}
        onFocus={e => { e.target.style.borderColor = '#D4A017'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
        <ChevronDownIcon style={{ width: 18, height: 18, flexShrink: 0, opacity: open ? 0.9 : 0.55, transform: open ? 'rotate(180deg)' : 'none', transition: '.2s' }} aria-hidden />
      </button>
      {open && (
        <ul role="listbox" style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 'calc(100% + 4px)',
          zIndex: 200,
          maxHeight: '220px',
          overflowY: 'auto',
          margin: 0,
          padding: '4px 0',
          listStyle: 'none',
          background: '#161616',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '4px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
        }}
        >
          {options.map((opt) => {
            const sel = opt === value;
            return (
              <li key={opt} role="presentation">
                <button type="button" role="option" aria-selected={sel}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '9px 12px',
                    fontSize: '12px',
                    fontFamily: "'Montserrat',sans-serif",
                    color: '#f0eeea',
                    background: sel ? 'rgba(212,160,23,0.18)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!sel) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => {
                    if (!sel) e.currentTarget.style.background = 'transparent';
                    else e.currentTarget.style.background = 'rgba(212,160,23,0.18)';
                  }}
                  onClick={() => { onChange(opt); setOpen(false); }}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '4px', padding: '10px 12px', color: '#f0eeea',
  fontSize: '12px', fontFamily: "'Montserrat',sans-serif",
  outline: 'none', transition: 'border .2s',
};

/** Image URL / path / Cloudinary upload. Pass onUploadFile to store on Cloudinary instead of a data URL. */
export function ImageSourceField({
  label,
  hint,
  value,
  onChange,
  error,
  onUploadFile,
  clearLabel = 'Clear',
}) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const stored = typeof value === 'string' ? value : '';
  const isDataUrl = stored.startsWith('data:image/');

  const pickFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      emitAdminNotice('Choose an image file (PNG, JPG, WebP, etc.).');
      return;
    }
    if (file.size > IMAGE_UPLOAD_BYTES_MAX) {
      emitAdminNotice(`That file is about ${Math.round(file.size / 1024)} KB. Use under ~${Math.round(IMAGE_UPLOAD_BYTES_MAX / 1024)} KB, or paste a hosted image URL.`);
      return;
    }

    if (typeof onUploadFile === 'function') {
      setUploading(true);
      try {
        const url = await onUploadFile(file);
        if (typeof url === 'string' && url.trim()) onChange(url.trim());
      } catch (err) {
        emitAdminNotice(err?.payload?.message || err?.message || 'Image upload failed.');
      } finally {
        setUploading(false);
      }
      return;
    }

    const rd = new FileReader();
    rd.onload = () => {
      if (typeof rd.result === 'string') onChange(rd.result);
    };
    rd.readAsDataURL(file);
  };

  return (
    <Field label={label} hint={hint}>
      {stored && !isDataUrl ? (
        <div style={{ marginBottom: '10px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', maxWidth: 'min(280px, 100%)', background: '#fff', padding: '10px', display: 'inline-flex' }}>
          <img src={stored} alt="" style={{ display: 'block', maxWidth: '100%', height: 'auto', maxHeight: '80px', objectFit: 'contain' }} />
        </div>
      ) : null}
      <Input
        value={isDataUrl ? '' : stored}
        onChange={onChange}
        placeholder={uploading ? 'Uploading…' : (isDataUrl ? '(Local upload — re-upload to Cloudinary)' : 'https://… or upload')}
        disabled={uploading}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px', alignItems: 'center' }}>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={pickFile} />
        <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()} style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          color: '#f0eeea',
          padding: '8px 14px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: uploading ? 'wait' : 'pointer',
          opacity: uploading ? 0.6 : 1,
        }}
        >{uploading ? 'Uploading…' : (onUploadFile ? 'Upload to Cloudinary' : 'Upload image')}</button>
        <button type="button" disabled={uploading} onClick={() => onChange('')} style={{
          background: 'transparent',
          border: '1px dashed rgba(255,255,255,0.2)',
          color: 'rgba(240,238,234,0.55)',
          padding: '8px 14px',
          borderRadius: '4px',
          fontSize: '11px',
          cursor: 'pointer',
        }}
        >{clearLabel}</button>
        {isDataUrl ? (
          <span style={{ fontSize: '10px', color: '#f87171', flex: '1 1 100%' }}>
            This is a local data URL and will not be saved to the database. Re-upload so it goes to Cloudinary.
          </span>
        ) : null}
      </div>
      <ErrorMsg msg={error} />
    </Field>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={inputStyle}
      onFocus={e => e.target.style.borderColor = '#D4A017'}
      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
      {...rest}
    />
  );
}

export function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
      onFocus={e => e.target.style.borderColor = '#D4A017'}
      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
    />
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <div onClick={() => onChange(!checked)} style={{
        width: '40px', height: '22px', borderRadius: '11px',
        background: checked ? '#D4A017' : 'rgba(255,255,255,0.10)',
        position: 'relative', transition: 'background .2s', flexShrink: 0,
        cursor: 'pointer',
      }}>
        <div style={{
          position: 'absolute', top: '3px', left: checked ? '21px' : '3px',
          width: '16px', height: '16px', borderRadius: '50%',
          background: '#fff', transition: 'left .2s',
        }}></div>
      </div>
      <span style={{ fontSize: '11px', color: 'rgba(240,238,234,0.60)' }}>{label}</span>
    </label>
  );
}

export function Card({ children, title }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '24px', marginBottom: '20px' }}>
      {title && <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#D4A017', marginBottom: '18px' }}>{title}</h3>}
      {children}
    </div>
  );
}

export function AddButton({ onClick, label }) {
  return (
    <button type="button" onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      background: 'transparent', border: '1px dashed rgba(255,255,255,0.15)',
      borderRadius: '4px', padding: '10px 16px',
      color: 'rgba(240,238,234,0.40)', fontSize: '11px', fontWeight: 600,
      cursor: 'pointer', transition: '.2s', width: '100%', justifyContent: 'center',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A017'; e.currentTarget.style.color = '#D4A017'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(240,238,234,0.40)'; }}
    >
      <PlusIcon style={{ width: 14, height: 14 }} aria-hidden />
      {label}
    </button>
  );
}

export function RemoveButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} aria-label="Remove" style={{
      background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.20)',
      color: '#f87171', borderRadius: '4px', padding: '4px 10px',
      fontSize: '10px', cursor: 'pointer', transition: '.2s', flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.20)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.10)'}
    >
      <XMarkIcon style={{ width: 14, height: 14 }} aria-hidden />
    </button>
  );
}

export function PageWrapper({ children }) {
  return (
    <div style={{ padding: '32px', overflowY: 'auto', flex: 1, color: '#f0eeea' }}>
      {children}
    </div>
  );
}

export function ErrorMsg({ msg }) {
  if (!msg) return null;
  return <p style={{ fontSize: '10px', color: '#f87171', marginTop: '4px' }}>{msg}</p>;
}
