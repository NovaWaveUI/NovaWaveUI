import React from 'react';
import {
  filterDOMProps,
  PolymorphicProps,
  SlotProps,
  useSlottedContext,
} from '../../../utils';
import { Slot } from '../../slot';
import { TextContext } from './context';

export type TextProps<
  T extends React.ElementType,
  Props = {
    id?: string;
  },
> = PolymorphicProps<T, Props> & SlotProps;

export function Text<T extends React.ElementType = 'span'>(
  props: TextProps<T>
) {
  // Use any context props and merge with local props
  const ctxProps = useSlottedContext(TextContext, props);

  // Extract the `as` prop and the rest of the props
  const { as: Component = 'span', asChild, children, ...rest } = ctxProps;

  const shouldFilterProps = typeof Component === 'string';

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return <RenderedComponent {...filteredProps}>{children}</RenderedComponent>;
}

Text.displayName = 'NovaWaveUI.Text';
