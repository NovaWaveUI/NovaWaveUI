/* eslint-disable no-unused-vars */
import React from 'react';

export type SlotPresenceMap<TSlots extends string> = Record<TSlots, boolean>;

export interface SlotSystem<TSlots extends string> {
  Provider: React.FC<React.PropsWithChildren>;
  useSlots: () => SlotPresenceMap<TSlots>;
  useRegisterSlot: (slot: TSlots) => void;
}

export function createSlotSystem<TSlots extends string>(
  slots: readonly TSlots[]
): SlotSystem<TSlots> {
  type Presence = {
    register: (slot: TSlots) => void;
    unregister: (slot: TSlots) => void;
  } & SlotPresenceMap<TSlots>;

  const SlotContext = React.createContext<Presence | undefined>(undefined);

  const SlotProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [presence, setPresence] = React.useState<SlotPresenceMap<TSlots>>(
      () => {
        const initialState = {} as SlotPresenceMap<TSlots>;
        for (const slot of slots) {
          initialState[slot] = false;
        }
        return initialState;
      }
    );

    const register = React.useCallback((slot: TSlots) => {
      setPresence(prev => {
        if (prev[slot]) return prev; // already registered
        return { ...prev, [slot]: true };
      });
    }, []);

    const unregister = React.useCallback((slot: TSlots) => {
      setPresence(prev => {
        if (!prev[slot]) return prev; // already unregistered
        return { ...prev, [slot]: false };
      });
    }, []);

    const value = React.useMemo(
      () => ({
        ...presence,
        register,
        unregister,
      }),
      [presence, register, unregister]
    );

    return (
      <SlotContext.Provider value={value}>{children}</SlotContext.Provider>
    );
  };

  const useSlots = () => {
    const context = React.useContext(SlotContext);
    if (!context) {
      throw new Error('useSlots must be used within a SlotProvider');
    }
    // eslint-disable-next-line unicorn/no-array-reduce
    return slots.reduce(
      (acc, s) => ({ ...acc, [s]: context[s] }),
      {} as SlotPresenceMap<TSlots>
    );
  };

  const useRegisterSlot = () => {
    const context = React.useContext(SlotContext);
    if (!context) {
      throw new Error('useRegisterSlot must be used within a SlotProvider');
    }
    return context.register;
  };

  return { Provider: SlotProvider, useSlots, useRegisterSlot };
}
