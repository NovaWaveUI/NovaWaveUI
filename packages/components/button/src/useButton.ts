import type { ButtonVariantProps } from '@novawaveui/theme';

import React, { useMemo } from 'react';
import {
  As,
  DOMAttributes,
  NovaWaveUIProps,
  useSlotProps,
} from '@novawaveui/core';
import { useNovaWaveUI } from '@novawaveui/provider';
import { buttonStyles } from '@novawaveui/theme';
import { AriaButtonProps } from '@react-types/button';
import { useButton as useRAButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useDOMRef } from '@novawaveui/react-utils';
import { useButtonGroupContext } from './ButtonGroupContext';

interface Props extends NovaWaveUIProps<'button'> {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<HTMLButtonElement | null>;

  /**
   * Is icon only
   */
  isIconOnly?: boolean;

  /**
   * Whether or not the button is loading
   */
  isLoading?: boolean;

  /**
   * Content that goes in front of the children of the button
   */
  startContent?: React.ReactNode;

  /**
   * Content that goes after the children of the button
   */
  endContent?: React.ReactNode;
}

export type UseButtonProps = Props &
  Omit<AriaButtonProps, keyof ButtonVariantProps> &
  Omit<ButtonVariantProps, 'isVertical'>;

export const useButton = (props: UseButtonProps) => {
  const globalContext = useNovaWaveUI();
  const groupContext = useButtonGroupContext();

  const {
    as,
    ref,
    variant = groupContext?.variant ?? 'solid',
    color = groupContext?.color ?? 'neutral',
    size = groupContext?.size ?? 'md',
    radius = groupContext?.radius ?? 'md',
    disableAnimations = globalContext?.disableAnimations ??
      groupContext.disableAnimations ??
      false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    isLoading: isLoadingProp = false,
    isIconOnly = false,
    children,
    startContent,
    endContent,
    className,
    ...otherProps
  } = props;

  // Sets the root element
  const Component = as || 'button';

  // Create / assign the DOM ref
  const domRef = useDOMRef(ref);

  // Set up the React Aria button with the given props
  const { buttonProps, isPressed } = useRAButton(otherProps, domRef);

  // Set up the interactivity of the button
  const isDisabled = useMemo(
    () => isDisabledProp || buttonProps.disabled,
    [isDisabledProp, buttonProps.disabled]
  );
  const isLoading = useMemo(() => isLoadingProp, [isLoadingProp]);
  const isInteractive = useMemo(
    () => !isDisabled && !isLoading,
    [isDisabled, isLoading]
  );

  // Get the hover and focus properties
  const { hoverProps, isHovered } = useHover({
    isDisabled: !isInteractive,
  });

  // Get the focus properties
  const { focusProps, isFocusVisible, isFocused } = useFocusRing({
    autoFocus: buttonProps.autoFocus,
  });

  // Determine if the button is vertical based on the group context
  const isVertical = useMemo(
    () => groupContext?.isVertical ?? false,
    [groupContext?.isVertical]
  );

  // Get the styles and merge them with the provided className
  const styles = useMemo(
    () =>
      buttonStyles({
        variant,
        color,
        size,
        radius,
        isIconOnly,
        disableAnimations,
        isDisabled: !isInteractive,
        isInGroup: !!groupContext,
        isVertical,
        className,
      }),
    [
      variant,
      color,
      size,
      radius,
      isIconOnly,
      isDisabled,
      isLoading,
      isInteractive,
      disableAnimations,
      className,
      groupContext,
      isVertical,
    ]
  );

  // Get the properties for the button
  const getSlotProps = useSlotProps(
    'NovaWaveUI.Button',
    {
      base: {
        dependencies: [
          isDisabled,
          isLoading,
          isFocused,
          isFocusVisible,
          isHovered,
          buttonProps,
          focusProps,
          hoverProps,
          otherProps,
        ],
        props: {
          ...mergeProps(buttonProps, focusProps, hoverProps, otherProps, props),
        },
        dataAttrs: {
          disabled: isDisabled,
          loading: isLoading,
          hover: isHovered,
          focus: isFocused,
          'focus-visible': isFocusVisible,
          pressed: isPressed,
        },
      },
    },
    {
      base: Component,
    }
  );

  return {
    Component,
    children,
    domRef,
    styles,
    getSlotProps,
    startContent,
    endContent,
  };
};
