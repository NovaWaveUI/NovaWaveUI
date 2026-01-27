/**
 * @fileoverview Token types used in the Token Shift tool.
 */

/**
 * Tokens that contain simple, single values.
 */
export type SingleTokenType =
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'duration'
  | 'cubicBezier'
  | 'number';

/**
 * Tokens that are composed of multiple values.
 */
export type CompositeTokenType =
  | 'shadow'
  | 'strokeStyle'
  | 'border'
  | 'transition'
  | 'shadow'
  | 'gradient'
  | 'typography';

/**
 * Tokens that are aliases of other tokens.
 */
export type AliasTokenType = 'alias';

/**
 * Categories of tokens.
 */
export type TokenCategory = 'single' | 'composite' | 'alias';

/**
 * All possible token types.
 */
export type TokenType = SingleTokenType | CompositeTokenType | AliasTokenType;
