import { ClassValue } from 'tailwind-variants';

export type SlotClasses<S extends string> = {
  [key in S]?: ClassValue;
};
