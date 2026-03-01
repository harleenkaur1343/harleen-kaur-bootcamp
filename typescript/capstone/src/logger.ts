import pino from "pino";

export function createLogger(level:string = "info"){
  return pino({level});
}