import { NextFunction, Request, Response } from "express";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "NOT_FOUND" });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = typeof err === "object" && err !== null && "statusCode" in err && typeof err.statusCode === "number"
    ? err.statusCode
    : typeof err === "object" && err !== null && "name" in err && err.name === "PrismaClientInitializationError"
      ? 503
      : 500;

  const code = typeof err === "object" && err !== null && "code" in err && typeof err.code === "string"
    ? err.code
    : typeof err === "object" && err !== null && "name" in err && typeof err.name === "string"
      ? err.name
      : "INTERNAL_SERVER_ERROR";

  const message = typeof err === "object" && err !== null && "publicMessage" in err && typeof err.publicMessage === "string"
    ? err.publicMessage
    : typeof err === "object" && err !== null && "name" in err && err.name === "PrismaClientInitializationError"
      ? "Database connection failed. Check DATABASE_URL, network access, and Neon status."
      : "Internal server error";

  const details = typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
    ? err.message
    : undefined;

  console.error("[api-error]", {
    statusCode,
    code,
    message,
    details,
    err,
  });

  res.status(statusCode).json({
    error: code,
    message,
    details,
  });
}
