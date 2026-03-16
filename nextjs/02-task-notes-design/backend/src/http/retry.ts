import { sleep } from "../utils/sleep.js";
import { logger } from "../utils/logger.js";

const RETRYABLE_STATUS = [502, 503, 504, 429];

interface RetryOptions {
  retries?: number;
  baseDelay?: number;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const retries = options.retries ?? 3;
  const baseDelay = options.baseDelay ?? 200;

  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err: any) {
      attempt++;

      const status = err?.status;

      const retryable =
        RETRYABLE_STATUS.includes(status) || err.name === "FetchError";

      if (!retryable || attempt > retries) {
        throw err;
      }
      // Without jitter: ALL clients wait exactly 400ms → OVERLOAD!
      // With jitter:    Clients wait 400-500ms → SMOOTH load

      const jitter = Math.random() * 100;
      let delay = baseDelay * 2 ** attempt + jitter;

      if (err.response?.headers?.["retry-after"]) {
        const retryAfter = err.response.headers["retry-after"];
        delay = parseInt(retryAfter);
        logger.warn(`Using server Retry-After: ${retryAfter}s`);
      }
      logger.warn(
        JSON.stringify({
          message: "Retrying request",
          attempt,
          delay,
          status,
        }),
      );

      await sleep(delay);
    }
  }
}
