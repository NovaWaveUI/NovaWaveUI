import { createContext } from '@novawaveui/react-utils';
import { LabelProps } from './Label';

export const [LabelContext, useLabelContextProps] = createContext<
  LabelProps<any>
>({
  name: 'NovaWaveUI.LabelContext',
  strict: false,
});
