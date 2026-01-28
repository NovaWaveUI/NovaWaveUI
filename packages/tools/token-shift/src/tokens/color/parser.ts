/**
 * @fileoverview Parser functionality for color tokens.
 */

import { TokenParser } from '../../parser/parser';
import { parseTokenData } from '../../parser/utils';
import { ColorToken, ColorTokenValue } from './color';
import { ColorComponent, ColorSpaces, colorSpacesArray } from './types';

/**
 * Type guard to check if a value is a ColorSpaces.
 *
 * @param value The value to test.
 * @returns True and casted if a color space, false otherwise.
 */
function isColorSpace(value: unknown): value is ColorSpaces {
  return (
    typeof value === 'string' && (colorSpacesArray as string[]).includes(value)
  );
}

/**
 * Parses a color component from a given value.
 *
 * @param component The value to test.
 * @returns The resulting color component.
 */
function parseColorComponent(component: unknown): ColorComponent {
  if (component === 'none') return 'none';
  if (typeof component === 'number') return component;
  throw new Error(`Invalid color component value: ${String(component)}`);
}

function parseColorValueConcrete(value: unknown): ColorTokenValue {
  if (typeof value !== 'object' || value === null) {
    throw new Error(
      `Invalid color token value: ${String(value)}. Must be an object.`,
    );
  }
  const object = value as Record<string, unknown>;

  const colorSpaceValue = object['colorSpace'];
  if (!isColorSpace(colorSpaceValue)) {
    throw new Error(
      `Invalid or missing color space: ${String(colorSpaceValue)}`,
    );
  }

  const componentsValue = object['components'];
  if (!Array.isArray(componentsValue) || componentsValue.length !== 3) {
    throw new Error(
      `Invalid or missing components array: ${String(componentsValue)}. Must be an array of three elements.`,
    );
  }
  const components = componentsValue.map(parseColorComponent) as [
    ColorComponent,
    ColorComponent,
    ColorComponent,
  ];

  const alphaValue = object['alpha'];
  let alpha: number | undefined;
  if (alphaValue !== undefined) {
    if (typeof alphaValue !== 'number') {
      throw new Error(
        `Invalid alpha value: ${String(alphaValue)}. Must be a number.`,
      );
    }
    alpha = alphaValue;
  }

  const hexValue = object['hex'];
  let hex: string | undefined;
  if (hexValue !== undefined) {
    if (typeof hexValue !== 'string') {
      throw new Error(
        `Invalid hex value: ${String(hexValue)}. Must be a string.`,
      );
    }
    hex = hexValue;
  }

  return new ColorTokenValue(colorSpaceValue, components, alpha, hex);
}

/**
 * Parses a color token from raw JSON data.
 *
 * @param args The arguments for the token parser.
 * @returns The final constructed color token.
 */
export const parseColorToken: TokenParser = ({ name, raw }) => {
  const value = parseColorValueConcrete(raw['$value']);
  const data = parseTokenData(raw);
  return new ColorToken(name, value, data);
};
