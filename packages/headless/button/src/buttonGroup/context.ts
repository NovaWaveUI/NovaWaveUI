import { createContext } from '@novawaveui/react-utils';
import type { ButtonGroupRenderProps, ButtonGroupProps } from './types';

export type ButtonGroupStateContextType = ButtonGroupRenderProps;
export type ButtonGroupContextType = ButtonGroupProps<any>;

export const [ButtonGroupContext, useButtonGroupProps] =
  createContext<ButtonGroupContextType>({
    strict: false,
    name: 'NovaWaveUI.Headless.ButtonGroupContext',
    defaultValue: {},
  });

export const [ButtonGroupStateContext, useButtonGroupState] =
  createContext<ButtonGroupStateContextType>({
    strict: false,
    name: 'NovaWaveUI.Headless.ButtonGroupStateContext',
    errorMessage:
      'useButtonGroup must be used within a ButtonGroup component or a component wrapped with ButtonGroupProvider',
  });
