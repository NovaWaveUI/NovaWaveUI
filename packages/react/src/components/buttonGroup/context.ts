import { createContext } from '../../utils/react';
import {
  ButtonGroupOrientation,
  ButtonGroupRenderProps,
  ButtonGroupStyleProps,
} from './types';
import { ButtonGroupProps } from './ButtonGroup';

// ============================
// ButtonGroup
// ============================

export type ButtonGroupContextType = ButtonGroupRenderProps &
  ButtonGroupStyleProps & {
    /**
     * The orientation of the button group.
     * @default 'horizontal'
     */
    orientation?: ButtonGroupOrientation; // 'horizontal' | 'vertical'
  };

export const [ButtonGroupContext, useButtonGroupContextProps] = createContext<
  ButtonGroupProps<any>
>({
  strict: false,
  name: 'NovaWaveUI.ButtonGroupContext',
  defaultValue: {},
});

export const [ButtonGroupStateContext, useButtonGroup] =
  createContext<ButtonGroupContextType>({
    strict: false,
    name: 'NovaWaveUI.ButtonGroupStateContext',
    errorMessage:
      'useButtonGroup must be used within a ButtonGroup component or a component wrapped with ButtonGroupProvider',
  });
