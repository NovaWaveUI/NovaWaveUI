import { NWColor, NWRadius, NWSize, NWVariant } from '@novawaveui/types';

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
