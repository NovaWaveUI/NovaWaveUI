import { createSlotSystem } from '../../utils';
import { CheckboxGroupDescriptionProps } from './CheckboxGroupDescription';
import { CheckboxGroupErrorProps } from './CheckboxGroupError';
import { CheckboxGroupLabelProps } from './CheckboxGroupLabel';
import { CheckboxGroupWrapperProps } from './CheckboxGroupWrapper';

export const CheckboxGroupSlots = createSlotSystem<{
  label: CheckboxGroupLabelProps<any>;
  wrapper: CheckboxGroupWrapperProps<any>;
  error: CheckboxGroupErrorProps<any>;
  description: CheckboxGroupDescriptionProps<any>;
}>();
