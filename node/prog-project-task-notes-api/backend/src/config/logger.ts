import pino from "pino";
import { loadConfig } from "./config";

const { logLevel } = loadConfig();
console.log(logLevel);

export const logger = pino({
  level: logLevel,
});
