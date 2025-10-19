import { createContext } from '../../../utils';
import { InputProps } from './types';

export type InputContextValue = InputProps;

export const [InputContext, useInputContextProps] =
  createContext<InputContextValue>({
    name: 'NovaWaveUI.InputContext',
    strict: false,
  });
