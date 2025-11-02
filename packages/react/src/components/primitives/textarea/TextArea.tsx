import React from 'react';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import {
  cn,
  dataProps,
  useRenderProps,
  useSlottedContext,
} from '../../../utils';
import { TextAreaProps } from './types';
import { TextAreaContext } from './context';

const filterHoverProps = (props: TextAreaProps) => {
  const { onHoverStart, onHoverChange, onHoverEnd, ...otherProps } = props;
  return otherProps;
};

export function TextArea(props: TextAreaProps) {
  // Use any context props and merge with local props
  const ctxProps = useSlottedContext(TextAreaContext, props);

  const { hoverProps, isHovered } = useHover(ctxProps);
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    isTextInput: true,
    ...ctxProps,
  });

  const isInvalid =
    !!ctxProps['aria-invalid'] && ctxProps['aria-invalid'] !== 'false';
  const renderProps = useRenderProps({
    className: ctxProps.className,
    style: ctxProps.style,
    children: ctxProps.children,
    values: {
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled: ctxProps.disabled || false,
      isInvalid,
    },
    defaultClassName: cn('nw-textarea', ctxProps.className),
  });

  const dataAttrs = dataProps({
    hovered: isHovered,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    disabled: ctxProps.disabled,
    invalid: isInvalid,
  });

  const { className, style } = renderProps;

  return (
    <textarea
      {...mergeProps(filterHoverProps(ctxProps), hoverProps, focusProps)}
      className={className}
      style={style}
      {...dataAttrs}
      data-component="textarea"
    />
  );
}
