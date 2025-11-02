import { AriaTextFieldProps } from 'react-aria';
import { NWSize } from '@novawaveui/types';
import { GlobalDOMAttributes } from '@react-types/shared';
import { RenderProps, SlotProps } from '../../utils';

export interface TextFieldStyleProps {
  /**
   * The size of the text field.
   */
  size?: NWSize;
}

export interface TextFieldRenderProps {
  /**
   * Whether the text field is disabled.
   */
  isDisabled: boolean;
  /**
   * Whether the text field is invalid.
   */
  isInvalid: boolean;
  /**
   * Whether the text field is read-only.
   */
  isReadOnly: boolean;
  /**
   * Whether the text field is required.
   */
  isRequired: boolean;
}

export interface TextFieldProps
  extends Omit<
      AriaTextFieldProps,
      | 'label'
      | 'placeholder'
      | 'description'
      | 'errorMessage'
      | 'validationState'
      | 'validationBehavior'
    >,
    SlotProps,
    TextFieldStyleProps,
    RenderProps<TextFieldRenderProps>,
    GlobalDOMAttributes<HTMLDivElement> {
  /**
   * The validation behavior of the text field.
   */
  validationBehavior?: 'native' | 'aria';
  /**
   * Whether the text field is invalid.
   */
  isInvalid?: boolean;
}
