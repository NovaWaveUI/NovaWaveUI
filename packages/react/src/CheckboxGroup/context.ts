import { ContextValue, createContext } from '@novawaveui/react-utils';
import {
  CheckboxGroupStateContextValue,
  CheckboxGroupContextValue,
} from './types';

export const [CheckboxGroupProvider, , CheckboxGroupContext] = createContext<
  ContextValue<CheckboxGroupContextValue<any>, HTMLDivElement>
>({
  name: 'NovaWaveUI.CheckboxGroupPropsContext',
  errorMessage:
    'useCheckboxGroupProps must be used within a CheckboxGroup component or a component wrapped with CheckboxGroupPropsProvider',
  strict: false,
});

export const [
  CheckboxGroupStateProvider,
  useCheckboxGroupState,
  CheckboxGroupStateContext,
] = createContext<CheckboxGroupStateContextValue<any>>({
  name: 'NovaWaveUI.CheckboxGroupNWStateContext',
  errorMessage:
    'useCheckboxGroupNWState must be used within a CheckboxGroup component or a component wrapped with CheckboxGroupNWStateProvider',
  strict: false,
});
