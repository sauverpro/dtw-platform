import { z } from 'zod';

export const HeroStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const HeroSchema = z.object({
  /** URL, site path (/file.jpg), or data URL from admin upload until Cloudinary. */
  backgroundImage: z.string(),
  badge: z.string().min(1),
  titleLine1: z.string().min(1),
  titleLine2: z.string().min(1),
  titleLine3: z.string().min(1),
  subtitle: z.string().min(1),
  ctaPrimary: z.string().min(1),
  ctaSecondary: z.string().min(1),
  stats: z.array(HeroStatSchema),
});

export const PartnerSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  /** HTTPS/CDN (Cloudinary) URL. Empty = show name text. Data URLs are rejected. */
  logoUrl: z
    .string()
    .optional()
    .default('')
    .refine((v) => !String(v).startsWith('data:'), {
      message: 'Logo must be a Cloudinary/CDN URL, not a local data upload',
    }),
});

export const AboutDateSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const AboutSchema = z.object({
  eventDate: z.string(),
  location: z.string(),
  venue: z.string(),
  /** Full image URL or path used in the About section left visual (leave empty for default venue photo). */
  visualImage: z.string(),
  paragraph1: z.string().min(1),
  paragraph2: z.string().min(1),
  bullets: z.array(z.string().min(1)),
  dates: z.array(AboutDateSchema),
});

export const WhyItemSchema = z.object({
  id: z.string(),
  number: z.string(),
  iconType: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const WhyStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const WhySchema = z.object({
  description: z.string().min(1),
  items: z.array(WhyItemSchema),
  stats: z.array(WhyStatSchema),
});

export const PackageBenefitSchema = z.string().min(1);

export const PackageSchema = z.object({
  id: z.string(),
  badge: z.string().min(1),
  price: z.string().min(1),
  currency: z.string(),
  /** Remaining sponsorship slots shown with people icon on the site. */
  slots: z.number().int().min(0),
  featured: z.boolean(),
  benefits: z.array(PackageBenefitSchema),
  ctaText: z.string().min(1),
});

export const CtaSchema = z.object({
  label: z.string().min(1),
  /** Large faint watermark behind the section (e.g. "DTW 2026"). */
  backgroundWatermark: z.string().min(1).max(120),
  title: z.string().min(1),
  titleEmphasis: z.string().min(1),
  subtitle: z.string().min(1),
  primaryCta: z.string().min(1),
  primaryHref: z.string(),
  secondaryCta: z.string().min(1),
  secondaryHref: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
});

export const FooterLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string(),
});

export const FooterColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(FooterLinkSchema),
});

export const FooterSchema = z.object({
  tagline: z.string().min(1),
  socials: z.array(z.object({ label: z.string(), href: z.string() })),
  columns: z.array(FooterColumnSchema),
  copyright: z.string().min(1),
  madeIn: z.string().min(1),
});

export const SiteDataSchema = z.object({
  hero: HeroSchema,
  partners: z.array(PartnerSchema),
  about: AboutSchema,
  why: WhySchema,
  packages: z.array(PackageSchema),
  cta: CtaSchema,
  footer: FooterSchema,
});
