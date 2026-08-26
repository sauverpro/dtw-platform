import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { AboutSchema } from '../../store/schema';
import { AdminHeader, PageWrapper, Field, Input, ImageSourceField, Textarea, Card, AddButton, RemoveButton, ErrorMsg } from './AdminUI';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';

export default function AdminAbout() {
  const { data, updateSection } = useSite();
  const [form, setForm] = useState(data.about);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(data.about);
  }, [data.about]);

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false); };
  const setBullet = (i, val) => { setForm(f => ({ ...f, bullets: f.bullets.map((b, idx) => idx === i ? val : b) })); setSaved(false); };
  const addBullet = () => { setForm(f => ({ ...f, bullets: [...f.bullets, ''] })); setSaved(false); };
  const removeBullet = (i) => { setForm(f => ({ ...f, bullets: f.bullets.filter((_, idx) => idx !== i) })); setSaved(false); };

  const setDate = (i, key, val) => { setForm(f => ({ ...f, dates: f.dates.map((d, idx) => idx === i ? { ...d, [key]: val } : d) })); setSaved(false); };
  const addDate = () => { setForm(f => ({ ...f, dates: [...f.dates, { value: '', label: '' }] })); setSaved(false); };
  const removeDate = (i) => { setForm(f => ({ ...f, dates: f.dates.filter((_, idx) => idx !== i) })); setSaved(false); };

  const save = async () => {
    const result = AboutSchema.safeParse(form);
    if (!result.success) {
      const errs = {};
      result.error.issues.forEach(issue => { errs[issue.path.join('.')] = issue.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await updateSection('about', result.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      emitAdminNotice(parseApiSaveError(err));
    }
  };

  return (
    <>
      <AdminHeader title="About Section" subtitle="Edit event details and descriptions" onSave={save} saved={saved} />
      <PageWrapper>
        <Card title="Visual Card Info">
          <ImageSourceField
            label="About section image"
            hint="Shows in the left column. HTTPS URL, /file in public, or upload (browser-stored until Cloudinary)."
            value={form.visualImage}
            onChange={v => set('visualImage', v)}
            error={errors.visualImage}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Event Date"><Input value={form.eventDate} onChange={v => set('eventDate', v)} placeholder="Oct 2026" /></Field>
            <Field label="Location"><Input value={form.location} onChange={v => set('location', v)} placeholder="Kigali, RW" /></Field>
            <Field label="Venue"><Input value={form.venue} onChange={v => set('venue', v)} placeholder="Rwanda Convention Centre" /></Field>
          </div>
        </Card>

        <Card title="Description Paragraphs">
          <Field label="Paragraph 1">
            <Textarea value={form.paragraph1} onChange={v => set('paragraph1', v)} rows={3} />
            <ErrorMsg msg={errors.paragraph1} />
          </Field>
          <Field label="Paragraph 2">
            <Textarea value={form.paragraph2} onChange={v => set('paragraph2', v)} rows={3} />
            <ErrorMsg msg={errors.paragraph2} />
          </Field>
        </Card>

        <Card title="Bullet Points">
          {form.bullets.map((b, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Input value={b} onChange={v => setBullet(i, v)} placeholder="Bullet point text" />
              <RemoveButton onClick={() => removeBullet(i)} />
            </div>
          ))}
          <AddButton onClick={addBullet} label="Add Bullet" />
        </Card>

        <Card title="Date Highlights">
          {form.dates.map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'end' }}>
              <Field label="Value"><Input value={d.value} onChange={v => setDate(i, 'value', v)} placeholder="Oct 2026" /></Field>
              <Field label="Label"><Input value={d.label} onChange={v => setDate(i, 'label', v)} placeholder="Event Date" /></Field>
              <RemoveButton onClick={() => removeDate(i)} />
            </div>
          ))}
          <AddButton onClick={addDate} label="Add Date" />
        </Card>
      </PageWrapper>
    </>
  );
}
