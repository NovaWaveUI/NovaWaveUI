/**
 * @fileoverview Tests for the color token functionality.
 */
import { describe, expect, it } from 'vitest';
import { ColorToken, ColorTokenValue, isColorTokenValue } from './color';
import { colorComponentValuesMap } from './utils';
import type { ColorSpaces } from './types';
import {
  SRGBColorComponentValue,
  HSLColorComponentValue,
  OklchColorComponentValue,
  InvalidColorComponentError,
  ColorComponentOutOfRangeError,
} from './types';

describe('ColorTokenValue', () => {
  describe('constructor', () => {
    it('should create a color token value with sRGB color space', () => {
      const value = new ColorTokenValue('srgb', [0.5, 0.75, 1]);

      expect(value.colorSpace).toBe('srgb');
      expect(value.componentValue).toBeInstanceOf(SRGBColorComponentValue);
      expect(value.componentValue.components).toEqual([0.5, 0.75, 1]);
      expect(value.alpha).toBeUndefined();
      expect(value.hex).toBeUndefined();
    });

    it('should create a color token value with HSL color space', () => {
      const value = new ColorTokenValue('hsl', [180, 0.5, 0.5]);

      expect(value.colorSpace).toBe('hsl');
      expect(value.componentValue).toBeInstanceOf(HSLColorComponentValue);
      expect(value.componentValue.components).toEqual([180, 0.5, 0.5]);
    });

    it('should create a color token value with oklch color space', () => {
      const value = new ColorTokenValue('oklch', [0.6, 0.15, 250]);

      expect(value.colorSpace).toBe('oklch');
      expect(value.componentValue).toBeInstanceOf(OklchColorComponentValue);
      expect(value.componentValue.components).toEqual([0.6, 0.15, 250]);
    });

    it('should set alpha value when provided', () => {
      const value = new ColorTokenValue('srgb', [1, 0.5, 0], 0.8);

      expect(value.alpha).toBe(0.8);
    });

    it('should set hex value when provided', () => {
      const value = new ColorTokenValue(
        'srgb',
        [1, 0, 0],
        undefined,
        '#FF0000',
      );

      expect(value.hex).toBe('#FF0000');
    });

    it('should set both alpha and hex when provided', () => {
      const value = new ColorTokenValue(
        'srgb',
        [0.5, 0.5, 0.5],
        0.5,
        '#808080',
      );

      expect(value.alpha).toBe(0.5);
      expect(value.hex).toBe('#808080');
    });

    it('should throw error for unsupported color space', () => {
      expect(() => {
        new ColorTokenValue('invalid-space' as ColorSpaces, [0, 0, 0]);
      }).toThrow('Unsupported color space: invalid-space');
    });

    it('should handle "none" components in sRGB', () => {
      const value = new ColorTokenValue('srgb', [0.5, 'none', 0.75]);

      expect(value.componentValue.components).toEqual([0.5, 'none', 0.75]);
    });

    it('should validate component values through component value class', () => {
      expect(() => {
        // This should fail validation in SRGBColorComponentValue (out of range)
        new ColorTokenValue('srgb', [1.5, 0, 0]);
      }).toThrow(ColorComponentOutOfRangeError);
    });

    it('should validate invalid component types', () => {
      expect(() => {
        // This should fail validation (invalid type)
        new ColorTokenValue('srgb', ['invalid' as any, 0, 0]);
      }).toThrow(InvalidColorComponentError);
    });
  });

  describe('colorSpace property', () => {
    it('should be readonly and match the constructor value', () => {
      const value = new ColorTokenValue('srgb', [0, 0, 0]);

      expect(value.colorSpace).toBe('srgb');
      // TypeScript marks it as readonly, preventing mutation at compile time
      // At runtime, the property can be reassigned but shouldn't change the behavior
      const originalColorSpace = value.colorSpace;
      expect(originalColorSpace).toBe('srgb');
    });
  });

  describe('componentValue property', () => {
    it('should instantiate the correct component value class from the map', () => {
      const colorSpaces: ColorSpaces[] = ['srgb', 'hsl', 'oklch'];

      colorSpaces.forEach(colorSpace => {
        const value = new ColorTokenValue(colorSpace, [0, 0, 0]);
        const ComponentClass = colorComponentValuesMap.get(colorSpace);

        expect(value.componentValue).toBeInstanceOf(ComponentClass!);
      });
    });

    it('should pass components to the component value constructor', () => {
      const components = [0.2, 0.4, 0.6];
      const value = new ColorTokenValue('srgb', components);

      expect(value.componentValue.components).toEqual(components);
    });
  });

  describe('all supported color spaces', () => {
    const testColorSpaces: Array<[ColorSpaces, number[]]> = [
      ['srgb', [0.5, 0.5, 0.5]],
      ['srgb-linear', [0.5, 0.5, 0.5]],
      ['hsl', [180, 0.5, 0.5]],
      ['hwb', [180, 0.3, 0.2]],
      ['lab', [50, 0, 0]],
      ['lch', [50, 25, 180]],
      ['oklab', [0.5, 0, 0]],
      ['oklch', [0.5, 0.1, 180]],
      ['display-p3', [0.5, 0.5, 0.5]],
      ['a98-rgb', [0.5, 0.5, 0.5]],
      ['prophoto-rgb', [0.5, 0.5, 0.5]],
      ['rec2020', [0.5, 0.5, 0.5]],
      ['xyz-d65', [0.5, 0.5, 0.5]],
      ['xyz-d50', [0.5, 0.5, 0.5]],
    ];

    testColorSpaces.forEach(([colorSpace, components]) => {
      it(`should create color token value with ${colorSpace} color space`, () => {
        const value = new ColorTokenValue(colorSpace, components);

        expect(value.colorSpace).toBe(colorSpace);
        expect(value.componentValue.components).toEqual(components);
      });
    });
  });
});

