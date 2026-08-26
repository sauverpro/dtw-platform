import { z } from "zod";

const HeroStatSchema = z.object({ value: z.string().min(1), label: z.string().min(1) });
export const HeroSchema = z.object({
  backgroundImage: z.string(),
  badge: z.string().min(1),
  titleLine1: z.string().min(1),
  titleLine2: z.string().min(1),
  titleLine3: z.string().min(1),
  subtitle: z.string().min(1),
  ctaPrimary: z.string().min(1),
  ctaSecondary: z.string().min(1),
  stats: z.array(HeroStatSchema)
});

export const PartnerSchema = z.object({ id: z.string(), name: z.string().min(1) });
const AboutDateSchema = z.object({ value: z.string().min(1), label: z.string().min(1) });
export const AboutSchema = z.object({
  eventDate: z.string(),
  location: z.string(),
  venue: z.string(),
  visualImage: z.string(),
  paragraph1: z.string().min(1),
  paragraph2: z.string().min(1),
  bullets: z.array(z.string().min(1)),
  dates: z.array(AboutDateSchema)
});

const WhyItemSchema = z.object({
  id: z.string(),
  number: z.string(),
  iconType: z.string(),
  title: z.string().min(1),
  description: z.string().min(1)
});
const WhyStatSchema = z.object({ value: z.string().min(1), label: z.string().min(1) });
export const WhySchema = z.object({
  description: z.string().min(1),
  items: z.array(WhyItemSchema),
  stats: z.array(WhyStatSchema)
});

export const PackageSchema = z.object({
  id: z.string(),
  badge: z.string().min(1),
  price: z.string().min(1),
  currency: z.string(),
  slots: z.number().int().min(0),
  featured: z.boolean(),
  benefits: z.array(z.string().min(1)),
  ctaText: z.string().min(1)
});

export const CtaSchema = z.object({
  label: z.string().min(1),
  backgroundWatermark: z.string().min(1).max(120),
  title: z.string().min(1),
  titleEmphasis: z.string().min(1),
  subtitle: z.string().min(1),
  primaryCta: z.string().min(1),
  primaryHref: z.string(),
  secondaryCta: z.string().min(1),
  secondaryHref: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string()
});

const FooterLinkSchema = z.object({ label: z.string().min(1), href: z.string() });
const FooterColumnSchema = z.object({ title: z.string().min(1), links: z.array(FooterLinkSchema) });
export const FooterSchema = z.object({
  tagline: z.string().min(1),
  socials: z.array(z.object({ label: z.string(), href: z.string() })),
  columns: z.array(FooterColumnSchema),
  copyright: z.string().min(1),
  madeIn: z.string().min(1)
});

export const SiteDataSchema = z.object({
  hero: HeroSchema,
  partners: z.array(PartnerSchema),
  about: AboutSchema,
  why: WhySchema,
  packages: z.array(PackageSchema),
  cta: CtaSchema,
  footer: FooterSchema
});

export const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const UpdateSiteContentSchema = z.object({ content: SiteDataSchema, version: z.number().int().positive() });
export const SiteSectionKeySchema = z.enum(["hero", "partners", "about", "why", "packages", "cta", "footer"]);
export const UpdateSiteSectionSchema = z.object({ version: z.number().int().positive(), value: z.unknown() });

export type SiteData = z.infer<typeof SiteDataSchema>;
export type SiteSectionKey = z.infer<typeof SiteSectionKeySchema>;

