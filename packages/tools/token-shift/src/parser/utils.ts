/**
 * @fileoverview Utility functions for parsing tokens.
 */

import { TokenData } from '../tokens/types';
import { RawTokenJSON } from './parser';

export function parseTokenData(raw: RawTokenJSON): TokenData {
  return {
    type: raw.$type,
    description: raw.$description,
    extensions: raw.$extensions,
    deprecated: raw.$deprecated,
  };
}
