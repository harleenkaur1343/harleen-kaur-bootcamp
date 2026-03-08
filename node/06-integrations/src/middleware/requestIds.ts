import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import * as metrics from "../metrics/metrics.js";

export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = req.header("x-request-id") || crypto.randomUUID();
  req.headers["x-request-id"] = requestId;
  res.setHeader("x-request-id", requestId);

  logger.info({
    message: "Request started",
    requestId,
    method: req.method,
    url: req.url,
  });

  const start = Date.now();

  metrics.recordRequest(requestId, req.method, req.url, start);

  const originalEnd = res.end;
  //override res.end
  res.end = function (...args: any[]) {
    const latency = Date.now() - start;

    if (latency > 500) {
      logger.warn({ requestId, latency }, "Slow request");
    }

    const statusGroup = Math.floor(res.statusCode / 100).toString();
    //2xx,4xx,5xx

    metrics.recordStatus(requestId, statusGroup);
    metrics.recordLatency(requestId, latency);

    if (res.statusCode >= 500) {
      metrics.recordFailure(requestId);

      if (metrics.getFailures(requestId) >= 3) {
        logger.error({ requestId }, "Circuit OPEN");
        metrics.openCircuit(requestId, Date.now() + 10000); //OPEN for 10s
      }
    }

    logger.info(
      {
        requestId,
        status: res.statusCode,
        latency,
      },
      "Request finished",
    );

    originalEnd.apply(this, args);
  };
  //Call the original res.end function with these parameters, this = res,  args (args in res.end)

  next();
}

//Client → [x-request-id: abc123] → Server
//        ↓ No ID? Generate: xyz789
//        ↓ req.headers["x-request-id"] = "xyz789"
//        ↓ Middleware logs "xyz789"
//        ↓ res.setHeader("x-request-id", "xyz789")
// Server → [x-request-id: xyz789] → Client

// 1. Request hits middleware
// 2. Gets ID "ABC123"
// 3. res.end overridden (spy mode)
// 4. Handler runs normally
// 5. Handler calls res.end() → OUR VERSION runs
// 6. We measure + circuit breaker
// 7. originalEnd.apply() → REAL res.end sends response