import { Request, Response } from "express";
import { uploadImageBuffer, isCloudinaryConfigured } from "../services/cloudinaryService";

const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif", "image/svg+xml"]);

export async function uploadImageController(req: Request, res: Response) {
  if (!isCloudinaryConfigured()) {
    return res.status(503).json({
      error: "CLOUDINARY_NOT_CONFIGURED",
      message: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env.",
    });
  }

  const file = req.file;
  if (!file?.buffer?.length) {
    return res.status(400).json({ error: "NO_FILE", message: "Attach an image file under field name \"file\"." });
  }

  if (!ALLOWED_MIME.has(file.mimetype)) {
    return res.status(400).json({
      error: "INVALID_FILE_TYPE",
      message: "Only PNG, JPG, WebP, GIF, or SVG images are allowed.",
    });
  }

  const folder = typeof req.body?.folder === "string" && req.body.folder.trim()
    ? req.body.folder.trim()
    : undefined;

  try {
    const uploaded = await uploadImageBuffer(file.buffer, {
      folder,
      originalName: file.originalname,
    });
    return res.status(201).json({
      url: uploaded.url,
      publicId: uploaded.publicId,
      width: uploaded.width,
      height: uploaded.height,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    const statusCode = typeof err === "object" && err && "statusCode" in err && typeof (err as { statusCode: unknown }).statusCode === "number"
      ? (err as { statusCode: number }).statusCode
      : 502;
    const publicMessage = typeof err === "object" && err && "publicMessage" in err && typeof (err as { publicMessage: unknown }).publicMessage === "string"
      ? (err as { publicMessage: string }).publicMessage
      : message;
    return res.status(statusCode).json({ error: "UPLOAD_FAILED", message: publicMessage });
  }
}
