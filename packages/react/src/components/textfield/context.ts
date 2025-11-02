import { createContext } from '../../utils';
import { TextFieldProps } from './types';

export type TextFieldContextValue = TextFieldProps;

export const [TextFieldContext, useTextFieldContext] =
  createContext<TextFieldContextValue>({
    name: 'NovaWaveUI.TextFieldContext',
    strict: false,
  });
