import { Request, Response, NextFunction } from "express";
import { logger } from "../logger.js";
import crypto from "crypto";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  //returns high‑precision nanoseconds.
  //process.hrtime.bigint() - start → elapsed time in nanoseconds as a BigInt.
  //Number(...) converts it to a number, then / 1_000_000 converts to milliseconds
  // process.hrtime.bigint() is preferred because it is:
  // more precise,
  // not affected by system‑time changes,
  // designed exactly for durations
  const start = process.hrtime.bigint();

  req.requestId = crypto.randomUUID();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

    logger.info(
      {
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs,
      },
      "HTTP Request completed",
    );

    next();
  })
}
