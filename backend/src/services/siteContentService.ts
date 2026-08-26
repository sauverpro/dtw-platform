import { prisma } from "../db/prisma";
import { SiteData, SiteSectionKey } from "../schemas/siteSchemas";

const CONTENT_KEY = "main";

function seededError() {
  const error = new Error("SITE_CONTENT_NOT_SEEDED");
  Object.assign(error, {
    statusCode: 503,
    publicMessage: "Site content has not been seeded yet. Run `npm run seed` in backend.",
    code: "SITE_CONTENT_NOT_SEEDED",
  });
  return error;
}

export async function getSiteContent() {
  const record = await prisma.siteContent.findUnique({ where: { key: CONTENT_KEY } });
  if (!record) {
    throw seededError();
  }

  return { content: record.content as SiteData, version: record.version };
}

export async function updateSiteContent(content: SiteData, version: number) {
  const result = await prisma.siteContent.updateMany({
    where: { key: CONTENT_KEY, version },
    data: { content, version: { increment: 1 } }
  });

  if (result.count === 0) {
    const current = await prisma.siteContent.findUnique({ where: { key: CONTENT_KEY }, select: { version: true } });
    return { conflict: true as const, currentVersion: current?.version ?? version };
  }

  const updated = await prisma.siteContent.findUniqueOrThrow({ where: { key: CONTENT_KEY } });
  return { conflict: false as const, content: updated.content as SiteData, version: updated.version };
}

export async function updateSiteSection(section: SiteSectionKey, value: SiteData[SiteSectionKey], version: number) {
  const current = await prisma.siteContent.findUnique({ where: { key: CONTENT_KEY } });
  if (!current) {
    throw seededError();
  }

  const nextContent = {
    ...(current.content as SiteData),
    [section]: value,
  } as SiteData;

  const result = await prisma.siteContent.updateMany({
    where: { key: CONTENT_KEY, version },
    data: { content: nextContent, version: { increment: 1 } },
  });

  if (result.count === 0) {
    const latest = await prisma.siteContent.findUnique({ where: { key: CONTENT_KEY }, select: { version: true } });
    return { conflict: true as const, currentVersion: latest?.version ?? version };
  }

  const updated = await prisma.siteContent.findUniqueOrThrow({ where: { key: CONTENT_KEY } });
  return { conflict: false as const, content: updated.content as SiteData, version: updated.version };
}
