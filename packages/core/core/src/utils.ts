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

export function objectToDeps(obj: Record<string, any>) {
  return Object.values(obj).flatMap(value =>
    Array.isArray(value) ? value : [value]
  );
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

/**
 * Checks if a given React element is a NovaWaveUI element.
 *
 * @param element The element to check if it is a NovaWaveUI element
 * @returns Returns true if the element is a NovaWaveUI element
 */
export const isNovaWaveUIElement = (
  element: React.ForwardRefExoticComponent<any>
) => {
  return element?.displayName?.startsWith('NovaWaveUI');
};

/**
 * The function extracts the NovaWaveUI prefix fromt the display name
 * and returns the component name that follows. For example, "NovaWaveUIButton"
 * would return "button", "NovaWaveUIContextMenuItem" would return "contextMenuItem".
 *
 * @param displayName The display name of the component
 * @returns The component name extracted from the display name
 */
export const extractComponentFromDisplayName = (displayName?: string) => {
  if (!displayName) {
    return '';
  }

  // Check if the display name starts with NovaWaveUI
  if (!displayName.startsWith('NovaWaveUI')) {
    return displayName;
  }

  // Now remove the NovaWaveUI prefix and lowercase the first letter
  const componentName = displayName.replace('NovaWaveUI', '');
  return componentName.charAt(0).toLowerCase() + componentName.slice(1);
};

/**
 *
 * @param props The props to be mapped
 * @param variants The variants to be filtered
 * @param filter Whether to filter the props or not
 */
export const mapPropsToVariants = <
  T extends Record<string, any>,
  K extends keyof any = keyof any,
>(
  props: T,
  variants: readonly K[],
  filter?: boolean
) => {
  if (!variants) {
    return [props, {}] as [T, Partial<T>];
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const pickedProps = variants.reduce((acc, variant) => {
    if (variant in props) {
      // Only add the key if it's actually in T
      (acc as any)[variant as keyof T] = props[variant as keyof T];
    }
    return acc;
  }, {} as Partial<T>);

  if (filter) {
    const omitted = Object.keys(props)
      .filter(key => !variants.includes(key as K))
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce((acc, key) => ({ ...acc, [key]: props[key] }), {} as Partial<T>);

    return [omitted, pickedProps] as [
      Omit<T, Extract<keyof T, K>>,
      Pick<T, Extract<keyof T, K>>,
    ];
  } else {
    return [props, pickedProps] as [T, Pick<T, Extract<keyof T, K>>];
  }
};
