/**
 * Tests the src/tokens/alias.ts file.
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  AliasTokenValue,
  JSONRefAliasToken,
  DTCGAliasToken,
} from '../../src/tokens/alias';

describe('AliasTokenValue', () => {
  describe('isDTCGAliasToken', () => {
    it('should return true for valid DTCG alias tokens', () => {
      const validTokens = [
        '{tokenName}',
        '{token_name}',
        '{tokenName.subToken}',
        '{tokenName.sub_token_123}',
        '{a}',
        '{A_1.b_2.c_3}',
      ];

      validTokens.forEach(token => {
        expect(AliasTokenValue.isDTCGAliasToken(token)).toBe(true);
      });
    });

    it('should return false for invalid DTCG alias tokens', () => {
      const invalidTokens = [
        'tokenName',
        '{tokenName.}',
        '{.subToken}',
        '{token Name}',
        123,
        null,
        undefined,
        {},
        [],
        '#/components/schemas/Token',
        './path/to/file.json#/definitions/Token',
      ];

      invalidTokens.forEach(token => {
        expect(AliasTokenValue.isDTCGAliasToken(token)).toBe(false);
      });
    });
  });

  describe('isJSONRefAliasToken', () => {
    it('should return true for valid JSON ref alias tokens', () => {
      const validTokens = [
        '#/components/schemas/Token',
        './path/to/file.json#/definitions/Token',
        '../another/path/file.json#/Token',
        '/absolute/path/file.json#/Token',
        'file.json',
        'another-file.json',
      ];

      validTokens.forEach(token => {
        expect(AliasTokenValue.isJSONRefAliasToken(token)).toBe(true);
      });
    });

    it('should return false for invalid JSON ref alias tokens', () => {
      const invalidTokens = [
        'not/a/ref',
        '#invalidref',
        './path/to/file.txt#/definitions/Token',
        456,
        null,
        undefined,
        {},
        [],
        '{tokenName}',
        '{token_name.subToken}',
      ];

      invalidTokens.forEach(token => {
        expect(AliasTokenValue.isJSONRefAliasToken(token)).toBe(false);
      });
    });
  });

  describe('constructor', () => {
    it('should create a DTCGAliasToken for valid DTCG alias token strings', () => {
      const dtcgAliasString = '{tokenName.subToken}';
      const aliasTokenValue = new AliasTokenValue(dtcgAliasString);
      expect(aliasTokenValue.value).toBeInstanceOf(DTCGAliasToken);
      expect(aliasTokenValue.value.referencePath).toEqual([
        'tokenName',
        'subToken',
      ]);
    });

    it('should create a JSONRefAliasToken for valid JSON ref alias token strings', () => {
      const jsonRefAliasString = './path/to/file.json#/definitions/Token';
      const aliasTokenValue = new AliasTokenValue(jsonRefAliasString);
      expect(aliasTokenValue.value).toBeInstanceOf(JSONRefAliasToken);
      expect(aliasTokenValue.value.referencePath).toEqual([
        './path/to/file.json',
        'definitions',
        'Token',
      ]);
    });

    it('should throw an error for invalid alias token strings', () => {
      const invalidAliasStrings = [
        'invalidToken',
        '{invalid.token.}',
        '#invalidref',
        './path/to/file.txt#/definitions/Token',
      ];

      invalidAliasStrings.forEach(invalidString => {
        expect(() => new AliasTokenValue(invalidString)).toThrowError(
          `Invalid alias token format: ${invalidString}`,
        );
      });
    });
  });
});

describe('JSONRefAliasToken', () => {
  it('parseJSONRef should parse valid JSON ref pointer strings without files', () => {
    const refStrings = [
      '#/components/schemas/Token',
      '#/definitions/Color/Primary',
      '#/tokens/button/primary',
    ];

    refStrings.forEach(refString => {
      const aliasToken = JSONRefAliasToken.parseJSONRef(refString);
      expect(aliasToken).toBeInstanceOf(Array);
      expect(aliasToken).toBeInstanceOf(Object);
      expect(aliasToken.length).toBeGreaterThan(0);
    });
  });

  it('parseJSONRef should parse valid JSON ref pointer strings with files', () => {
    const refStrings = {
      './path/to/file.json': './path/to/file.json#/definitions/Token',
      '../another/path/file.json':
        '../another/path/file.json#/components/parameters/Size',
      '/absolute/path/file.json':
        '/absolute/path/file.json#/tokens/color/secondary',
    };

    Object.entries(refStrings).forEach(([filePath, refString]) => {
      const aliasToken = JSONRefAliasToken.parseJSONRef(refString);
      expect(aliasToken).toBeInstanceOf(Array);
      expect(aliasToken).toBeInstanceOf(Object);
      expect(aliasToken.length).toBeGreaterThan(1);
      expect(aliasToken[0]).toBe(filePath);
    });
  });

  it('constructor should set referencePath, file, and pointer correctly', () => {
    const refString = './path/to/file.json#/definitions/Token';
    const segments = JSONRefAliasToken.parseJSONRef(refString);
    const aliasToken = new JSONRefAliasToken(segments);

    expect(aliasToken.referencePath).toEqual(segments);
    expect(aliasToken.file).toBe('./path/to/file.json');
    expect(aliasToken.pointer).toBe('definitions/Token');
  });

  it('constructor should handle JSON ref without file correctly', () => {
    const refString = '#/components/schemas/Token';
    const segments = JSONRefAliasToken.parseJSONRef(refString);
    const aliasToken = new JSONRefAliasToken(segments);

    expect(aliasToken.referencePath).toEqual(segments);
    expect(aliasToken.file).toBeUndefined();
    expect(aliasToken.pointer).toBe('components/schemas/Token');
  });

  it('unescapeJSONPointerSegment should unescape JSON pointer segments correctly', () => {
    const escapedSegment = 'a~1b~0c';
    const unescapedSegment =
      JSONRefAliasToken.unescapeJSONPointerSegment(escapedSegment);
    expect(unescapedSegment).toBe('a/b~c');
  });

  it('unescapeJSONPointerSegment should handle segments without escapes', () => {
    const segment = 'simpleSegment';
    const result = JSONRefAliasToken.unescapeJSONPointerSegment(segment);
    expect(result).toBe(segment);
  });

  it('parseFromJSONRef should handle invalid JSON ref strings gracefully', () => {
    const invalidRefStrings = [
      'not/a/ref',
      '#invalidref',
      './path/to/file.txt#/definitions/Token',
      '',
      '   ',
    ];

    invalidRefStrings.forEach(refString => {
      const segments = JSONRefAliasToken.parseJSONRef(refString);
      expect(segments).toBeInstanceOf(Array);
      expect(segments.length).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('DTCGAliasToken', () => {
  it('parseDTCGAlias should parse valid DTCG alias tokens correctly', () => {
    const aliasStrings = ['{tokenName}', '{token_name.subToken}', '{a.b.c_d}'];

    const expectedResults = [
      ['tokenName'],
      ['token_name', 'subToken'],
      ['a', 'b', 'c_d'],
    ];

    aliasStrings.forEach((aliasString, index) => {
      const segments = DTCGAliasToken.parseDTCGAlias(aliasString);
      expect(segments).toEqual(expectedResults[index]);
    });
  });

  it('constructor should set referencePath correctly', () => {
    const aliasString = '{tokenName.subToken}';
    const segments = DTCGAliasToken.parseDTCGAlias(aliasString);
    const aliasToken = new DTCGAliasToken(segments);

    expect(aliasToken.referencePath).toEqual(['tokenName', 'subToken']);
  });
});
