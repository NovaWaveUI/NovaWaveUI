import React, { useCallback, useMemo, useRef } from 'react';
import { useNovaWaveUI } from '@novawaveui/provider';
import { NovaWaveUIProps, PropGetter } from '@novawaveui/core';
import { dataAttr } from '@novawaveui/aria-utils';
import {
  AriaButtonProps,
  useFocusRing,
  useHover,
  usePress,
  useButton as useRAButton,
} from 'react-aria';
import { buttonStyles, ButtonVariantProps } from './styles/button';

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

  let domRef = useRef<HTMLButtonElement>(null);
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

  const { pressProps, isPressed } = usePress({
    isDisabled: !isInteractive,
  });

  const styles = useMemo(
    () => buttonStyles({ variant, color, size, radius, className }),
    [variant, color, size, radius, className]
  );

  const rootButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      'data-disabled': dataAttr(isDisabled),
    }),
    []
  );

  return {
    ref,
    styles,
  };
};
