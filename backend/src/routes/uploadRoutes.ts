import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/requireAuth";
import { uploadImageController } from "../controllers/uploadController";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2_500_000 },
});

export const uploadRoutes = Router();

uploadRoutes.post("/image", requireAuth, (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "FILE_TOO_LARGE",
        message: "Image must be under 2.5 MB.",
      });
    }
    return res.status(400).json({ error: "UPLOAD_ERROR", message: err.message || "Upload failed." });
  });
}, uploadImageController);
