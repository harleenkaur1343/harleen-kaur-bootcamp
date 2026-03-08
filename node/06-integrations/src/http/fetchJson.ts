import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { HttpError, TimeoutError, ParseError } from "./errors.js";

export async function fetchJson(
  url: string,
  options: RequestInit = {},
): Promise<any> {
  //to abort the request after allowed timeout is crossed
  const controller = new AbortController();

  //timeout after set time
  const timeout = setTimeout(() => {
    controller.abort();
  }, env.timeout);

  try {
    //sending the request using fetch, by destructuring the options n sending the controller signal
    //response.ok = true only for 200-299 status codes
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    logger.info(
      {
        url,
        status: response.status,
      },
      "HTTP request completed",
    );

    //some error
    if (!response.ok) {
      //Read error message from server
      const text = await response.text();
      throw new HttpError(
        `HTTP error ${response.status}`,
        response.status,
        url,
        text,
      );
    }

    //if okay - return in json format
    try {
      const data = await response.json();
      return data;
    } catch {
      throw new ParseError();
    }
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new TimeoutError();
    } else {
      throw err;
    }
  } finally {
    clearTimeout(timeout);
  }
}

