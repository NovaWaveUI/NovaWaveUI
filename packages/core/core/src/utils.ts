import React from 'react';
import { mergeProps } from '@react-aria/utils';
import { dataAttr } from '@novawaveui/aria-utils';
import { error } from '@novawaveui/dev-utils';
import { filterDOMProps } from './dom';

/**
 * A configuration object for a slot.
 */
export type SlotConfig<T extends string> = Record<
  T,
  {
    dependencies?: any[];
    props: Record<string, any>;
    dataAttrs?: Record<string, boolean | string | number | undefined>;
  }
>;

/**
 * Merges the properties of two objects into a new object.
 *
 * @template T - The type of the first object.
 * @template U - The type of the second object.
 * @param {T} obj1 - The first object to merge.
 * @param {U} obj2 - The second object to merge.
 * @returns {T & U} A new object containing all properties from both input objects.
 */
export function mergeProperties<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

/**
 * Hook to generate a slot-based function that merges default properties with user-provided properties and data attributes.
 * This is memoized based on the dependencies of the slot configurations. That is important to avoid unnecessary re-renders
 * and keep the performance of the component.
 *
 * @param {SlotConfig<T>} slotConfigs - An object where each key is a slot name, and each value is a slot configuration object
 * - `dependencies` (optional) - An array of values that trigger updates (useful for memoization)
 * - `props` - An object containing the default properties for the slot
 * - `dataAttrs` (optional) - An object containing data attributes to apply to the slot
 * @returns A function that merges the default properties with the provided properties and data attributes
 */
export function useSlotProps<T extends string>(
  componentName: string,
  slotConfigs: SlotConfig<T>,
  elementMap: Record<T, React.ElementType> = {} as Record<T, React.ElementType>
) {
  return React.useMemo(
    () => {
      return (
        slotName: T,
        extraProps: Record<string, any> = {},
        ref?: React.Ref<any>
      ) => {
        // Pull out the slot configuration
        const slotConfig = slotConfigs[slotName];

        // If the slot does not exist, log an error
        if (!slotConfig) {
          error(`The slot "${slotName}" does not exist`, componentName);
          return {};
        }

        // Merge default props with user-provided props
        const mergedProps = mergeProps(slotConfig.props, extraProps);

        // Apply `data-*` attributes dynamically
        if (slotConfig.dataAttrs) {
          for (const [key, value] of Object.entries(slotConfig.dataAttrs)) {
            if (value !== undefined) {
              if (typeof value === 'boolean') {
                mergedProps[`data-${key}`] = dataAttr(value);
              } else {
                mergedProps[`data-${key}`] = value;
              }
            }
          }
        }

        // Apply ref if provided
        if (ref) {
          mergedProps.ref = ref;
        }

        // Filter out invalid DOM attributes
        const element = elementMap[slotName] || 'div';
        const filteredProps = filterDOMProps(mergedProps, element);
        return filteredProps;
      };
    },
    // Add the dependencies of the slot configurations
    Object.values(slotConfigs).flatMap(
      config => (config as SlotConfig<T>[T]).dependencies ?? []
    )
  );
}
