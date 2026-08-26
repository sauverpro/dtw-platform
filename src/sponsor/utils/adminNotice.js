export function emitAdminNotice(message, tone = 'error') {
  window.dispatchEvent(new CustomEvent('dtw-admin-notice', { detail: { message, tone } }));
}

export function parseApiSaveError(err) {
  if (err?.status === 401) return 'Session expired or login failed. Please sign in again.';
  if (err?.status === 409) return 'Another admin changed content. Latest data was loaded.';
  if (err?.status === 400) {
    const issues = err?.payload?.issues;
    if (Array.isArray(issues) && issues.length > 0) {
      const first = issues[0];
      if (first?.path && first?.message) {
        return `Validation failed: ${first.path} - ${first.message}`;
      }
    }
    const fieldErrors = err?.payload?.details?.fieldErrors;
    if (fieldErrors && typeof fieldErrors === 'object') {
      const firstKey = Object.keys(fieldErrors)[0];
      const firstMsg = Array.isArray(fieldErrors[firstKey]) ? fieldErrors[firstKey][0] : null;
      if (firstMsg) return `Validation failed: ${firstKey} - ${firstMsg}`;
    }
    return 'Validation failed. Please check required fields.';
  }
  return 'Could not save. Check login/API/DB status.';
}
