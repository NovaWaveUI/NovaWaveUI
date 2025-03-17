/**
 * Utility functions for type checking and validation.
 */

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
