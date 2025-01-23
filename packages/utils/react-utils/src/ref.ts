import React from 'react';

/**
 * ReactRef is a type that can be used to define a React ref.
 * It can be a RefObject, MutableRefObject, or a Ref.
 */
export type ReactRef<T> =
  | React.RefObject<T>
  | React.MutableRefObject<T>
  | React.Ref<T>;

/**
 * Assigns a value to a ref.
 *
 * @param ref The ref to assign the value to.
 * @param value The value to assign to the ref.
 * @throws If the ref is not a function or does not have a current property.
 * @example
 *
 * ```tsx
 * const ref = React.useRef<HTMLDivElement>(null);
 *
 * assignRef(ref, document.createElement("div"));
 * ```
 */
export function assignRef<T>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      (ref as any).current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

/**
 * Merges multiple refs into a single ref.
 *
 * @param refs The refs to merge.
 * @returns A ref that, when set, sets all the refs.
 * @example
 *
 * ```tsx
 * const ref1 = React.useRef<HTMLDivElement>(null);
 * const ref2 = React.useRef<HTMLDivElement>(null);
 * const mergedRef = mergeRefs(ref1, ref2);
 * ```
 */
export function mergeRefs<T>(
  ...refs: (ReactRef<T> | undefined)[]
): ReactRef<T> {
  return (node: T | null) => {
    refs.forEach(ref => assignRef(ref, node));
  };
}
