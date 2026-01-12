/**
 * Utility functions for file operations.
 */

import { readFile } from "fs/promises";
import * as path from "path";

export async function readJSONFile(path: string): Promise<object> {
  try {
    const data = await readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to read or parse JSON file at ${path}: ${error}`);
  }
}
