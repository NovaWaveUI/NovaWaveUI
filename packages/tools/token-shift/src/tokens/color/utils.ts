/**
 * @fileoverview Utility functions relating to color tokens.
 */

import type { ColorSpaces } from './types';
import { colorSpacesArray } from './types';

/**
 * Checks if the given value is a valid color space key.
 *
 * @param value The string value to check.
 * @returns Returns true if the given value is a valid color space key,
 * false otherwise.
 */
export function isColorSpace(value: string): value is ColorSpaces {
  return colorSpacesArray.includes(value as ColorSpaces);
}
