import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { z } from 'zod';
import { PackageSchema } from '../../store/schema';
import { AdminHeader, PageWrapper, Field, Input, Card, AddButton, RemoveButton, Toggle } from './AdminUI';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';

export default function AdminPackages() {
  const { data, updateSection } = useSite();
  const [packages, setPackages] = useState(data.packages);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPackages(data.packages);
  }, [data.packages]);

  const setPkg = (i, key, val) => {
    setPackages(p => p.map((x, idx) => idx === i ? { ...x, [key]: val } : x));
    setSaved(false);
  };
  const setBenefit = (pi, bi, val) => {
    setPackages(p => p.map((x, idx) => idx === pi ? { ...x, benefits: x.benefits.map((b, bIdx) => bIdx === bi ? val : b) } : x));
    setSaved(false);
  };
  const addBenefit = (pi) => {
    setPackages(p => p.map((x, idx) => idx === pi ? { ...x, benefits: [...x.benefits, ''] } : x));
    setSaved(false);
  };
  const removeBenefit = (pi, bi) => {
    setPackages(p => p.map((x, idx) => idx === pi ? { ...x, benefits: x.benefits.filter((_, bIdx) => bIdx !== bi) } : x));
    setSaved(false);
  };
  const addPkg = () => {
    setPackages(p => [...p, { id: Date.now().toString(), badge: 'New Package', price: '0', currency: 'RWF', slots: 10, featured: false, ctaText: 'Get Started', benefits: [] }]);
    setSaved(false);
  };
  const removePkg = (i) => { setPackages(p => p.filter((_, idx) => idx !== i)); setSaved(false); };

  const save = async () => {
    const cleaned = packages
      .map((pkg) => ({
        ...pkg,
        id: String(pkg.id ?? Date.now()),
        badge: String(pkg.badge ?? '').trim(),
        price: String(pkg.price ?? '').trim(),
        currency: String(pkg.currency ?? '').trim(),
        slots: Math.max(0, Number.isFinite(Number(pkg.slots)) ? Math.round(Number(pkg.slots)) : 0),
        ctaText: String(pkg.ctaText ?? '').trim(),
        benefits: (Array.isArray(pkg.benefits) ? pkg.benefits : [])
          .map((b) => String(b ?? '').trim())
          .filter((b) => b.length > 0),
      }))
      .filter((pkg) => pkg.badge.length > 0);

    const parsed = z.array(PackageSchema).safeParse(cleaned);
    if (!parsed.success) {
      emitAdminNotice('Packages contain invalid or empty required fields. Please complete badge, price, CTA text, and at least one benefit.');
      return;
    }

    try {
      await updateSection('packages', parsed.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      emitAdminNotice(parseApiSaveError(err));
    }
  };

  return (
    <>
      <AdminHeader title="Packages" subtitle="Edit sponsorship tiers and pricing" onSave={save} saved={saved} />
      <PageWrapper>
        {packages.map((pkg, i) => (
          <Card key={pkg.id} title={`${pkg.badge} — ${pkg.slots ?? 0} slots`}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
              <RemoveButton onClick={() => removePkg(i)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px', marginBottom: '12px' }}>
              <Field label="Badge (target audience)"><Input value={pkg.badge} onChange={v => setPkg(i, 'badge', v)} /></Field>
              <Field label="Price"><Input value={pkg.price} onChange={v => setPkg(i, 'price', v)} placeholder="10M" /></Field>
              <Field label="Currency"><Input value={pkg.currency} onChange={v => setPkg(i, 'currency', v)} placeholder="RWF" /></Field>
              <Field label="Slots available"><Input type="number" min={0} value={String(pkg.slots ?? 0)} onChange={v => setPkg(i, 'slots', Math.max(0, parseInt(v, 10) || 0))} /></Field>
              <Field label="CTA Button Text"><Input value={pkg.ctaText} onChange={v => setPkg(i, 'ctaText', v)} /></Field>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Toggle checked={pkg.featured} onChange={v => setPkg(i, 'featured', v)} label="Featured package (dark card style)" />
            </div>
            <div>
              <label style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(240,238,234,0.60)', display: 'block', marginBottom: '8px' }}>Benefits</label>
              {pkg.benefits.map((b, bi) => (
                <div key={bi} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <Input value={b} onChange={v => setBenefit(i, bi, v)} placeholder="Benefit description" />
                  <RemoveButton onClick={() => removeBenefit(i, bi)} />
                </div>
              ))}
              <AddButton onClick={() => addBenefit(i)} label="Add Benefit" />
            </div>
          </Card>
        ))}
        <AddButton onClick={addPkg} label="Add Package" />
      </PageWrapper>
    </>
  );
}
