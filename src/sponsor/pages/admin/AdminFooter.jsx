import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { FooterSchema } from '../../store/schema';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';
import { AdminHeader, PageWrapper, Field, Input, Textarea, Card, AddButton, RemoveButton } from './AdminUI';

export default function AdminFooter() {
  const { data, updateSection } = useSite();
  const [form, setForm] = useState(data.footer);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(data.footer);
  }, [data.footer]);

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false); };

  const setSocial = (i, key, val) => {
    setForm(f => ({ ...f, socials: f.socials.map((s, idx) => idx === i ? { ...s, [key]: val } : s) }));
    setSaved(false);
  };
  const addSocial = () => { setForm(f => ({ ...f, socials: [...f.socials, { label: '', href: '#' }] })); setSaved(false); };
  const removeSocial = (i) => { setForm(f => ({ ...f, socials: f.socials.filter((_, idx) => idx !== i) })); setSaved(false); };

  const setColTitle = (ci, val) => {
    setForm(f => ({ ...f, columns: f.columns.map((c, idx) => idx === ci ? { ...c, title: val } : c) }));
    setSaved(false);
  };
  const setLink = (ci, li, key, val) => {
    setForm(f => ({ ...f, columns: f.columns.map((c, cIdx) => cIdx === ci ? { ...c, links: c.links.map((l, lIdx) => lIdx === li ? { ...l, [key]: val } : l) } : c) }));
    setSaved(false);
  };
  const addLink = (ci) => {
    setForm(f => ({ ...f, columns: f.columns.map((c, idx) => idx === ci ? { ...c, links: [...c.links, { label: '', href: '#' }] } : c) }));
    setSaved(false);
  };
  const removeLink = (ci, li) => {
    setForm(f => ({ ...f, columns: f.columns.map((c, idx) => idx === ci ? { ...c, links: c.links.filter((_, lIdx) => lIdx !== li) } : c) }));
    setSaved(false);
  };
  const addColumn = () => {
    setForm(f => ({ ...f, columns: [...f.columns, { title: 'New Column', links: [] }] }));
    setSaved(false);
  };
  const removeColumn = (ci) => {
    setForm(f => ({ ...f, columns: f.columns.filter((_, idx) => idx !== ci) }));
    setSaved(false);
  };

  const save = async () => {
    const cleaned = {
      ...form,
      socials: form.socials
        .map((s) => ({ label: String(s.label ?? '').trim(), href: String(s.href ?? '').trim() || '#' }))
        .filter((s) => s.label.length > 0),
      columns: form.columns
        .map((c) => ({
          title: String(c.title ?? '').trim(),
          links: (Array.isArray(c.links) ? c.links : [])
            .map((l) => ({ label: String(l.label ?? '').trim(), href: String(l.href ?? '').trim() || '#' }))
            .filter((l) => l.label.length > 0),
        }))
        .filter((c) => c.title.length > 0),
    };

    const parsed = FooterSchema.safeParse(cleaned);
    if (!parsed.success) {
      emitAdminNotice('Footer has empty required fields (column titles, link labels, or brand text).');
      return;
    }

    try {
      await updateSection('footer', parsed.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      emitAdminNotice(parseApiSaveError(err));
    }
  };

  return (
    <>
      <AdminHeader title="Footer" subtitle="Edit footer content, links and social media" onSave={save} saved={saved} />
      <PageWrapper>
        <Card title="Brand Info">
          <Field label="Tagline">
            <Textarea value={form.tagline} onChange={v => set('tagline', v)} rows={2} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Copyright Text"><Input value={form.copyright} onChange={v => set('copyright', v)} /></Field>
            <Field label="Made In Text"><Input value={form.madeIn} onChange={v => set('madeIn', v)} /></Field>
          </div>
        </Card>

        <Card title="Social Links">
          {form.socials.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'end' }}>
              <Field label="Label"><Input value={s.label} onChange={v => setSocial(i, 'label', v)} placeholder="𝕏" /></Field>
              <Field label="Href"><Input value={s.href} onChange={v => setSocial(i, 'href', v)} placeholder="https://..." /></Field>
              <RemoveButton onClick={() => removeSocial(i)} />
            </div>
          ))}
          <AddButton onClick={addSocial} label="Add Social Link" />
        </Card>

        {form.columns.map((col, ci) => (
          <Card key={ci} title={`Column: ${col.title}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '14px' }}>
              <Field label="Column Title" style={{ flex: 1, marginBottom: 0, marginRight: '12px' }}>
                <Input value={col.title} onChange={v => setColTitle(ci, v)} />
              </Field>
              <RemoveButton onClick={() => removeColumn(ci)} />
            </div>
            {col.links.map((link, li) => (
              <div key={li} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'end' }}>
                <Field label="Label"><Input value={link.label} onChange={v => setLink(ci, li, 'label', v)} /></Field>
                <Field label="Href"><Input value={link.href} onChange={v => setLink(ci, li, 'href', v)} /></Field>
                <RemoveButton onClick={() => removeLink(ci, li)} />
              </div>
            ))}
            <AddButton onClick={() => addLink(ci)} label="Add Link" />
          </Card>
        ))}
        <AddButton onClick={addColumn} label="Add Column" />
      </PageWrapper>
    </>
  );
}
