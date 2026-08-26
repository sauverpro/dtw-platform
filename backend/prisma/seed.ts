import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { env } from "../src/config/env";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
  await prisma.adminUser.upsert({
    where: { email: env.ADMIN_EMAIL },
    update: { passwordHash },
    create: { email: env.ADMIN_EMAIL, passwordHash }
  });

  const defaultJsonPath = path.resolve(__dirname, "default-site-content.json");
  const defaultContent = JSON.parse(await readFile(defaultJsonPath, "utf-8"));

  await prisma.siteContent.upsert({
    where: { key: "main" },
    update: {},
    create: {
      key: "main",
      content: defaultContent,
      version: 1
    }
  });

  console.log("Seed complete");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });