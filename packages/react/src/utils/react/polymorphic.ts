import React, { ElementType } from 'react';

export type AsProp<T extends ElementType> = {
  /**
   * The component or HTML element to render as.
   */
  as?: T;

  /**
   * If `true`, the component will render its children directly without wrapping them in the specified `as` component.
   */
  asChild?: boolean;
};

export type PolymorphicProps<C extends React.ElementType, Props = {}> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof (Props & AsProp<C>)>;
