import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { CtaSchema } from '../../store/schema';
import { AdminHeader, PageWrapper, Field, Input, Textarea, Card, ErrorMsg } from './AdminUI';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';

export default function AdminCta() {
  const { data, updateSection } = useSite();
  const [form, setForm] = useState(data.cta);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(data.cta);
  }, [data.cta]);

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setSaved(false); };

  const save = async () => {
    const result = CtaSchema.safeParse(form);
    if (!result.success) {
      const errs = {};
      result.error.issues.forEach(issue => { errs[issue.path.join('.')] = issue.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await updateSection('cta', result.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      emitAdminNotice(parseApiSaveError(err));
    }
  };

  return (
    <>
      <AdminHeader title="CTA Section" subtitle="Edit the call-to-action section" onSave={save} saved={saved} />
      <PageWrapper>
        <Card title="Content">
          <Field
            label="Background watermark"
            hint="Large faint words centered behind this section (shown on the public site)."
          >
            <Input value={form.backgroundWatermark} onChange={v => set('backgroundWatermark', v)} placeholder="DTW 2026" />
            <ErrorMsg msg={errors.backgroundWatermark} />
          </Field>
          <Field label="Section Label"><Input value={form.label} onChange={v => set('label', v)} /><ErrorMsg msg={errors.label} /></Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Title (before emphasis)"><Input value={form.title} onChange={v => set('title', v)} /><ErrorMsg msg={errors.title} /></Field>
            <Field label="Title Emphasis (gold italic)"><Input value={form.titleEmphasis} onChange={v => set('titleEmphasis', v)} /><ErrorMsg msg={errors.titleEmphasis} /></Field>
          </div>
          <Field label="Subtitle">
            <Textarea value={form.subtitle} onChange={v => set('subtitle', v)} rows={3} />
            <ErrorMsg msg={errors.subtitle} />
          </Field>
        </Card>

        <Card title="Buttons">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Primary CTA Text"><Input value={form.primaryCta} onChange={v => set('primaryCta', v)} /></Field>
            <Field label="Primary CTA Href"><Input value={form.primaryHref} onChange={v => set('primaryHref', v)} placeholder="mailto:..." /></Field>
            <Field label="Secondary CTA Text"><Input value={form.secondaryCta} onChange={v => set('secondaryCta', v)} /></Field>
            <Field label="Secondary CTA Href"><Input value={form.secondaryHref} onChange={v => set('secondaryHref', v)} placeholder="tel:..." /></Field>
          </div>
        </Card>

        <Card title="Contact Info">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Email">
              <Input value={form.contactEmail} onChange={v => set('contactEmail', v)} type="email" />
              <ErrorMsg msg={errors.contactEmail} />
            </Field>
            <Field label="Phone"><Input value={form.contactPhone} onChange={v => set('contactPhone', v)} /></Field>
          </div>
        </Card>
      </PageWrapper>
    </>
  );
}
