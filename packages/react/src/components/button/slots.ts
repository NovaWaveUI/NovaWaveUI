import { createSlotSystem } from '../../utils/slots';
import { ButtonEndContentProps } from './ButtonEndContent';
import { ButtonStartContentProps } from './ButtonStartContent';
import { ButtonTextProps } from './ButtonText';

/**
 * The ButtonSlots is used to define the slots available in the Button component.
 * This is used to provide a consistent API for defining and using slots.
 */
export const ButtonSlots = createSlotSystem<{
  text: ButtonTextProps<any>;
  startContent: ButtonStartContentProps<any>;
  endContent: ButtonEndContentProps<any>;
}>();
