import { createContext } from '../../utils/react';
import { CheckboxProps } from './Checkbox';
import { CheckboxRenderProps, CheckboxStyleProps } from './types';

export interface CheckboxStateContextValue
  extends CheckboxRenderProps,
    CheckboxStyleProps {
  styleDataAttrs?: Record<string, any>;
}

export const [CheckboxContext, useCheckboxContextProps] =
  createContext<CheckboxProps>({
    name: 'NovaWaveUI.CheckboxContext',
    strict: false,
    defaultValue: {},
  });

export const [CheckboxState, useCheckboxState] =
  createContext<CheckboxStateContextValue>({
    name: 'NovaWaveUI.CheckboxState',
    strict: true,
    errorMessage: 'useCheckboxState must be used within a Checkbox component',
  });
