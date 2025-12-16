import { createSlotSystem } from '../../utils';
import { TextAreaProps } from '../primitives/textarea';
import { InputProps } from './slotExports';
import { TextFieldDescriptionProps } from './TextFieldDescription';
import { TextFieldErrorProps } from './TextFieldError';
import { TextFieldErrorMessageProps } from './TextFieldErrorMessage';
import { TextFieldLabelProps } from './TextFieldLabel';

export const TextFieldSlots = createSlotSystem<{
  input: InputProps;
  textArea: TextAreaProps;
  label: TextFieldLabelProps<any>;
  errorField: TextFieldErrorProps;
  errorMessage: TextFieldErrorMessageProps<any>;
  description: TextFieldDescriptionProps<any>;
}>();
