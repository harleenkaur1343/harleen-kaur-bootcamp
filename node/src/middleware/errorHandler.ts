import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { createProblem } from "../utils/problems.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    const problem = createProblem(
      err.statusCode,
      err.message,
      err.message,
      req.originalUrl,
      err.errors
    );

    return res.status(err.statusCode).json(problem);
  }

  // Unhandled errors → 500
  const problem = createProblem(
    500,
    "Internal Server Error",
    "Something went wrong",
    req.originalUrl
  );

  res.status(500).json(problem);
};