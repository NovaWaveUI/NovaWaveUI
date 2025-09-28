import { ContextValue, createContext } from '@novawaveui/react-utils';
import { createDataPropsGetter } from '@novawaveui/utils';
import {
  CheckboxGroupNWStateContextValue,
  CheckboxGroupPropsContextValue,
} from './types';

export const [CheckboxGroupPropsProvider, _, CheckboxGroupPropsContext] =
  createContext<ContextValue<CheckboxGroupPropsContextValue, HTMLDivElement>>({
    name: 'NovaWaveUI.CheckboxGroupPropsContext',
    errorMessage:
      'useCheckboxGroupProps must be used within a CheckboxGroup component or a component wrapped with CheckboxGroupPropsProvider',
    strict: false,
  });

export const [
  CheckboxGroupNWStateProvider,
  useCheckboxGroupNWState,
  CheckboxGroupNWStateContext,
] = createContext<CheckboxGroupNWStateContextValue>({
  name: 'NovaWaveUI.CheckboxGroupNWStateContext',
  errorMessage:
    'useCheckboxGroupNWState must be used within a CheckboxGroup component or a component wrapped with CheckboxGroupNWStateProvider',
  strict: false,
});

export const getCheckboxGroupDataAttrs =
  createDataPropsGetter<CheckboxGroupNWStateContextValue>(ctx => {
    return {
      disabled: ctx.isDisabled,
      'read-only': ctx.isReadOnly,
      'is-required': ctx.isRequired,
      invalid: ctx.isInvalid,
      color: ctx.color,
      size: ctx.size,
      radius: ctx.radius,
    };
  });
