/**
 * @fileoverview Utility functions relating to color tokens.
 */

import type { ColorSpaces } from './types';
import {
  A98RGBColorComponentValue,
  colorSpacesArray,
  DisplayP3ColorComponentValue,
  HSLColorComponentValue,
  HWBColorComponentValue,
  LabColorComponentValue,
  LCHColorComponentValue,
  OklabColorComponentValue,
  OklchColorComponentValue,
  ProPhotoRGBColorComponentValue,
  ColorComponentValues,
  XYZD50ColorComponentValue,
  XYZD65ColorComponentValue,
  Rec2020ColorComponentValue,
  SRGBLinearColorComponentValue,
  SRGBColorComponentValue,
} from './types';

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

export const colorComponentValuesMap = new Map<
  ColorSpaces,
  new (...args: any[]) => ColorComponentValues
>([
  ['srgb', SRGBColorComponentValue],
  ['srgb-linear', SRGBLinearColorComponentValue],
  ['hsl', HSLColorComponentValue],
  ['hwb', HWBColorComponentValue],
  ['lab', LabColorComponentValue],
  ['lch', LCHColorComponentValue],
  ['oklab', OklabColorComponentValue],
  ['oklch', OklchColorComponentValue],
  ['display-p3', DisplayP3ColorComponentValue],
  ['a98-rgb', A98RGBColorComponentValue],
  ['prophoto-rgb', ProPhotoRGBColorComponentValue],
  ['rec2020', Rec2020ColorComponentValue],
  ['xyz-d65', XYZD65ColorComponentValue],
  ['xyz-d50', XYZD50ColorComponentValue],
]);
