/**
 * @fileoverview Types relating to the color token.
 */

/**
 * The supported color spaces for color tokens.
 */
export type ColorSpaces =
  | 'srgb'
  | 'srgb-linear'
  | 'hsl'
  | 'hwb'
  | 'lab'
  | 'lch'
  | 'oklab'
  | 'oklch'
  | 'display-p3'
  | 'a98-rgb'
  | 'prophoto-rgb'
  | 'rec2020'
  | 'xyz-d65'
  | 'xyz-d50';

export const colorSpacesArray: ColorSpaces[] = [
  'srgb',
  'srgb-linear',
  'hsl',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'display-p3',
  'a98-rgb',
  'prophoto-rgb',
  'rec2020',
  'xyz-d65',
  'xyz-d50',
];

/**
 * An element in a color component array, representing either a numeric value
 * or 'none' to indicate the absence of a component.
 */
export type ColorComponent = number | 'none';

/**
 * The interface for sRGB color values.
 *
 * red: [0-1]
 * green: [0-1]
 * blue: [0-1]
 */
export interface SRGBColorValue {
  colorSpace: 'srgb';
  red: ColorComponent;
  green: ColorComponent;
  blue: ColorComponent;
}

/**
 * The interface for sRGB Linear color values.
 *
 * red: [0-1]
 * green: [0-1]
 * blue: [0-1]
 */
export interface SRGBLinearColorValue {
  colorSpace: 'srgb-linear';
  red: ColorComponent;
  green: ColorComponent;
  blue: ColorComponent;
}

/**
 * The interface for HSL color values.
 *
 * hue: [0-360)
 * saturation: [0-100]
 * lightness: [0-100]
 */
export interface HSLColorValue {
  colorSpace: 'hsl';
  hue: ColorComponent;
  saturation: ColorComponent;
  lightness: ColorComponent;
}

/**
 * The interface for HWB color values.
 *
 * hue: [0-360)
 * whiteness: [0-100]
 * blackness: [0-100]
 */
export interface HWBColorValue {
  colorSpace: 'hwb';
  hue: ColorComponent;
  whiteness: ColorComponent;
  blackness: ColorComponent;
}

/**
 * The interface for Lab color values.
 *
 * lightness: [0-100]
 * a: [-Infinity to Infinity]
 * b: [-Infinity to Infinity]
 */
export interface LabColorValue {
  colorSpace: 'lab';
  lightness: ColorComponent;
  a: ColorComponent;
  b: ColorComponent;
}

/**
 * The interface for LCH color values.
 *
 * lightness: [0-100]
 * chroma: [0-Infinity]
 * hue: [0-360)
 */
export interface LCHColorValue {
  colorSpace: 'lch';
  lightness: ColorComponent;
  chroma: ColorComponent;
  hue: ColorComponent;
}

/**
 * The interface for Oklab color values.
 *
 * lightness: [0-1]
 * a: [-Infinity to Infinity]
 * b: [-Infinity to Infinity]
 */
export interface OklabColorValue {
  colorSpace: 'oklab';
  lightness: ColorComponent;
  a: ColorComponent;
  b: ColorComponent;
}

/**
 * The interface for Oklch color values.
 *
 * lightness: [0-1]
 * chroma: [0-Infinity]
 * hue: [0-360)
 */
export interface OklchColorValue {
  colorSpace: 'oklch';
  lightness: ColorComponent;
  chroma: ColorComponent;
  hue: ColorComponent;
}

/**
 * The interface for Display P3 color values.
 *
 * red: [0-1]
 * green: [0-1]
 * blue: [0-1]
 */
export interface DisplayP3ColorValue {
  colorSpace: 'display-p3';
  red: ColorComponent;
  green: ColorComponent;
  blue: ColorComponent;
}

/**
 * The interface for A98 RGB color values.
 *
 * red: [0-1]
 * green: [0-1]
 * blue: [0-1]
 */
export interface A98RGBColorValue {
  colorSpace: 'a98-rgb';
  red: ColorComponent;
  green: ColorComponent;
  blue: ColorComponent;
}

/**
 * The interface for ProPhoto RGB color values.
 *
 * red: [0-1]
 * green: [0-1]
 * blue: [0-1]
 */
export interface ProPhotoRGBColorValue {
  colorSpace: 'prophoto-rgb';
  red: ColorComponent;
  green: ColorComponent;
  blue: ColorComponent;
}

/**
 * The interface for Rec. 2020 color values.
 *
 * red: [0-1]
 * green: [0-1]
 * blue: [0-1]
 */
export interface Rec2020ColorValue {
  colorSpace: 'rec2020';
  red: ColorComponent;
  green: ColorComponent;
  blue: ColorComponent;
}

/**
 * The interface for CIE XYZ D65 color values.
 *
 * X: [0-Infinity]
 * Y: [0-Infinity]
 * Z: [0-Infinity]
 */
export interface XYZD65ColorValue {
  colorSpace: 'xyz-d65';
  x: ColorComponent;
  y: ColorComponent;
  z: ColorComponent;
}

/**
 * The interface for CIE XYZ D50 color values.
 *
 * X: [0-Infinity]
 * Y: [0-Infinity]
 * Z: [0-Infinity]
 */
export interface XYZD50ColorValue {
  colorSpace: 'xyz-d50';
  x: ColorComponent;
  y: ColorComponent;
  z: ColorComponent;
}

/**
 * The interface for color token values.
 */
export interface ColorTokenValue {
  colorSpace: ColorSpaces;
  components: ColorComponent[];
  alpha?: number;
  hex?: string;
}
