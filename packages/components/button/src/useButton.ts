import type {
  TestButtonStyles,
  ExtractVariantProps,
  NonSlotVariantReturn,
} from '@novawaveui/theme';

import React, { useMemo } from 'react';
import {
  extractNewVariantProps,
  NovaWaveUIProps,
  useSlotProps,
} from '@novawaveui/core';
import { useNovaWaveUI } from '@novawaveui/provider';
import { testButtonStyles } from '@novawaveui/theme';
import { AriaButtonProps } from '@react-types/button';
import { useButton as useRAButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
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

export type UseButtonProps<
  TStyle extends NonSlotVariantReturn<any> = TestButtonStyles,
> = Props &
  Omit<AriaButtonProps, keyof ExtractVariantProps<TStyle & TestButtonStyles>> &
  ExtractVariantProps<TStyle & TestButtonStyles> & {
    customStyle?: TStyle;
  };

export const useButton = <
  TStyle extends NonSlotVariantReturn<any> = TestButtonStyles,
>(
  props: UseButtonProps<TStyle>
) => {
  const globalContext = useNovaWaveUI();
  const groupContext = useButtonGroupContext();

  const {
    as,
    customStyle: styleProp = testButtonStyles,
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

  // Get the styles (use the global context, then the provided style, then the default style)
  const style = useMemo(
    () => globalContext?.globalStyles?.button ?? styleProp,
    [globalContext?.globalStyles?.button, styleProp]
  );

  const newVariantProps = extractNewVariantProps(
    props,
    style,
    testButtonStyles
  );

  console.log(newVariantProps);

  // Sets the root element
  const Component = as || 'button';

  // Create / assign the DOM ref
  const domRef = useDOMRef(ref);

  // Set up the interactivity of the button
  const isDisabled = useMemo(() => isDisabledProp, [isDisabledProp]);
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
  const { focusProps, isFocusVisible, isFocused } = useFocusRing();

  // Get the press properties
  const { pressProps, isPressed } = usePress({
    isDisabled: !isInteractive,
  });

  // Determine if the button is vertical based on the group context
  const isVertical = useMemo(
    () => groupContext?.isVertical ?? false,
    [groupContext?.isVertical]
  );

  // Get the styles and merge them with the provided className
  const styles = useMemo(
    () =>
      // @ts-expect-error - Currently unable to infer the correct type
      style({
        variant,
        color,
        size,
        radius,
        isIconOnly,
        disableAnimations,
        isDisabled: !isInteractive,
        isInGroup: !!groupContext,
        isVertical,
        ...newVariantProps,
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
      ...Object.values(newVariantProps),
    ]
  );

  // Set up the React Aria button with the given props
  const { buttonProps } = useRAButton(
    {
      elementType: as,
      isDisabled,
      ...otherProps,
    } as AriaButtonProps,
    domRef
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
          pressProps,
          otherProps,
        ],
        props: {
          // @ts-expect-error - Currently unable to infer the correct type
          ...mergeProps(
            buttonProps,
            focusProps,
            hoverProps,
            pressProps,
            otherProps,
            props
          ),
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
