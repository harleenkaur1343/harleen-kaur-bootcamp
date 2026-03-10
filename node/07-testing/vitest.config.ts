import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./src/tests/setup/containers.ts"],
    exclude: ["dist", "node_modules"]
  }
});