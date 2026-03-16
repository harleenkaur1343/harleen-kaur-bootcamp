import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  details?: unknown;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const message = err.message || "Internal Server Error";

  console.error(`[errorHandler] ${statusCode} — ${message}`, err.stack ?? "");

  res.status(statusCode).json({
    error: statusCode >= 500 ? "Internal Server Error" : message,
    ...(err.details !== undefined && { details: err.details }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
