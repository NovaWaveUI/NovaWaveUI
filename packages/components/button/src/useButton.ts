import React, { useCallback, useMemo, useRef } from 'react';
import { useNovaWaveUI } from '@novawaveui/provider';
import { NovaWaveUIProps, PropGetter } from '@novawaveui/core';
import { dataAttr } from '@novawaveui/aria-utils';
import {
  AriaButtonProps,
  mergeProps,
  useFocusRing,
  useHover,
  useButton as useRAButton,
} from 'react-aria';
import { buttonStyles, ButtonVariantProps } from '@novawaveui/theme';

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
}

export type UseButtonProps = Props &
  Omit<AriaButtonProps, keyof ButtonVariantProps> &
  ButtonVariantProps;

export const useButton = (props: UseButtonProps) => {
  const globalContext = useNovaWaveUI();

  const {
    as,
    ref,
    variant = 'solid',
    color = 'neutral',
    size = 'md',
    radius = 'md',
    disableAnimations = globalContext.disableAnimations ?? false,
    isDisabled: isDisabledProp = false,
    isLoading: isLoadingProp = false,
    isIconOnly = false,
    children,
    className,
    ...otherProps
  } = props;

  // Sets the root element
  const Root = as || 'button';

  const domRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useRAButton(otherProps, domRef);

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

  const { focusProps, isFocusVisible, isFocused } = useFocusRing({
    autoFocus: buttonProps.autoFocus,
  });
  const styles = useMemo(
    () =>
      buttonStyles({
        variant,
        color,
        size,
        radius,
        isIconOnly,
        disableAnimations,
        isDisabled,
        className,
      }),
    [
      variant,
      color,
      size,
      radius,
      isIconOnly,
      isDisabled,
      disableAnimations,
      className,
    ]
  );

  const { buttonProps: ariaButtonProps, isPressed } = useRAButton(
    {
      elementType: Root,
      isDisabled,
      ...otherProps,
    },
    domRef
  );

  const getButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      'data-disabled': dataAttr(isDisabled),
      'data-loading': dataAttr(isLoading),
      'data-hover': dataAttr(isHovered),
      'data-focus': dataAttr(isFocused),
      'data-focus-visible': dataAttr(isFocusVisible),
      'data-pressed': dataAttr(isPressed),
      ...mergeProps(ariaButtonProps, focusProps, hoverProps, otherProps, props),
    }),
    [
      isDisabled,
      isLoading,
      isFocused,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps,
    ]
  );

  return {
    Root,
    children,
    domRef,
    styles,
    getButtonProps,
  };
};
