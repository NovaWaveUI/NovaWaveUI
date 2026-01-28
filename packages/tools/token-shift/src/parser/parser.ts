/**
 * @fileoverview The parsing functionality for token-shift.
 */

import { AliasToken, AliasTokenValue } from '../tokens/alias/alias';
import { Group } from '../tokens/group/group';
import { Node } from '../tokens/node';
import { TokenType } from '../tokens/types';

/**
 * Used as a placeholder for the root path in the token hierarchy.
 *
 * @remarks This does not actually appear in the token structure;
 * it is only used internally during parsing to represent the root level
 * since the root does not have a name.
 */
const TOKEN_SHIFT_ROOT_RESERVED_KEYWORD = '<TOKEN_SHIFT_ROOT>';

/**
 * Represents the raw JSON structure of a token as per the DTCG specification.
 */
export type RawTokenJSON = {
  $value: unknown;
  $type?: TokenType;
  $description?: string;
  $extensions?: Record<string, unknown>;
  $deprecated?: boolean | string;
};

/**
 * Represents the raw JSON structure of a group as per the DTCG specification.
 */
type RawGroupJSON = {
  $type?: TokenType;
  $description?: string;
  $extensions?: Record<string, unknown>;
  $deprecated?: boolean | string;
  [key: string]: unknown; // Members of the group
};

const RESERVED_KEYS = new Set([
  '$value',
  '$type',
  '$description',
  '$extensions',
  '$deprecated',
]);

/**
 * Type guard to check if a value is a plain object.
 *
 * @param value The value to test if it is a plain object.
 * @returns True if the value is a plain object, false otherwise.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Type guard to check if a value is a RawTokenJSON.
 *
 * @param value The value to test.
 * @returns True if the value is a RawTokenJSON, false otherwise.
 */
function isRawToken(value: Record<string, unknown>): value is RawTokenJSON {
  return '$value' in value;
}

export interface ParseContext {
  path: string[];
  inheritedType?: TokenType;
}

function formatPath(path: string[]): string {
  return path.length === 0 ? TOKEN_SHIFT_ROOT_RESERVED_KEYWORD : path.join('.');
}

/**
 * The parser function type for parsing tokens and groups.
 */
export type TokenParser = (args: {
  name: string;
  raw: RawTokenJSON;
  context: ParseContext;
}) => Node;

export class TokenParserRegistry {
  private readonly parsers: Map<TokenType, TokenParser> = new Map();

  /**
   * Registers a parser for a specific token type.
   *
   * @param type The token type to register the parser for.
   * @param parser The parser function to register.
   */
  registerParser(type: TokenType, parser: TokenParser): void {
    this.parsers.set(type, parser);
  }

  /**
   * Gets the parser for a specific token type.
   *
   * @param type The token type to get the parser for.
   * @returns The parser function if found, undefined otherwise.
   */
  getParser(type: TokenType): TokenParser | undefined {
    return this.parsers.get(type);
  }
}

export function parseTokenDocument(
  raw: unknown,
  registry: TokenParserRegistry,
): Group {
  if (!isPlainObject(raw)) {
    throw new Error('Invalid token document: must be a JSON object.');
  }

  const root = new Group(TOKEN_SHIFT_ROOT_RESERVED_KEYWORD);

  for (const [key, value] of Object.entries(raw)) {
    if (!isPlainObject(value)) {
      throw new Error(`Invalid member at path "${key}": expected an object.`);
    }

    // Parse the member node
    const memberNode = parseNode(
      key,
      value,
      {
        path: [key],
      },
      registry,
    );

    root.add(memberNode);
  }

  return root;
}

/**
 * Parses a raw object into a Node (Token or Group).
 *
 * @param name The name of the object.
 * @param rawObj The raw JSON content.
 * @param ctx The parse context.
 * @param registry The registry that contains the appropiate parsers.
 */
function parseNode(
  name: string,
  rawObj: Record<string, unknown>,
  ctx: ParseContext,
  registry: TokenParserRegistry,
): Node {
  // Token
  if (isRawToken(rawObj)) {
    // Cast to RawTokenJSON
    const raw = rawObj as RawTokenJSON;

    // 1. Try to resolve candidate type (may still be undefined)
    const candidateType: TokenType | undefined = raw.$type ?? ctx.inheritedType;

    // 2. If the $value is a string, check to see if it is an alias
    if (typeof raw.$value === 'string') {
      if (AliasTokenValue.isAliasToken(raw.$value as string)) {
        // It is an alias token, so construct it and return back
        // Since it is an alias, it is ok that the candidateType is undefined
        // We will check later that the resolved token matches the expected type
        return new AliasToken(name, new AliasTokenValue(raw.$value as string), {
          type: candidateType,
          description: raw.$description,
          extensions: raw.$extensions,
          deprecated: raw.$deprecated,
        });
      }
    }

    // 3. Otherwise, we need to have a candidate type to parse the token
    if (!candidateType) {
      throw new Error(
        `Cannot parse token at path "${formatPath(ctx.path)}" without a defined type.`,
      );
    }

    // 4. Lookup the parser for the candidate type
    const parser = registry.getParser(candidateType);
    if (!parser) {
      throw new Error(
        `No parser registered for token type "${candidateType}" at path "${formatPath(ctx.path)}".`,
      );
    }

    // If the type is provided, it muist match the candidate type
    if (raw.$type && ctx.inheritedType && raw.$type !== ctx.inheritedType) {
      throw new Error(
        `Token type mismatch at path "${formatPath(ctx.path)}": expected "${ctx.inheritedType}", got "${raw.$type}".`,
      );
    }

    // 5. Parse the token using the parser
    return parser({
      name,
      raw,
      context: { ...ctx, inheritedType: candidateType },
    });
  }

  // Group
  const groupRaw = rawObj as RawGroupJSON;

  // Get the group type
  const groupType: TokenType | undefined = groupRaw.$type ?? ctx.inheritedType;

  // Create the group
  const group = new Group(name, {
    type: groupType,
    description: groupRaw.$description,
    extensions: groupRaw.$extensions,
    deprecated: groupRaw.$deprecated,
  });

  for (const [key, value] of Object.entries(groupRaw)) {
    if (RESERVED_KEYS.has(key)) {
      continue; // Skip reserved keys
    }

    if (!isPlainObject(value)) {
      throw new Error(
        `Invalid member at path "${formatPath([...ctx.path, key])}": expected an object.`,
      );
    }

    // Parse the member node recursively
    const memberNode = parseNode(
      key,
      value,
      {
        ...ctx,
        path: [...ctx.path, key],
        inheritedType: groupType,
      },
      registry,
    );

    group.add(memberNode);
  }

  return group;
}
