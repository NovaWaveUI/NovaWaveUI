import React from 'react';
import {
  forwardRefWith,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import { Text, TextProps } from '../text';
import { ButtonRenderProps } from './types';
import { getButtonDataAttrs, useButtonState } from './context';

export type ButtonStartContentProps<T extends React.ElementType = 'span'> =
  Omit<TextProps<T>, 'children'> & RenderProps<ButtonRenderProps>;

const ButtonStartContent = forwardRefWith.as<
  'span',
  ButtonStartContentProps<'span'>
>((props, ref) => {
  // Extract out the incompatible props
  const { children, className, style, ...rest } = props;

  // Get the button state context so that we get the current state
  // and data properties
  const buttonStateCtx = useButtonState();

  // Get the data attributes from the context
  const dataAttrs = getButtonDataAttrs(buttonStateCtx);

  // Get the render values
  const renderValues: ButtonRenderProps = {
    isPressed: buttonStateCtx.isPressed,
    isDisabled: buttonStateCtx.isDisabled,
    isHovered: buttonStateCtx.isHovered,
    isFocused: buttonStateCtx.isFocused,
    isFocusVisible: buttonStateCtx.isFocusVisible,
    isLoading: buttonStateCtx.isLoading,
  };

  const renderProps = useRenderProps({
    className,
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
      data-slot="start-content"
    />
  );
});

ButtonStartContent.displayName = 'NovaWaveUI.Button.StartContent';

export default ButtonStartContent;
