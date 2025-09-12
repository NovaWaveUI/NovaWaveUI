import type { FocusState, InteractionStates } from '@novawaveui/types';

import React from 'react';
import { createContext } from '@novawaveui/react-utils';
import { ToggleState } from '@react-stately/toggle';
import { CheckboxAria } from '@react-aria/checkbox';

export interface CheckboxContextValue extends InteractionStates {
  state: ToggleState;
  aria: CheckboxAria;
  inputRef: React.RefObject<HTMLInputElement>;
  setFocusState: React.Dispatch<React.SetStateAction<FocusState>>;
  isIndeterminate?: boolean;
  isRequired?: boolean;
  isSelected?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

export const [CheckboxProvider, useCheckboxContext] =
  createContext<CheckboxContextValue>({
    name: 'CheckboxContext',
    errorMessage:
      'useCheckboxContext must be used within a CheckboxProvider component',
  });
