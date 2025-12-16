import { createSlotSystem } from '../../utils';
import {
  InputGroupEndContentProps,
  InputGroupInputProps,
  InputGroupStartContentProps,
} from './types';

export const InputGroupSlots = createSlotSystem<{
  startContent: InputGroupStartContentProps<any>;
  input: InputGroupInputProps;
  endContent: InputGroupEndContentProps<any>;
}>();
