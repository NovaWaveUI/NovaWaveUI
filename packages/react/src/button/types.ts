import { RenderProps, SlotProps } from '@novawaveui/react-utils';
import { NWColor, NWRadius, NWSize, NWVariant } from '@novawaveui/theme';
import type { AriaButtonProps } from '@react-aria/button';
import { HoverEvents } from '@react-types/shared';
import { ElementType } from 'react';

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

export type ButtonContextValue = BaseButtonProps;

export interface ButtonStateContext
  extends ButtonRenderProps,
    ButtonStyleProps {}
