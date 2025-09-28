import React, { useEffect, useRef } from 'react';

/**
 * Assigns a value to a ref (function or object).
 */
export function assignRef<T>(ref: React.Ref<T> | undefined, value: T): void {
  // eslint-disable-next-line unicorn/no-null
  if (ref == null || ref == undefined) return;

  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      (ref as React.RefObject<T>).current = value;
    } catch {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

/**
 * Merges multiple refs into a single callback ref.
 */
export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value: T) => {
    for (const ref of refs) assignRef(ref, value);
  };
}

/**
 * Internal utility that normalizes any ref into a MutableRefObject.
 * Handles both callback refs and object refs, with cleanup support.
 */
export function useObjectRef<T>(ref?: React.Ref<T>): React.RefObject<T | null> {
  const objRef = React.useRef<T | null>(null);
  const cleanupRef = React.useRef<(() => void) | void>(undefined);

  return React.useMemo(
    () => ({
      get current() {
        return objRef.current;
      },
      set current(value: T | null) {
        objRef.current = value;

        // cleanup old
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = undefined;
        }

        if (ref) {
          if (typeof ref === 'function') {
            const maybeCleanup = ref(value);
            if (typeof maybeCleanup === 'function') {
              cleanupRef.current = maybeCleanup;
            } else if (value !== null) {
              // eslint-disable-next-line unicorn/no-null
              cleanupRef.current = () => ref(null);
            }
          } else {
            (ref as React.RefObject<T | null>).current = value;
            if (value !== null) {
              cleanupRef.current = () => {
                // eslint-disable-next-line unicorn/no-null
                (ref as React.RefObject<T | null>).current = null;
              };
            }
          }
        }
      },
    }),
    [ref]
  );
}

/**
 * Ensures you always get a valid DOM ref object.
 *
 * - Works with object refs, callback refs, or nothing.
 * - Internally uses `useObjectRef` for lifecycle correctness.
 * - Defaults to HTMLElement, but you can narrow to any subclass.
 *
 * @example
 * const ref = useDOMRef<HTMLInputElement>();
 */
export function useDOMRef<T extends Element = HTMLElement>(
  ref?: React.Ref<T | null>
): React.RefObject<T | null> {
  const domRef = useRef<T>(null);

  // Always sync external ref
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(domRef.current);
    } else {
      ref.current = domRef.current;
    }
  }, [ref]);

  return domRef;
}
