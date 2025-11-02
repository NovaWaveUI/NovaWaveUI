import { createSlotSystem } from '../../utils';
import { TextFieldDescriptionProps } from './TextFieldDescription';
import { TextFieldErrorProps } from './TextFieldError';
import { TextFieldErrorMessageProps } from './TextFieldErrorMessage';
import { TextFieldInputProps } from './TextFieldInput';
import { TextFieldLabelProps } from './TextFieldLabel';

export const TextFieldSlots = createSlotSystem<{
  input: TextFieldInputProps;
  label: TextFieldLabelProps<any>;
  errorField: TextFieldErrorProps;
  errorMessage: TextFieldErrorMessageProps<any>;
  description: TextFieldDescriptionProps<any>;
}>();
