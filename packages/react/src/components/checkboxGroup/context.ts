import { createContext } from '../../utils/react';
import { CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxGroupRenderProps, CheckboxGroupStyleProps } from './types';

export interface CheckboxGroupStateContextType
  extends CheckboxGroupRenderProps,
    CheckboxGroupStyleProps {
  /**
   * The validation details of the checkbox group.
   */
  validationDetails?: ValidityState;
  /**
   * The validation errors of the checkbox group.
   */
  validationErrors?: string[];
  /**
   * The orientation of the checkbox group.
   */
  orientation?: 'vertical' | 'horizontal';
}

export const [CheckboxGroupContext, useCheckboxGroupContextProps] =
  createContext<CheckboxGroupProps<any>>({
    name: 'NovaWaveUI.CheckboxGroupContext',
    strict: false,
    defaultValue: {},
  });

export const [CheckboxGroupStateContext, useCheckboxGroupStateContext] =
  createContext<CheckboxGroupStateContextType>({
    name: 'NovaWaveUI.CheckboxGroupStateContext',
    errorMessage:
      'useCheckboxGroupStateContext must be used within a CheckboxGroup component or a component wrapped with CheckboxGroupStateProvider',
    strict: false,
  });
