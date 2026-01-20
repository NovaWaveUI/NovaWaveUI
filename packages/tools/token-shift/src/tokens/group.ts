import { Node } from './node';

export class Group extends Node {
  /**
   * The members of the group.
   */
  readonly members: Node[] = [];

  /**
   * Creates a new group with the given name.
   *
   * @param name The name of the group.
   */
  constructor(name: string) {
    super(name);
  }

  /**
   * Adds a node to the group.
   *
   * @param node The node to add to the group.
   */
  add(node: Node) {
    this.members.push(node);
  }
}
