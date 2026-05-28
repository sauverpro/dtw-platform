export const REGISTRATION_EVENTS = [
  {
    id: "northern-forum",
    title: "Northern Province Digital Innovation Forum",
    date: "Mon, 7 Dec 2026",
    location: "Northern Province",
    focus: "AgriTech, Tourism Tech & SME Growth",
    activities: "Discussions, tech demos, youth digital jobs & business partnerships",
  },
  {
    id: "southern-forum",
    title: "Southern Province Digital Innovation Forum",
    date: "Tue, 8 Dec 2026",
    location: "Southern Province",
    focus: "EdTech, Creative Economy & SME Growth",
    activities: "Discussions, tech demos, youth digital jobs & business partnerships",
  },
  {
    id: "western-forum",
    title: "Western Province Digital Trade Forum",
    date: "Wed, 9 Dec 2026",
    location: "Western Province",
    focus: "Digital Trade & SME Growth",
    activities: "Discussions, tech demos, youth digital jobs & business partnerships",
  },
  {
    id: "eastern-forum",
    title: "Eastern Province Smart Economy Forum",
    date: "Thu, 10 Dec 2026",
    location: "Eastern Province",
    focus: "Smart Agriculture, Logistics & SME Growth",
    activities: "Discussions, tech demos, youth digital jobs & business partnerships",
  },
  {
    id: "dbs",
    title: "Digital Business Summit 2026",
    date: "Fri, 11 Dec 2026",
    location: "Kigali Convention Centre",
    focus: "National summit & policy dialogue",
    activities: "Exhibitions, business partnerships, investment forums, policy dialogue",
    highlight: true,
  },
] as const;

export type RegistrationEvent = (typeof REGISTRATION_EVENTS)[number];
