/**
 * Utility functions for type checking and validation.
 */

import {
  NonSlottedComposerConfig,
  NonSlottedVariantInputValue,
  NonSlottedVariants,
} from './types';

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
export const resolveNonSlotVariantValue = <
  TVariants extends NonSlottedVariants,
  K extends keyof TVariants,
>(
  variant: K,
  input: NonSlottedVariantInputValue<TVariants>,
  config: NonSlottedComposerConfig<TVariants>
): keyof TVariants | undefined => {
  const rawInput = input?.[variant];

  // Return back the user-provided value for the variant if it exists
  const userValue = typeof rawInput === 'boolean' ? String(rawInput) : rawInput;
  if (userValue !== undefined) return userValue as keyof TVariants;

  // Check if the config has a default value for the variant
  // If it does, return that value
  const defaultRaw = config.defaultVariants?.[variant];

  // If the default value exists and is a boolean, convert it to a string
  // Otherwise, just return the default value as is
  const defaultValue =
    defaultRaw !== undefined
      ? typeof defaultRaw === 'boolean'
        ? String(defaultRaw) // Convert boolean to string
        : defaultRaw // Keep the original value if it's not a boolean
      : undefined; // If no default value, set to undefined
  if (defaultValue !== undefined) return defaultValue as keyof TVariants;

  // If neither, then return back undefined to skip this variant
  return undefined;
};
