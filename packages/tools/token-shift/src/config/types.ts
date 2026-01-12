/**
 * Configuration schema / types for token-shift.
 */

type TokenShiftInput = string | string[];

/**
 * Configuration for CSS output.
 */
export interface CSSOutputConfig {
  /**
   * The output path for the generated CSS file.
   */
  outputPath: string;

  /**
   * Optional prefix to add to all CSS variable names.
   */
  prefix?: string;

  /**
   * The base selector for the CSS variables (default is ":root").
   */
  baseSelector?: string;

  /**
   * How to handle composite tokens.
   */
  composites?: {
    /**
     * Whether to emit individual parts for composite tokens.
     * Default is true.
     */
    emitParts?: boolean;
  };
}

type TokenShiftOutputConfig = CSSOutputConfig;

export interface TokenShiftConfig {
  /**
   * Input DTCG token file(s) to process.
   * Can be a single file, array of file paths, or glob patterns.
   */
  input: TokenShiftInput;

  /**
   * Output configuration for the generated files.
   */
  output: TokenShiftOutputConfig;
}
