import { createSlotSystem } from '../utils/slots';
import {
  ButtonEndContentProps,
  ButtonStartContentProps,
  ButtonTextProps,
} from './types';

export const ButtonSlots = createSlotSystem<{
  text: ButtonTextProps<any>;
  startContent: ButtonStartContentProps<any>;
  endContent: ButtonEndContentProps<any>;
}>();
