import { DOMAttributes, FocusableElement } from '@react-types/shared';

/**
 * useDisableInteractions is a hook that removes all interaction handlers based
 * on a DOM element if it is not interactive (disabled or loading).
 *
 * @param props The props to filter
 * @param isInteractive Whether or not the element is active.
 * @returns A list of filtered props based on the interactivity.
 */
export function useDisableInteractions(
  props: DOMAttributes<FocusableElement>,
  isInteractive: boolean
) {
  if (isInteractive) {
    return props;
  }

  // Create a shallow copy and remove all interaction handlers except focus/blur
  const newProps = { ...props } as Record<string, unknown>;
  for (const key in newProps) {
    if (
      key.startsWith('on') &&
      typeof newProps[key] === 'function' &&
      !(key.includes('Focus') || key.includes('Blur'))
    ) {
      delete newProps[key];
    }
  }
  return newProps as DOMAttributes<FocusableElement>;
}
