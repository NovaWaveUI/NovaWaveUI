import React from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import { useButtonState } from './context';
import { ButtonRenderProps } from './types';
import { ButtonSlots } from './slots';
import { useButtonRenderContext } from './state';

export type ButtonTextProps<T extends React.ElementType> = PolymorphicProps<
  T,
  RenderProps<ButtonRenderProps>
>;

function ButtonText<T extends React.ElementType = 'span'>(
  props: ButtonTextProps<T>
) {
  // Register the slot
  ButtonSlots.useRegisterSlot('text');

  // Extract the props for this slot from the context
  const slotProps = ButtonSlots.useSlot('text', props);

  // First, extract the `as` prop and the rest of the props
  const {
    as: Component = 'span',
    children,
    className,
    style,
    ...rest
  } = slotProps;

  // Get the button state context so that we can get the current state
  // and data properties
  const buttonStateCtx = useButtonState();

  // Get the data attributes from the context
  const { dataAttrs, renderValues } = useButtonRenderContext(buttonStateCtx);

  const renderProps = useRenderProps({
    className: className,
    style: style,
    children: children,
    values: renderValues,
    defaultClassName: cn('nw-button', className),
  });

  return (
    <Component {...rest} {...dataAttrs} {...renderProps} data-slot="text" />
  );
}

ButtonText.displayName = 'NovaWaveUI.Button.Text';

export default ButtonText;
