import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";

export function isCloudinaryConfigured() {
  return Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
}

function applyCloudinaryConfig() {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/** Dev-only: log a clear warning when credentials do not match the configured cloud. */
export async function warnIfCloudinaryMisconfigured() {
  if (!isCloudinaryConfigured()) return;

  applyCloudinaryConfig();

  try {
    await cloudinary.api.ping();
    console.log(`[cloudinary] Ready (cloud: ${env.CLOUDINARY_CLOUD_NAME})`);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Cloudinary ping failed";
    console.warn(
      `[cloudinary] Uploads will fail until credentials are fixed. ${detail}\n` +
        "  → Open https://console.cloudinary.com/settings/api-keys\n" +
        "  → Use the Cloud name shown there (not your account display name)\n" +
        "  → API key + secret must belong to that same cloud",
    );
  }
}

function configureCloudinary() {
  if (!isCloudinaryConfigured()) {
    const error = new Error("CLOUDINARY_NOT_CONFIGURED");
    Object.assign(error, {
      statusCode: 503,
      publicMessage: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env.",
      code: "CLOUDINARY_NOT_CONFIGURED",
    });
    throw error;
  }

  applyCloudinaryConfig();
}

export async function uploadImageBuffer(
  buffer: Buffer,
  options: { folder?: string; originalName?: string } = {},
) {
  configureCloudinary();

  const folder = options.folder || env.CLOUDINARY_FOLDER || "dtw2026/partners";

  return new Promise<{ url: string; publicId: string; width?: number; height?: number }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
        unique_filename: true,
        use_filename: Boolean(options.originalName),
        filename_override: options.originalName?.replace(/\.[^.]+$/, ""),
      },
      (err, result) => {
        if (err || !result?.secure_url) {
          const detail = err?.message || "Cloudinary did not return a URL.";
          const error = new Error(detail);
          Object.assign(error, {
            statusCode: err?.http_code && err.http_code >= 400 && err.http_code < 600 ? err.http_code : 502,
            publicMessage: detail,
            code: "CLOUDINARY_UPLOAD_FAILED",
          });
          reject(error);
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        });
      },
    );
    stream.end(buffer);
  });
}
