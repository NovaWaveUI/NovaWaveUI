/**
 * @fileoverview Types that relate to JSON.
 */

/**
 * Represents a JSON primitive value.
 *
 * JSON primitive values include:
 * - string
 * - number
 * - boolean
 * - null
 */
export type JSONPrimitive = string | number | boolean | null;

/**
 * Represents any valid JSON value.
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

/**
 * Represents a JSON object.
 */
export interface JSONObject {
  [key: string]: JSONValue;
}

/**
 * Represents a JSON array.
 */
export interface JSONArray extends Array<JSONValue> {}
