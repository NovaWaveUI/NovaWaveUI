import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useLocalStorage } from '../src/useLocalStorage';

describe('useLocalStorage', () => {
  it('should return false when localStorage is not available', () => {
    const { result } = renderHook(() => useLocalStorage({ enabled: false }));
    expect(result.current[0]).toBe(false);
  });
});
