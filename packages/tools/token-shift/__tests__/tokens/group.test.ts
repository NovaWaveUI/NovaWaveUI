/**
 * @fileoverview Tests for the group token functionality.
 */
import { describe, expect, it } from 'vitest';
import { Group } from '../../src/tokens/group';

describe('Group Token', () => {
  it('should create a group token with the correct properties', () => {
    const group = new Group('colors', {
      description: 'Color tokens',
      extensions: { 'com.github/novawaveui': { customProperty: true } },
    });
    expect(group.name).toBe('colors');
    expect(group.description).toBe('Color tokens');
    expect(group.extensions).toEqual({
      'com.github/novawaveui': { customProperty: true },
    });
  });

  it('should handle optional properties correctly', () => {
    const group = new Group('spacing');
    expect(group.name).toBe('spacing');
    expect(group.description).toBeUndefined();
    expect(group.extensions).toBeUndefined();
    expect(group.deprecated).toBeUndefined();
    expect(group.type).toBeUndefined();
  });

  it('should set deprecated and type properties when provided', () => {
    const group = new Group('shadow', {
      deprecated: true,
      type: 'shadow',
    });
    expect(group.deprecated).toBe(true);
    expect(group.type).toBe('shadow');
  });

  it('should set deprecated to a string when provided', () => {
    const group = new Group('border', {
      deprecated: 'Use new border tokens',
    });
    expect(group.deprecated).toBe('Use new border tokens');
  });

  it('should set isDeprecated method correctly', () => {
    const activeGroup = new Group('activeGroup');
    const deprecatedGroupBoolean = new Group('deprecatedGroupBoolean', {
      deprecated: true,
    });
    const deprecatedGroupString = new Group('deprecatedGroupString', {
      deprecated: 'This group is deprecated',
    });

    expect(activeGroup.isDeprecated()).toBe(false);
    expect(deprecatedGroupBoolean.isDeprecated()).toBe(true);
    expect(deprecatedGroupString.isDeprecated()).toBe(true);
  });

  it('should add members to group correctly', () => {
    const group = new Group('typography');
    const subGroup = new Group('headings');
    group.add(subGroup);
    expect(group.members).toHaveLength(1);
    expect(group.members[0]).toBe(subGroup);
  });

  it('should set the parent of added members to the group itself', () => {
    const group = new Group('layout');
    const subGroup = new Group('grid');
    group.add(subGroup);
    expect(subGroup.parent).toBe(group);
  });

  it('should find members by path correctly', () => {
    const colorsGroup = new Group('colors');
    const primaryGroup = new Group('primary');
    const primaryShadeGroup = new Group('500');

    colorsGroup.add(primaryGroup);
    primaryGroup.add(primaryShadeGroup);

    const foundToken = colorsGroup.find(['primary']);
    expect(foundToken).toBe(primaryGroup);

    const notFoundToken = colorsGroup.find(['secondary']);
    expect(notFoundToken).toBeUndefined();

    const shadeFoundToken = colorsGroup.find('primary.500');
    expect(shadeFoundToken).toBe(primaryShadeGroup);
  });

  it('should return the group itself when findOrSelf does not find a member', () => {
    const group = new Group('borders');
    const result = group.findOrSelf('nonexistent');
    expect(result).toBe(group);
  });
});
