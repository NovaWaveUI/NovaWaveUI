/**
 * @fileoverview Contains the base definition for all tokens.
 */

import { Node } from './node';
import { TokenType } from './types';

export abstract class TokenValue {
  /**
   * Validates the token value.
   */
  validate?(): void;
}

export interface TokenData {
  type?: TokenType;
  description?: string;
  extensions?: Record<string, unknown>;
  deprecated?: boolean | string;
}

/**
 * Represents a token node. A token is a leaf node in the token hierarchy
 * that contains a value.
 *
 * @remarks According to the DTCG specification, a token node is defined
 * by the presence of a `$value` property, which holds the actual value of the token.
 *
 * Tokens can also have additional properties such as `$type`, `$description`,
 * and custom extensions.
 *
 * @property `$value` - The value of the token. This can be of various types,
 * including string, number, boolean, or complex objects depending on the token type.
 *
 * @see https://www.designtokens.org/tr/2025.10/format/#design-token-0
 *
 * @template TValue - The type of the token's value. This should be any object.
 */
export abstract class Token<TValue extends TokenValue> extends Node {
  /**
   * The kind of the node.
   */
  readonly kind = 'token' as const;

  /**
   * The type of the token.
   *
   * @remarks According to the DTCG specification, a token node
   * may specify the `$type` property to indicate the type of the token.
   * If omitted, the type may be inherited from the parent group.
   *
   * @property `$type`
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#name-and-value
   */
  readonly type?: TokenType;

  /**
   * The value of the token.
   *
   * @remarks This property is required for all token nodes.
   * The value can be of various types depending on the token type.
   *
   * @property `$value`
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#name-and-value
   */
  abstract readonly value: TValue;

  /**
   * A string to describe the purpose of the token. It is optional.
   *
   * @remarks According to the DTCG specification, a token node
   * may include a `$description` property to provide additional context.
   *
   * @property `$description`
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#additional-properties
   */
  readonly description?: string;

  /**
   * An object to hold custom extensions for the token. It is optional.
   * This is not used by Token Shift. It is used to store metadata from other tools.
   * According to the DTCG specification, we will just ignore it, but
   * store it here for completeness.
   *
   * @property `$extensions`
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#additional-properties
   */
  readonly extensions?: Record<string, unknown>;

  /**
   * Indicates whether the token is deprecated. It is optional.
   *
   * @remarks According to the DTCG specification, a token node
   * may include a `$deprecated` property to indicate that the token is deprecated.
   *
   * When set to `true`, it indicates that the token is deprecated.
   * If omitted or set to `false`, the token is considered active.
   * It can also be a string. If it is a string, it means that
   * the token is deprecated with the provided reason.
   *
   * @property `$deprecated`
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#additional-properties
   */
  readonly deprecated?: boolean | string;

  /**
   * The raw JSON representation of the token.
   * May be undefined if not applicable.
   * Useful for debugging.
   */
  abstract raw?: unknown;

  /**
   * Converts the token to a JSON-serializable format.
   *
   * @returns The JSON-serializable representation of the token.
   */
  abstract toJSON(): unknown;

  /**
   * Creates a new token with the given name.
   *
   * @param name The name of the token.
   * @param options Additional options for the token.
   */
  constructor(name: string, options?: TokenData) {
    super(name);
    this.type = options?.type;
    this.description = options?.description;
    this.extensions = options?.extensions;
    this.deprecated = options?.deprecated;
  }
}
