import { Node, NodeType } from '../node';
import type { TokenType } from '../types';

/**
 * Groups are nodes that can contain other nodes, including tokens and other groups.
 *
 * Groups help organize tokens into hierarchical structures.
 * They can also specify properties that apply to all tokens within the group,
 * such as a common type or description.
 *
 * Per DTCG specification, a node is considered a group if it does not
 * have a `$value` property.
 *
 * @see https://www.designtokens.org/tr/2025.10/format/#groups
 */
export class Group extends Node {
  /**
   * The kind of the node.
   */
  readonly kind: NodeType = 'group' as const;

  /**
   * The members of the group.
   */
  private _members: Node[] = [];

  /**
   * The type that all tokens in this group should conform to.
   *
   * @remarks According to the DTCG specification, a group node
   * may specify the `$type` property to indicate the type of tokens it contains.
   *
   * @property `$type`
   *
   * All tokens within this group should adhere to this type.
   *
   * Validation should include that if a token has `$type` defined,
   * that it matches the group's `$type`. If token omits `$type`,
   * it should inherit the group's type.
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#group-properties
   */
  readonly type?: TokenType;

  /**
   * A string to describe the purpose of the group. It is optional.
   *
   * @remarks According to the DTCG specification, a group node
   * may include a `$description` property to provide additional context.
   *
   * @property `$description`
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#group-properties
   */
  readonly description?: string;

  /**
   * An object to hold custom extensions for the group. It is optional.
   * This is not used by Token Shift. It is used to store metadata from other tools.
   * According to the DTCG specification, we will just ignore it, but
   * we will preserve it when reading and writing tokens.
   *
   * @remarks According to the DTCG specification, a group node
   * may include a `$extensions` property to hold custom extensions.
   * It is typically stored as an object with key-value pairs where
   * the key is a vendor ID / namespace and the value is the extension data.
   *
   * @property `$extensions`
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#group-properties
   */
  readonly extensions?: Record<string, unknown>;

  /**
   * Indicates whether the group is deprecated. It is optional.
   *
   * @remarks According to the DTCG specification, a group node
   * may include a `$deprecated` property to signal that the group is deprecated.
   *
   * @property `$deprecated`
   *
   * When set to `true`, it indicates that the group is deprecated.
   * If omitted or set to `false`, the group is considered active.
   * It can also be a string. If it is a string, it means that
   * the group is deprecated with the provided reason.
   *
   * @see https://www.designtokens.org/tr/2025.10/format/#group-properties
   */
  readonly deprecated?: boolean | string;

  /**
   * Creates a new group with the given name.
   *
   * @param name The name of the group.
   */
  constructor(
    name: string,
    options?: {
      type?: TokenType;
      description?: string;
      extensions?: Record<string, unknown>;
      deprecated?: boolean | string;
    },
  ) {
    super(name);
    this.type = options?.type;
    this.description = options?.description;
    this.extensions = options?.extensions;
    this.deprecated = options?.deprecated;
  }

  /**
   * Gets the members of the group.
   */
  get members(): readonly Node[] {
    return this._members.slice();
  }

  /**
   * Adds a node to the group.
   *
   * @param node The node to add to the group.
   */
  add(node: Node): this {
    // Set the parent of the node to this group.
    node.parent = this;
    this._members.push(node);
    return this;
  }

  find(path: string[] | string): Node | undefined {
    // If a string is provided, split it into an array based on dots.
    const parts =
      typeof path === 'string'
        ? path
            .split('.')
            .map(p => p.trim())
            .filter(Boolean)
        : path;

    // If the path is empty, return this group.
    if (parts.length === 0) {
      return this;
    }

    // Get the first part of the path.
    const [first, ...rest] = parts;

    // Find the member with the matching name.
    const member = this._members.find(m => m.name === first);

    // If no member is found, return undefined.
    if (!member) {
      return undefined;
    }

    // If there are no more parts in the path, return the member.
    if (rest.length === 0) {
      return member;
    }

    // If the member is a group, recursively search within it.
    return member instanceof Group ? member.find(rest) : undefined;
  }

  /**
   * Finds a node by path, or returns this Group if not found.
   *
   * @param path The path of the token to find.
   * @returns Either the found node, or this
   * Group if not found.
   */
  findOrSelf(path: string[] | string): Node {
    const found = this.find(path);
    return found ?? this;
  }

  /**
   * Gets whether the group is deprecated.
   *
   * @returns True if deprecated, false otherwise.
   */
  isDeprecated(): boolean {
    return this.deprecated === true || typeof this.deprecated === 'string';
  }
}
