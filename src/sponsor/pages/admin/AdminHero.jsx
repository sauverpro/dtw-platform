import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { HeroSchema } from '../../store/schema';
import { AdminHeader, PageWrapper, Field, Input, ImageSourceField, Textarea, Card, AddButton, RemoveButton, ErrorMsg } from './AdminUI';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';

export default function AdminHero() {
  const { data, updateSection } = useSite();
  const [form, setForm] = useState(data.hero);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(data.hero);
  }, [data.hero]);

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false); };

  const setStat = (i, key, val) => {
    const stats = form.stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    setForm(f => ({ ...f, stats }));
    setSaved(false);
  };

  const addStat = () => { setForm(f => ({ ...f, stats: [...f.stats, { value: '', label: '' }] })); setSaved(false); };
  const removeStat = (i) => { setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) })); setSaved(false); };

  const save = async () => {
    const result = HeroSchema.safeParse(form);
    if (!result.success) {
      const errs = {};
      result.error.issues.forEach(issue => { errs[issue.path.join('.')] = issue.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await updateSection('hero', result.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      emitAdminNotice(parseApiSaveError(err));
    }
  };

  return (
    <>
      <AdminHeader title="Hero Section" subtitle="Edit the main hero banner content (image or video)" onSave={save} saved={saved} />
      <PageWrapper>
        <Card title="Background media">
          <ImageSourceField
            label="Hero background"
            hint="HTTPS URL (image/video), path under public/ (e.g. /hero.jpg or /hero.mp4), or upload (saved in browser data until you use Cloudinary)."
            value={form.backgroundImage}
            onChange={v => set('backgroundImage', v)}
            error={errors.backgroundImage}
          />
        </Card>

        <Card title="Badge & Headlines">
          <Field label="Badge Text">
            <Input value={form.badge} onChange={v => set('badge', v)} placeholder="Digital Transformation Week · Kigali, Rwanda · 2026" />
            <ErrorMsg msg={errors.badge} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Title Line 1"><Input value={form.titleLine1} onChange={v => set('titleLine1', v)} /><ErrorMsg msg={errors.titleLine1} /></Field>
            <Field label="Title Line 2 (gold italic)"><Input value={form.titleLine2} onChange={v => set('titleLine2', v)} /><ErrorMsg msg={errors.titleLine2} /></Field>
            <Field label="Title Line 3 (outline)"><Input value={form.titleLine3} onChange={v => set('titleLine3', v)} /><ErrorMsg msg={errors.titleLine3} /></Field>
          </div>
          <Field label="Subtitle">
            <Textarea value={form.subtitle} onChange={v => set('subtitle', v)} rows={2} />
            <ErrorMsg msg={errors.subtitle} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Primary CTA Text"><Input value={form.ctaPrimary} onChange={v => set('ctaPrimary', v)} /></Field>
            <Field label="Secondary CTA Text"><Input value={form.ctaSecondary} onChange={v => set('ctaSecondary', v)} /></Field>
          </div>
        </Card>

        <Card title="Stats Bar">
          {form.stats.map((stat, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'end' }}>
              <Field label={`Value ${i + 1}`}><Input value={stat.value} onChange={v => setStat(i, 'value', v)} placeholder="5,000+" /></Field>
              <Field label={`Label ${i + 1}`}><Input value={stat.label} onChange={v => setStat(i, 'label', v)} placeholder="Attendees" /></Field>
              <RemoveButton onClick={() => removeStat(i)} />
            </div>
          ))}
          <AddButton onClick={addStat} label="Add Stat" />
        </Card>
      </PageWrapper>
    </>
  );
}
