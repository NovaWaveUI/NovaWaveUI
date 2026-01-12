import { defineConfig, Options } from "tsup";
import path from "path";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
  },
  format: ["esm"],
  target: "node18",
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  tsconfig: path.resolve(__dirname, "tsconfig.build.json"),
  ...options,
}));
