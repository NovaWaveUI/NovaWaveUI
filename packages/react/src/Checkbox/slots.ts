import { createSlotSystem } from '@novawaveui/react-utils';
import { CheckboxIconProps } from './CheckboxIcon';
import { CheckboxLabelProps } from './CheckboxLabel';
import { CheckboxIndicatorProps } from './CheckboxIndicator';

export const CheckboxSlots = createSlotSystem<{
  'checkbox-icon': CheckboxIconProps<any>;
  label: CheckboxLabelProps<any>;
  indicator: CheckboxIndicatorProps<any>;
}>();
