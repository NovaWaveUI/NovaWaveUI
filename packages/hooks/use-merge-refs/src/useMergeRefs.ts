import React from 'react';

/**
 * Merges multiple refs into a single ref callback. Useful for combining
 * refs from different sources (e.g., `forwardRef`, `useRef`, `useImperativeHandle`)
 * and making sure they all get called.
 *
 * @param refs The refs to merge
 * @returns The merged ref callback
 */
export function useMergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return React.useCallback((node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;

      if (typeof ref === 'function') {
        ref(node); // Calls function ref (e.g., `scope`)
      } else if ('current' in ref && !Object.isFrozen(ref)) {
        (ref as React.RefObject<T | null>).current = node;
      }
    }
  }, refs);
}
