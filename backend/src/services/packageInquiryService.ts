import { prisma } from "../db/prisma";
import type { CreatePackageInquiryBody } from "../schemas/packageInquirySchema";
import { SiteDataSchema, type SiteData } from "../schemas/siteSchemas";
import { sendPackageInquiryEmail } from "./emailService";

const SITE_CONTENT_KEY = "main";

function packageNotFoundError() {
  const error = new Error("Selected sponsorship package was not found.");
  Object.assign(error, {
    statusCode: 404,
    code: "PACKAGE_NOT_FOUND",
    publicMessage: "That sponsorship package is no longer available.",
  });
  return error;
}

function noSlotsError() {
  const error = new Error("No slots remain for the selected sponsorship package.");
  Object.assign(error, {
    statusCode: 409,
    code: "PACKAGE_SOLD_OUT",
    publicMessage: "This sponsorship package is currently sold out.",
  });
  return error;
}

function invalidContentError() {
  const error = new Error("Stored site content is invalid.");
  Object.assign(error, {
    statusCode: 500,
    code: "INVALID_SITE_CONTENT",
    publicMessage: "Site package data is temporarily unavailable.",
  });
  return error;
}

function normalizeSiteContent(raw: unknown) {
  const parsed = SiteDataSchema.safeParse(raw);
  if (!parsed.success) throw invalidContentError();
  return parsed.data;
}

function decrementPackageSlot(content: SiteData, packageId: string) {
  const packages = content.packages.map((pkg) => ({ ...pkg }));
  const index = packages.findIndex((pkg) => String(pkg.id) === String(packageId));
  if (index < 0) throw packageNotFoundError();
  if ((packages[index].slots ?? 0) <= 0) throw noSlotsError();
  packages[index].slots -= 1;
  return { ...content, packages };
}

function incrementPackageSlot(content: SiteData, packageId: string) {
  const packages = content.packages.map((pkg) =>
    String(pkg.id) === String(packageId)
      ? { ...pkg, slots: (pkg.slots ?? 0) + 1 }
      : { ...pkg }
  );
  return { ...content, packages };
}

export async function createPackageInquiry(payload: CreatePackageInquiryBody) {
  const message = payload.message && payload.message.length > 0 ? payload.message : null;
  const packageId = payload.packageId?.trim();

  const orNull = (s: string | undefined) =>
    typeof s === "string" && s.trim().length > 0 ? s.trim() : null;

  if (!packageId) throw packageNotFoundError();

  const reserved = await prisma.$transaction(async (tx) => {
    const siteContentRecord = await tx.siteContent.findUnique({ where: { key: SITE_CONTENT_KEY } });
    if (!siteContentRecord) throw invalidContentError();

    const currentContent = normalizeSiteContent(siteContentRecord.content);
    const nextContent = decrementPackageSlot(currentContent, packageId);

    const inquiry = await tx.packageInquiry.create({
      data: {
        packageId: orNull(payload.packageId),
        packageBadge: orNull(payload.packageBadge),
        packagePrice: orNull(payload.packagePrice),
        packageCurrency: orNull(payload.packageCurrency),
        organizationName: payload.organizationName,
        contactPerson: payload.contactPerson,
        email: payload.email,
        phone: payload.phone,
        message,
      },
      select: { id: true, createdAt: true },
    });

    const updatedSiteContent = await tx.siteContent.update({
      where: { key: SITE_CONTENT_KEY },
      data: {
        content: nextContent,
        version: { increment: 1 },
      },
      select: { content: true, version: true },
    });

    return {
      inquiry,
      content: normalizeSiteContent(updatedSiteContent.content),
      version: updatedSiteContent.version,
    };
  });

  try {
    await sendPackageInquiryEmail(payload);
    return reserved;
  } catch (error) {
    await prisma.$transaction(async (tx) => {
      await tx.packageInquiry.deleteMany({ where: { id: reserved.inquiry.id } });
      const siteContentRecord = await tx.siteContent.findUnique({ where: { key: SITE_CONTENT_KEY } });
      if (!siteContentRecord) return;
      const currentContent = normalizeSiteContent(siteContentRecord.content);
      const restoredContent = incrementPackageSlot(currentContent, packageId);
      await tx.siteContent.update({
        where: { key: SITE_CONTENT_KEY },
        data: {
          content: restoredContent,
          version: { increment: 1 },
        },
      });
    });
    throw error;
  }
}
