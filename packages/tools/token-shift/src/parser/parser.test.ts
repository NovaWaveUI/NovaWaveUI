/**
 * @fileoverview Tests the overall parser functionality.
 */
import { describe, expect, it } from 'vitest';
import { parseTokenDocument, TokenParserRegistry } from './parser';
import { parseColorToken } from '../tokens/color/parser';
import { ColorToken } from '../tokens/color/color';

describe('Token Parser', () => {
  it('should parse a document with a color token', () => {
    const rawDocument = {
      color: {
        primary: {
          $type: 'color',
          $value: {
            colorSpace: 'srgb',
            components: [0.5, 0.75, 1],
          },
          $description: 'Primary color token',
        },
      },
    };

    const parserRegistry = new TokenParserRegistry();
    parserRegistry.registerParser('color', parseColorToken);

    const parsedDocument = parseTokenDocument(rawDocument, parserRegistry);

    const primaryColorToken = parsedDocument.find([
      'color',
      'primary',
    ]) as ColorToken;
    expect(primaryColorToken).toBeInstanceOf(ColorToken);

    expect(primaryColorToken.name).toBe('primary');
    expect(primaryColorToken.value.colorSpace).toBe('srgb');
    expect(primaryColorToken.value.getComponents()).toEqual([0.5, 0.75, 1]);
    expect(primaryColorToken.description).toBe('Primary color token');
  });
});
