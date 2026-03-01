//load .env
//get content from config.yaml
//readFileSync reads a file from disk and returns
// its contents as a string — synchronously (meaning it blocks until the file is fully read before moving on)
import "dotenv/config";
import { readFileSync } from "fs";
import yaml from "yaml";
import {z} from "zod";

const ConfigSchema = z.object({
  dbPath : z.string(),
  logLevel: z.enum(["info","debug"]).default("info")
})
export type AppConfig = z.infer<typeof ConfigSchema>;

export function loadConfig(configPath = "config.yaml"): AppConfig{
  const raw = yaml.parse(readFileSync(configPath,"utf-8"))
  return ConfigSchema.parse(raw);
}

