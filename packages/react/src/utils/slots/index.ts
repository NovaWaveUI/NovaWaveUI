import {
  RefCallback,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export type { SlotSystem } from './SlotSystem';
export { createSlotSystem } from './SlotSystem';

/**
 * Taken from
 * https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx#L216
 *
 * Thank you Adobe!
 *
 * A custom hook that manages the presence of a slotted element.
 */
export function useSlot(
  initialState: boolean | (() => boolean) = true
): [RefCallback<Element>, boolean] {
  // Initial state is typically based on the parent having an aria-label or aria-labelledby.
  // If it does, this value should be false so that we don't update the state and cause a rerender when we go through the layoutEffect
  const [hasSlot, setHasSlot] = useState(initialState);
  const hasRun = useRef(false);

  // A callback ref which will run when the slotted element mounts.
  // This should happen before the useLayoutEffect below.
  const ref = useCallback((el: any) => {
    hasRun.current = true;
    setHasSlot(!!el);
  }, []);

  // If the callback hasn't been called, then reset to false.
  useLayoutEffect(() => {
    if (!hasRun.current) {
      setHasSlot(false);
    }
  }, []);

  return [ref, hasSlot];
}
