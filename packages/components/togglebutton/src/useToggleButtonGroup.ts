import {
  AriaToggleButtonGroupProps,
  useToggleButtonGroup as useRAToggleButtonGroup,
} from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';
import { useToggleGroupState, ToggleGroupState } from '@react-stately/toggle';
import { NovaWaveUIProps, useSlotProps } from '@novawaveui/core';
import {
  toggleButtonGroup,
  ToggleButtonGroupVariantProps,
  ToggleButtonVariantProps,
} from '@novawaveui/theme';
import { useNovaWaveUI } from '@novawaveui/provider';
import { useDOMRef } from '@novawaveui/react-utils';
import { useMemo } from 'react';
import { ToggleButtonProps } from './ToggleButton';

interface Props extends NovaWaveUIProps<'div'>, ToggleButtonGroupVariantProps {
  /**
   * A ref to the DOM node.
   */
  ref?: React.Ref<HTMLDivElement | null>;

  /**
   * Whether or not the toggle button group is vertical
   */
  isVertical?: boolean;

  /**
   * Whether or not the toggle button group is full width
   */
  fullWidth?: boolean;

  /**
   * The children (buttons) of the toggle button group
   */
  children?: React.ReactNode;
}

export type ContextType = {
  /**
   * The size of the toggle buttons in the group
   */
  size?: ToggleButtonProps['size'];
  /**
   * The color of the toggle buttons in the group
   */
  color?: ToggleButtonProps['color'];
  /**
   * The variant of the toggle buttons in the group
   */
  variant?: ToggleButtonProps['variant'];
  /**
   * The radius of the toggle buttons in the group
   */
  radius?: ToggleButtonProps['radius'];
  /**
   * Whether or not the group is disabled
   */
  isDisabled?: ToggleButtonProps['isDisabled'];
  /**
   * Whether or not animations should be disabled in the group
   */
  disableAnimations?: ToggleButtonProps['disableAnimations'];
  /**
   * Whether or not the group is an icon only group
   */
  isIconOnly?: ToggleButtonProps['isIconOnly'];
  /**
   * Whether or not the group is vertical
   */
  isVertical?: boolean;
  /**
   * The state of the toggle button group
   */
  state: ToggleGroupState;
};

/**
 * The properties for the toggle button group hook component
 */
export type UseToggleButtonGroupProps = Props &
  Omit<
    AriaToggleButtonGroupProps,
    keyof Omit<ToggleButtonVariantProps, 'isSelected'>
  > &
  Partial<
    Pick<
      ToggleButtonProps,
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
 * The toggle button group hook component. This component is used to group toggle
 * buttons together.
 * @param props The properties for the toggle button group hook component
 * @returns The styles, compoinent, context values, and properties
 */
export const useToggleButtonGroup = (props: UseToggleButtonGroupProps) => {
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
  const defaultAs = as || 'div';
  const Component = defaultAs as React.ElementType;

  // Create or use the DOM ref
  const domRef = useDOMRef<HTMLDivElement>(ref);

  const toggleGroupState = useToggleGroupState(props);

  const { groupProps } = useRAToggleButtonGroup(
    props,
    toggleGroupState,
    domRef
  );

  // Get the toggle button group styles
  const styles = useMemo(
    () =>
      toggleButtonGroup({
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
      state: toggleGroupState,
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
      toggleGroupState,
    ]
  );

  // Get the properties for the toggle button group
  const getSlotProps = useSlotProps('NovaWaveUI.ToggleButtonGroup', {
    base: {
      dependencies: [
        size,
        color,
        variant,
        radius,
        isDisabled,
        isIconOnly,
        isVertical,
        globalContext.disableAnimations,
      ],
      props: {
        ...mergeProps(groupProps, rest),
        className: styles,
        ref: domRef,
      },
    },
  });

  return {
    styles,
    context,
    getSlotProps,
    Component,
    domRef,
    children,
  };
};
