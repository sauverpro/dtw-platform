import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { z } from 'zod';
import { PartnerSchema } from '../../store/schema';
import { AdminHeader, PageWrapper, Field, Input, Card, AddButton, RemoveButton } from './AdminUI';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';

export default function AdminPartners() {
  const { data, updateSection } = useSite();
  const [partners, setPartners] = useState(data.partners);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPartners(data.partners);
  }, [data.partners]);

  const update = (i, val) => { setPartners(p => p.map((x, idx) => idx === i ? { ...x, name: val } : x)); setSaved(false); };
  const add = () => { setPartners(p => [...p, { id: Date.now().toString(), name: '' }]); setSaved(false); };
  const remove = (i) => { setPartners(p => p.filter((_, idx) => idx !== i)); setSaved(false); };

  const save = async () => {
    const cleaned = partners
      .map((p) => ({ id: String(p.id ?? Date.now()), name: String(p.name ?? '').trim() }))
      .filter((p) => p.name.length > 0);

    const parsed = z.array(PartnerSchema).safeParse(cleaned);
    if (!parsed.success) {
      emitAdminNotice('Partners contain invalid entries. Please ensure each partner has a name.');
      return;
    }

    try {
      await updateSection('partners', parsed.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      emitAdminNotice(parseApiSaveError(err));
    }
  };

  return (
    <>
      <AdminHeader title="Partners Strip" subtitle="Manage the scrolling partners ticker" onSave={save} saved={saved} />
      <PageWrapper>
        <Card title="Partner Names">
          <p style={{ fontSize: '11px', color: 'rgba(240,238,234,0.40)', marginBottom: '16px' }}>These names appear in the scrolling ticker strip. They are automatically duplicated for infinite scrolling.</p>
          {partners.map((p, i) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <Input value={p.name} onChange={v => update(i, v)} placeholder="Partner name" />
              <RemoveButton onClick={() => remove(i)} />
            </div>
          ))}
          <AddButton onClick={add} label="Add Partner" />
        </Card>
      </PageWrapper>
    </>
  );
}
