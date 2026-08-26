import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("12h"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  ADMIN_EMAIL: z.string().email().default("admin@dtw2026.rw"),
  ADMIN_PASSWORD: z.string().min(8).default("ChangeMe123!"),
  SENDGRID_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  SENDGRID_FROM_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  SPONSORSHIP_INBOX: z.string().email().default("dtw@ictchamber.rw"),
  CLOUDINARY_CLOUD_NAME: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  CLOUDINARY_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  CLOUDINARY_API_SECRET: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  CLOUDINARY_FOLDER: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  CORS_ORIGINS: parsedEnv.CORS_ORIGIN
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  SPONSORSHIP_INBOXES: parsedEnv.SPONSORSHIP_INBOX
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean),
};
