/**
 * @fileoverview The color token and related functionality.
 */

import { Token, TokenValue } from '../token';
import { MaybeAlias } from '../alias';
import { JSONValue } from '../../json/types';
import type { ColorSpaces, ColorComponent } from './types';

export class ColorTokenValue extends TokenValue {
  raw: unknown;
  /**
   * The color space of the color token.
   */
  readonly colorSpace: ColorSpaces;

  /**
   * The components of the color in the specified color space.
   */
  readonly components: ColorComponent[];

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
    components: ColorComponent[],
    alpha?: number,
    hex?: string,
  ) {
    super();
    this.colorSpace = colorSpace;
    this.components = components;
    this.alpha = alpha;
    this.hex = hex;
  }

  toJSON(): JSONValue {
    const json: any = {
      colorSpace: this.colorSpace,
      components: this.components,
    };
    if (this.alpha !== undefined) {
      json.alpha = this.alpha;
    }
    if (this.hex !== undefined) {
      json.hex = this.hex;
    }
    return json;
  }
}

/**
 * Represents a color token defined by DTCG.
 */
export class ColorToken extends Token<MaybeAlias<ColorTokenValue>> {
  raw?: unknown;
  toJSON(): unknown {
    throw new Error('Method not implemented.');
  }
  /**
   * The type of the token.
   */
  type = 'color' as const;

  /**
   * The value of the color token.
   */
  value: MaybeAlias<ColorTokenValue>;

  constructor(name: string, value: MaybeAlias<ColorTokenValue>) {
    super(name);
    this.value = value;
  }
}
