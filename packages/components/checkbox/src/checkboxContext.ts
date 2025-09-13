import { createContext } from '@novawaveui/react-utils';
import type { NWColor, NWSize, NWRadius, NWVariant } from '@novawaveui/theme';

export interface CheckboxStyledContextValue {
  color: NWColor;
  size: NWSize;
  radius: NWRadius;
  variant: NWVariant;
  isLoading?: boolean;
}

export const [CheckboxStyleProvider, useCheckboxStyleContext] =
  createContext<CheckboxStyledContextValue>({
    name: 'CheckboxStyleContext',
    errorMessage:
      'useCheckboxStyleContext must be used within a CheckboxStyleProvider component',
  });
