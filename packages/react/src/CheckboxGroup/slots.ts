import { createSlotSystem } from '@novawaveui/react-utils';
import { CheckboxGroupLabelProps } from './CheckboxGroupLabel';
import { CheckboxGroupDescriptionProps } from './CheckboxGroupDescription';
import { CheckboxGroupErrorProps } from './CheckboxGroupError';
import { CheckboxGroupWrapperProps } from './CheckboxGroupWrapper';

export const CheckboxGroupSlots = createSlotSystem<{
  'checkbox-group-label': CheckboxGroupLabelProps<any>;
  'checkbox-group-description': CheckboxGroupDescriptionProps<any>;
  'checkbox-group-error': CheckboxGroupErrorProps<any>;
  'checkbox-group-wrapper': CheckboxGroupWrapperProps<any>;
}>();
