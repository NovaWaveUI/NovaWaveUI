/**
 * Loads configuration files used by token-shift.
 */

import { loadConfig } from "c12";
import type { TokenShiftConfig } from "./types";

export async function loadConfigFile(
  cwd: string = process.cwd() + "/src"
): Promise<TokenShiftConfig> {
  const config = await loadConfig<TokenShiftConfig>({
    name: "token-shift",
    cwd,
  });
  return config.config;
}
