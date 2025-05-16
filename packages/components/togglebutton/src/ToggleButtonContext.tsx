import { createContext } from '@novawaveui/react-utils';
import { ContextType } from './useToggleButtonGroup';

/**
 * The context provider for the toggle button group
 */
export const [ToggleButtonGroupProvider, useToggleButtonGroupContext] =
  createContext<ContextType>({
    name: 'ToggleButtonGroupContext',
    strict: false,
  });
