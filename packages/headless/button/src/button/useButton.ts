import React from 'react';
import { useButton as useRAButton } from '@react-aria/button';
import { dataProps, filterDOMProps } from '@novawaveui/dom-utils';
import { useDisableInteractions } from '@novawaveui/use-disable-interactions';
import { mergeProps } from '@react-aria/utils';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import {
  useRenderProps,
  UseRenderPropsRetValue,
} from '@novawaveui/react-utils';
import { useButtonGroupState } from '../buttonGroup';
import { ButtonProps, ButtonRenderProps } from './types';

type UseButtonReturn<T extends React.ElementType> = {
  buttonProps: ButtonProps<T>;
  isDisabled: boolean;
  isLoading: boolean;
  isPressed: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
  isInGroup: boolean;
  isInteractive: boolean;
  renderProps: UseRenderPropsRetValue;
};

/**
 * Hook to manage the state and behavior of a button component.
 *
 * @param props The properties of the button.
 * @returns The final merged properties to be passed to the given button
 * along with the state of the button.
 */
export function useButton<T extends React.ElementType>(
  props: ButtonProps<T>,
): UseButtonReturn<T> {
  // Merging will be handled outside of this hook
  const buttonGroup = useButtonGroupState();
  const isInGroup = !!buttonGroup;

  // Spread out and set default values for the props
  const {
    isDisabled = buttonGroup?.isDisabled ?? false,
    isLoading = false,
    as = 'button',
  } = props;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof as === 'string' && !props.asChild;

  // Disable all interactions if the button is disabled or loading
  const isInteractive = !isDisabled && !isLoading;

  // Get the button props from React Aria's useButton hook
  // This will handle all the accessibility features for us
  // We pass the DOM ref to the hook so it can manage the focus
  // and other interactions
  const { buttonProps, isPressed } = useRAButton(
    {
      ...props,
      isDisabled: !isInteractive,
      elementType: props.as as React.ElementType,
    },
    props.ref,
  );

  // Filter DOM props to ensure mergeProps receives plain objects
  const filteredCtxProps = filterDOMProps<T>(props, {
    enabled: shouldFilterDOMProps,
  });

  const disabledInteractionProps = useDisableInteractions(
    buttonProps,
    isInteractive,
  );

  // Get the final merged button props
  const mergedButtonProps = mergeProps(
    disabledInteractionProps,
    filteredCtxProps,
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

  // Create the data attributes
  const dataAttrs = dataProps({
    hovered: isHovered,
    focused: isFocused,
    'focus-visible': isFocusVisible,
    pressed: isPressed,
    disabled: isDisabled,
    loading: isLoading,
    'in-group': isInGroup,
    'icon-only': props.isIconOnly,
    component: 'button',
  });

  // Return the final props and state
  return {
    buttonProps: mergeProps(
      mergedButtonProps,
      hoverProps,
      focusProps,
      dataAttrs,
    ) as ButtonProps<T>,
    isDisabled,
    isLoading,
    isPressed,
    isFocused,
    isFocusVisible,
    isHovered,
    isInGroup,
    isInteractive,
    renderProps,
  };
}
