import React from 'react';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import {
  cn,
  dataProps,
  useRenderProps,
  useSlottedContext,
} from '../../../utils';
import { InputContext } from './context';
import { InputProps } from './types';

const filterHoverProps = (props: InputProps) => {
  const { onHoverStart, onHoverChange, onHoverEnd, ...otherProps } = props;
  return otherProps;
};

export function Input(props: InputProps) {
  // Use any context props and merge with local props
  const ctxProps = useSlottedContext(InputContext, props);

  const { hoverProps, isHovered } = useHover(ctxProps);
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    isTextInput: true,
    ...ctxProps,
  });

  const isInvalid =
    !!ctxProps['aria-invalid'] && ctxProps['aria-invalid'] !== 'false';
  const renderProps = useRenderProps({
    ...ctxProps,
    values: {
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled: ctxProps.disabled || false,
      isInvalid,
    },
    defaultClassName: cn('nw-input', ctxProps.className),
  });

  const dataAttrs = dataProps({
    hovered: isHovered,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    disabled: ctxProps.disabled,
    invalid: isInvalid,
  });

  return (
    <input
      {...mergeProps(filterHoverProps(ctxProps), hoverProps, focusProps)}
      {...renderProps}
      {...dataAttrs}
      data-component="input"
    />
  );
}
