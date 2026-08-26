import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { WhySchema } from '../../store/schema';
import { AdminHeader, PageWrapper, Field, Input, Textarea, Card, AddButton, RemoveButton, AdminSelect } from './AdminUI';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';

const ICON_OPTIONS = ['eye','users','globe','message','dollar','heart','star','zap','shield','award'];

export default function AdminWhy() {
  const { data, updateSection } = useSite();
  const [form, setForm] = useState(data.why);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(data.why);
  }, [data.why]);

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false); };
  const setItem = (i, key, val) => { setForm(f => ({ ...f, items: f.items.map((x, idx) => idx === i ? { ...x, [key]: val } : x) })); setSaved(false); };
  const addItem = () => { setForm(f => ({ ...f, items: [...f.items, { id: Date.now().toString(), number: `0${f.items.length + 1}`, iconType: 'star', title: '', description: '' }] })); setSaved(false); };
  const removeItem = (i) => { setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) })); setSaved(false); };

  const setStat = (i, key, val) => { setForm(f => ({ ...f, stats: f.stats.map((x, idx) => idx === i ? { ...x, [key]: val } : x) })); setSaved(false); };
  const addStat = () => { setForm(f => ({ ...f, stats: [...f.stats, { value: '', label: '' }] })); setSaved(false); };
  const removeStat = (i) => { setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) })); setSaved(false); };

  const save = async () => {
    const cleaned = {
      ...form,
      description: String(form.description ?? '').trim(),
      items: (Array.isArray(form.items) ? form.items : [])
        .map((item) => ({
          ...item,
          id: String(item.id ?? Date.now()),
          number: String(item.number ?? '').trim(),
          iconType: String(item.iconType ?? '').trim(),
          title: String(item.title ?? '').trim(),
          description: String(item.description ?? '').trim(),
        }))
        .filter((item) => item.title.length > 0),
      stats: (Array.isArray(form.stats) ? form.stats : [])
        .map((stat) => ({
          value: String(stat.value ?? '').trim(),
          label: String(stat.label ?? '').trim(),
        }))
        .filter((stat) => stat.value.length > 0 && stat.label.length > 0),
    };

    const parsed = WhySchema.safeParse(cleaned);
    if (!parsed.success) {
      emitAdminNotice('Why Sponsor contains empty required fields. Please complete description, card titles/descriptions, and stat labels/values.');
      return;
    }

    try {
      await updateSection('why', parsed.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      emitAdminNotice(parseApiSaveError(err));
    }
  };

  return (
    <>
      <AdminHeader title="Why Sponsor" subtitle="Edit sponsorship reasons and impact stats" onSave={save} saved={saved} />
      <PageWrapper>
        <Card title="Section Description">
          <Field label="Description Paragraph">
            <Textarea value={form.description} onChange={v => set('description', v)} rows={3} />
          </Field>
        </Card>

        <Card title="Reason Cards">
          {form.items.map((item, i) => (
            <div key={item.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#D4A017' }}>Card #{i + 1}</span>
                <RemoveButton onClick={() => removeItem(i)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <Field label="Number"><Input value={item.number} onChange={v => setItem(i, 'number', v)} placeholder="01" /></Field>
                <Field label="Icon Type">
                  <AdminSelect value={item.iconType} options={ICON_OPTIONS} onChange={(v) => setItem(i, 'iconType', v)} />
                </Field>
                <Field label="Title"><Input value={item.title} onChange={v => setItem(i, 'title', v)} /></Field>
              </div>
              <Field label="Description">
                <Textarea value={item.description} onChange={v => setItem(i, 'description', v)} rows={2} />
              </Field>
            </div>
          ))}
          <AddButton onClick={addItem} label="Add Card" />
        </Card>

        <Card title="Impact Stats">
          {form.stats.map((stat, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'end' }}>
              <Field label="Value"><Input value={stat.value} onChange={v => setStat(i, 'value', v)} placeholder="5K+" /></Field>
              <Field label="Label"><Input value={stat.label} onChange={v => setStat(i, 'label', v)} placeholder="Expected Attendees" /></Field>
              <RemoveButton onClick={() => removeStat(i)} />
            </div>
          ))}
          <AddButton onClick={addStat} label="Add Stat" />
        </Card>
      </PageWrapper>
    </>
  );
}
