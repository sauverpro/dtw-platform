import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function checkDatabaseHealth() {
  const startedAt = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  const [siteContentCount, adminUserCount] = await Promise.all([
    prisma.siteContent.count(),
    prisma.adminUser.count(),
  ]);

  return {
    latencyMs: Date.now() - startedAt,
    siteContentCount,
    adminUserCount,
  };
}
