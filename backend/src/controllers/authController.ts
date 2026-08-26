import { Request, Response } from "express";
import { LoginSchema } from "../schemas/siteSchemas";
import { validateAdmin } from "../services/authService";
import { signToken } from "../utils/jwt";

export async function loginController(req: Request, res: Response) {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "VALIDATION_ERROR", details: parsed.error.flatten() });
  }

  const admin = await validateAdmin(parsed.data.email, parsed.data.password);
  if (!admin) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  const token = signToken({ sub: admin.id, email: admin.email });
  return res.status(200).json({ token, admin });
}