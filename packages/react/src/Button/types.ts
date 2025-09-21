import { RenderProps, SlotProps } from '@novawaveui/react-utils';
import { NWColor, NWRadius, NWSize, NWVariant } from '@novawaveui/theme';
import type { AriaButtonProps } from '@react-aria/button';
import { HoverEvents } from '@react-types/shared';
import { ElementType } from 'react';
import { GroupProps } from 'src/Group';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonRenderProps {
  /**
   * Whether or not the button is currently hovered with a pointer device.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether or not the button is currently focused.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether or not the button is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether or not the button is currently pressed (only applies to toggle buttons).
   * @selector [data-pressed]
   */
  isPressed: boolean;
  /**
   * Whether or not the button is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether or not the button is loading.
   * @selector [data-loading]
   */
  isLoading: boolean;
}

export interface ButtonStyleProps {
  /**
   * The color of the button.
   */
  color?: NWColor;
  /**
   * The variant of the button.
   */
  variant?: NWVariant;
  /**
   * The size of the button.
   */
  size?: NWSize;
  /**
   * The radius of the button.
   */
  radius?: NWRadius;
}

export interface BaseButtonProps<T extends ElementType = 'button'>
  extends Omit<AriaButtonProps<T>, 'children' | 'elementType'>,
    HoverEvents,
    SlotProps,
    RenderProps<ButtonRenderProps>,
    ButtonStyleProps {
  /**
   * Whether or not the button is in a loading state.
   */
  isLoading?: boolean;
}

export type ButtonPropsContextValue<T extends ElementType = 'button'> =
  BaseButtonProps<T>;

export interface ButtonStateContextValue
  extends ButtonRenderProps,
    ButtonStyleProps {
  /**
   * Whether or not this button is in a group.
   */
  isInGroup: boolean;
}

export interface ButtonGroupRenderProps {
  /**
   * Whether or not the button is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface ButtonGroupStyleProps {
  /**
   * The color of the button.
   */
  color?: NWColor;
  /**
   * The variant of the button.
   */
  variant?: NWVariant;
  /**
   * The size of the button.
   */
  size?: NWSize;
  /**
   * The radius of the button.
   */
  radius?: NWRadius;
}

export interface ButtonGroupProps<T extends ElementType = 'div'>
  extends Omit<
      GroupProps<T>,
      // TODO: Figure out where color is coming from in GroupProps
      'children' | 'className' | 'style' | 'isInvalid' | 'color'
    >,
    ButtonGroupStyleProps,
    RenderProps<ButtonGroupRenderProps> {
  /**
   * Whether or not the buttons in the group are disabled.
   */
  isDisabled?: boolean;

  /**
   * The orientation of the button group.
   * @default 'horizontal'
   */
  orientation?: ButtonGroupOrientation;
}

export type ButtonGroupPropsContextValue<T extends ElementType = 'div'> =
  ButtonGroupProps<T>;

export type ButtonGroupContextValue = {
  /**
   * The size of the buttons in the group.
   */
  size?: ButtonGroupProps['size'];

  /**
   * The color of the buttons in the group.
   */
  color?: ButtonGroupProps['color'];

  /**
   * The variant of the buttons in the group.
   */
  variant?: ButtonGroupProps['variant'];

  /**
   * The radius of the buttons in the group.
   */
  radius?: ButtonGroupProps['radius'];

  /**
   * Whether or not the buttons in the group are disabled.
   */
  isDisabled?: ButtonGroupProps['isDisabled'];

  /**
   * The orientation of the button group.
   * @default 'horizontal'
   */
  orientation?: ButtonGroupProps['orientation']; // 'horizontal' | 'vertical'
};
