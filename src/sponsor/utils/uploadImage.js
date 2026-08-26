import { API_BASE_URL } from '../constants/api';

/**
 * Upload an image file to Cloudinary via the authenticated backend endpoint.
 * Returns the permanent HTTPS URL that should be stored in the database.
 */
export async function uploadImageToCloudinary(file, adminToken, { folder } = {}) {
  if (!adminToken) {
    const err = new Error('UNAUTHORIZED');
    err.status = 401;
    throw err;
  }

  const body = new FormData();
  body.append('file', file);
  if (folder) body.append('folder', folder);

  const res = await fetch(`${API_BASE_URL}/uploads/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${adminToken}` },
    body,
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload?.message || payload?.error || 'UPLOAD_FAILED');
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  if (!payload?.url) {
    throw new Error('Upload succeeded but no URL was returned.');
  }

  return payload.url;
}
