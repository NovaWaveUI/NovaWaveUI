export type { TokenShiftConfig } from "./types";

import type { TokenShiftConfig } from "./types";

export { loadConfigFile } from "./config";

/**
 * Defines the configuration for token-shift.
 *
 * @param config The configuration options.
 * @returns The provided configuration.
 */
export function defineConfig(config: TokenShiftConfig): TokenShiftConfig {
  return config;
}
