import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple className inputs into a single string.
 * @param inputs - className inputs
 * @returns A merged className string
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}
