import { ContextValue } from '@novawaveui/react-utils';
import React from 'react';
import { LabelContextValue } from './types';

export const LabelContext = React.createContext<
  ContextValue<LabelContextValue<any>, HTMLLabelElement>
>({});

LabelContext.displayName = 'NovaWaveUI.LabelContext';
