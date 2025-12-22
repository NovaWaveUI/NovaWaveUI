import { NWSize } from '@novawaveui/types';
import { AriaButtonProps, HoverEvents } from 'react-aria';
import { PolymorphicProps, RenderProps } from '../../utils';

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

export interface ButtonVariantMap {
  primary: true;
  secondary: true;
  tertiary: true;
  destructive: true;
  link: true;
}

export interface ButtonStyleProps {
  /**
   * The variant of the button.
   */
  variant?: keyof ButtonVariantMap;
  /**
   * The size of the button.
   */
  size?: NWSize;
}

export type ButtonProps<T extends React.ElementType> = PolymorphicProps<
  T,
  Omit<AriaButtonProps<T>, 'children' | 'elementType'> &
    HoverEvents &
    RenderProps<ButtonRenderProps> &
    ButtonStyleProps & {
      /**
       * Whether or not the button is in a loading state.
       */
      isLoading?: boolean;
      /**
       * Whether or not this button has an icon only.
       */
      isIconOnly?: boolean;
    }
>;
