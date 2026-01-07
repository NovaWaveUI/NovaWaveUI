import baseConfig from "@novawaveui/eslint-config/base.js";

export default [
  ...baseConfig,
  {
    ignores: ["dist", "node_modules", "*.config.ts"],
  },
];
