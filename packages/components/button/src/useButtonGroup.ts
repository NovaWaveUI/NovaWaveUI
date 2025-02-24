import { useCallback, useMemo } from 'react';
import { NovaWaveUIProps, PropGetter } from '@novawaveui/core';
import { buttonGroup, ButtonGroupVariantProps } from '@novawaveui/theme';
import { useNovaWaveUI } from '@novawaveui/provider';
import { useDOMRef } from '@novawaveui/react-utils';
import { ButtonProps } from './Button';

interface Props extends NovaWaveUIProps<'div'>, ButtonGroupVariantProps {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<HTMLDivElement | null>;

  /**
   * Whether or not the button group is vertical
   */
  isVertical?: boolean;

  /**
   * Whether or not the button group is full width
   */
  fullWidth?: boolean;

  /**
   * The children (buttons) of the button group
   */
  children?: React.ReactNode;
}

export type ContextType = {
  /**
   * The size of the buttons in the group
   */
  size?: ButtonProps['size'];
  /**
   * The color of the buttons in the group
   */
  color?: ButtonProps['color'];
  /**
   * The variant of the buttons in the group
   */
  variant?: ButtonProps['variant'];
  /**
   * The radius of the buttons in the group
   */
  radius?: ButtonProps['radius'];
  /**
   * Whether or not the group is disabled
   */
  isDisabled?: ButtonProps['isDisabled'];
  /**
   * Whether or not animations should be disabled in the group
   */
  disableAnimations?: ButtonProps['disableAnimations'];
  /**
   * Whether or not the group is an icon only group
   */
  isIconOnly?: ButtonProps['isIconOnly'];
  /**
   * Whether or not the group is vertical
   */
  isVertical?: boolean;
};

/**
 * The properties for the button group hook component
 */
export type UseButtonGroupProps = Props &
  Partial<
    Pick<
      ButtonProps,
      | 'size'
      | 'color'
      | 'variant'
      | 'radius'
      | 'isDisabled'
      | 'disableAnimations'
      | 'isIconOnly'
    >
  >;

/**
 * The button group hook component. This component is used to group buttons together.
 * @param props The properties for the button group hook component
 * @returns The styles, component, context values, and properties for each slot
 */
export const useButtonGroup = (props: UseButtonGroupProps) => {
  // Get the global context
  const globalContext = useNovaWaveUI();

  const {
    as,
    ref,
    children,
    color = 'neutral',
    variant = 'solid',
    size = 'md',
    radius = 'md',
    isDisabled = false,
    isIconOnly = false,
    fullWidth = false,
    isVertical = false,
    className,
    ...rest
  } = props;

  // Set the root element
  const Component = as || 'div';
  const domRef = useDOMRef<HTMLDivElement>();

  // Get the button group styles
  const styles = useMemo(
    () =>
      buttonGroup({
        fullWidth,
        isVertical,
      }),
    [fullWidth, isVertical]
  );

  // Get the values for the context
  const context = useMemo<ContextType>(
    () => ({
      size,
      color,
      variant,
      radius,
      isDisabled,
      isIconOnly,
      isVertical,
      disableAnimations: globalContext.disableAnimations ?? false,
    }),
    [
      size,
      color,
      variant,
      radius,
      isDisabled,
      isIconOnly,
      isVertical,
      globalContext.disableAnimations,
    ]
  );

  // Get the properties for the button group
  const getButtonGroupProps: PropGetter = useCallback(
    () => ({
      role: 'group',
      ...rest,
    }),
    [rest]
  );

  return {
    styles,
    context,
    getButtonGroupProps,
    Component,
    domRef,
    children,
  };
};
