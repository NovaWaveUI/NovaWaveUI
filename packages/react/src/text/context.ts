import React from 'react';
import { ContextValue } from '@novawaveui/react-utils';
import { TextContextValue } from './types';

export const TextContext = React.createContext<
  ContextValue<TextContextValue, HTMLSpanElement>
>({});
