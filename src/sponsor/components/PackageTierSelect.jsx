import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function displayLine(p) {
  return `${p.badge} — ${p.price} ${p.currency}`;
}

/**
 * Width-constrained sponsorship tier picker — avoids OS native menus that spill past narrow modals.
 */
export default function PackageTierSelect({
  packages,
  value,
  onChange,
  disabled,
  triggerId,
}) {
  const listId = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [listPos, setListPos] = useState(null);

  const selected = packages.find((p) => String(p.id) === String(value));
  const summary = selected ? displayLine(selected) : 'Choose a package';

  useLayoutEffect(() => {
    if (!open || !rootRef.current) {
      setListPos(null);
      return undefined;
    }

    function update() {
      const trigger = rootRef.current?.querySelector('[data-tier-trigger]');
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const gutter = 8;
      const maxH = Math.max(140, Math.min(240, window.innerHeight - rect.bottom - gutter));
      setListPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        maxHeight: maxH,
      });
    }

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function closeOutside(e) {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (rootRef.current?.contains(t)) return;
      if (t.closest('[data-tier-list-portal]')) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', closeOutside);
    return () => document.removeEventListener('mousedown', closeOutside);
  }, [open]);

  return (
    <div ref={rootRef} style={{ width: '100%', minWidth: 0 }}>
      <button
        id={triggerId}
        type="button"
        data-tier-trigger
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => !disabled && setOpen((x) => !x)}
        className="pkg-modal-tier-trigger"
      >
        <span className="pkg-modal-tier-trigger-text">{summary}</span>
        <ChevronDownIcon style={{ width: 18, height: 18, flexShrink: 0, opacity: open ? 0.9 : 0.55, transform: open ? 'rotate(180deg)' : 'none', transition: '.2s' }} aria-hidden />
      </button>
      {open && listPos
        ? createPortal(
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={triggerId}
            data-tier-list-portal
            style={{
              position: 'fixed',
              zIndex: 100060,
              top: listPos.top,
              left: listPos.left,
              width: listPos.width,
              maxHeight: listPos.maxHeight,
              overflowY: 'auto',
              overflowX: 'hidden',
              margin: 0,
              padding: '4px 0',
              listStyle: 'none',
              background: 'var(--white)',
              border: '1px solid rgba(15,15,15,0.14)',
              borderRadius: '4px',
              boxSizing: 'border-box',
              boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
              overscrollBehavior: 'contain',
            }}
          >
            {packages.map((p) => {
              const idStr = String(p.id);
              const sel = String(value) === idStr;
              const line = displayLine(p);
              return (
                <li key={idStr} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={sel}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      textAlign: 'left',
                      padding: '10px 12px',
                      fontSize: '12px',
                      fontFamily: "'Montserrat',sans-serif",
                      lineHeight: 1.35,
                      fontWeight: sel ? 600 : 500,
                      color: 'var(--lt)',
                      background: sel ? 'color-mix(in srgb, var(--gold) 14%, transparent)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                    }}
                    onMouseEnter={(e) => {
                      if (!sel) e.currentTarget.style.background = 'rgba(15,15,15,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = sel ? 'color-mix(in srgb, var(--gold) 14%, transparent)' : 'transparent';
                    }}
                    onClick={() => {
                      onChange(idStr);
                      setOpen(false);
                    }}
                  >
                    {line}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )
        : null}
    </div>
  );
}
