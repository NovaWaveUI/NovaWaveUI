import { createContext } from '@novawaveui/react-utils';
import type {
  NovaWaveUIColor,
  NovaWaveUIRadiusSize,
  NovaWaveUISize,
  NovaWaveUIVariants,
} from '@novawaveui/types';

export interface CheckboxStyledContextValue {
  color: NovaWaveUIColor;
  size: NovaWaveUISize;
  radius: NovaWaveUIRadiusSize;
  variant: NovaWaveUIVariants;
  isLoading?: boolean;
}

export const [CheckboxStyleProvider, useCheckboxStyleContext] =
  createContext<CheckboxStyledContextValue>({
    name: 'CheckboxStyleContext',
    errorMessage:
      'useCheckboxStyleContext must be used within a CheckboxStyleProvider component',
  });
