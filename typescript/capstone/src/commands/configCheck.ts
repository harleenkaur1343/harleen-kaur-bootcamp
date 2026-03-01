//loadConfig - handle errors

import { loadConfig } from "src/config";

export async function configCheck() {
  try {
    const configInfo = loadConfig();
    console.log("Config is valid:");
    console.log(configInfo);
  } catch (err) {
    console.error("Config validation failed:", err);
    process.exit(1);
  }
}
