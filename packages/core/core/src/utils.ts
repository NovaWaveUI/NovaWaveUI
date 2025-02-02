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
