/**
 * Utility functions for file operations.
 */

import { readFile, access, constants } from "fs/promises";
import { glob } from "glob";
import type { TokenShiftInput } from "../config/types";

/**
 * Checks if a given string is a glob pattern.
 *
 * @param str The string to test against.
 * @returns True if the given string is a glob pattern, false otherwise.
 */
function isGlob(str: string): boolean {
  return /[*?[\]{}()]/.test(str);
}

/**
 * Checks if a given string is a valid file path.
 *
 * @param str The string to test against.
 * @returns True if the given string is a valid file path, false otherwise.
 */
function isFilePath(str: string): boolean {
  return /[\/\\]/.test(str);
}

/**
 * Checks if a given string is a valid DTCG token file extension.
 *
 * While the spec specifies .tokens and .tokens.json, it is a recommendation.
 * Therefore, any JSON file can be treated as a token file.
 *
 * @link https://www.designtokens.org/tr/2025.10/format/#file-extensions
 *
 * @param str The string to test against.
 * @returns True if it is a valid DTCG file extension, false otherwise.
 */
function isTokenFile(str: string): boolean {
  return (
    str.endsWith(".tokens") ||
    str.endsWith(".tokens.json") ||
    str.endsWith(".json")
  );
}

/**
 * Resolves a file configuration into a list of file paths. Resolves file globs if necessary.
 *
 * @param fileConfig The file configuration.
 */
export function resolveFileList(fileConfig: TokenShiftInput): string[] {
  // Keep track of the resolved files
  const resolvedFiles: string[] = [];

  if (typeof fileConfig === "string") {
    // It's a single string, check if it is a glob pattern
    if (isGlob(fileConfig)) {
      // Get all files matching the glob pattern
      const files = glob.sync(fileConfig, { nodir: true });
      for (const file of files) {
        if (isTokenFile(file)) {
          resolvedFiles.push(file);
        }
      }
    } else {
      // It's a single file path
      if (isFilePath(fileConfig) && isTokenFile(fileConfig))
        resolvedFiles.push(fileConfig);
    }
  } else if (Array.isArray(fileConfig)) {
    // It's an array of strings, process each one
    for (const entry of fileConfig) {
      if (isGlob(entry)) {
        // Get all files matching the glob pattern
        const files = glob.sync(entry, { nodir: true });
        for (const file of files) {
          if (isTokenFile(file)) {
            resolvedFiles.push(file);
          }
        }
      } else {
        // It's a single file path
        if (isFilePath(entry) && isTokenFile(entry)) resolvedFiles.push(entry);
      }
    }
  }

  return resolvedFiles;
}

/**
 * Reads a JSON file from the given path and parses its content.
 *
 * @param path The file path.
 * @returns The JSON object.
 */
export async function readJSONFile(path: string): Promise<object> {
  try {
    const data = await readFile(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to read or parse JSON file at ${path}: ${error}`);
  }
}

/**
 * Checks if a file exists at the given path.
 *
 * @param filePath The path to the file.
 * @returns Whether or not the file exists.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK | constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads all files specified in the configuration. For each file path provided, it checks
 * if the file exists and reads its content as JSON. If a file does not exist, it skips that file
 * and writes a warning to the console.
 *
 * @param fileConfig The file configuration. Either a single string, or a list of strings.
 */
export async function loadAllFiles(
  fileConfig: TokenShiftInput
): Promise<Map<string, object>> {
  // Map to hold the loaded file contents
  const fileContents = new Map<string, object>();

  // Resolve the file configuration into a list of file paths
  const filePaths = resolveFileList(fileConfig);

  for (const filePath of filePaths) {
    const exists = await fileExists(filePath);
    if (exists) {
      try {
        const content = await readJSONFile(filePath);
        fileContents.set(filePath, content);
      } catch (error) {
        console.warn(
          `Warning: Failed to read or parse file at ${filePath}: ${error}`
        );
      }
    } else {
      console.warn(
        `Warning: File does not exist at path ${filePath}, skipping.`
      );
    }
  }

  return fileContents;
}
