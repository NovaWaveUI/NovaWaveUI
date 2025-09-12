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
  if (ref == undefined) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      (ref as any).current = value;
    } catch {
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
    for (const ref of refs) assignRef(ref, node);
  };
}

export function toRefObject<T extends HTMLElement>(
  ref?: React.Ref<T | null>
): React.RefObject<T> {
  // If the ref is already an object ref, return it as is
  if (ref && typeof ref === 'object' && 'current' in ref) {
    return ref as React.RefObject<T>;
  }

  // Create a new ref object
  const newRef = React.createRef<T | null>() as React.RefObject<T>;

  // If the ref is a function, call it whenever `newRef.current` updates
  if (typeof ref === 'function') {
    return new Proxy(newRef, {
      set(target, prop, value) {
        if (prop === 'current') {
          ref(value); // Call the function ref whenever current updates
        }
        return Reflect.set(target, prop, value);
      },
    }) as React.RefObject<T>;
  }

  // Otherwise, return the new ref object
  return newRef;
}

/**
 * Creates an always valid ref to the DOM node. If a ref is passed, it will
 * use that ref, otherwise it will create a new ref.
 * @param ref The ref to use (optional).
 * @returns A ref to the DOM node.
 * @example ```tsx
 * const ref = useDOMRef<HTMLDivElement>(null);
 * const ref = useDOMRef<HTMLDivElement>(someRef);
 * ```
 */
export function useDOMRef<T extends HTMLElement = HTMLElement>(
  ref?: React.Ref<T | null>
): React.RefObject<T> {
  const domRef = useRef<T>(null);

  useImperativeHandle(ref, () => domRef.current ?? ({} as T));

  return toRefObject(ref) ?? domRef;
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
