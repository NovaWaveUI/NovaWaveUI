/**
 * The useButton hook provides the behavior and accessibility implementation for a button component.
 *
 * @file useButton.ts
 * @author Kyle Gagnon
 */

import React from 'react';
import { useButton as useRAButton } from '@react-aria/button';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import { useButtonGroupState } from '../buttonGroup';
import { dataProps, filterDOMProps, useRenderProps } from '../../utils';
import { useDisableInteractions } from '../../hooks';
import { ButtonProps, ButtonRenderProps } from './types';

export function useButton<T extends React.ElementType>(props: ButtonProps<T>) {
  // We are going to be passed in all of the merged props
  const buttonGroup = useButtonGroupState();
  const isInGroup = !!buttonGroup;

  // Spread out and set default values for the props
  const {
    size = buttonGroup?.size ?? 'md',
    variant = buttonGroup?.variant ?? 'primary',
    isDisabled = buttonGroup?.isDisabled ?? false,
    isLoading = false,
  } = props;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof props.as === 'string' && !props.asChild;

  // Disable all interactions if the button is disabled or loading
  const isInteractive = React.useMemo(
    () => !isDisabled && !isLoading,
    [isDisabled, isLoading]
  );

  // Get the button props from the useButton hook from React Aria
  // This will handle all the accessibility features for us
  // We pass the DOM ref to the hook so it can manage the focus
  // and other interactions
  const { buttonProps, isPressed } = useRAButton(
    {
      ...props,
      isDisabled: !isInteractive,
      elementType: props.as as React.ElementType,
    },
    props.ref
  );

  // Filter DOM props to ensure mergeProps receives plain objects
  const filteredCtxProps = filterDOMProps<T>(props, {
    enabled: shouldFilterDOMProps,
  });

  const disabledInteractionProps = useDisableInteractions(
    buttonProps,
    isInteractive
  );

  // Get the final merged button props
  const mergedButtonProps = mergeProps(
    disabledInteractionProps,
    filteredCtxProps
  ) as Record<string, unknown>;

  // Get the hover interactions
  const { isHovered, hoverProps } = useHover({
    ...props,
    isDisabled: !isInteractive,
  });

  // Get the focus props
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  // Prepare the render props
  const renderValues: ButtonRenderProps = {
    isPressed,
    isDisabled,
    isHovered,
    isFocused,
    isFocusVisible,
    isLoading,
  };

  // Get the render props using the useRenderProps utility
  const renderProps = useRenderProps({
    ...props,
    values: renderValues,
  });

  const dataAttrs = dataProps({
    hovered: isHovered,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    pressed: isPressed,
    disabled: isDisabled,
    loading: isLoading,
    'in-group': isInGroup,
    variant: variant,
    size: size,
    'icon-only': props.isIconOnly,
    component: 'button',
  });

  return {
    buttonProps: mergeProps(
      mergedButtonProps,
      hoverProps,
      focusProps,
      dataAttrs
    ),
    isDisabled,
    isLoading,
    isPressed,
    isHovered,
    isFocused,
    isFocusVisible,
    isInteractive,
    size,
    variant,
    isInGroup,
    renderProps,
  };
}
