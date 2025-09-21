import { createSlotSystem } from '@novawaveui/core';

export const buttonSlots = ['text', 'start-content', 'end-content'] as const;
export const ButtonSlots = createSlotSystem(buttonSlots);
