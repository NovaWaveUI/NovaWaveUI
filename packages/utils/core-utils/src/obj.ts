/**
 * Removes the specified keys from the object.
 *
 * @param obj The object to remove the keys from
 * @param keys The keys to remove
 * @returns The object without the specified keys
 */
export function removeKeys<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K | K[]
): Omit<T, K> {
  const result = { ...obj };

  // If keys is not an array, it is a single key
  if (Array.isArray(keys)) {
    // If keys is an array, go through each key and delete
    for (const key of keys) {
      delete result[key];
    }
  } else {
    delete result[keys];
  }

  return result;
}
