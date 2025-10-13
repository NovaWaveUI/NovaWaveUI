import React from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../slot';
import { ButtonRenderProps } from './types';
import { ButtonSlots } from './slots';
import { useButtonState } from './context';
import { useButtonRenderContext } from './state';

export type ButtonEndContentProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<ButtonRenderProps>>;

export function ButtonEndContent<T extends React.ElementType = 'span'>(
  props: ButtonEndContentProps<T>
) {
  // Get the slot props
  const slotProps = ButtonSlots.useSlot(
    'endContent',
    props
  ) as ButtonEndContentProps<T>;

  // Get the children, className and style from the slot props
  const { as: Component = 'span', asChild, ...rest } = slotProps;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the button state context so that we get the current state
  // and data properties
  const buttonStateCtx = useButtonState();

  // Get the data attributes from the context
  const { renderValues } = useButtonRenderContext(buttonStateCtx);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      {...renderProps}
      data-slot="end-content"
    />
  );
}

ButtonEndContent.displayName = 'NovaWaveUI.Button.EndContent';
