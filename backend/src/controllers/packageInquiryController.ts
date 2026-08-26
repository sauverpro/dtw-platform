import { Request, Response } from "express";
import { CreatePackageInquirySchema } from "../schemas/packageInquirySchema";
import { createPackageInquiry } from "../services/packageInquiryService";

export async function createPackageInquiryController(req: Request, res: Response) {
  const parsed = CreatePackageInquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join(".") || "body",
        message: issue.message,
      })),
    });
  }

  const result = await createPackageInquiry(parsed.data);
  return res.status(201).json({
    id: result.inquiry.id,
    createdAt: result.inquiry.createdAt,
    content: result.content,
    version: result.version,
  });
}
