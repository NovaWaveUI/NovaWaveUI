import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLayoutEffect } from 'react';
import { useSafeLayoutEffect } from '../src/useSafeLayoutEffect';

describe('useSafeLayoutEffect', () => {
  it('should be defined', () => {
    expect(useSafeLayoutEffect).toBeDefined();
    expect(typeof useSafeLayoutEffect).toBe('function');
  });

  it('should execute the effect callback', () => {
    const effectFn = vi.fn();

    renderHook(() => {
      useSafeLayoutEffect(effectFn, []);
    });

    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  it('should re-run effect when dependencies change', () => {
    const effectFn = vi.fn();
    let count = 0;

    const { rerender } = renderHook(() => {
      useSafeLayoutEffect(effectFn, [count]);
    });

    expect(effectFn).toHaveBeenCalledTimes(1);

    count = 1;
    rerender();

    expect(effectFn).toHaveBeenCalledTimes(2);
  });

  it('should not re-run effect when dependencies are stable', () => {
    const effectFn = vi.fn();
    const deps = [1, 2, 3];

    const { rerender } = renderHook(() => {
      useSafeLayoutEffect(effectFn, deps);
    });

    expect(effectFn).toHaveBeenCalledTimes(1);

    rerender();

    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  it('should call cleanup function on unmount', () => {
    const cleanup = vi.fn();
    const effectFn = vi.fn(() => cleanup);

    const { unmount } = renderHook(() => {
      useSafeLayoutEffect(effectFn, []);
    });

    expect(effectFn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it('should call cleanup before re-running effect', () => {
    const cleanup = vi.fn();
    const effectFn = vi.fn(() => cleanup);
    let count = 0;

    const { rerender } = renderHook(() => {
      useSafeLayoutEffect(effectFn, [count]);
    });

    expect(effectFn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    count = 1;
    rerender();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(effectFn).toHaveBeenCalledTimes(2);
  });

  it('should use useLayoutEffect in browser environment', () => {
    // In a browser/jsdom environment (vitest default), it should be useLayoutEffect
    expect(useSafeLayoutEffect).toBe(useLayoutEffect);
  });
});
