import { useEffect, useState } from 'react';
import { useSite } from '../../store/SiteContext';
import { z } from 'zod';
import { PartnerSchema } from '../../store/schema';
import { AdminHeader, PageWrapper, Field, Input, ImageSourceField, Card, AddButton, RemoveButton } from './AdminUI';
import { emitAdminNotice, parseApiSaveError } from '../../utils/adminNotice';
import { uploadImageToCloudinary } from '../../utils/uploadImage';

export default function AdminPartners() {
  const { data, updateSection, adminToken } = useSite();
  const [partners, setPartners] = useState(data.partners);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPartners(data.partners);
  }, [data.partners]);

  const update = (i, key, val) => {
    setPartners((p) => p.map((x, idx) => (idx === i ? { ...x, [key]: val } : x)));
    setSaved(false);
  };
  const add = () => {
    setPartners((p) => [...p, { id: Date.now().toString(), name: '', logoUrl: '' }]);
    setSaved(false);
  };
  const remove = (i) => {
    setPartners((p) => p.filter((_, idx) => idx !== i));
    setSaved(false);
  };

  const uploadLogo = async (file) => {
    if (!adminToken) {
      emitAdminNotice('Sign in to the admin dashboard before uploading logos.');
      throw new Error('UNAUTHORIZED');
    }
    return uploadImageToCloudinary(file, adminToken, { folder: 'dtw2026/partners' });
  };

  const save = async () => {
    const withDataUrls = partners.filter((p) => String(p.logoUrl ?? '').startsWith('data:'));
    if (withDataUrls.length > 0) {
      emitAdminNotice('Some logos are still local uploads. Re-upload them with “Upload to Cloudinary” so they can be saved to the database.');
      return;
    }

    const cleaned = partners
      .map((p) => ({
        id: String(p.id ?? Date.now()),
        name: String(p.name ?? '').trim(),
        logoUrl: String(p.logoUrl ?? '').trim(),
      }))
      .filter((p) => p.name.length > 0 || p.logoUrl.length > 0)
      .map((p) => ({
        ...p,
        name: p.name || 'Partner',
      }));

    const parsed = z.array(PartnerSchema).safeParse(cleaned);
    if (!parsed.success) {
      emitAdminNotice('Partners contain invalid entries. Add a name and/or logo for each partner.');
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
      <AdminHeader title="Partners Strip" subtitle="Logos upload to Cloudinary and the URL is stored in the database" onSave={save} saved={saved} />
      <PageWrapper>
        <Card title="Partner Logos">
          <p style={{ fontSize: '11px', color: 'rgba(240,238,234,0.40)', marginBottom: '16px' }}>
            Upload logos to Cloudinary (or paste an existing HTTPS URL). Only the Cloudinary/CDN URL is saved in the database — that is what the Official Partners strip on /sponsor displays.
          </p>
          {partners.map((p, i) => (
            <div key={p.id} style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', padding: '16px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <RemoveButton onClick={() => remove(i)} />
              </div>
              <Field label="Partner name (alt text / fallback)">
                <Input value={p.name} onChange={(v) => update(i, 'name', v)} placeholder="e.g. ICT Chamber" />
              </Field>
              <ImageSourceField
                label="Logo image"
                hint="Upload to Cloudinary, or paste an HTTPS URL. Leave empty to show the name as text."
                value={p.logoUrl || ''}
                onChange={(v) => update(i, 'logoUrl', v)}
                onUploadFile={uploadLogo}
                clearLabel="Remove logo"
              />
            </div>
          ))}
          <AddButton onClick={add} label="Add Partner" />
        </Card>
      </PageWrapper>
    </>
  );
}
