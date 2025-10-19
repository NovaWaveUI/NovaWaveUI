import { createContext } from '../../../utils';
import { TextProps } from './Text';

export const [TextContext, useTextContextProps] = createContext<TextProps<any>>(
  {
    name: 'NovaWaveUI.TextContext',
    strict: false,
  }
);
