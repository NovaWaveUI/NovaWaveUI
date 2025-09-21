import React from 'react';
import {
  forwardRefWith,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import { Text, TextProps } from '../Text';
import { getButtonDataAttrs, useButtonState } from './context';
import { ButtonRenderProps } from './types';
import { ButtonSlots } from './slots';

export type ButtonTextProps<T extends React.ElementType = 'span'> = Omit<
  TextProps<T>,
  'children'
> &
  RenderProps<ButtonRenderProps>;

const ButtonText = forwardRefWith.as<'span', ButtonTextProps<'span'>>(
  (props, ref) => {
    // First, register the slot so that the slot system knows this slot is being used
    ButtonSlots.useRegisterSlot('text');

    // First, extract the `as` prop and the rest of the props
    const { children, className, style, ...rest } = props;

    // Get the button state context so that we can get the current state
    // and data properties
    const buttonStateCtx = useButtonState();

    // Get the data attributes from the context
    const dataAttrs = getButtonDataAttrs(buttonStateCtx);

    const renderValues: ButtonRenderProps = {
      isPressed: buttonStateCtx.isPressed,
      isDisabled: buttonStateCtx.isDisabled,
      isHovered: buttonStateCtx.isHovered,
      isFocused: buttonStateCtx.isFocused,
      isFocusVisible: buttonStateCtx.isFocusVisible,
      isLoading: buttonStateCtx.isLoading,
    };

    const renderProps = useRenderProps({
      className: className,
      style: style,
      children: children,
      values: renderValues,
      defaultClassName: cn('nw-button', className),
    });

    return (
      <Text
        ref={ref}
        {...renderProps}
        {...dataAttrs}
        {...rest}
        data-slot="text"
      />
    );
  }
);

ButtonText.displayName = 'ButtonText';

export default ButtonText;
