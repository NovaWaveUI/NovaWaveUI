import { createContext } from 'react';
import { ContextValue } from '@novawaveui/react-utils';
import { ButtonContextValue } from './types';

export const ButtonContext = createContext<
  ContextValue<ButtonContextValue, HTMLButtonElement>
>({});
ButtonContext.displayName = 'ButtonContext';

export const ButtonProvider = ButtonContext.Provider;