function sanitizeFooterValue(raw: unknown) {
  const value = typeof raw === "object" && raw !== null ? raw as Record<string, unknown> : {};
  const socials = Array.isArray(value.socials) ? value.socials : [];
  const columns = Array.isArray(value.columns) ? value.columns : [];

  return {
    ...value,
    tagline: String(value.tagline ?? "").trim(),
    copyright: String(value.copyright ?? "").trim(),
    madeIn: String(value.madeIn ?? "").trim(),
    socials: socials
      .map((s) => ({
        label: String((s as Record<string, unknown>)?.label ?? "").trim(),
        href: String((s as Record<string, unknown>)?.href ?? "").trim() || "#",
      }))
      .filter((s) => s.label.length > 0),
    columns: columns
      .map((c) => ({
        title: String((c as Record<string, unknown>)?.title ?? "").trim(),
        links: (Array.isArray((c as Record<string, unknown>)?.links) ? (c as Record<string, unknown>).links as unknown[] : [])
          .map((l) => ({
            label: String((l as Record<string, unknown>)?.label ?? "").trim(),
            href: String((l as Record<string, unknown>)?.href ?? "").trim() || "#",
          }))
          .filter((l) => l.label.length > 0),
      }))
      .filter((c) => c.title.length > 0),
  };
}

function sanitizePartnersValue(raw: unknown) {
  const value = Array.isArray(raw) ? raw : [];
  return value
    .map((partner) => ({
      id: String((partner as Record<string, unknown>)?.id ?? Date.now()),
      name: String((partner as Record<string, unknown>)?.name ?? "").trim(),
    }))
    .filter((partner) => partner.name.length > 0);
}

function sanitizePackagesValue(raw: unknown) {
  const value = Array.isArray(raw) ? raw : [];
  return value
    .map((pkg) => ({
      ...(pkg as Record<string, unknown>),
      id: String((pkg as Record<string, unknown>)?.id ?? Date.now()),
      badge: String((pkg as Record<string, unknown>)?.badge ?? "").trim(),
      price: String((pkg as Record<string, unknown>)?.price ?? "").trim(),
      currency: String((pkg as Record<string, unknown>)?.currency ?? "").trim(),
      slots: Math.max(0, Number.isFinite(Number((pkg as Record<string, unknown>)?.slots)) ? Math.round(Number((pkg as Record<string, unknown>)?.slots)) : 0),
      featured: Boolean((pkg as Record<string, unknown>)?.featured),
      ctaText: String((pkg as Record<string, unknown>)?.ctaText ?? "").trim(),
      benefits: (Array.isArray((pkg as Record<string, unknown>)?.benefits) ? (pkg as Record<string, unknown>).benefits as unknown[] : [])
        .map((benefit) => String(benefit ?? "").trim())
        .filter((benefit) => benefit.length > 0),
    }))
    .filter((pkg) => pkg.badge.length > 0);
}

function sanitizeWhyValue(raw: unknown) {
  const value = typeof raw === "object" && raw !== null ? raw as Record<string, unknown> : {};
  const items = Array.isArray(value.items) ? value.items : [];
  const stats = Array.isArray(value.stats) ? value.stats : [];

  return {
    ...value,
    description: String(value.description ?? "").trim(),
    items: items
      .map((item) => ({
        ...(item as Record<string, unknown>),
        id: String((item as Record<string, unknown>)?.id ?? Date.now()),
        number: String((item as Record<string, unknown>)?.number ?? "").trim(),
        iconType: String((item as Record<string, unknown>)?.iconType ?? "").trim(),
        title: String((item as Record<string, unknown>)?.title ?? "").trim(),
        description: String((item as Record<string, unknown>)?.description ?? "").trim(),
      }))
      .filter((item) => item.title.length > 0),
    stats: stats
      .map((stat) => ({
        value: String((stat as Record<string, unknown>)?.value ?? "").trim(),
        label: String((stat as Record<string, unknown>)?.label ?? "").trim(),
      }))
      .filter((stat) => stat.value.length > 0 && stat.label.length > 0),
  };
}

export function parseSectionValue(section: SiteSectionKey, value: unknown) {
  switch (section) {
    case "hero":
      return HeroSchema.safeParse(value);
    case "partners":
      return z.array(PartnerSchema).safeParse(sanitizePartnersValue(value));
    case "about":
      return AboutSchema.safeParse(value);
    case "why":
      return WhySchema.safeParse(sanitizeWhyValue(value));
    case "packages":
      return z.array(PackageSchema).safeParse(sanitizePackagesValue(value));
    case "cta":
      return CtaSchema.safeParse(value);
    case "footer":
      return FooterSchema.safeParse(sanitizeFooterValue(value));
  }
}
