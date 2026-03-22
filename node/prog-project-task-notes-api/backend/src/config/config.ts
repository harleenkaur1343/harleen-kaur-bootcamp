import "dotenv/config";

export interface AppConfig {
  port: number;
  logLevel: string;
  env: "development" | "production" | "test";
  host:string
}
console.log(process.env.PORT)
export function loadConfig(): AppConfig {
  return {
    port: parseInt(process.env.PORT!) || 5001,
    logLevel: process.env.LOG_LEVEL || "info",
    env: (process.env.NODE_ENV as any) || "development",
    host:process.env.HOST || 'localhost'
  };
}
