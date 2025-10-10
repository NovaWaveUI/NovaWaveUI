import { createSlotSystem } from '../utils/slots';
import {
  CheckboxGroupDescriptionProps,
  CheckboxGroupErrorProps,
  CheckboxGroupLabelProps,
  CheckboxGroupWrapperProps,
} from './types';

export const CheckboxGroupSlots = createSlotSystem<{
  'checkbox-group-label': CheckboxGroupLabelProps<any>;
  'checkbox-group-description': CheckboxGroupDescriptionProps<any>;
  'checkbox-group-error': CheckboxGroupErrorProps<any>;
  'checkbox-group-wrapper': CheckboxGroupWrapperProps<any>;
}>();
