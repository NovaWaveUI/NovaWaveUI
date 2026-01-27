/**
 * @fileoverview Defines alias tokens defined by DTCG.
 */

import { TokenValue } from './token';

const DTCG_ALIAS_TOKEN_REGEX =
  /^\{([a-zA-Z_][a-zA-Z_0-9]*(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*)\}$/;
const JSON_REF_ALIAS_TOKEN_REGEX =
  /^(#|(\.\/|\.\.\/|\/)?[a-zA-Z0-9_\-.\/]+#)(\/[a-zA-Z0-9_\-.\/~]*)+$/;
const JSON_ONLY_FILE_PATH = /^(?:\.\/|\.\.\/|\/)?[a-zA-Z0-9_\-.\/]+\.json$/;
const IS_GENERIC_FILE_PATH_REGEX = /^(?:\.\/|\.\.\/|\/)?[a-zA-Z0-9_\-.\/]+$/;

/**
 * Represents an alias token in JSON Reference format.
 */
export class JSONRefAliasToken {
  /**
   * The reference path to the target token.
   *
   * If it is a JSON ref format, the path segments exclude the leading '#' character and split by '/'.
   * If the JSON ref contains escaped characters, they are unescaped.
   * If the JSON ref contains a file reference, the file name is included as the first element.
   */
  readonly referencePath: string[];

  /**
   * The file part of the JSON ref, if any.
   */
  readonly file?: string;

  /**
   * The pointer part of the JSON ref, if any.
   */
  readonly pointer?: string;

  constructor(value: string[]) {
    this.referencePath = value;

    // Determine file and pointer parts
    if (value.length > 0 && value[0].endsWith('.json')) {
      this.file = value[0];
      this.pointer = value.length > 1 ? value.slice(1).join('/') : undefined;
    } else if (value.length > 0 && value[0] === '#') {
      this.pointer = value.length > 1 ? value.slice(1).join('/') : undefined;
    } else {
      this.pointer = value.join('/');
    }
  }

  public static unescapeJSONPointerSegment(segment: string): string {
    return segment.replace(/~1/g, '/').replace(/~0/g, '~');
  }

  /**
   * Converts a JSON Reference string into its segments.
   * Handles unescaping of JSON Pointer segments.
   * Also handles file references.
   *
   * @param value The value to parse.
   * @returns The segments.
   */
  public static parseJSONRef(value: string): string[] {
    // First, check if this is a file only reference
    // It is valid to have just a file name as it means
    // the entire contents of the file is being referenced.
    if (/^[a-zA-Z0-9_\-.]+\.json$/.test(value)) {
      return [value];
    }

    // Next, a pointer may still start with a file reference
    // and then contain a pointer after the '#'
    const hashIndex = value.indexOf('#');
    let filePart = '';
    let pointerPart = '';

    if (hashIndex === -1) {
      // No hash, so just a pointer
      pointerPart = value;
    } else {
      // Split into file and pointer parts
      filePart = value.substring(0, hashIndex);
      pointerPart = value.substring(hashIndex + 1);
    }

    const segments: string[] = [];

    // If there is a file part, add it as the first segment
    if (filePart) {
      segments.push(filePart);
    }

    // Now process the pointer part
    if (pointerPart) {
      // Remove leading '/' if present
      if (pointerPart.startsWith('/')) {
        pointerPart = pointerPart.substring(1);
      }

      const pointerSegments = pointerPart
        .split('/')
        .map(segment => JSONRefAliasToken.unescapeJSONPointerSegment(segment));

      segments.push(...pointerSegments);
    }

    return segments;
  }
}

/**
 * Represents an alias token in DTCG curly brace format.
 */
export class DTCGAliasToken {
  /**
   * The reference path to the target token.
   *
   * If it is DTCG curly brace format, the path segments do not include the curly braces.
   */
  readonly referencePath: string[];

  constructor(value: string[]) {
    this.referencePath = value;
  }

  /**
   * Parses a DTCG alias token string into its path segments.
   *
   * @param value The value to convert.
   * @returns The full segmented reference path.
   */
  public static parseDTCGAlias(value: string): string[] {
    // Remove the curly braces
    const innerContent = value.slice(1, -1);
    // Split by dot to get the path segments
    return innerContent.split('.');
  }
}

export class AliasTokenValue extends TokenValue {
  /**
   * The reference path to the target token.
   *
   * If it is DTCG curly brace format, the path segments do not include the curly braces.
   * If it is a JSON ref format, the path segments exclude the leading '#' character and split by '/'.
   * If the JSON ref contains escaped characters, they are unescaped.
   * If the JSON ref contains a file reference, the file name is included as the first element.
   */
  readonly value: DTCGAliasToken | JSONRefAliasToken;

  constructor(value: string) {
    super();
    // Determine if the value is a DTCG alias token or a JSON ref alias token
    if (AliasTokenValue.isDTCGAliasToken(value)) {
      const pathSegments = DTCGAliasToken.parseDTCGAlias(value);
      this.value = new DTCGAliasToken(pathSegments);
    } else if (AliasTokenValue.isJSONRefAliasToken(value)) {
      const pathSegments = JSONRefAliasToken.parseJSONRef(value);
      this.value = new JSONRefAliasToken(pathSegments);
    } else {
      throw new Error(`Invalid alias token format: ${value}`);
    }
  }

  /**
   * Tests if the given value is an alias token in DTCG dot notation.
   *
   * @param value The value to test.
   * @returns True if the given value is in DTCG dot notation, false
   * otherwise.
   */
  public static isDTCGAliasToken(value: unknown): value is AliasTokenValue {
    // Check if the value is a string
    if (typeof value !== 'string') {
      return false;
    }

    // Next, test if it matches the DTCG alias token pattern
    const isValidDTCGPattern = DTCG_ALIAS_TOKEN_REGEX.test(value);

    if (!isValidDTCGPattern) {
      return false;
    }

    return true;
  }

  /**
   * Tests if the given value is a JSON ref alias token.
   *
   * @param value The value to test.
   * @returns True if the given value is a valid JSON ref pointer, false
   * otherwise.
   */
  public static isJSONRefAliasToken(value: unknown): value is AliasTokenValue {
    if (typeof value !== 'string') {
      return false;
    }

    // Quick check: does it match either pattern?
    const isJSONOnly = JSON_ONLY_FILE_PATH.test(value);
    if (isJSONOnly) {
      return true; // Pure JSON file refs are always valid
    }

    // Check JSON ref with pointer pattern
    const match = value.match(JSON_REF_ALIAS_TOKEN_REGEX);
    if (!match) {
      return false;
    }

    // Validate the file part (if present) is not a generic path
    const filePart = match[1].endsWith('#') ? match[1].slice(0, -1) : match[1];
    const isGenericPath = IS_GENERIC_FILE_PATH_REGEX.test(filePart);
    const isActualFile = JSON_ONLY_FILE_PATH.test(filePart);

    // Valid if it's an actual file reference, not a generic path
    return !isGenericPath || isActualFile;
  }

  /**
   * Tests if the given value is an alias token.
   *
   * @param value The value to test.
   * @returns True if the value is an alias token, false otherwise.
   */
  public static isAliasToken(value: unknown): value is AliasTokenValue {
    return (
      AliasTokenValue.isDTCGAliasToken(value) ||
      AliasTokenValue.isJSONRefAliasToken(value)
    );
  }
}

export type MaybeAlias<T> = T | AliasTokenValue;
