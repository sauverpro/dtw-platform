import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma";

export async function validateAdmin(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return null;

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return null;

  return { id: admin.id, email: admin.email };
}