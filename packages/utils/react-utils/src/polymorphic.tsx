import { error } from '@novawaveui/utils';
import React, { ElementType } from 'react';

export type PolymorphicProps<T extends ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithRef<T>, keyof Props | 'as'> & {
    /**
     * The component or HTML element to render as.
     */
    as?: T;
    /**
     * If `true`, the component will render its children directly without wrapping them in the specified `as` component.
     */
    asChild?: boolean;
  };

export type PolyRuntimeProps = {
  as?: React.ElementType;
  asChild?: boolean;
  children?: React.ReactNode;
} & Record<string, unknown>;

export function PolymorphicComponent(props: PolyRuntimeProps) {
  const { as: Component = 'div', asChild, children, ...rest } = props;

  if (asChild) {
    if (children) {
      console.log('children', children);
      const child = React.Children.only(children) as React.ReactElement<
        Record<string, unknown>
      >;
      return React.cloneElement(child, {
        ...child.props,
        ...rest,
      });
    } else {
      error('Attempted to use `asChild`, but no children were passed.');
      return;
    }
  }

  return <Component {...rest}>{children}</Component>;
}

export function renderPolymorphic(
  props: PolyRuntimeProps,
  defaultAs: ElementType
) {
  const { as = defaultAs, ...rest } = props;
  return <PolymorphicComponent as={as} {...rest} />;
}
