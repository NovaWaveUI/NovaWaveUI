/* eslint-disable unicorn/filename-case */
import { useMemo } from 'react';

export interface LocalStorageOptions {
  /**
   * Whether or not to enable the use of local storage.
   */
  enabled?: boolean;
}

export function useLocalStorage(options?: LocalStorageOptions): boolean {
  // Check if the window object is available.
  const isBrowser = typeof globalThis !== 'undefined';

  // Next, memoize to avoid re-renders.
  const isAvailable = useMemo(() => {
    if (!isBrowser || !options?.enabled) {
      return false;
    }

    // Next, do a quick test if local storage is available.
    try {
      const testKey = '__novawaveui_localstorage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }, [options?.enabled, isBrowser]);

  return isAvailable;
}
