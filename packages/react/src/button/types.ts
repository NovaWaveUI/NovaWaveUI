import { RenderProps, SlotProps } from '@novawaveui/react-utils';
import type { AriaButtonProps } from '@react-aria/button';
import { HoverEvents } from '@react-types/shared';

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

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'elementType'>,
    HoverEvents,
    SlotProps,
    RenderProps<ButtonRenderProps> {
  /**
   * Whether or not the button is in a loading state.
   */
  isLoading?: boolean;
}

export type ButtonContextValue = ButtonProps;
