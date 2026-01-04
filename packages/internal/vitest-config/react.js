import { defineConfig, mergeConfig } from "vitest/config";
import base from "./base.js";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  base,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: [join(__dirname, "setup/react.ts")],
    },
  })
);
