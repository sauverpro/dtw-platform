import { Request, Response } from "express";
import { SiteSectionKeySchema, UpdateSiteContentSchema, UpdateSiteSectionSchema, parseSectionValue } from "../schemas/siteSchemas";
import { getSiteContent, updateSiteContent, updateSiteSection } from "../services/siteContentService";

export async function getSiteContentController(_req: Request, res: Response) {
  const data = await getSiteContent();
  return res.status(200).json(data);
}

export async function updateSiteContentController(req: Request, res: Response) {
  const parsed = UpdateSiteContentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const result = await updateSiteContent(parsed.data.content, parsed.data.version);
  if (result.conflict) {
    return res.status(409).json({ error: "VERSION_CONFLICT", currentVersion: result.currentVersion });
  }

  return res.status(200).json({ content: result.content, version: result.version });
}

export async function updateSiteSectionController(req: Request, res: Response) {
  const sectionParsed = SiteSectionKeySchema.safeParse(req.params.section);
  if (!sectionParsed.success) {
    return res.status(400).json({ error: "INVALID_SECTION" });
  }

  const bodyParsed = UpdateSiteSectionSchema.safeParse(req.body);
  if (!bodyParsed.success) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: bodyParsed.error.flatten(),
      issues: bodyParsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const valueParsed = parseSectionValue(sectionParsed.data, bodyParsed.data.value);
  if (!valueParsed.success) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: valueParsed.error.flatten(),
      issues: valueParsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const result = await updateSiteSection(sectionParsed.data, valueParsed.data, bodyParsed.data.version);
  if (result.conflict) {
    return res.status(409).json({ error: "VERSION_CONFLICT", currentVersion: result.currentVersion });
  }

  return res.status(200).json({ content: result.content, version: result.version });
}
