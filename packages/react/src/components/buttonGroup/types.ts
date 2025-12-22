import { NWSize } from '@novawaveui/types';
import { PolymorphicProps, RenderProps } from '../../utils';

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

export type ButtonGroupProps<T extends React.ElementType> = PolymorphicProps<
  T,
  ButtonGroupStyleProps &
    RenderProps<ButtonGroupRenderProps> & {
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
>;
