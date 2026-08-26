/**
 * The sponsorship section is mounted as a sub-tree of the main site rather than
 * at the domain root, so every absolute link inside it must carry this prefix.
 */
export const SPONSOR_BASE = '/sponsor';
export const SPONSOR_ADMIN_BASE = `${SPONSOR_BASE}/admin`;
