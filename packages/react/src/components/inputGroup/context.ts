import { createContext } from '../../utils';
import { InputGroupProps } from './types';

export type InputGroupContextValue = InputGroupProps;

export const [InputGroupContext, useInputGroupContext] =
  createContext<InputGroupContextValue>({
    name: 'NovaWaveUI.InputGroupContext',
    strict: false,
  });
