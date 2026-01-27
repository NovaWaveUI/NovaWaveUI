export type NodeType = 'group' | 'token';

/**
 * The base class for all token nodes (groups and tokens).
 */
export abstract class Node {
  constructor(public readonly name: string) {}

  /**
   * The parent node of this node. It is optional.
   *
   * @remarks This property is not set during construction. It should be set
   * when the node is added to a group.
   *
   * Most of the time, the only time this property is `undefined` is when the node
   * is the root node of a token set.
   */
  parent?: Node;

  /**
   * The kind of the node.
   */
  abstract get kind(): NodeType;
}
