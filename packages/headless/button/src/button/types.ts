import { PolymorphicProps, RenderProps } from '@novawaveui/react-utils';
import { AriaButtonProps } from '@react-aria/button';
import { HoverEvents } from '@react-types/shared';
import React from 'react';

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

/**
 * The props for the Button component.
 *
 * @template T - The type of the root element.
 */
export type ButtonProps<T extends React.ElementType> = PolymorphicProps<
  T,
  Omit<AriaButtonProps<T>, 'children' | 'elementType'> &
    HoverEvents &
    RenderProps<ButtonRenderProps> & {
      /**
       * Whether or not the button is in a loading state.
       */
      isLoading?: boolean;
      /**
       * Whether or not this button is an icon-only button.
       */
      isIconOnly?: boolean;
    }
>;