describe('ColorToken', () => {
  describe('constructor', () => {
    it('should create a color token with name and value', () => {
      const value = new ColorTokenValue('srgb', [1, 0, 0]);
      const token = new ColorToken('red', value);

      expect(token.name).toBe('red');
      expect(token.value).toBe(value);
      expect(token.type).toBe('color');
    });

    it('should accept ColorTokenValue instances', () => {
      const value = new ColorTokenValue('oklch', [0.7, 0.15, 30], 1, '#FFB84D');
      const token = new ColorToken('accent', value);

      expect(token.value).toBeInstanceOf(ColorTokenValue);
      expect(token.value).toBe(value);
    });

    it('should handle different token names', () => {
      const value = new ColorTokenValue('srgb', [0, 0, 0]);
      const token1 = new ColorToken('black', value);
      const token2 = new ColorToken('900', value);
      const token3 = new ColorToken('primary', value);

      expect(token1.name).toBe('black');
      expect(token2.name).toBe('900');
      expect(token3.name).toBe('primary');
    });
  });

  describe('type property', () => {
    it('should always have type "color"', () => {
      const value = new ColorTokenValue('srgb', [0, 0, 0]);
      const token = new ColorToken('test', value);

      expect(token.type).toBe('color');
    });
  });

  describe('value property', () => {
    it('should store the ColorTokenValue reference', () => {
      const value = new ColorTokenValue('hsl', [120, 0.5, 0.5]);
      const token = new ColorToken('green', value);

      expect(token.value).toBe(value);
      expect(token.value.colorSpace).toBe('hsl');
    });

    it('should preserve all properties of ColorTokenValue', () => {
      const value = new ColorTokenValue(
        'srgb',
        [0.25, 0.5, 0.75],
        0.9,
        '#4080BF',
      );
      const token = new ColorToken('blue', value);

      expect(token.value.colorSpace).toBe('srgb');
      expect(token.value.componentValue.components).toEqual([0.25, 0.5, 0.75]);
      expect(token.value.alpha).toBe(0.9);
      expect(token.value.hex).toBe('#4080BF');
    });
  });

  describe('integration with component values', () => {
    it('should work with sRGB values containing alpha and hex', () => {
      const value = new ColorTokenValue('srgb', [1, 0, 0], 0.5, '#FF0000');
      const token = new ColorToken('translucent', value);

      expect(token.value.colorSpace).toBe('srgb');
      expect(token.value.alpha).toBe(0.5);
      expect(token.value.hex).toBe('#FF0000');
    });

    it('should work with oklch values', () => {
      const value = new ColorTokenValue('oklch', [0.65, 0.13, 280]);
      const token = new ColorToken('primary', value);

      expect(token.value.colorSpace).toBe('oklch');
      expect(token.value.componentValue.components).toEqual([0.65, 0.13, 280]);
    });

    it('should work with lab values', () => {
      const value = new ColorTokenValue('lab', [75, 25, -50]);
      const token = new ColorToken('cool', value);

      expect(token.value.colorSpace).toBe('lab');
      expect(token.value.componentValue.components).toEqual([75, 25, -50]);
    });

    it('should work with "none" components', () => {
      const value = new ColorTokenValue('hsl', [180, 'none', 0.5]);
      const token = new ColorToken('colors.gray', value);

      expect(token.value.componentValue.components).toEqual([180, 'none', 0.5]);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string names', () => {
      const value = new ColorTokenValue('srgb', [0, 0, 0]);
      const token = new ColorToken('', value);

      expect(token.name).toBe('');
    });

    it('should handle alpha value of 0', () => {
      const value = new ColorTokenValue('srgb', [1, 1, 1], 0);
      const token = new ColorToken('transparent', value);

      expect(token.value.alpha).toBe(0);
    });

    it('should handle alpha value of 1', () => {
      const value = new ColorTokenValue('srgb', [0, 0, 0], 1);
      const token = new ColorToken('opaque', value);

      expect(token.value.alpha).toBe(1);
    });
  });
});
