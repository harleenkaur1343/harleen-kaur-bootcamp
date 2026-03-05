import { Request, Response, NextFunction } from "express";
import { _any } from "zod/v4/core";

interface metricsSchema{
  requests : any
  success: any,
  errors: any,
  responseTimes: any
}
export const metrics : metricsSchema = {
  requests : {},
  success: {},
  errors: {},
  responseTimes: {}
};

export const metricsMeasure  = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  const start = Date.now();
  const endpoint = req.path;

  metrics.requests[endpoint] =
    (metrics.requests[endpoint] || 0) + 1;

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (res.statusCode >= 200 && res.statusCode < 400) {
      metrics.success[endpoint] =
        (metrics.success[endpoint] || 0) + 1;
    } else {
      metrics.errors[endpoint] =
        (metrics.errors[endpoint] || 0) + 1;
    }

    if (!metrics.responseTimes[endpoint]) {
      metrics.responseTimes[endpoint] = [];
    }

    metrics.responseTimes[endpoint].push(duration);
  });

  next();
}

export function getAverage(times: number[]) {
  const sum = times.reduce((a, b) => a + b, 0);
  return sum / times.length;
}