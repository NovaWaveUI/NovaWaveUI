import { createContext } from '../../../utils';
import { GroupProps } from './types';

export type GroupContextValue = GroupProps;

export const [GroupContext, useGroupContextProps] =
  createContext<GroupContextValue>({
    name: 'NovaWaveUI.GroupContext',
    strict: false,
  });
