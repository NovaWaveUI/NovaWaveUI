import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "packages/hooks/*",
      "packages/headless/*",
      "packages/ui/*",
      "packages/tools/token-shift",
    ],
  },
});
