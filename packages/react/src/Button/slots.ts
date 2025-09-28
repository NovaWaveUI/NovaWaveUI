import { createSlotSystem } from '@novawaveui/react-utils';
import { ButtonTextProps } from './ButtonText';
import { ButtonStartContentProps } from './ButtonStartContent';
import { ButtonEndContentProps } from './ButtonEndContent';

export const ButtonSlots = createSlotSystem<{
  text: ButtonTextProps<any>;
  startContent: ButtonStartContentProps<any>;
  endContent: ButtonEndContentProps<any>;
}>();
