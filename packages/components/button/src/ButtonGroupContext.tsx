import { createContext } from '@novawaveui/react-utils';
import { ContextType } from './useButtonGroup';

/**
 * The context provider for the button group
 */
export const [ButtonGroupProvider, useButtonGroupContext] =
  createContext<ContextType>({
    name: 'ButtonGroupContext',
    strict: false,
  });
