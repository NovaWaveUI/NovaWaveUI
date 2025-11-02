import { createContext } from '../../../utils';
import { TextAreaProps } from './types';

export type TextAreaContextValue = TextAreaProps;

export const [TextAreaContext, useTextAreaContextProps] =
  createContext<TextAreaContextValue>({
    name: 'NovaWaveUI.TextAreaContext',
    strict: false,
  });
