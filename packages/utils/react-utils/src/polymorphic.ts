/* eslint-disable no-unused-vars */
import React, {
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export type PolymorphicProps<E extends React.ElementType, P> = P & {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof P | 'as'>;

export type PolymorphicPropsAsChild<E extends React.ElementType, P> = P & {
  as?: E;
  asChild: true;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof P | 'as' | 'asChild'>;

export type PolymorphicRef<E extends ElementType> =
  React.ComponentPropsWithRef<E>['ref'];

export function forwardRefWithAs<DefaultType extends ElementType, Props = {}>(
  render: (
    props: PolymorphicProps<DefaultType, Props>,
    ref: PolymorphicRef<DefaultType>
  ) => React.ReactElement | null
) {
  type Component = <E extends ElementType = DefaultType>(
    props: PolymorphicProps<E, Props> & { ref?: PolymorphicRef<E> }
  ) => React.ReactElement | null;

  type Exotic = ForwardRefExoticComponent<
    PolymorphicProps<DefaultType, Props> &
      RefAttributes<PolymorphicRef<DefaultType>>
  >;

  return forwardRef(render as any) as Component & Exotic;
}

export function forwardRefWithAsChild<
  DefaultType extends ElementType,
  Props = {},
>(
  render: (
    props: PolymorphicPropsAsChild<DefaultType, Props>,
    ref: PolymorphicRef<DefaultType>
  ) => React.ReactElement | null
) {
  type Component = <E extends ElementType = DefaultType>(
    props: PolymorphicProps<E, Props> & { ref?: PolymorphicRef<E> }
  ) => React.ReactElement | null;

  type Exotic = ForwardRefExoticComponent<
    PolymorphicProps<DefaultType, Props> &
      RefAttributes<PolymorphicRef<DefaultType>>
  >;

  return forwardRef(render as any) as Component & Exotic;
}

/**
 * A utility function to enable polymorphic "asChild" rendering in React components.
 *
 * When `asChild` is true, this function clones the only child element passed as `children`,
 * merging the remaining props and forwarding the ref to the child. This allows the parent
 * component to render as a different element or component, inheriting props and refs.
 *
 * @template P - The props type, which must include optional `asChild` and `children`.
 * @param props - The props object, including `asChild`, `children`, and any additional props.
 * @param ref - The React ref to be forwarded to the child element.
 * @returns The cloned child element with merged props and ref if `asChild` is true; otherwise, returns undefined.
 *
 * @throws If there is not exactly one child when `asChild` is true, React.Children.only will throw an error.
 */
export function withAsChild(
  asChild: boolean | undefined,
  children: React.ReactNode,
  props: Record<string, unknown>,
  ref: React.Ref<unknown> | undefined
) {
  if (!asChild) return;

  const onlyChild = React.Children.only(children) as React.ReactElement;
  return React.cloneElement(onlyChild, {
    ...props,
    ref,
  } as any);
}
