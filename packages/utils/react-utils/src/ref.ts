/* eslint-disable no-unused-vars */
import React, {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
  useRef,
} from 'react';

/**
 * Assigns a value to a ref (function or object).
 */
export function assignRef<T>(ref: React.Ref<T> | undefined, value: T): void {
  if (ref == null) return;

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
    refs.forEach(ref => assignRef(ref, value));
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
              cleanupRef.current = () => ref(null);
            }
          } else {
            (ref as React.RefObject<T | null>).current = value;
            if (value !== null) {
              cleanupRef.current = () => {
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
export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref?: React.Ref<T | null>
): React.RefObject<T | null> {
  const domRef = useObjectRef<T | null>(ref);

  // ensure parent ref always sees the DOM node
  React.useImperativeHandle(ref, () => domRef.current ?? ({} as T));

  return domRef;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function forwardRefWithRef<TElement extends ElementType, Props = {}>(
  render: (
    props: Props & ComponentPropsWithoutRef<TElement>,
    ref: ComponentPropsWithRef<TElement>['ref']
  ) => React.ReactElement | null
) {
  type Component = (
    props: Props &
      ComponentPropsWithoutRef<TElement> & {
        ref?: ComponentPropsWithRef<TElement>['ref'];
      }
  ) => React.ReactElement | null;

  type Exotic = ForwardRefExoticComponent<
    Props &
      ComponentPropsWithoutRef<TElement> &
      RefAttributes<ComponentPropsWithRef<TElement>['ref']>
  >;

  return forwardRef(render as any) as Component & Exotic;
}

export type NonPolymorphicProps<T extends ElementType, Props> = Props &
  Omit<ComponentPropsWithoutRef<T>, keyof Props>;
