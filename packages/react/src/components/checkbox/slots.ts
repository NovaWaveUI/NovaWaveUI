import { createSlotSystem } from '../../utils/slots';
import { CheckboxIconProps } from './CheckboxIcon';
import { CheckboxIndicatorProps } from './CheckboxIndicator';
import { CheckboxLabelProps } from './CheckboxLabel';

export const CheckboxSlots = createSlotSystem<{
  label: CheckboxLabelProps<any>;
  indicator: CheckboxIndicatorProps<any>;
  'checkbox-icon': CheckboxIconProps<any>;
}>();
