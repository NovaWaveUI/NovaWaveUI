import { NWSize } from '@novawaveui/types';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupRenderProps {
  /**
   * Whether or not the button is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
}

export interface ButtonGroupStyleProps {
  /**
   * The variant of the button.
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  /**
   * The size of the button.
   */
  size?: NWSize;
}
