import { NWSize } from '@novawaveui/types';

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
   * The variant of the button.
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link';
  /**
   * The size of the button.
   */
  size?: NWSize;
}
