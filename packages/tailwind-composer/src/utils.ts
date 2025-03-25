/**
 * Utility functions for type checking and validation.
 */

import { ComposerConfig, SlotsDef, Variants } from './types';

/**
 * Checks if the given value is a boolean (whether it is a boolean type or a string that can be converted to a boolean).
 * @param value - The value to check.
 * @return True if the value is a boolean or a string that can be converted to a boolean, false otherwise.
 */
export const isBoolean = (value: unknown): boolean => {
  // Check if the value is a boolean
  if (typeof value === 'boolean') {
    return true;
  }

  // Check if the value is a string and can be converted to a boolean
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    return lowerValue === 'true' || lowerValue === 'false';
  }
  return false;
};

/**
 * Merges a given class name (which can be a string, an array of strings, or undefined) into a single string.
 * @param className - The className to merge. It can be a string, an array of strings, or undefined.
 * @returns A single string containing all class names, separated by spaces.
 *          If the input is undefined, an empty string is returned.
 */
export const mergeClassNames = (
  className: string | string[] | undefined
): string => {
  // If the className is undefined, return an empty string
  if (className === undefined) {
    return '';
  }

  // If the className is an array, join it with a space
  if (Array.isArray(className)) {
    return className.join(' ');
  }

  // If the className is a string, return it
  return className;
};

/**
 * Checks if the given value is an object (excluding arrays and null).
 * @param value - The value to check.
 * @return True if the value is an object, false otherwise.
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Checks if the given object is empty (i.e., has no own enumerable properties).
 * @param obj - The object to check.
 * @return True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Given a variant name, and an input object containing the user-defined values for variants,
 * this function resolves the value for the variant. It first checks if the user has provided a value
 * for the variant. If not, it checks the default value from the ComposerConfig. If neither is found,
 * then it returns back undefined. This is useful for determining which variant to apply and
 * for skipping variants that are just not provided.
 *
 * @param variantName The name of the variant to resolve
 * @param input The input object containing user-defined values for variants
 * @param config The ComposerConfig object containing default values and variant definitions
 * @returns The resolved value for the variant, which can be the user-provided value
 * or the default value from the config. If none of these are available,
 * it returns undefined.
 */
export const resolveVariantValue = <
  TSlots extends SlotsDef | undefined,
  TVariants extends Variants<TSlots>,
  K extends keyof TVariants & string,
>(
  variantName: K,
  input: Record<string, any>,
  config: ComposerConfig<TSlots, TVariants>
): keyof TVariants[K] | undefined => {
  const rawInput = input?.[variantName];

  // Return back the user-provided value for the variant if it exists
  const userValue = typeof rawInput === 'boolean' ? String(rawInput) : rawInput;
  if (userValue !== undefined) return userValue;

  // Check if the config has a default value for the variant
  // If it does, return that value
  const defaultRaw = config.defaultVariants?.[variantName];
  const defaultValue =
    typeof defaultRaw === 'boolean' ? String(defaultRaw) : defaultRaw;
  if (defaultValue !== undefined) return defaultValue as keyof TVariants[K];

  // If neither the user nor the config has a value for the variant,
  // return back undefined to skip this variant
  return undefined;
};
