import React, { ElementType } from 'react';
import { PolymorphicProps, useContextProps } from '@novawaveui/react-utils';
import { Slot } from '../slot';
import { useLabelContextProps } from './context';

export type LabelProps<T extends ElementType> = PolymorphicProps<T, {}> & {
  /**
   * The content of the label.
   */
  children: React.ReactNode;
};

export function Label<T extends React.ElementType = 'label'>(
  props: LabelProps<T>
) {
  // Next, get the context props (if there is any) and merge with
  // the local props
  const ctxProps = useContextProps(props, useLabelContextProps);

  // Extract the `as` prop and the rest of the props
  const { as: Component = 'label', asChild, children } = props;

  const RenderedComponent = asChild ? Slot : Component;

  return <RenderedComponent {...ctxProps}>{children}</RenderedComponent>;
}

Label.displayName = 'NovaWaveUI.Label';
