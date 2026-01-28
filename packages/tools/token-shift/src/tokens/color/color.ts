/**
 * @fileoverview The color token and related functionality.
 */

import { Token } from '../token';
import { colorComponentValuesMap } from './utils';
import type {
  ColorSpaces,
  ColorComponent,
  ColorComponentValues,
} from './types';
import { TokenValue } from '../value';
import { TokenData, TokenType } from '../types';
import { Node } from '../node';

export class ColorTokenValue extends TokenValue {
  /**
   * The color space of the color token.
   */
  readonly colorSpace: ColorSpaces;

  /**
   * The components of the color in the specified color space.
   */
  readonly componentValue: ColorComponentValues;

  /**
   * The alpha (opacity) value of the color. This is optional.
   */
  readonly alpha?: number;

  /**
   * The hexadecimal representation of the color. This is optional.
   */
  readonly hex?: string;

  constructor(
    colorSpace: ColorSpaces,
    componentValue: ColorComponent[],
    alpha?: number,
    hex?: string,
  ) {
    super();
    this.colorSpace = colorSpace;
    const ComponentValueClass = colorComponentValuesMap.get(colorSpace);
    if (!ComponentValueClass) {
      throw new Error(`Unsupported color space: ${colorSpace}`);
    }
    this.componentValue = new ComponentValueClass(...componentValue);
    this.alpha = alpha;
    this.hex = hex;
  }

  getComponents(): ColorComponent[] {
    return this.componentValue.components;
  }
}

/**
 * Type guard to check if a value is a ColorTokenValue (not an alias).
 *
 * @param value The value to check.
 * @returns True if the value is a ColorTokenValue, false if it's an AliasTokenValue.
 */
export function isColorTokenValue(
  value: ColorTokenValue,
): value is ColorTokenValue {
  return value instanceof ColorTokenValue;
}

/**
 * Represents a color token defined by DTCG.
 */
export class ColorToken extends Token<ColorTokenValue> {
  /**
   * The type of the token.
   */
  override readonly type?: TokenType = 'color' as const;

  /**
   * The value of the color token.
   */
  override readonly value: ColorTokenValue;

  constructor(name: string, value: ColorTokenValue, options?: TokenData) {
    super(name, options);
    this.value = value;
  }
}

export function isColorToken(token: Node): token is ColorToken {
  return token instanceof ColorToken;
}
