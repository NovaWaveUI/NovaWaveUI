import { HoverEvents } from 'react-aria';
import { RenderProps } from '../../../utils';

export interface InputRenderProps {
  /**
   * Whether the input is currently hovered with a mouse.
   * @selector [data-hovered]
   */
  isHovered: boolean;
  /**
   * Whether the input is focused, either via a mouse or keyboard.
   * @selector [data-focused]
   */
  isFocused: boolean;
  /**
   * Whether the input is keyboard focused.
   * @selector [data-focus-visible]
   */
  isFocusVisible: boolean;
  /**
   * Whether the input is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the input is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
}

export type InputProps = Omit<
  React.ComponentPropsWithRef<'input'>,
  'children' | 'style' | 'className'
> &
  HoverEvents &
  RenderProps<InputRenderProps> & {
    /**
     * The placeholder text for the input.
     */
    placeholder?: string;
  };
