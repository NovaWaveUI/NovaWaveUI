/**
 * @fileoverview Test functionality for parsing color tokens.
 */

import { describe, expect, it } from 'vitest';
import { parseColorToken } from './parser';
import { ColorToken, isColorToken } from './color';
import type { RawTokenJSON } from '../../parser/parser';

describe('Color Token Parser', () => {
  it('should parse a valid color token', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        colorSpace: 'srgb',
        components: [0.5, 0.75, 1],
      },
      $description: 'A sample color token',
      $extensions: { 'com.github/novawaveui': { customProperty: true } },
      $deprecated: false,
    };

    const token = parseColorToken({
      name: 'primaryColor',
      raw: rawToken,
      context: { path: [] },
    }) as ColorToken;

    expect(token).toBeInstanceOf(ColorToken);
    expect(token.name).toBe('primaryColor');
    expect(token.value.colorSpace).toBe('srgb');
    expect(token.value.getComponents()).toEqual([0.5, 0.75, 1]);
    expect(token.description).toBe('A sample color token');
    expect(token.extensions).toEqual({
      'com.github/novawaveui': { customProperty: true },
    });
    expect(token.deprecated).toBe(false);
  });

  it('should throw an error for invalid color space property', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        colorSpace: 'invalidColorSpace',
        components: [0.5, 0.75, 1],
      },
    };

    expect(() =>
      parseColorToken({
        name: 'invalidColorToken',
        raw: rawToken,
        context: { path: [] },
      }),
    ).toThrowError('Invalid or missing color space: invalidColorSpace');
  });

  it('should throw an error for a missing color space property', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        components: [0.5, 0.75, 1],
      },
    };

    expect(() =>
      parseColorToken({
        name: 'missingColorSpaceToken',
        raw: rawToken,
        context: { path: [] },
      }),
    ).toThrowError('Invalid or missing color space: undefined');
  });

  it('should throw an error for invalid components array', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        colorSpace: 'srgb',
        components: [0.5, 0.75], // Invalid length
      },
    };

    expect(() =>
      parseColorToken({
        name: 'invalidComponentsToken',
        raw: rawToken,
        context: { path: [] },
      }),
    ).toThrowError(
      'Invalid or missing components array: 0.5,0.75. Must be an array of three elements.',
    );
  });

  it('should throw an error for a missing components array', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        colorSpace: 'srgb',
      },
    };

    expect(() =>
      parseColorToken({
        name: 'missingComponentsToken',
        raw: rawToken,
        context: { path: [] },
      }),
    ).toThrowError(
      'Invalid or missing components array: undefined. Must be an array of three elements.',
    );
  });

  it('should throw an error for invalid alpha value', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        colorSpace: 'srgb',
        components: [0.5, 0.75, 1],
        alpha: 'notANumber',
      },
    };

    expect(() =>
      parseColorToken({
        name: 'invalidAlphaToken',
        raw: rawToken,
        context: { path: [] },
      }),
    ).toThrowError('Invalid alpha value: notANumber. Must be a number.');
  });

  it('should throw an error for invalid hex value', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        colorSpace: 'srgb',
        components: [0.5, 0.75, 1],
        hex: 12345,
      },
    };

    expect(() =>
      parseColorToken({
        name: 'invalidHexToken',
        raw: rawToken,
        context: { path: [] },
      }),
    ).toThrowError('Invalid hex value: 12345. Must be a string.');
  });

  it('should correctly identify a ColorToken', () => {
    const rawToken: RawTokenJSON = {
      $value: {
        colorSpace: 'srgb',
        components: [0.5, 0.75, 1],
      },
    };

    const token = parseColorToken({
      name: 'testColorToken',
      raw: rawToken,
      context: { path: [] },
    });

    expect(isColorToken(token)).toBe(true);
  });

  it('should correctly identify a non-ColorToken', () => {
    class DummyToken {}
    const dummyToken = new DummyToken();

    expect(isColorToken(dummyToken as any)).toBe(false);
  });
});
