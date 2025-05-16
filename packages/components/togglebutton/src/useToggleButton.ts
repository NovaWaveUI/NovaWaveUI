import type { ToggleButtonVariantProps } from '@novawaveui/theme';

import { useMemo } from 'react';
import { NovaWaveUIProps, useSlotProps } from '@novawaveui/core';
import { MotionProps, useMotionComponent } from '@novawaveui/motion';
import { useNovaWaveUI } from '@novawaveui/provider';
import { useDOMRef } from '@novawaveui/react-utils';
import { toggleButtonStyles } from '@novawaveui/theme';
import {
  AriaToggleButtonProps as RAToggleButtonProps,
  AriaToggleButtonGroupItemProps,
} from '@react-types/button';
import {
  useToggleButton as useRAToggleButton,
  useToggleButtonGroupItem as useRAToggleButtonGroupItem,
} from '@react-aria/button';
import { useToggleState } from '@react-stately/toggle';
import { useHover, usePress } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useToggleButtonGroupContext } from './ToggleButtonContext';

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
   * Content that goes in front of the children of the button
   */
  startContent?: React.ReactNode;

  /**
   * Content that goes after the children of the button
   */
  endContent?: React.ReactNode;

  /**
   * Any motion properties to be passed to the component
   */
  motionProps?: MotionProps;
}

export type UseToggleButtonProps = Props &
  Omit<
    RAToggleButtonProps,
    keyof Omit<ToggleButtonVariantProps, 'isSelected'>
  > &
  ToggleButtonVariantProps;

export function useToggleButton(props: UseToggleButtonProps) {
  const globalContext = useNovaWaveUI();
  const groupContext = useToggleButtonGroupContext();

  const {
    ref,
    as,
    color = groupContext?.color ?? 'neutral',
    variant = groupContext?.variant ?? 'solid',
    size = groupContext?.size ?? 'md',
    radius = groupContext?.radius ?? 'md',
    isIconOnly = groupContext?.isIconOnly ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    isSelected: isSelectedProp,
    fullWidth = false,
    disableAnimations = globalContext?.disableAnimations ??
      groupContext?.disableAnimations ??
      false,
    className,
    children,
    startContent,
    endContent,
    ...otherProps
  } = props;

  const defaultAs = as || 'button';

  // Set the root element
  const { Component: Root, motionProps } = useMotionComponent<'button'>({
    as: defaultAs,
    disableAnimations,
    userMotionProps: props.motionProps,
  });

  // Set up the ref for the DOM node
  const domRef = useDOMRef(ref);

  // Set the flag for whether the button is in a group or not
  const isInGroup = !!groupContext;

  // Set up the toggle state
  const toggleState = useToggleState(props);

  // Set up the toggle button properties
  const { buttonProps, isSelected, isDisabled } = isInGroup
    ? useRAToggleButtonGroupItem(
        {
          elementType: as,
          isDisabled: isDisabledProp,
          ...otherProps,
        } as AriaToggleButtonGroupItemProps,
        groupContext.state,
        domRef
      )
    : useRAToggleButton(
        {
          elementType: as,
          isDisabled: isDisabledProp,
          ...otherProps,
        },
        toggleState,
        domRef
      );

  const isInteractive = useMemo(() => !isDisabled, [isDisabled]);

  // Set up the hover, focus, and press properties
  const { hoverProps, isHovered } = useHover({
    isDisabled: !isInteractive || isDisabled,
  });

  // Get the focus properties
  const { focusProps, isFocusVisible, isFocused } = useFocusRing();

  // Get the press properties
  const { pressProps, isPressed } = usePress({
    isDisabled: !isInteractive || isDisabled,
  });

  const isVertical = useMemo(
    () => groupContext?.isVertical ?? false,
    [groupContext?.isVertical]
  );

  // Set up the styles for the toggle button
  const styles = useMemo(
    () =>
      toggleButtonStyles({
        color,
        variant,
        size,
        radius,
        isIconOnly,
        isDisabled: !isInteractive,
        isSelected,
        isInGroup: !!groupContext,
        isVertical,
        fullWidth,
        disableAnimations,
        className,
      }),
    [
      color,
      variant,
      size,
      radius,
      isDisabled,
      isVertical,
      isIconOnly,
      isSelected,
      fullWidth,
      disableAnimations,
      isInteractive,
      groupContext,
      className,
    ]
  );

  const getSlotProps = useSlotProps(
    'NovaWaveUI.ToggleButton',
    {
      base: {
        props: {
          ...mergeProps(
            buttonProps,
            pressProps,
            hoverProps,
            focusProps,
            otherProps
          ),
          ...motionProps,
          className: styles,
          ref: domRef,
        },
        dataAttrs: {
          disabled: isDisabled,
          selected: isSelected,
          hover: isHovered,
          focus: isFocused,
          pressed: isPressed,
          'focus-visible': isFocusVisible,
          'is-in-group': !!groupContext,
        },
        dependencies: [
          isDisabled,
          isSelectedProp,
          isHovered,
          isFocused,
          isPressed,
          isFocusVisible,
          buttonProps,
          focusProps,
          hoverProps,
          pressProps,
          otherProps,
          motionProps,
        ],
      },
    },
    {
      base: Root,
    }
  );

  return {
    Root,
    styles,
    domRef,
    getSlotProps,
    children,
    startContent,
    endContent,
  };
}
