import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { readFile, access, constants } from 'fs/promises';
import * as fileUtils from '../../src/utils/file';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturesDir = join(__dirname, '../fixtures');

describe('file.ts utilities', () => {
  describe('resolveFileList', () => {
    it('should resolve a single file path', () => {
      const result = fileUtils.resolveFileList(
        join(fixturesDir, 'valid-tokens/colors.json'),
      );
      expect(result).toContain(join(fixturesDir, 'valid-tokens/colors.json'));
    });

    it('should resolve multiple file paths from an array', () => {
      const files = [
        join(fixturesDir, 'valid-tokens/colors.json'),
        join(fixturesDir, 'valid-tokens/colors.tokens.json'),
      ];
      const result = fileUtils.resolveFileList(files);
      expect(result).toHaveLength(2);
      expect(result).toContain(files[0]);
      expect(result).toContain(files[1]);
    });

    it('should resolve glob patterns', () => {
      const globPattern = join(fixturesDir, 'valid-tokens/*.json');
      const result = fileUtils.resolveFileList(globPattern);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(f => f.endsWith('.json'))).toBe(true);
    });

    it('should handle .tokens files', () => {
      const globPattern = join(fixturesDir, 'valid-tokens/*.tokens');
      const result = fileUtils.resolveFileList(globPattern);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter out non-token files', () => {
      const globPattern = join(fixturesDir, 'invalid/*');
      const result = fileUtils.resolveFileList(globPattern);
      // Should only include .json files, not .txt
      expect(result).not.toContainEqual(expect.stringContaining('.txt'));
    });

    it("should ignore non-file paths (globs that don't match)", () => {
      const result = fileUtils.resolveFileList(
        join(fixturesDir, 'nonexistent/*.json'),
      );
      expect(result).toHaveLength(0);
    });

    it('should handle empty array input', () => {
      const result = fileUtils.resolveFileList([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('readJSONFile', () => {
    it('should read and parse a valid JSON file', async () => {
      const filePath = join(fixturesDir, 'valid-tokens/colors.json');
      const result = await fileUtils.readJSONFile(filePath);
      expect(result).toHaveProperty('colors');
      expect(result).toHaveProperty('colors.primary');
    });

    it('should read .tokens.json files', async () => {
      const filePath = join(fixturesDir, 'valid-tokens/colors.tokens.json');
      const result = await fileUtils.readJSONFile(filePath);
      expect(result).toHaveProperty('tokens');
    });

    it('should throw an error for malformed JSON', async () => {
      const filePath = join(fixturesDir, 'invalid/malformed.json');
      await expect(fileUtils.readJSONFile(filePath)).rejects.toThrow(
        /Failed to read or parse JSON file/,
      );
    });

    it('should throw an error for non-existent files', async () => {
      const filePath = join(fixturesDir, 'nonexistent/file.json');
      await expect(fileUtils.readJSONFile(filePath)).rejects.toThrow();
    });
  });

  describe('fileExists', () => {
    it('should return true for existing files', async () => {
      const filePath = join(fixturesDir, 'valid-tokens/colors.json');
      const exists = await fileUtils.fileExists(filePath);
      expect(exists).toBe(true);
    });

    it('should return false for non-existent files', async () => {
      const filePath = join(fixturesDir, 'nonexistent/file.json');
      const exists = await fileUtils.fileExists(filePath);
      expect(exists).toBe(false);
    });

    it('should return true for readable directories', async () => {
      const dirPath = join(fixturesDir, 'valid-tokens');
      const exists = await fileUtils.fileExists(dirPath);
      // The function checks for read access, which succeeds for readable directories
      expect(exists).toBe(true);
    });
  });

  describe('loadAllFiles', () => {
    it('should load all valid token files from a directory', async () => {
      const globPattern = join(fixturesDir, 'valid-tokens/*.json');
      const result = await fileUtils.loadAllFiles(globPattern);
      expect(result.size).toBeGreaterThan(0);
      expect(result.has(join(fixturesDir, 'valid-tokens/colors.json'))).toBe(
        true,
      );
    });

    it('should load files from an array of paths', async () => {
      const files = [
        join(fixturesDir, 'valid-tokens/colors.json'),
        join(fixturesDir, 'valid-tokens/colors.tokens.json'),
      ];
      const result = await fileUtils.loadAllFiles(files);
      expect(result.size).toBe(2);
    });

    it('should skip non-existent files with warning', async () => {
      const consoleSpy = vi.spyOn(console, 'warn');
      const files = [
        join(fixturesDir, 'valid-tokens/colors.json'),
        join(fixturesDir, 'nonexistent/file.json'),
      ];
      const result = await fileUtils.loadAllFiles(files);
      expect(result.size).toBe(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('File does not exist'),
      );
      consoleSpy.mockRestore();
    });

    it('should skip malformed JSON files with warning', async () => {
      const consoleSpy = vi.spyOn(console, 'warn');
      const files = [
        join(fixturesDir, 'valid-tokens/colors.json'),
        join(fixturesDir, 'invalid/malformed.json'),
      ];
      const result = await fileUtils.loadAllFiles(files);
      expect(result.size).toBe(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to read or parse file'),
      );
      consoleSpy.mockRestore();
    });

    it('should return an empty map when no valid files are found', async () => {
      const globPattern = join(fixturesDir, 'nonexistent/*.json');
      const result = await fileUtils.loadAllFiles(globPattern);
      expect(result.size).toBe(0);
    });
  });
});
