import React from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import { ButtonRenderProps } from './types';
import { useButtonState } from './context';
import { ButtonSlots } from './slots';
import { useButtonRenderContext } from './state';

export type ButtonStartContentProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<ButtonRenderProps>>;

function ButtonStartContent<T extends React.ElementType = 'span'>(
  props: ButtonStartContentProps<T>
) {
  // First, register the slot so that the slot system knows this slot is being used
  ButtonSlots.useRegisterSlot('startContent');

  // Get the slot props
  const slotProps = ButtonSlots.useSlot('startContent', props);

  // Get the children, className and style from the slot props
  const {
    as: Component = 'span',
    children,
    className,
    style,
    ...rest
  } = slotProps;

  // Get the button state context so that we get the current state
  // and data properties
  const buttonStateCtx = useButtonState();

  // Get the data attributes from the context
  const { dataAttrs, renderValues } = useButtonRenderContext(buttonStateCtx);

  const renderProps = useRenderProps({
    className,
    style: style,
    children: children,
    values: renderValues,
    defaultClassName: cn('nw-button', className),
  });

  return (
    <Component
      {...rest}
      {...dataAttrs}
      {...renderProps}
      data-slot="start-content"
    />
  );
}

ButtonStartContent.displayName = 'NovaWaveUI.Button.StartContent';

export default ButtonStartContent;
