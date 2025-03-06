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
import { AnimateFunction, useMotion } from '@novawaveui/motion';
import { AnimationScope } from '@novawaveui/motion/motion';
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

/**
 * The useButton hook return type.
 *
 * The useButton hook provides the building blocks of the Button component.
 * The hook returns the base component (which is the native DOM element),
 * a ref to the button (either provided by the user or created by the hook),
 * the styles of the button, a function to get the properties for a slot,
 * the start and end content of the button, the animation scope, and a function
 * to animate the button.
 */
export interface UseButtonReturn {
  /**
   * The base component to render
   */
  Component: As<any>;
  /**
   * The children of the button
   */
  children?: React.ReactNode;
  /**
   * The ref of the button
   */
  domRef:
    | React.RefObject<HTMLButtonElement>
    | React.RefCallback<HTMLButtonElement>
    | null;
  /**
   * The styles of the button
   */
  styles: string;
  /**
   * A function for getting the properties for a slot
   */
  getSlotProps: <T extends HTMLElement = HTMLButtonElement>(
    slotName: 'base',
    extraProps?: Record<string, any>,
    ref?: React.Ref<any>
  ) => DOMAttributes<T>;
  /**
   * The content that goes before the children of the button
   */
  startContent?: React.ReactNode;
  /**
   * The content that goes after the children of the button
   */
  endContent?: React.ReactNode;
  /**
   * The animation scope of the component
   */
  scope: AnimationScope<HTMLButtonElement>;
  /**
   * A function to animate the button
   */
  animate: AnimateFunction;
}

export const useButton = (props: UseButtonProps): UseButtonReturn => {
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

  // Set up the animation
  const { ref: mergedRef, scope, animate } = useMotion(domRef);

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
    domRef: mergedRef as React.RefObject<HTMLButtonElement>,
    styles,
    getSlotProps,
    startContent,
    endContent,
    animate,
    scope,
  };
};
