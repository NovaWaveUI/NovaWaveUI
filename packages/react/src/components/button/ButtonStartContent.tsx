import React from 'react';
import { filterDOMProps } from '../../utils';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '../../utils/react';
import { Slot } from '../slot';
import { ButtonRenderProps } from './types';
import { ButtonSlots } from './slots';
import { useButtonState } from './context';
import { useButtonRenderContext } from './state';

export type ButtonStartContentProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<ButtonRenderProps>>;

export function ButtonStartContent<T extends React.ElementType = 'span'>(
  props: ButtonStartContentProps<T>
) {
  // Get the slot props
  const slotProps = ButtonSlots.useSlot('startContent', props);

  // Get the children, className and style from the slot props
  const {
    as: Component = 'span',
    asChild,
    ...rest
  } = slotProps as ButtonStartContentProps<T>;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string';

  // Get the button state context so that we get the current state
  // and data properties
  const buttonStateCtx = useButtonState();

  // Get the data attributes from the context
  const { dataAttrs, renderValues } = useButtonRenderContext(buttonStateCtx);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderComponent = asChild ? Slot : Component;

  return (
    <RenderComponent
      {...filteredProps}
      {...renderProps}
      {...dataAttrs}
      data-slot="start-content"
    />
  );
}

ButtonStartContent.displayName = 'NovaWaveUI.Button.StartContent';
