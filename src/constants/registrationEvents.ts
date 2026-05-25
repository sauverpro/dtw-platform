export const REGISTRATION_EVENTS = [
  "Northern Province Digital Innovation Forum",
  "Southern Province Digital Innovation Forum",
  "Western Province Digital Trade Forum",
  "Eastern Province Smart Economy Forum",
  "Digital Business Summit 2026",
] as const;

export type RegistrationEvent = (typeof REGISTRATION_EVENTS)[number];
