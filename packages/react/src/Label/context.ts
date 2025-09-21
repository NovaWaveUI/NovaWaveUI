import { ContextValue } from '@novawaveui/react-utils';
import React from 'react';
import { LabelContextValue } from './types';

export const LabelContext = React.createContext<
  ContextValue<LabelContextValue, HTMLLabelElement>
>({});

LabelContext.displayName = 'NovaWaveUI.LabelContext';
