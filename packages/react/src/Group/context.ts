import React from 'react';
import { ContextValue } from '@novawaveui/react-utils';
import { GroupContextValue } from './types';

export const GroupContext = React.createContext<
  ContextValue<GroupContextValue, HTMLDivElement>
>({});
