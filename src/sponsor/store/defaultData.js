import { DEFAULT_SITE_IMAGE } from '../constants/mediaDefaults';

export const defaultData = {
  hero: {
    backgroundImage: DEFAULT_SITE_IMAGE,
    badge: 'Digital Transformation Week · Kigali, Rwanda · 2026',
    titleLine1: 'Shape the',
    titleLine2: 'Digital Future',
    titleLine3: 'of Africa.',
    subtitle: "Rwanda's premier technology event. Partner with ICT Chamber to connect, inspire, and accelerate innovation across the continent.",
    ctaPrimary: 'View Packages',
    ctaSecondary: 'Learn More',
    stats: [
      { value: '5,000+', label: 'Attendees' },
      { value: '50+', label: 'Speakers' },
      { value: '30+', label: 'Countries' },
      { value: '3', label: 'Days' },
    ],
  },
  partners: [
    { id: '1', name: 'ICT Chamber Rwanda', logoUrl: '' },
    { id: '2', name: 'MINICT', logoUrl: '' },
    { id: '3', name: 'RISA', logoUrl: '' },
    { id: '4', name: 'Rwanda PSF', logoUrl: '' },
    { id: '5', name: 'Smart Rwanda', logoUrl: '' },
    { id: '6', name: 'Ministry of ICT', logoUrl: '' },
  ],
  about: {
    eventDate: 'Oct 2026',
    location: 'Kigali, RW',
    venue: 'Rwanda Convention Centre',
    visualImage: DEFAULT_SITE_IMAGE,
    paragraph1: "Digital Transformation Week (DTW) 2026 is Rwanda's most impactful technology event, convening government leaders, tech innovators, investors, and development partners to accelerate Rwanda's digital transformation agenda.",
    paragraph2: "Organized by the ICT Chamber under the Rwanda Private Sector Federation, in partnership with MINICT and RISA, DTW2026 will showcase Rwanda's growing position as a continental technology hub.",
    bullets: [
      'Flagship conferences, masterclasses & panel discussions',
      'Tech exhibitions and product launches',
      'Investor connect & startup pitching sessions',
      'Government & private sector policy dialogues',
      'Networking gala & awards ceremony',
    ],
    dates: [
      { value: 'Oct 2026', label: 'Event Date' },
      { value: 'Kigali, RW', label: 'Location' },
      { value: '3 Days', label: 'Duration' },
    ],
  },
  why: {
    description: "Be at the center of Africa's digital transformation. Your brand where decisions are made and futures are built. Join 5,000+ attendees across 30 countries over three transformative days.",
    items: [
      { id: '1', number: '01', iconType: 'eye', title: 'Unmatched Brand Visibility', description: "Reach 5,000+ tech leaders, policymakers and investors at Rwanda's biggest technology gathering." },
      { id: '2', number: '02', iconType: 'users', title: 'Strategic Networking', description: "Exclusive access to C-suite executives, government officials and Africa's top entrepreneurs." },
      { id: '3', number: '03', iconType: 'globe', title: 'Pan-African Reach', description: "Connect with delegations from 30+ countries. Lead Africa's growing digital economy narrative." },
      { id: '4', number: '04', iconType: 'message', title: 'Thought Leadership', description: 'Speaking slots, panel seats and media coverage to position your brand as a digital pioneer.' },
      { id: '5', number: '05', iconType: 'dollar', title: 'Business Development', description: 'Generate qualified leads and open new markets through curated business matchmaking sessions.' },
      { id: '6', number: '06', iconType: 'heart', title: 'Social Impact & CSR', description: "Align with Rwanda's national digital agenda and demonstrate commitment to a knowledge-based economy." },
    ],
    stats: [
      { value: '5K+', label: 'Expected Attendees' },
      { value: '30+', label: 'Countries' },
      { value: '50+', label: 'Speakers' },
      { value: '3', label: 'Days' },
    ],
  },
  packages: [
    {
      id: '1', badge: 'Tech Startups', price: '3M', currency: 'RWF', slots: 15,
      featured: false, ctaText: 'Get Started',
      benefits: ['Logo on event materials & website','2 complimentary event passes','Exhibition booth (standard)','Social media mention ×3','Networking session access'],
    },
    {
      id: '2', badge: 'Tech SMEs', price: '5M', currency: 'RWF', slots: 10,
      featured: false, ctaText: 'Get Started',
      benefits: ['Prominent logo (all materials)','5 complimentary event passes','Exhibition booth (premium)','Social media campaign ×6','1 panel discussion seat','Post-event report & analytics'],
    },
    {
      id: '3', badge: 'Tech Corporate', price: '10M', currency: 'RWF', slots: 6,
      featured: true, ctaText: 'Get Started',
      benefits: ['Premier logo on all platforms & stage','10 complimentary event passes','Premium corner exhibition booth','Speaking slot (15 mins)','Full social media campaign','VIP dinner access','Media interview opportunity'],
    },
    {
      id: '4', badge: 'Government Institutions', price: '15M', currency: 'RWF', slots: 4,
      featured: false, ctaText: 'Get Started',
      benefits: ['Top-tier logo on materials & LED screens','15 passes + VIP lounge access','Dedicated exhibition zone','Keynote speaking (20 mins)','Session room naming rights','Exclusive press conference slot','1-year ICT Chamber partnership'],
    },
    {
      id: '5', badge: 'Development Partners', price: '20M', currency: 'RWF', slots: 2,
      featured: true, ctaText: 'Claim Package',
      benefits: ['Headline sponsor — branding everywhere','20 passes + exclusive VIP experience','Title sponsorship of a major session','Keynote + fireside chat feature','Co-branded content production','Press release co-authorship','Awards ceremony naming rights','Premium post-event report'],
    },
    {
      id: '6', badge: 'Non-Tech Corporate', price: '15M', currency: 'RWF', slots: 5,
      featured: false, ctaText: 'Get Started',
      benefits: ['Strategic logo placement across venues','15 complimentary passes','Branded activation space','Keynote speaking opportunity','Digital ecosystem exposure','Exclusive sector networking events','Innovation Lab naming rights'],
    },
  ],
  cta: {
    label: 'Ready to Partner?',
    backgroundWatermark: 'DTW 2026',
    title: 'Build the',
    titleEmphasis: 'Future',
    subtitle: "Don't miss your opportunity to be part of Rwanda's biggest digital transformation event. Sponsorship slots are limited — secure yours today.",
    primaryCta: 'Secure Your Sponsorship',
    primaryHref: 'mailto:sponsorship@ictchamber.rw',
    secondaryCta: 'Call Us Now',
    secondaryHref: 'tel:+250788000000',
    contactEmail: 'sponsorship@ictchamber.rw',
    contactPhone: '+250 788 000 000',
  },
  footer: {
    tagline: 'The umbrella body for ICT companies in Rwanda under the Rwanda Private Sector Federation. Connect. Grow. Expand.',
    socials: [
      { label: '𝕏', href: '#' },
      { label: 'in', href: '#' },
      { label: 'f', href: '#' },
      { label: '▶', href: '#' },
    ],
    columns: [
      {
        title: 'Event',
        links: [
          { label: 'About DTW2026', href: '#about' },
          { label: 'Why Sponsor', href: '#why' },
          { label: 'Packages', href: '#packages' },
          { label: 'Contact', href: '#cta' },
        ],
      },
      {
        title: 'Partners',
        links: [
          { label: 'ICT Chamber', href: '#' },
          { label: 'MINICT', href: '#' },
          { label: 'RISA', href: '#' },
          { label: 'Rwanda PSF', href: '#' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { label: 'info@ictchamber.rw', href: 'mailto:info@ictchamber.rw' },
          { label: 'sponsorship@ictchamber.rw', href: 'mailto:sponsorship@ictchamber.rw' },
          { label: 'Kigali, Rwanda', href: '#' },
          { label: 'KG 7 Ave, Norrsken House', href: '#' },
        ],
      },
    ],
    copyright: '© 2026 ICT Chamber Rwanda. All rights reserved. Digital Transformation Week 2026.',
    madeIn: 'Made with ♥ in Kigali, Rwanda.',
  },
};
